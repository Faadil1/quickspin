import { createQuickSpin, bestLabel, currentDayStreak, perceivedWaitStats, resetAll, totalSessions, totalWaitTurnedToPlayMs } from "../sdk/index";
import type { ExecutionSignal, QuickSpinController, WaitEventHandler } from "../sdk/types";
import { mountPage, statusMark } from "./shell";

const sleep = (ms: number): Promise<void> => new Promise((resolve) => window.setTimeout(resolve, ms));

interface DemoPhase {
  status: string;
  progress: number;
  ms: number;
  signal: ExecutionSignal;
}

const PHASES: DemoPhase[] = [
  { status: "Reasoning…", progress: 0.12, ms: 2600, signal: { kind: "tool", label: "Planned constraints", evidenceRef: "demo:phase:reasoning" } },
  { status: "Searching the web…", progress: 0.32, ms: 3100, signal: { kind: "retrieval", label: "Retrieved Austin dinner options", evidenceRef: "demo:phase:retrieval" } },
  { status: "Drafting…", progress: 0.62, ms: 3400, signal: { kind: "artifact", label: "Ranked five candidate spots", evidenceRef: "demo:phase:draft" } },
  { status: "Polishing…", progress: 0.88, ms: 2900, signal: { kind: "artifact", label: "Final answer assembled", evidenceRef: "demo:phase:final" } },
];

const body = `
  <section class="page-hero section-frame lab-hero">
    <div>
      <div class="kicker">LIVE WAIT LAB / CONTROLLED 12-SECOND TEST</div>
      <h1>Same wait.<br/><em>Different experience.</em></h1>
      <p>Compare a passive spinner with an execution-aware playable waiting layer. The positive path is deterministic; the negative path uses a real rejected Promise.</p>
    </div>
    <div class="lab-hero-status">
      ${statusMark("RUNTIME LIVE")}
      <div class="lab-clock"><span>CONTROL</span><strong>12.000</strong><small>SECONDS</small></div>
    </div>
  </section>

  <section class="lab-console section-frame">
    <div class="console-rail">
      <div class="rail-label">MODE SELECT</div>
      <div class="segmented" role="group" aria-label="Demo mode">
        <button type="button" data-mode="classic" aria-pressed="false">Classic wait</button>
        <button type="button" data-mode="quickspin" aria-pressed="true">QuickSpin</button>
      </div>
      <div class="console-actions">
        <button id="run-demo" class="button button-primary" type="button">Run 12s generation <span>↗</span></button>
        <button id="run-failure" class="button button-danger" type="button">Run negative-path proof</button>
        <button id="reset-stats" class="button button-quiet" type="button">Reset local evidence</button>
      </div>
      <div class="rail-note">The classic percentage belongs only to this controlled test. QuickSpin uses indeterminate progress unless the host actually knows progress.</div>
    </div>

    <div class="console-main">
      <div id="classic-panel" class="runtime-panel">
        <div class="runtime-topline"><span>CONTROL / PASSIVE</span><b>12S</b></div>
        <div id="classic-phase" class="phase-readout">Waiting for run.</div>
        <div class="chat-surface">
          <div class="chat"></div>
          <div class="classic-thinking">
            <div class="spinner-orbit"></div>
            <div class="classic-copy"><span class="spinner-label">Reasoning…</span><div class="progress-track"><i class="fill"></i></div><small class="progress-label">0%</small></div>
          </div>
        </div>
      </div>

      <div id="qs-panel" class="runtime-panel">
        <div class="runtime-topline"><span>QUICKSPIN / EXECUTION-AWARE</span><b>LIVE</b></div>
        <div id="qs-phase" class="phase-readout">Phase: <strong>ready</strong></div>
        <div class="chat-surface">
          <div class="chat"></div>
          <div id="qs-mount" class="qs-mount"></div>
        </div>
      </div>
    </div>
  </section>

  <section class="section-frame lab-evidence-grid">
    <div class="event-terminal">
      <div class="terminal-head"><span>EXECUTION / EVENT FEED</span><b>HOST-OBSERVED</b></div>
      <div id="event-log" class="event-log" aria-live="polite"></div>
    </div>
    <div class="lab-stats">
      <div class="stat-cell" id="stat-sessions"><span>SESSIONS</span><strong class="num">0</strong></div>
      <div class="stat-cell" id="stat-wait"><span>PLAYED WAIT</span><strong class="num">0s</strong></div>
      <div class="stat-cell" id="stat-best"><span>RUNNER BEST</span><strong class="num">—</strong></div>
      <div class="stat-cell" id="stat-felt"><span>AVG FELT</span><strong class="num">—</strong></div>
      <div class="stat-cell" id="stat-streak"><span>DAY STREAK</span><strong class="num">0</strong></div>
    </div>
  </section>

  <section class="section-frame negative-explainer">
    <div class="failure-panel">
      <span class="eyebrow">REAL FAILURE &gt; FAKE SUCCESS</span>
      <h2>When the provider rejects, QuickSpin refuses to invent an answer.</h2>
      <p>The negative-path button runs an actual Promise rejection after 1.4 seconds. The session terminates as <code>failed</code>, emits structured failure evidence, and leaves the response empty.</p>
    </div>
    <div class="unknown-panel">
      <span class="eyebrow">UNKNOWN / ABSTENTION</span>
      <h3>No provenance, no gameplay claim.</h3>
      <p>Execution signals without a valid evidence reference are rejected as <code>UNKNOWN / INSUFFICIENT_EVIDENCE</code>.</p>
      ${statusMark("UNKNOWN IS VALID", "unknown")}
    </div>
  </section>
`;

