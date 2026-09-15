import { readFileSync, writeFileSync } from "node:fs";

function replaceExact(text, from, to, label) {
  if (!text.includes(from)) throw new Error(`missing patch anchor: ${label}`);
  return text.replace(from, to);
}

function patch(path, transform) {
  const before = readFileSync(path, "utf8");
  const after = transform(before);
  if (after !== before) writeFileSync(path, after);
}

const nl = (...parts) => parts.join("\n");

patch("src/sdk/widget.ts", (input) => {
  if (input.includes("label: hostIntent.label,\n          atMs: hostIntent.atMs")) return input;
  return replaceExact(
    input,
    "        intervention: hostIntent,",
    nl(
      "        intervention: {",
      "          id: hostIntent.id,",
      "          kind: hostIntent.kind,",
      "          label: hostIntent.label,",
      "          atMs: hostIntent.atMs,",
      "        },"
    ),
    "redacted persisted intervention"
  );
});

patch("src/demo/main.ts", (input) => {
  if (input.includes('id="copy-ghost"')) return input;
  let text = input;

  text = replaceExact(
    text,
    'import { createQuickSpin } from "../sdk/index";',
    nl(
      'import {',
      '  compareWaitExperiences,',
      '  createQuickSpin,',
      '  createWaitGhost,',
      '  createWaitGhostReplay,',
      '  decodeWaitGhost,',
      '  encodeWaitGhost,',
      '} from "../sdk/index";'
    ),
    "demo V3 runtime imports"
  );
  text = replaceExact(
    text,
    'import type { ExecutionSignal, QuickSpinController, WaitEventHandler } from "../sdk/types";',
    nl(
      'import type {',
      '  ExecutionSignal,',
      '  QuickSpinController,',
      '  WaitEventHandler,',
      '  WaitGhost,',
      '  WaitGhostEvent,',
      '} from "../sdk/types";'
    ),
    "demo V3 type imports"
  );

  text = replaceExact(
    text,
    '          <button id="copy-capsule">Copy Evidence Capsule</button>\n          <button id="reset-stats">Reset local evidence</button>',
    nl(
      '          <button id="copy-capsule">Copy Evidence Capsule</button>',
      '          <button id="copy-ghost">Copy redacted Wait Ghost link</button>',
      '          <button id="replay-ghost">Replay Wait Ghost</button>',
      '          <button id="reset-stats">Reset local evidence</button>'
    ),
    "lab ghost buttons"
  );
  text = replaceExact(
    text,
    '        </div>\n      </div>\n      <aside class="evidence-panel" style="padding:0;overflow:hidden">',
    nl(
      '        </div>',
      '        <div id="ghost-status" class="qs-phase">Wait Ghost: none loaded. Shared ghosts are redacted replay artifacts — never live AI.</div>',
      '      </div>',
      '      <aside class="evidence-panel" style="padding:0;overflow:hidden">'
    ),
    "lab ghost status"
  );

  text = replaceExact(
    text,
    '      <div class="receipt-row"><span>EVIDENCE CAPSULE</span><strong>PORTABLE JSON</strong></div>',
    nl(
      '      <div class="receipt-row"><span>EVIDENCE CAPSULE</span><strong>PRIVATE / PORTABLE JSON</strong></div>',
      '      <div class="receipt-row"><span>WAIT GHOST</span><strong>REDACTED / REPLAYABLE / SHAREABLE</strong></div>'
    ),
    "proof ghost receipt"
  );

  text = text.replace(
    "QuickSpin turns real host-observed AI execution into optional gameplay, then produces a truthful Wait Receipt for what actually happened — including failure and UNKNOWN.",
    "QuickSpin turns real host-observed AI execution into optional gameplay, preserves a private Evidence Capsule, and can derive a redacted Wait Ghost you can replay or share without exposing provenance labels or payloads."
  );
  text = text.replace(
    "Actual wait, played time, engagement and felt wait stay signed — shorter, equal or longer.",
    "Actual wait, played time, engagement and felt wait stay directional — and a redacted Wait Ghost can replay the run without pretending it is live AI."
  );
  text = text.replace(
    "Vanilla SDK, React wrapper, ESM, CJS and IIFE outputs share the same host contract. The waiting layer can travel across product surfaces.",
    "Vanilla SDK, React wrapper, ESM, CJS and IIFE outputs share the same host contract. Evidence Capsules can derive privacy-safe Wait Ghosts for replay, sharing and wait-to-wait regression diffs."
  );
  text = text.replace(
    "Observed execution becomes gameplay; the outcome gets a signed Wait Receipt.",
    "Observed execution becomes gameplay; private evidence becomes a Capsule; a redacted derivative becomes a shareable Wait Ghost."
  );
  text = text.replace(
    '    ["DEMO", "12-second control, QuickSpin path, receipt, failure and UNKNOWN.", "READY"],',
    '    ["DEMO", "12-second control, Capsule, redacted Ghost replay, wait diff, failure and UNKNOWN.", "READY"],'
  );
  text = text.replace(
    "It is the reusable waiting layer that makes real execution playable, preserves failure truth, refuses unsupported signals, and measures what the user experienced. That is the product — the minigames are interchangeable implementations of the contract.",
    "It is the reusable waiting layer that makes real execution playable, preserves failure truth, refuses unsupported signals, records a private Evidence Capsule, and derives a privacy-safe Wait Ghost for replay/share/compare. That evidence lifecycle is the product — the minigames are interchangeable implementations of the contract."
  );

  text = replaceExact(
    text,
    '  const copyCapsuleBtn = app.querySelector<HTMLButtonElement>("#copy-capsule")!;\n  const resetBtn = app.querySelector<HTMLButtonElement>("#reset-stats")!;',
    nl(
      '  const copyCapsuleBtn = app.querySelector<HTMLButtonElement>("#copy-capsule")!;',
      '  const copyGhostBtn = app.querySelector<HTMLButtonElement>("#copy-ghost")!;',
      '  const replayGhostBtn = app.querySelector<HTMLButtonElement>("#replay-ghost")!;',
      '  const ghostStatus = app.querySelector<HTMLElement>("#ghost-status")!;',
      '  const resetBtn = app.querySelector<HTMLButtonElement>("#reset-stats")!;'
    ),
    "lab ghost selectors"
  );

  text = replaceExact(
    text,
    '  let ctrl: QuickSpinController = createQuickSpin(controllerOptions);\n  let mode: "classic" | "quickspin" = "quickspin";',
    nl(
      '  let ctrl: QuickSpinController = createQuickSpin(controllerOptions);',
      '  const initialHash = new URLSearchParams(window.location.hash.replace(/^#/, ""));',
      '  let sharedGhost: WaitGhost | null = decodeWaitGhost(initialHash.get("ghost") ?? "");',
      '  let mode: "classic" | "quickspin" = "quickspin";'
    ),
    "lab ghost state"
  );

  text = replaceExact(
    text,
    "  const runClassic = async (): Promise<void> => {",
    nl(
      '  const ghostEventLabel = (event: WaitGhostEvent): string => {',
      '    if (event.type === "signal") return `signal · ${event.signalKind ?? "unknown-kind"}`;',
      '    if (event.type === "signal-rejected") return "UNKNOWN · signal rejected";',
      '    if (event.type === "intervention") return `intervention · ${event.interventionKind ?? "custom"}`;',
      '    if (event.type === "intervention-result")',
      '      return `intervention result · ${event.accepted ? "accepted" : "rejected"}`;',
      '    return event.type;',
      '  };',
      '',
      '  const currentGhost = (): WaitGhost | null => {',
      '    const capsule = ctrl.getLastCapsule();',
      '    return capsule ? createWaitGhost(capsule) : null;',
      '  };',
      '',
      '  const showGhostComparison = (): void => {',
      '    const capsule = ctrl.getLastCapsule();',
      '    if (!sharedGhost || !capsule) return;',
      '    const diff = compareWaitExperiences(sharedGhost, capsule);',
      '    const actual = `${diff.actualWaitDeltaMs >= 0 ? "+" : "−"}${formatMs(Math.abs(diff.actualWaitDeltaMs))}`;',
      '    const engaged = `${diff.engagedPlayDeltaMs >= 0 ? "+" : "−"}${formatMs(Math.abs(diff.engagedPlayDeltaMs))}`;',
      '    ghostStatus.textContent = `Wait diff · current − shared ghost: actual ${actual}; engaged ${engaged}; outcome ${diff.fromOutcome} → ${diff.toOutcome}. No winner score.`;',
      '  };',
      '',
      '  const replayGhost = async (ghost: WaitGhost): Promise<void> => {',
      '    if (running) return;',
      '    running = true;',
      '    replayGhostBtn.disabled = true;',
      '    replayGhostBtn.textContent = "Replaying redacted timeline…";',
      '    ghostStatus.textContent = "WAIT GHOST REPLAY · redacted historical artifact · not live AI.";',
      '    for (const step of createWaitGhostReplay(ghost, 6)) {',
      '      await sleep(Math.min(step.delayMs, 1200));',
      '      const line = document.createElement("div");',
      '      line.textContent = `[WAIT GHOST +${Math.round(step.event.atMs)}ms] ${ghostEventLabel(step.event)}`;',
      '      logEl.appendChild(line);',
      '      logEl.scrollTop = logEl.scrollHeight;',
      '    }',
      '    ghostStatus.textContent = `Wait Ghost replay complete · ${ghost.timeline.length} redacted event(s) · source outcome ${ghost.outcome}. Replay did not emit host execution signals.`;',
      '    running = false;',
      '    replayGhostBtn.disabled = false;',
      '    replayGhostBtn.textContent = "Replay Wait Ghost";',
      '    showGhostComparison();',
      '  };',
      '',
      '  const runClassic = async (): Promise<void> => {'
    ),
    "lab ghost helpers"
  );

  text = replaceExact(
    text,
    '    appendBubble("Here are five spots — assuming everyone still likes tacos.", "ai");\n    refreshStats();\n  };',
    nl(
      '    appendBubble("Here are five spots — assuming everyone still likes tacos.", "ai");',
      '    refreshStats();',
      '    showGhostComparison();',
      '  };'
    ),
    "compare after QuickSpin"
  );

  text = replaceExact(
    text,
    '  failureBtn.addEventListener("click", () => void runFailure());\n  copyCapsuleBtn.addEventListener("click", () => {',
    nl(
      '  failureBtn.addEventListener("click", () => void runFailure());',
      '  copyCapsuleBtn.addEventListener("click", () => {'
    ),
    "preserve existing handlers"
  );

  text = replaceExact(
    text,
    '    copyCapsuleBtn.textContent = "Evidence Capsule copied";\n  });\n  resetBtn.addEventListener("click", () => {',
    nl(
      '    copyCapsuleBtn.textContent = "Evidence Capsule copied";',
      '  });',
      '  copyGhostBtn.addEventListener("click", () => {',
      '    const ghost = currentGhost();',
      '    if (!ghost) {',
      '      copyGhostBtn.textContent = "Run a QuickSpin path first";',
      '      return;',
      '    }',
      '    sharedGhost = ghost;',
      '    const url = new URL(window.location.href);',
      '    url.hash = `ghost=${encodeWaitGhost(ghost)}`;',
      '    window.history.replaceState(null, "", url);',
      '    void navigator.clipboard?.writeText(url.toString());',
      '    copyGhostBtn.textContent = "Redacted Wait Ghost link copied";',
      '    ghostStatus.textContent = `Wait Ghost ready · ${ghost.timeline.length} redacted event(s). Labels, evidence refs, payloads, record id, timestamp and failure details are excluded.`;',
      '  });',
      '  replayGhostBtn.addEventListener("click", () => {',
      '    const ghost = sharedGhost ?? currentGhost();',
      '    if (!ghost) {',
      '      ghostStatus.textContent = "No Wait Ghost available. Run QuickSpin or open a shared #ghost link first.";',
      '      return;',
      '    }',
      '    void replayGhost(ghost);',
      '  });',
      '  resetBtn.addEventListener("click", () => {'
    ),
    "ghost button handlers"
  );

  text = replaceExact(
    text,
    '    copyCapsuleBtn.textContent = "Copy Evidence Capsule";\n    refreshStats();',
    nl(
      '    copyCapsuleBtn.textContent = "Copy Evidence Capsule";',
      '    copyGhostBtn.textContent = "Copy redacted Wait Ghost link";',
      '    refreshStats();'
    ),
    "reset ghost button label"
  );

  text = replaceExact(
    text,
    '  setMode("quickspin");\n  refreshStats();',
    nl(
      '  setMode("quickspin");',
      '  if (sharedGhost) {',
      '    ghostStatus.textContent = `Shared Wait Ghost loaded · ${sharedGhost.timeline.length} redacted event(s) · outcome ${sharedGhost.outcome}. Replay is historical, not live AI.`;',
      '  }',
      '  refreshStats();'
    ),
    "initialize shared ghost"
  );

  return text;
});

console.log("V3 open-space surgical patches applied.");
