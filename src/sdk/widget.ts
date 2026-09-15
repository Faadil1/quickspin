import { SessionStateMachine } from "./state-machine";
import {
  applyThemeToRoot,
  defaultTheme,
  normalizeTheme,
  themeForGame,
  type NormalizedTheme,
} from "./theme";
import type {
  CreateQuickSpinOptions,
  EndReason,
  ExecutionSignal,
  ExecutionTrailEntry,
  HostIntervention,
  HostObservation,
  InterventionIntent,
  InterventionResult,
  WaitCapsule,
  GameDefinition,
  GameHost,
  GameInstance,
  GameResult,
  QuickSpinController,
  SessionStatus,
  ThemeConfig,
  WaitEvent,
  WaitEventHandler,
  WaitSession,
} from "./types";
import { runnerGame } from "./runner";
import { orbitGame } from "./orbit";
import {
  bestLabel,
  evidenceCoverageFromTrail,
  perceivedWaitStats,
  recordSession,
  sessionRecordToCapsule,
  totalSessions,
  totalWaitTurnedToPlayMs,
  updateSessionPerception,
} from "./persistence";

const GAMES: Record<string, GameDefinition> = {
  [runnerGame.id]: runnerGame,
  [orbitGame.id]: orbitGame,
};

function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

function normalizeExecutionSignal(signal: ExecutionSignal): ExecutionSignal | null {
  if (!signal || typeof signal !== "object") return null;
  if (!["retrieval", "tool", "artifact", "warning"].includes(signal.kind)) return null;
  const label = typeof signal.label === "string" ? signal.label.trim().slice(0, 96) : "";
  const evidenceRef =
    typeof signal.evidenceRef === "string" ? signal.evidenceRef.trim().slice(0, 160) : "";
  if (!label || !evidenceRef) return null;
  return { kind: signal.kind, label, evidenceRef };
}

function safeError(error: unknown): Error {
  if (error instanceof Error) return error;
  if (typeof error === "string" && error.trim()) return new Error(error.trim());
  try {
    const serialized = JSON.stringify(error);
    return new Error(serialized && serialized !== "{}" ? serialized : "Unknown host request failure");
  } catch {
    return new Error("Unknown host request failure");
  }
}

function resolveTarget(target?: string | HTMLElement): HTMLElement {
  if (target instanceof HTMLElement) return target;
  if (typeof target === "string") {
    const node = document.querySelector<HTMLElement>(target);
    if (!node) throw new Error(`QuickSpin: target not found: ${target}`);
    return node;
  }
  const auto = document.querySelector<HTMLElement>("[data-quickspin]:not([data-quickspin-active])");
  if (auto) return auto;
  const el = document.createElement("div");
  el.setAttribute("data-quickspin", "");
  document.body.appendChild(el);
  return el;
}