const app = mountPage("lab", body);
const mount = app.querySelector<HTMLElement>("#qs-mount")!;
const logEl = app.querySelector<HTMLElement>("#event-log")!;
const classicPanel = app.querySelector<HTMLElement>("#classic-panel")!;
const qsPanel = app.querySelector<HTMLElement>("#qs-panel")!;
const phaseEl = app.querySelector<HTMLElement>("#qs-phase")!;
const classicPhase = app.querySelector<HTMLElement>("#classic-phase")!;
const runBtn = app.querySelector<HTMLButtonElement>("#run-demo")!;
const failureBtn = app.querySelector<HTMLButtonElement>("#run-failure")!;
const resetBtn = app.querySelector<HTMLButtonElement>("#reset-stats")!;
const segBtns = Array.from(app.querySelectorAll<HTMLButtonElement>(".segmented button"));

const logEvents: WaitEventHandler = (event) => {
  const line = document.createElement("div");
  line.className = `event-line event-${event.type}`;
  line.textContent = `[${new Date().toLocaleTimeString()}] ${event.type}${event.data ? ` ${JSON.stringify(event.data)}` : ""}`;
  logEl.appendChild(line);
  logEl.scrollTop = logEl.scrollHeight;
};

let controller: QuickSpinController = createQuickSpin({ target: mount, delayMs: 0, onEvent: logEvents });
let mode: "classic" | "quickspin" = "quickspin";
let running = false;

function setMode(next: "classic" | "quickspin"): void {
  mode = next;
  for (const button of segBtns) button.setAttribute("aria-pressed", button.dataset.mode === next ? "true" : "false");
  classicPanel.hidden = next !== "classic";
  qsPanel.hidden = next !== "quickspin";
}

function appendBubble(text: string, who: "user" | "ai"): void {
  const panel = mode === "classic" ? classicPanel : qsPanel;
  const chat = panel.querySelector<HTMLElement>(".chat")!;
  const bubble = document.createElement("div");
  bubble.className = `lab-bubble bubble-${who}`;
  bubble.textContent = text;
  chat.appendChild(bubble);
  bubble.scrollIntoView({ block: "nearest", behavior: "smooth" });
}

async function runClassic(): Promise<void> {
  const thinking = classicPanel.querySelector<HTMLElement>(".classic-thinking")!;
  const fill = classicPanel.querySelector<HTMLElement>(".fill")!;
  const label = classicPanel.querySelector<HTMLElement>(".progress-label")!;
  const spinnerLabel = classicPanel.querySelector<HTMLElement>(".spinner-label")!;
  thinking.hidden = false;
  for (const phase of PHASES) {
    spinnerLabel.textContent = phase.status;
    fill.style.width = `${Math.round(phase.progress * 100)}%`;
    label.textContent = `${Math.round(phase.progress * 100)}%`;
    classicPhase.innerHTML = `Controlled phase: <strong>${phase.status}</strong>`;
    await sleep(phase.ms);
  }
  fill.style.width = "100%";
  label.textContent = "100%";
  thinking.hidden = true;
  classicPhase.innerHTML = "Controlled phase: <strong>Done</strong>";
  appendBubble("Here are five spots — assuming everyone still likes tacos.", "ai");
}