function formatWait(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)} ms`;
  return `${(ms / 1000).toFixed(ms >= 10000 ? 1 : 2)} s`;
}

function buildStyles(): string {
  return `
    :host { all: initial; }
    *, *::before, *::after { box-sizing: border-box; }
    .quickspin-root {
      --qs-primary: #ff7b54;
      --qs-surface: #0f172a;
      --qs-elevated: #172036;
      --qs-game: #0b1020;
      --qs-text: #f8fafc;
      --qs-muted: #94a3b8;
      --qs-border: #334155;
      --qs-success: #4ade80;
      --qs-radius: 18px;
      --qs-font: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      font-family: var(--qs-font);
      color: var(--qs-text);
      width: min(100%, 520px);
      border: 1px solid var(--qs-border);
      border-radius: var(--qs-radius);
      background: var(--qs-surface);
      box-shadow: 0 24px 70px rgba(15, 23, 42, 0.18);
      overflow: hidden;
      position: relative;
    }
    .quickspin-root[hidden] { display: none !important; }
    .quickspin-head {
      display:flex; align-items:center; justify-content:space-between; gap:12px;
      padding:14px 16px; border-bottom:1px solid var(--qs-border); background:var(--qs-elevated);
    }
    .quickspin-title { display:flex; flex-direction:column; gap:3px; min-width:0; }
    .quickspin-status { font-size:13px; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .quickspin-elapsed { font-size:11px; color:var(--qs-muted); }
    .quickspin-icon-btn, .quickspin-reopen {
      appearance:none; border:1px solid var(--qs-border); color:var(--qs-text); background:transparent;
      border-radius:999px; cursor:pointer; font:inherit;
    }
    .quickspin-icon-btn { width:34px; height:34px; }
    .quickspin-icon-btn:focus-visible, .quickspin-reopen:focus-visible, button:focus-visible {
      outline:2px solid var(--qs-primary); outline-offset:2px;
    }
    .quickspin-progress { height:3px; background:color-mix(in srgb, var(--qs-border), transparent 25%); overflow:hidden; }
    .quickspin-progress-fill { height:100%; width:0; background:var(--qs-primary); transform-origin:left; }
    .quickspin-progress-fill.indeterminate { width:32%; animation:qs-slide 1.35s ease-in-out infinite; }
    @keyframes qs-slide { 0%{transform:translateX(-110%)} 50%{transform:translateX(210%)} 100%{transform:translateX(420%)} }
    .quickspin-stage { position:relative; aspect-ratio:16 / 9; min-height:240px; background:var(--qs-game); overflow:hidden; }
    .quickspin-stage canvas { width:100%; height:100%; display:block; touch-action:none; }
    .quickspin-overlay {
      position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center;
      gap:14px; padding:28px; text-align:center; background:color-mix(in srgb, var(--qs-game), transparent 4%); z-index:4;
    }
    .quickspin-overlay[hidden] { display:none; }
    .quickspin-label { font-size:14px; line-height:1.45; max-width:360px; }
    .quickspin-actions { display:flex; flex-wrap:wrap; gap:9px; justify-content:center; }
    .quickspin-actions button, .quickspin-felt-btn {
      appearance:none; border:1px solid var(--qs-border); border-radius:999px; padding:9px 13px;
      color:var(--qs-text); background:var(--qs-elevated); cursor:pointer; font:600 12px/1 var(--qs-font);
    }
    .quickspin-actions .primary { background:var(--qs-primary); color:#111827; border-color:transparent; }
    .quickspin-felt { display:flex; flex-wrap:wrap; gap:8px; justify-content:center; }
    .quickspin-notes { font-size:11px; color:var(--qs-muted); max-width:400px; line-height:1.5; white-space:pre-line; }
    .quickspin-footer { display:flex; justify-content:space-between; gap:10px; padding:11px 15px; border-top:1px solid var(--qs-border); color:var(--qs-muted); font-size:10px; background:var(--qs-elevated); }
    .quickspin-reopen {
      display:none; width:100%; padding:10px 14px; border:0; border-radius:0; background:var(--qs-elevated); text-align:left;
      font-size:12px; font-weight:700;
    }
    .quickspin-root.is-collapsed .quickspin-head,
    .quickspin-root.is-collapsed .quickspin-progress,
    .quickspin-root.is-collapsed .quickspin-stage,
    .quickspin-root.is-collapsed .quickspin-footer { display:none; }
    .quickspin-root.is-collapsed .quickspin-reopen { display:block; }
    .quickspin-receipt { width:min(100%,360px); border:1px solid var(--qs-border); border-radius:14px; overflow:hidden; text-align:left; }
    .quickspin-receipt-row { display:flex; justify-content:space-between; gap:12px; padding:9px 11px; border-bottom:1px solid var(--qs-border); font-size:11px; }
    .quickspin-receipt-row:last-child { border-bottom:0; }
    .quickspin-receipt-row span { color:var(--qs-muted); }
    .quickspin-receipt-row strong { text-align:right; }
    @media (prefers-reduced-motion: reduce) {
      .quickspin-progress-fill.indeterminate { animation:none; width:100%; opacity:.55; }
      * { scroll-behavior:auto !important; transition-duration:0s !important; animation-duration:0s !important; }
    }
  `;
}

export function createQuickSpin(opts: CreateQuickSpinOptions = {}): QuickSpinController {
  const target = resolveTarget(opts.target);
  if (target.hasAttribute("data-quickspin-active"))
    throw new Error("QuickSpin: target already active.");
  target.setAttribute("data-quickspin-active", "true");

  const hostEl = document.createElement("div");
  hostEl.style.display = "contents";
  target.appendChild(hostEl);
  const shadow = hostEl.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = buildStyles();
  shadow.appendChild(style);

  const root = document.createElement("section");
  root.className = "quickspin-root";
  root.hidden = true;
  root.innerHTML = `
    <div class="quickspin-head">
      <div class="quickspin-title"><div class="quickspin-status">Waiting for the model…</div><div class="quickspin-elapsed">0s</div></div>
      <button class="quickspin-icon-btn" type="button" aria-label="Minimize QuickSpin">−</button>
    </div>
    <div class="quickspin-progress"><div class="quickspin-progress-fill"></div></div>
    <div class="quickspin-stage"><canvas></canvas><div class="quickspin-overlay"></div></div>
    <div class="quickspin-footer"><span class="quickspin-best"></span><span>QuickSpin · optional play</span></div>
    <button class="quickspin-reopen" type="button" aria-label="Reopen QuickSpin">QuickSpin · waiting… · reopen</button>
  `;
  shadow.appendChild(root);

  const statusEl = root.querySelector<HTMLElement>(".quickspin-status")!;
  const elapsedEl = root.querySelector<HTMLElement>(".quickspin-elapsed")!;
  const progressFill = root.querySelector<HTMLElement>(".quickspin-progress-fill")!;
  const stage = root.querySelector<HTMLElement>(".quickspin-stage")!;
  const canvas = root.querySelector<HTMLCanvasElement>("canvas")!;
  const overlay = root.querySelector<HTMLElement>(".quickspin-overlay")!;
  const bestEl = root.querySelector<HTMLElement>(".quickspin-best")!;
  const minimizeBtn = root.querySelector<HTMLButtonElement>(".quickspin-icon-btn")!;
  const reopenBtn = root.querySelector<HTMLButtonElement>(".quickspin-reopen")!;

  const machine = new SessionStateMachine();
  let gameId = GAMES[opts.game ?? "runner"] ? (opts.game ?? "runner") : "runner";
  let themeBase = normalizeTheme(opts.theme ?? defaultTheme());
  let currentTheme: NormalizedTheme = themeForGame(themeBase, gameId);
  let currentGame: GameInstance | null = null;
  let sessionActive = false;
  let destroyed = false;
  let startedAt = 0;
  let engagedMs = 0;
  let lastTs = 0;
  let manuallyHidden = false;
  let collapsed = false;
  let externalHandler: WaitEventHandler | null = null;
  let uiShown = false;
  let revealTimer: number | null = null;
  const revealDelayMs = Number.isFinite(opts.delayMs) ? Math.max(0, Number(opts.delayMs)) : 650;
  let latestPhase: string | null = null;
  let phaseIndex = -1;
  let phaseIntensity = 0;
  const pendingSignals: ExecutionSignal[] = [];
  const executionTrail: ExecutionTrailEntry[] = [];
  let lastCapsule: WaitCapsule | null = null;
  let latestStatus = "Waiting for the model…";

  function emit(e: WaitEvent): void {
    if (opts.onEvent) opts.onEvent(e);
    if (externalHandler) externalHandler(e);
  }

  function trailAtMs(): number {
    return startedAt > 0 ? Math.max(0, performance.now() - startedAt) : 0;
  }

  function finalizeCapsule(record: Parameters<typeof sessionRecordToCapsule>[0]): void {
    lastCapsule = sessionRecordToCapsule(record);
    emit({ type: "capsule", data: lastCapsule });
  }

  function clearRevealTimer(): void {
    if (revealTimer !== null) {
      clearTimeout(revealTimer);
      revealTimer = null;
    }
  }

  function applyTheme(theme: ThemeConfig): void {
    themeBase = normalizeTheme(theme);
    currentTheme = themeForGame(themeBase, gameId);
    applyThemeToRoot(root, currentTheme);
  }

  function setThemeState(id: string): void {
    currentTheme = themeForGame(themeBase, id);
    applyThemeToRoot(root, currentTheme);
  }

  applyTheme(opts.theme ?? defaultTheme());

  const gameHost: GameHost = {
    canvas,
    root: stage,
    get progress() {
      return machine.progress;
    },
    get intensity() {
      return machine.progress == null ? phaseIntensity : machine.progress;
    },
    get phase() {
      return latestPhase;
    },
    finish(reason: EndReason) {
      return currentGame ? currentGame.finish(reason) : fallbackResult(reason);
    },
    elapsedMs() {
      return Math.max(0, performance.now() - startedAt);
    },
  };

  function fallbackResult(reason: EndReason): GameResult {
    return { score: 0, label: "No game", notes: [], reason };
  }

  function destroyGame(): void {
    currentGame?.destroy();
    currentGame = null;
  }

  function beginGame(): void {
    if (!sessionActive || destroyed || currentGame) return;
    const def = GAMES[gameId] ?? runnerGame;
    currentGame = def.create(gameHost);
    currentGame.start();
    while (pendingSignals.length) {
      const signal = pendingSignals.shift();
      if (signal && currentGame.signal) currentGame.signal(signal);
    }
    if (machine.status === "waiting") machine.transition("playing");
    emit({ type: "game-start", data: { game: gameId } });
  }

  function focusFirstButton(): void {
    window.setTimeout(() => overlay.querySelector<HTMLButtonElement>("button")?.focus(), 0);
  }

  function revealSessionUI(): void {
    revealTimer = null;
    if (!sessionActive || destroyed || machine.status === "response-ready") return;
    uiShown = true;
    syncVisibility();
    showChoiceOverlay();
  }

  function showChoiceOverlay(): void {
    overlay.hidden = false;
    overlay.innerHTML = "";
    const label = document.createElement("div");
    label.className = "quickspin-label quickspin-waiting-label";
    label.textContent = latestPhase ? `AI is working · ${latestPhase}` : "AI is working…";
    const actions = document.createElement("div");
    actions.className = "quickspin-actions";
    for (const id of Object.keys(GAMES)) {
      const def = GAMES[id];
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = `${def.name} · ${def.controls}`;
      button.addEventListener("click", () => {
        setGameNoStart(id);
        overlay.hidden = true;
        beginGame();
      });
      actions.appendChild(button);
    }
    const skip = document.createElement("button");
    skip.type = "button";
    skip.textContent = "No thanks";
    skip.addEventListener("click", () => {
      overlay.hidden = true;
    });
    actions.appendChild(skip);
    overlay.append(label, actions);
    focusFirstButton();
  }

  function syncVisibility(): void {
    const shouldHide = manuallyHidden || !uiShown || !sessionActive;
    root.hidden = shouldHide;
  }

  function updateCollapsedCopy(): void {
    reopenBtn.textContent = `QuickSpin · ${latestPhase ?? latestStatus} · reopen`;
  }

  function loop(ts: number): void {
    if (destroyed) return;
    if (lastTs === 0) lastTs = ts;
    const delta = Math.min(50, Math.max(0, ts - lastTs));
    lastTs = ts;
    if (sessionActive) {
      elapsedEl.textContent = formatWait(Math.max(0, performance.now() - startedAt));
      if (!document.hidden && !manuallyHidden && !collapsed && currentGame) {
        currentGame.tick(ts, delta);
        engagedMs += delta;
      }
    }
    raf = requestAnimationFrame(loop);
  }

  function completeSession(): void {
    if (!sessionActive) return;
    clearRevealTimer();
    const actualWaitMs = Math.max(0, performance.now() - startedAt);
    const result = currentGame?.finish("ai-complete") ?? fallbackResult("ai-complete");
    if (machine.status === "waiting" || machine.status === "playing")
      machine.transition("response-ready");
    const rec = recordSession({
      gameId: currentGame ? gameId : null,
      score: currentGame ? result.score : null,
      actualWaitMs,
      engagedPlayMs: engagedMs,
      completed: true,
      outcome: "completed",
      trail: executionTrail,
      evidenceCoverage: evidenceCoverageFromTrail(executionTrail),
    });
    finalizeCapsule(rec.record);
    destroyGame();
    updateFooterStats();

    if (uiShown) {
      syncVisibility();
      showResult(result, rec.id, actualWaitMs, engagedMs, rec.isHighScore);
    }

    machine.transition("completed");
    sessionActive = false;
    emit({
      type: "session-complete",
      data: {
        id: rec.id,
        game: rec.record.gameId,
        score: rec.record.score,
        actualWaitMs,
        engagedPlayMs: engagedMs,
        result,
        outcome: "completed",
      },
    });
  }

  function cancelSession(): void {
    if (!sessionActive) return;
    clearRevealTimer();
    const actualWaitMs = Math.max(0, performance.now() - startedAt);
    const result = currentGame?.finish("cancelled") ?? fallbackResult("cancelled");
    const rec = recordSession({
      gameId: currentGame ? gameId : null,
      score: null,
      actualWaitMs,
      engagedPlayMs: engagedMs,
      completed: false,
      outcome: "cancelled",
      trail: executionTrail,
      evidenceCoverage: evidenceCoverageFromTrail(executionTrail),
    });
    if (machine.status === "waiting" || machine.status === "playing") machine.transition("cancelled");
    emit({
      type: "cancel",
      data: { id: rec.id, outcome: "cancelled", game: currentGame ? gameId : null },
    });
    finalizeCapsule(rec.record);
    destroyGame();
    sessionActive = false;
    if (uiShown) showCancelledOverlay();
    void result;
  }

  function failSession(error?: unknown): void {
    if (!sessionActive) return;
    clearRevealTimer();
    const failure = safeError(error);
    const actualWaitMs = Math.max(0, performance.now() - startedAt);
    const result = currentGame?.finish("cancelled") ?? fallbackResult("cancelled");
    const rec = recordSession({
      gameId: currentGame ? gameId : null,
      score: null,
      actualWaitMs,
      engagedPlayMs: engagedMs,
      completed: false,
      outcome: "failed",
      failureCode: "HOST_REQUEST_FAILED",
      failureMessage: failure.message.slice(0, 240),
      trail: executionTrail,
      evidenceCoverage: evidenceCoverageFromTrail(executionTrail),
    });
    if (machine.status === "waiting" || machine.status === "playing") machine.transition("failed");
    emit({
      type: "fail",
      data: {
        id: rec.id,
        outcome: "failed",
        code: "HOST_REQUEST_FAILED",
        error: { name: failure.name, message: failure.message },
      },
    });
    finalizeCapsule(rec.record);
    destroyGame();
    sessionActive = false;
    if (uiShown) showErrorOverlay(failure, rec.id);
    void result;
  }

  function showResult(
    result: GameResult,
    recordId: string,
    actualWaitMs: number,
    engagedPlayMs: number,
    isHighScore: boolean
  ): void {
    overlay.hidden = false;
    overlay.innerHTML = "";
    const title = document.createElement("div");
    title.className = "quickspin-label";
    title.textContent = result.label;
    const notes = document.createElement("div");
    notes.className = "quickspin-notes";
    const high = isHighScore ? "New local high score.\n" : "";
    notes.textContent = `${high}${result.notes.join("\n")}`.trim();
    const actions = document.createElement("div");
    actions.className = "quickspin-actions";
    const receipt = document.createElement("button");
    receipt.className = "primary";
    receipt.type = "button";
    receipt.textContent = "View Wait Receipt";
    receipt.addEventListener("click", () =>
      showPerceptionPrompt(recordId, actualWaitMs, engagedPlayMs)
    );
    actions.appendChild(receipt);
    overlay.append(title, notes, actions);
    focusFirstButton();
  }

  function showWaitReceipt(
    recordId: string,
    actualWaitMs: number,
    engagedPlayMs: number,
    feltWaitMs: number | null
  ): void {
    overlay.hidden = false;
    overlay.innerHTML = "";
    const box = document.createElement("div");
    box.className = "quickspin-receipt";
    const deltaMs = feltWaitMs == null ? null : feltWaitMs - actualWaitMs;
    const deltaLabel =
      deltaMs == null
        ? "not answered"
        : `${deltaMs >= 0 ? "+" : "−"}${formatWait(Math.abs(deltaMs))}`;
    const ratio = feltWaitMs == null || actualWaitMs <= 0 ? null : feltWaitMs / actualWaitMs;
    const ratioLabel = ratio == null ? "—" : `${Math.round(ratio * 100)}% of actual`;
    box.innerHTML = `
      <div class="quickspin-receipt-row"><span>WAIT RECEIPT</span><strong>${recordId.slice(0, 8)}</strong></div>
      <div class="quickspin-receipt-row"><span>Actual wait</span><strong>${formatWait(actualWaitMs)}</strong></div>
      <div class="quickspin-receipt-row"><span>Played during wait</span><strong>${formatWait(engagedPlayMs)}</strong></div>
      <div class="quickspin-receipt-row"><span>Felt wait</span><strong>${feltWaitMs == null ? "—" : formatWait(feltWaitMs)}</strong></div>
      <div class="quickspin-receipt-row"><span>Felt − actual</span><strong>${deltaLabel}</strong></div>
      <div class="quickspin-receipt-row"><span>Perceived ratio</span><strong>${ratioLabel}</strong></div>
    `;
    overlay.appendChild(box);
  }

  function showPerceptionPrompt(
    recordId: string,
    actualWaitMs: number,
    engagedPlayMs: number
  ): void {
    overlay.hidden = false;
    overlay.innerHTML = "";
    const answerPerception = (feltMs: number): void => {
      const stored = updateSessionPerception(recordId, feltMs);
      if (lastCapsule?.recordId === recordId) lastCapsule.feltWaitMs = stored?.feltWaitMs ?? feltMs;
      const ratio = actualWaitMs > 0 ? feltMs / actualWaitMs : 1;
      const deltaMs = feltMs - actualWaitMs;
      const change = actualWaitMs > 0 ? (feltMs - actualWaitMs) / actualWaitMs : 0;
      emit({
        type: "perceived-wait",
        data: {
          id: recordId,
          felt: feltMs,
          actual: actualWaitMs,
          ratio,
          deltaMs,
          change,
          reduction: change,
          persisted: Boolean(stored),
        },
      });
      updateFooterStats();
      showWaitReceipt(recordId, actualWaitMs, engagedPlayMs, feltMs);
    };

    const q = document.createElement("div");
    q.className = "quickspin-label";
    q.textContent = `That took ${formatWait(actualWaitMs)}. How long did it feel?`;
    const feltWrap = document.createElement("div");
    feltWrap.className = "quickspin-felt";
    const fast = Math.max(1000, actualWaitMs * 0.6);
    const same = actualWaitMs;
    const slow = Math.max(actualWaitMs + 1000, actualWaitMs * 1.4);
    const opts2: Array<[string, number]> = [
      [`Faster · ~${formatWait(fast)}`, fast],
      [`About the same · ~${formatWait(same)}`, same],
      [`Longer · ~${formatWait(slow)}`, slow],
    ];
    for (const [txt, ms] of opts2) {
      const b = document.createElement("button");
      b.className = "quickspin-felt-btn";
      b.type = "button";
      b.textContent = txt;
      b.addEventListener("click", () => answerPerception(ms));
      feltWrap.appendChild(b);
    }
    overlay.appendChild(q);
    overlay.appendChild(feltWrap);

    const skip = document.createElement("button");
    skip.className = "quickspin-btn-ghost";
    skip.type = "button";
    skip.textContent = "Skip question · view receipt";
    skip.addEventListener("click", () =>
      showWaitReceipt(recordId, actualWaitMs, engagedPlayMs, null)
    );
    const actions = document.createElement("div");
    actions.className = "quickspin-actions";
    actions.appendChild(skip);
    overlay.appendChild(actions);
    focusFirstButton();
  }

  function showCancelledOverlay(): void {
    overlay.hidden = false;
    overlay.innerHTML = "";
    const label = document.createElement("div");
    label.className = "quickspin-label";
    label.textContent = "Wait cancelled.";
    overlay.appendChild(label);
  }

  function showErrorOverlay(error: Error, recordId: string): void {
    overlay.hidden = false;
    overlay.innerHTML = "";
    const label = document.createElement("div");
    label.className = "quickspin-label";
    label.textContent = "Request failed — no response fabricated.";
    const detail = document.createElement("div");
    detail.className = "quickspin-notes";
    detail.textContent = `${error.message} · evidence ${recordId.slice(0, 8)}`;
    overlay.appendChild(label);
    overlay.appendChild(detail);
  }

  function updateBest(): void {
    bestEl.textContent = bestLabel(gameId) ? `Best: ${bestLabel(gameId)}` : "";
  }

  function updateFooterStats(): void {
    bestEl.textContent =
      `${totalSessions()} sessions · ${formatWait(totalWaitTurnedToPlayMs())} played during AI wait · ` +
      (bestLabel(gameId) ? `Best: ${bestLabel(gameId)}` : "No best yet");
  }

  // ---- visibility ----
  const onVisibility = (): void => {
    if (document.hidden || manuallyHidden || collapsed) currentGame?.pause();
    else {
      currentGame?.resume();
      lastTs = 0;
    }
  };
  document.addEventListener("visibilitychange", onVisibility);

  function hide(): void {
    manuallyHidden = true;
    syncVisibility();
    currentGame?.pause();
  }

  function show(): void {
    manuallyHidden = false;
    syncVisibility();
    if (!collapsed) currentGame?.resume();
    lastTs = 0;
  }

  minimizeBtn.addEventListener("click", () => {
    collapsed = true;
    root.classList.add("is-collapsed");
    currentGame?.pause();
    updateCollapsedCopy();
  });

  reopenBtn.addEventListener("click", () => {
    collapsed = false;
    root.classList.remove("is-collapsed");
    currentGame?.resume();
    lastTs = 0;
  });

  // If the host page is hidden at load, the RAF still runs but tick is guarded.
  let raf = requestAnimationFrame(loop);
  updateFooterStats();

  function prepareMachineForStart(): void {
    if (machine.status === "destroyed") throw new Error("QuickSpin: controller is destroyed.");
    if (
      machine.status === "completed" ||
      machine.status === "cancelled" ||
      machine.status === "failed"
    ) {
      machine.transition("idle");
    }
    if (machine.status !== "idle")
      throw new Error(`QuickSpin: cannot start from ${machine.status}.`);
    if (!machine.transition("waiting")) throw new Error("QuickSpin: failed to enter waiting state.");
  }

  function startSession(options?: { gameId?: string; status?: string }): WaitSession {
    if (destroyed) throw new Error("QuickSpin: controller is destroyed.");
    prepareMachineForStart();
    sessionActive = true;
    startedAt = performance.now();
    engagedMs = 0;
    lastTs = 0;
    latestPhase = null;
    phaseIndex = -1;
    phaseIntensity = 0;
    pendingSignals.length = 0;
    executionTrail.length = 0;
    collapsed = false;
    uiShown = false;
    progressFill.style.width = "0%";
    progressFill.classList.remove("indeterminate");
    elapsedEl.textContent = "0s";
    const o = options ?? {};
    latestStatus = o.status ?? "Waiting for the model…";
    statusEl.textContent = latestStatus;
    const gid = o.gameId ?? gameId;
    if (GAMES[gid]) setGameNoStart(gid);
    syncVisibility();
    emit({ type: "session-start", data: { game: gameId, delayMs: revealDelayMs } });

    if (revealDelayMs === 0) revealSessionUI();
    else revealTimer = window.setTimeout(revealSessionUI, revealDelayMs);
    return session;
  }

  function setGameNoStart(id: string): void {
    gameId = id;
    setThemeState(id);
  }

  const session: WaitSession = {
    setPhase(phase: string) {
      if (!sessionActive) return;
      const normalized = phase.trim();
      if (!normalized) return;
      if (normalized !== latestPhase) {
        latestPhase = normalized;
        phaseIndex += 1;
        phaseIntensity = clamp01(0.18 + Math.max(0, phaseIndex) * 0.22);
        executionTrail.push({ type: "phase", atMs: trailAtMs(), phase: normalized });
      }
      statusEl.textContent = normalized;
      if (uiShown && !currentGame && !overlay.hidden) {
        const waitingLabel = overlay.querySelector<HTMLElement>(".quickspin-waiting-label");
        if (waitingLabel) waitingLabel.textContent = `AI is working · ${normalized}`;
      }
      updateCollapsedCopy();
      emit({
        type: "phase",
        data: {
          phase: normalized,
          index: phaseIndex,
          intensity: machine.progress == null ? phaseIntensity : machine.progress,
          status: machine.status,
        },
      });
    },
    setProgress(value?: number) {
      if (!sessionActive) return;
      machine.setProgress(value);
      if (value === undefined || Number.isNaN(value)) {
        progressFill.classList.add("indeterminate");
      } else {
        progressFill.classList.remove("indeterminate");
        progressFill.style.width = `${(clamp01(value) * 100).toFixed(1)}%`;
      }
    },
    signal(signal: ExecutionSignal) {
      if (!sessionActive) return false;
      const normalized = normalizeExecutionSignal(signal);
      if (!normalized) {
        executionTrail.push({
          type: "signal-rejected",
          atMs: trailAtMs(),
          phase: latestPhase ?? undefined,
          reason: "INSUFFICIENT_EVIDENCE",
        });
        emit({
          type: "signal-rejected",
          data: {
            outcome: "UNKNOWN",
            reason: "INSUFFICIENT_EVIDENCE",
            phase: latestPhase,
            status: machine.status,
          },
        });
        return false;
      }

      executionTrail.push({
        type: "signal",
        atMs: trailAtMs(),
        phase: latestPhase ?? undefined,
        signal: normalized,
      });

      if (currentGame?.signal) currentGame.signal(normalized);
      else {
        pendingSignals.push(normalized);
        if (pendingSignals.length > 8) pendingSignals.shift();
      }

      emit({
        type: "signal",
        data: {
          ...normalized,
          phase: latestPhase,
          status: machine.status,
        },
      });
      return true;
    },
    observe(observation: HostObservation) {
      if (!sessionActive) return false;
      let observed = false;
      let accepted = true;
      const phase = typeof observation?.phase === "string" ? observation.phase.trim() : "";
      if (phase) {
        observed = true;
        session.setPhase(phase);
      }
      if (observation?.signal) {
        observed = true;
        accepted = session.signal(observation.signal) && accepted;
      }
      return observed && accepted;
    },
    async intervene(intent: InterventionIntent): Promise<InterventionResult> {
      const id = globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
      if (!sessionActive) return { id, accepted: false, reason: "SESSION_NOT_ACTIVE" };
      const hostIntent: HostIntervention = {
        kind: intent.kind,
        label: typeof intent.label === "string" ? intent.label.slice(0, 96) : undefined,
        payload: intent.payload,
        id,
        atMs: trailAtMs(),
      };
      executionTrail.push({
        type: "intervention",
        atMs: hostIntent.atMs,
        intervention: {
          id: hostIntent.id,
          kind: hostIntent.kind,
          label: hostIntent.label,
          atMs: hostIntent.atMs,
        },
      });
      emit({ type: "intervention", data: hostIntent });
      let result: InterventionResult;
      if (!opts.onIntervention) {
        result = { id, accepted: false, reason: "NO_HOST_HANDLER" };
      } else {
        try {
          const hostResult = await opts.onIntervention(hostIntent);
          result = {
            id,
            accepted: Boolean(hostResult?.accepted),
            reason:
              typeof hostResult?.reason === "string" ? hostResult.reason.slice(0, 160) : undefined,
            evidenceRef:
              typeof hostResult?.evidenceRef === "string" && hostResult.evidenceRef.trim()
                ? hostResult.evidenceRef.trim().slice(0, 160)
                : undefined,
          };
        } catch {
          result = { id, accepted: false, reason: "HOST_HANDLER_FAILED" };
        }
      }
      executionTrail.push({
        type: "intervention-result",
        atMs: trailAtMs(),
        interventionResult: result,
      });
      emit({ type: "intervention-result", data: result });
      return result;
    },
    complete() {
      completeSession();
    },
    cancel() {
      cancelSession();
    },
    fail(error?: unknown) {
      failSession(error);
    },
  };

  const controller: QuickSpinController = {
    start(options) {
      if (sessionActive) cancelSession();
      return startSession(options);
    },
    async track<T>(
      request: Promise<T>,
      options?: { gameId?: string; status?: string }
    ): Promise<T> {
      if (sessionActive) cancelSession();
      const s = startSession(options);
      try {
        const val = await request;
        s.complete();
        return val;
      } catch (err) {
        s.fail(err instanceof Error ? err : new Error(String(err)));
        throw err;
      }
    },
    setTheme(t) {
      applyTheme(t);
    },
    show() {
      show();
    },
    hide() {
      hide();
    },
    destroy() {
      if (destroyed) return;
      clearRevealTimer();
      destroyed = true;
      sessionActive = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      destroyGame();
      machine.transition("destroyed");
      hostEl.remove();
      if (target.hasAttribute("data-quickspin-active"))
        target.removeAttribute("data-quickspin-active");
    },
    on(handler) {
      externalHandler = handler;
      return () => {
        if (externalHandler === handler) externalHandler = null;
      };
    },
    getLastCapsule() {
      return lastCapsule ? (JSON.parse(JSON.stringify(lastCapsule)) as WaitCapsule) : null;
    },
    exportLastCapsule() {
      return lastCapsule ? JSON.stringify(lastCapsule, null, 2) : null;
    },
    get status() {
      return machine.status;
    },
  };

  return controller;
}