async function runQuickSpin(): Promise<void> {
  const session = controller.start({ status: PHASES[0].status });
  session.setProgress();
  for (const phase of PHASES) {
    session.setPhase(phase.status);
    session.signal(phase.signal);
    phaseEl.innerHTML = `Phase: <strong>${phase.status}</strong> · signal: <strong>${phase.signal.kind}</strong> — ${phase.signal.label}`;
    await sleep(phase.ms);
  }
  session.complete();
  phaseEl.innerHTML = "Phase: <strong>Done</strong> — response ready; inspect the Wait Receipt.";
  appendBubble("Here are five spots — assuming everyone still likes tacos.", "ai");
  refreshStats();
}

async function runDemo(): Promise<void> {
  if (running) return;
  running = true;
  runBtn.disabled = true;
  failureBtn.disabled = true;
  runBtn.textContent = "Generating…";
  appendBubble("Where should five friends eat tonight in Austin?", "user");
  if (mode === "classic") await runClassic();
  else await runQuickSpin();
  running = false;
  runBtn.disabled = false;
  failureBtn.disabled = false;
  runBtn.innerHTML = "Run 12s generation <span>↗</span>";
}

async function runFailureProof(): Promise<void> {
  if (running) return;
  running = true;
  setMode("quickspin");
  runBtn.disabled = true;
  failureBtn.disabled = true;
  failureBtn.textContent = "Running real failure…";
  appendBubble("Find dinner options, but preserve failure truth if the provider rejects.", "user");

  const session = controller.start({ status: "Calling restaurant search provider…" });
  session.setProgress();
  session.setPhase("Calling restaurant search provider…");
  phaseEl.innerHTML = "Negative path: <strong>provider call in flight</strong> — no success assumed.";

  try {
    await new Promise<never>((_, reject) => window.setTimeout(() => reject(new Error("DEMO_PROVIDER_TIMEOUT")), 1400));
  } catch (error) {
    const failure = error instanceof Error ? error : new Error(String(error));
    session.signal({ kind: "warning", label: "Provider request rejected", evidenceRef: "demo:negative-path:promise-rejection" });
    session.fail(failure);
    phaseEl.innerHTML = `Negative path: <strong>FAILED</strong> — ${failure.message}. No AI answer was fabricated.`;
    refreshStats();
  }

  running = false;
  runBtn.disabled = false;
  failureBtn.disabled = false;
  failureBtn.textContent = "Run negative-path proof";
}

function refreshStats(): void {
  const set = (id: string, value: string): void => {
    const target = app.querySelector<HTMLElement>(`#${id} .num`);
    if (target) target.textContent = value;
  };
  set("stat-sessions", String(totalSessions()));
  set("stat-wait", `${Math.round(totalWaitTurnedToPlayMs() / 1000)}s`);
  set("stat-best", bestLabel("runner") ?? "—");
  const perceived = perceivedWaitStats();
  set("stat-felt", perceived.samples > 0 ? `${Math.round(perceived.avgRatio * 100)}%` : "—");
  set("stat-streak", String(currentDayStreak()));
}

for (const button of segBtns) {
  button.addEventListener("click", () => {
    if (!running) setMode(button.dataset.mode === "classic" ? "classic" : "quickspin");
  });
}
runBtn.addEventListener("click", () => void runDemo());
failureBtn.addEventListener("click", () => void runFailureProof());
resetBtn.addEventListener("click", () => {
  controller.destroy();
  mount.innerHTML = "";
  resetAll();
  logEl.innerHTML = "";
  controller = createQuickSpin({ target: mount, delayMs: 0, onEvent: logEvents });
  refreshStats();
});

setMode("quickspin");
refreshStats();
