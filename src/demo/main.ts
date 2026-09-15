import "./future-classic.css";
import { createQuickSpin } from "../sdk/index";
import type { ExecutionSignal, QuickSpinController, WaitEventHandler } from "../sdk/types";
import {
  bestLabel,
  currentDayStreak,
  perceivedWaitStats,
  resetAll,
  totalSessions,
  totalWaitTurnedToPlayMs,
} from "../sdk/index";

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => window.setTimeout(resolve, ms));

interface DemoPhase {
  status: string;
  ms: number;
  signal: ExecutionSignal;
}

const PHASES: DemoPhase[] = [
  {
    status: "Reasoning",
    ms: 2600,
    signal: { kind: "tool", label: "Planned constraints", evidenceRef: "demo:phase:reasoning" },
  },
  {
    status: "Searching",
    ms: 3100,
    signal: {
      kind: "retrieval",
      label: "Retrieved Austin dinner options",
      evidenceRef: "demo:phase:retrieval",
    },
  },
  {
    status: "Drafting",
    ms: 3400,
    signal: {
      kind: "artifact",
      label: "Ranked five candidate spots",
      evidenceRef: "demo:phase:draft",
    },
  },
  {
    status: "Polishing",
    ms: 2900,
    signal: {
      kind: "artifact",
      label: "Final answer assembled",
      evidenceRef: "demo:phase:final",
    },
  },
];

const LAB_THEME = {
  mode: "light" as const,
  primary: "#a45f3d",
  surface: "#e5e5de",
  elevated: "#d4d5cf",
  game: "#c7c9c3",
  text: "#222321",
  muted: "#62675f",
  border: "rgba(34, 35, 33, 0.22)",
  success: "#8fae2e",
  radius: "2px",
  font: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
};

const ROUTES = [
  ["/", "Home"],
  ["/lab/", "Lab"],
  ["/proof/", "Proof"],
  ["/sdk/", "SDK"],
  ["/judges/", "Judges"],
] as const;

type Route = "home" | "lab" | "proof" | "sdk" | "judges";

function h(tag: string, cls?: string, html?: string): HTMLElement {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function currentRoute(): Route {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path.endsWith("/lab")) return "lab";
  if (path.endsWith("/proof")) return "proof";
  if (path.endsWith("/sdk")) return "sdk";
  if (path.endsWith("/judges")) return "judges";
  return "home";
}

function pageShell(route: Route, body: HTMLElement): HTMLElement {
  const shell = h("div", "site-shell");
  shell.appendChild(renderNav(route));
  const main = h("main", "site-main");
  main.appendChild(body);
  shell.appendChild(main);
  shell.appendChild(renderFooter());
  return shell;
}

function renderNav(route: Route): HTMLElement {
  const nav = h("nav", "topbar");
  nav.setAttribute("aria-label", "Primary");
  const inner = h("div", "topbar-inner");
  inner.innerHTML = `
    <a class="wordmark" href="/" aria-label="QuickSpin home">
      <span class="mark" aria-hidden="true"><span></span></span>
      <span>QUICKSPIN</span>
      <small>PLAYABLE WAIT RUNTIME</small>
    </a>
    <div class="nav-rail">
      ${ROUTES.map(([href, label]) => {
        const key = href === "/" ? "home" : href.split("/")[1];
        const active = key === route ? ' aria-current="page"' : "";
        return `<a href="${href}"${active}>${label}</a>`;
      }).join("")}
    </div>
    <a class="nav-live" href="/lab/"><span></span> LIVE WAIT LAB</a>
  `;
  nav.appendChild(inner);
  return nav;
}

function renderFooter(): HTMLElement {
  const footer = h("footer", "footer");
  footer.innerHTML = `
    <div><strong>QUICKSPIN / 2026</strong><span>AI waiting, treated as an interaction state.</span></div>
    <div><span>PUBLIC RUNTIME</span><a href="https://quickspin-runtime.vercel.app">quickspin-runtime.vercel.app</a></div>
    <div><span>EVIDENCE RULE</span><strong>REAL FAILURE &gt; FAKE SUCCESS</strong></div>
  `;
  return footer;
}

function eyebrow(index: string, text: string): string {
  return `<div class="eyebrow"><span>${index}</span>${text}</div>`;
}

function renderHome(): HTMLElement {
  const page = h("div", "page home-page");
  const hero = h("section", "home-hero frame");
  hero.innerHTML = `
    <div class="hero-copy">
      ${eyebrow("00", "WAIT STATE / PLAY STATE / EVIDENCE STATE")}
      <h1>Make the wait<br/><em>worth something.</em></h1>
      <p class="hero-lead">QuickSpin turns live AI execution into optional play, then produces a receipt for what actually happened — including failure and uncertainty.</p>
      <div class="hero-actions">
        <a class="action action-primary" href="/lab/">ENTER LIVE WAIT LAB <span>↗</span></a>
        <a class="action" href="/proof/">INSPECT THE PROOF <span>→</span></a>
      </div>
      <div class="hero-facts">
        <div><b>12.00s</b><span>CONTROLLED COMPARISON</span></div>
        <div><b>4</b><span>OBSERVED SIGNAL TYPES</span></div>
        <div><b>±</b><span>SIGNED WAIT RECEIPT</span></div>
      </div>
    </div>
    <div class="time-instrument" aria-label="QuickSpin timing instrument illustration">
      <div class="instrument-meta"><span>QS / LIVE</span><span>00:12.000</span></div>
      <div class="dial-wrap">
        <div class="dial"><span class="dial-hand"></span><span class="dial-core">WAIT<br/><b>PLAYABLE</b></span></div>
        <div class="dial-index">00&nbsp;&nbsp;03&nbsp;&nbsp;06&nbsp;&nbsp;09&nbsp;&nbsp;12</div>
      </div>
      <div class="signal-strip">
        <span>REASONING</span><span>RETRIEVAL</span><span>ARTIFACT</span><span>VERIFIED</span>
      </div>
      <div class="instrument-note">NO FAKE PROGRESS. NO FAKE SUCCESS. SIGNALS REQUIRE PROVENANCE.</div>
    </div>
  `;
  page.appendChild(hero);

  const thesis = h("section", "split-section");
  thesis.innerHTML = `
    <div class="section-index">01 / THESIS</div>
    <div class="statement"><p>Most AI products treat waiting as dead air.</p><h2>QuickSpin treats it as a <em>product state.</em></h2></div>
    <div class="statement-note">Execution phases can drive the experience. Observed events can become game objects. Completion, failure, cancellation and UNKNOWN stay distinct.</div>
  `;
  page.appendChild(thesis);

  const routes = h("section", "route-grid");
  routes.innerHTML = `
    <a class="route-card route-card-lab" href="/lab/"><span>02</span><small>LIVE SURFACE</small><h3>Wait Lab</h3><p>Run the same twelve-second request as a passive wait or a playable one. Trigger the negative path.</p><b>ENTER LAB ↗</b></a>
    <a class="route-card" href="/proof/"><span>03</span><small>EVIDENCE SURFACE</small><h3>Proof Room</h3><p>Wait Receipt, reality anchor, failure truth, UNKNOWN/refusal and evidence boundaries.</p><b>INSPECT PROOF →</b></a>
    <a class="route-card" href="/sdk/"><span>04</span><small>IMPLEMENTATION SURFACE</small><h3>SDK Desk</h3><p>The reusable execution-to-play contract: phases, signals, lifecycle and framework integration.</p><b>OPEN SDK →</b></a>
    <a class="route-card" href="/judges/"><span>05</span><small>JURY SURFACE</small><h3>Judge Brief</h3><p>Rubric mapping, five-part reality pattern, differentiation, demo path and claim boundaries.</p><b>READ BRIEF →</b></a>
  `;
  page.appendChild(routes);

  const close = h("section", "closing-banner");
  close.innerHTML = `<span>SPINNER</span><i>→</i><span>PLAY</span><i>→</i><span>RECEIPT</span><i>→</i><span class="accent">TRUTH</span>`;
  page.appendChild(close);
  return page;
}

function renderLab(): HTMLElement {
  const page = h("div", "page lab-page");
  const intro = h("section", "page-intro frame");
  intro.innerHTML = `
    <div>${eyebrow("01", "LIVE WAIT LAB")}
      <h1>Same wait.<br/><em>Different experience.</em></h1>
      <p>Run a controlled 12-second request. QuickSpin never invents progress; real phase changes and evidence-bearing execution signals drive the playable layer.</p>
    </div>
    <div class="lab-spec"><span>CONTROL</span><b>12.000 SEC</b><span>PLAYABLE</span><b>12.000 SEC</b><span>FAILURE</span><b>PRESERVED</b></div>
  `;
  page.appendChild(intro);

  const lab = h("section", "lab-console");
  lab.innerHTML = `
    <div class="console-header"><span>QS WAIT LAB / RUN 001</span><span class="status-led"><i></i>READY</span></div>
    <div class="lab-toolbar">
      <div class="seg" role="group" aria-label="Demo mode">
        <button data-mode="classic" aria-pressed="false">CLASSIC WAIT</button>
        <button data-mode="quickspin" aria-pressed="true">QUICKSPIN</button>
      </div>
      <div class="lab-actions">
        <button class="lab-btn primary" id="run-demo">RUN 12S GENERATION</button>
        <button class="lab-btn danger" id="run-failure">RUN NEGATIVE PATH</button>
        <button class="lab-btn" id="reset-stats">RESET</button>
      </div>
    </div>
    <div class="lab-stage">
      <div class="stage-main">
        <div id="classic-panel" class="demo-panel">
          <div class="panel-label">CONTROL / PASSIVE WAIT</div>
          <div class="chat"><div class="thinking"><span class="spinner"></span><span class="spinner-label">Reasoning</span><div class="progress-track"><span class="fill"></span></div><span class="progress-label">0%</span></div></div>
          <div id="classic-phase" class="phase-line"></div>
        </div>
        <div id="qs-panel" class="demo-panel">
          <div class="panel-label">QUICKSPIN / PLAYABLE WAIT</div>
          <div class="chat"></div>
          <div id="qs-mount" class="qs-mount"></div>
          <div id="qs-phase" class="phase-line">Phase: <strong>READY</strong></div>
        </div>
      </div>
      <aside class="evidence-feed">
        <div class="feed-title"><span>EVIDENCE FEED</span><small>HOST-OBSERVED ONLY</small></div>
        <div id="event-log" class="event-log"></div>
      </aside>
    </div>
    <div class="stat-rail">
      <div id="stat-sessions"><span>SESSIONS</span><b class="num">0</b></div>
      <div id="stat-wait"><span>PLAY TIME</span><b class="num">0s</b></div>
      <div id="stat-best"><span>BEST RUN</span><b class="num">—</b></div>
      <div id="stat-felt"><span>AVG FELT</span><b class="num">—</b></div>
      <div id="stat-streak"><span>DAY STREAK</span><b class="num">0</b></div>
    </div>
  `;
  page.appendChild(lab);

  const note = h("section", "lab-notes");
  note.innerHTML = `
    <div><span>POSITIVE PATH</span><p>Phase changes and execution signals are supplied by the host, then the response resolves normally.</p></div>
    <div><span>NEGATIVE PATH</span><p>An actual Promise rejects with <code>DEMO_PROVIDER_TIMEOUT</code>. No response is fabricated.</p></div>
    <div><span>UNKNOWN PATH</span><p>Signals without valid provenance are rejected and do not mutate gameplay.</p></div>
  `;
  page.appendChild(note);
  return page;
}

function renderProof(): HTMLElement {
  const page = h("div", "page proof-page");
  const intro = h("section", "page-intro frame");
  intro.innerHTML = `
    <div>${eyebrow("02", "PROOF ROOM")}
      <h1>The product ends<br/>with a <em>receipt.</em></h1>
      <p>QuickSpin does not assume the wait felt better. It measures the outcome, preserves failure, and refuses unsupported execution claims.</p>
    </div>
    <div class="receipt-mini"><span>WAIT RECEIPT / SAMPLE</span><dl><dt>ACTUAL</dt><dd>12.0s</dd><dt>PLAYED</dt><dd>9.4s</dd><dt>ENGAGED</dt><dd>8.8s</dd><dt>FELT</dt><dd>8.0s</dd></dl><strong>−33% FELT WAIT</strong><small>SIGNED RESULT — CAN ALSO BE ZERO OR POSITIVE</small></div>
  `;
  page.appendChild(intro);

  const reality = h("section", "proof-grid");
  reality.innerHTML = `
    <article class="proof-card wide"><span class="proof-no">01</span><small>REALITY ANCHOR</small><h2>Real failure before product mythology.</h2><p>On June 2–3, 2026, OpenAI documented elevated errors and latency across Responses API, Codex and ChatGPT. Some Responses API requests took longer than normal to begin generating; Codex requests were incorrectly rejected with HTTP 429.</p><div class="proof-rule">IMPLICATION → WAITING MUST NOT IMPLY GUARANTEED SUCCESS.</div></article>
    <article class="proof-card fail"><span class="proof-no">02</span><small>NEGATIVE PATH</small><h3>Failure remains failure.</h3><p>The demo runs a real rejected Promise. The session persists <code>outcome: failed</code> and no AI answer is fabricated.</p><b>REAL FAILURE &gt; FAKE SUCCESS</b></article>
    <article class="proof-card unknown"><span class="proof-no">03</span><small>UNKNOWN / ABSTENTION</small><h3>No evidence, no claim.</h3><p>Execution signals require <code>evidenceRef</code>. Missing provenance becomes <code>UNKNOWN / INSUFFICIENT_EVIDENCE</code>.</p><b>NO GAMEPLAY MUTATION</b></article>
    <article class="proof-card"><span class="proof-no">04</span><small>MEASUREMENT</small><h3>Signed perceived wait.</h3><p>The Wait Receipt can report shorter, equal or longer perceived wait. There is no forced positive marketing result.</p><b>± PERCEPTION, NOT PROPAGANDA</b></article>
  `;
  page.appendChild(reality);

  const chain = h("section", "evidence-chain");
  chain.innerHTML = `<span>SIGNAL</span><i>→</i><span>REAL NEGATIVE EVENT</span><i>→</i><span>OBSERVABLE IMPACT</span><i>→</i><span>DESIGN LESSON</span><i>→</i><span>MITIGATION</span>`;
  page.appendChild(chain);
  return page;
}

function renderSdk(): HTMLElement {
  const page = h("div", "page sdk-page");
  const intro = h("section", "page-intro frame");
  intro.innerHTML = `
    <div>${eyebrow("03", "SDK DESK")}
      <h1>One contract.<br/><em>Many waits.</em></h1>
      <p>The product is not one minigame. It is a reusable execution-to-play contract that lets any AI host expose phases, observed signals and terminal outcomes truthfully.</p>
    </div>
    <div class="sdk-badge"><span>VANILLA</span><span>REACT</span><span>ESM</span><span>CJS</span><span>IIFE</span></div>
  `;
  page.appendChild(intro);

  const desk = h("section", "sdk-desk");
  desk.innerHTML = `
    <div class="code-window"><div class="code-title"><span>integration.ts</span><span>TRUTHFUL HOST CONTRACT</span></div><pre><code>const qs = createQuickSpin({ target: "#quickspin" });
const session = qs.start({ status: "Reasoning…" });

session.setProgress(); // indeterminate
session.setPhase("Searching…");
session.signal({
  kind: "retrieval",
  label: "Retrieved 12 sources",
  evidenceRef: "run_123:retrieval_4",
});

try {
  const response = await modelRequest();
  session.complete();
  return response;
} catch (error) {
  session.fail(error);
  throw error;
}</code></pre></div>
    <div class="contract-list">
      <div><span>01</span><h3>START</h3><p>Enter a real waiting state with an optional 650ms anti-flash threshold.</p></div>
      <div><span>02</span><h3>PHASE</h3><p>Host-observed phase changes can change game intensity without fake percentage progress.</p></div>
      <div><span>03</span><h3>SIGNAL</h3><p>Tool, retrieval, artifact and warning events require provenance before they become gameplay.</p></div>
      <div><span>04</span><h3>TERMINATE</h3><p>Complete, fail and cancel are distinct. UNKNOWN remains a valid refusal state.</p></div>
    </div>
  `;
  page.appendChild(desk);
  const layers = h("section", "architecture-strip");
  layers.innerHTML = `<div><span>HOST</span><b>AI APP</b></div><i>→</i><div><span>CONTRACT</span><b>QUICKSPIN SDK</b></div><i>→</i><div><span>EXPERIENCE</span><b>RUNNER / ORBIT</b></div><i>→</i><div><span>EVIDENCE</span><b>WAIT RECEIPT</b></div>`;
  page.appendChild(layers);
  return page;
}

function renderJudges(): HTMLElement {
  const page = h("div", "page judges-page");
  const intro = h("section", "page-intro frame");
  intro.innerHTML = `
    <div>${eyebrow("04", "JUDGE BRIEF")}
      <h1>One story.<br/><em>Every claim mapped.</em></h1>
      <p>QuickSpin is designed for the “Make Waiting for AI Fun” rubric, but the evidence layer prevents the submission from claiming more than the build proves.</p>
    </div>
    <div class="judge-stamp"><span>BUILD</span><b>CANDIDATE<br/>READY</b><small>WITH LIMITATIONS</small></div>
  `;
  page.appendChild(intro);

  const cycle = h("section", "judge-cycle");
  cycle.innerHTML = `<span>RUBRIC</span><i>→</i><span>PAIN</span><i>→</i><span>PROBLEM</span><i>→</i><span>DIFFERENTIATOR</span><i>→</i><span>EXECUTION</span><i>→</i><span>EVIDENCE</span><i>→</i><span>STORY</span><i>→</i><span>DEMO</span><i>→</i><span>Q&A</span>`;
  page.appendChild(cycle);

  const matrix = h("section", "judge-matrix");
  matrix.innerHTML = `
    <div class="matrix-row head"><span>RUBRIC</span><span>QUICKSPIN ANSWER</span><span>VISIBLE PROOF</span></div>
    <div class="matrix-row"><b>Waiting experience</b><span>Optional playable layer + anti-flash + receipt</span><span>/lab/ + /proof/</span></div>
    <div class="matrix-row"><b>Originality</b><span>Execution becomes game content, not decorative copy</span><span>Signal tokens + phase intensity</span></div>
    <div class="matrix-row"><b>AI-native fit</b><span>Host phases and evidence-bearing signals</span><span>SDK contract</span></div>
    <div class="matrix-row"><b>Repeatability</b><span>Reusable runtime, two games, multiple bundles</span><span>/sdk/</span></div>
    <div class="matrix-row"><b>Execution</b><span>33 tests, CI Node 22/24, CodeQL, 0 npm audit</span><span>Repository evidence</span></div>
  `;
  page.appendChild(matrix);

  const boundaries = h("section", "claim-boundaries");
  boundaries.innerHTML = `
    <article><small>WE CLAIM</small><h3>AI waiting can become a truthful interaction state.</h3><p>Phases, observed execution, explicit failure and signed perception are implemented and evidenced.</p></article>
    <article><small>WE REFUSE</small><h3>“QuickSpin makes models faster.”</h3><p>Provider latency is out of scope. The product changes the waiting experience, not the underlying model speed.</p></article>
    <article><small>WE KEEP UNKNOWN</small><h3>Unsupported execution evidence.</h3><p>No evidence reference means no confident gameplay signal. The system abstains.</p></article>
  `;
  page.appendChild(boundaries);
  return page;
}

function logEvents(root: HTMLElement): WaitEventHandler {
  return (event) => {
    const line = h("div", `event-line event-${event.type}`);
    line.textContent = `[${new Date().toLocaleTimeString()}] ${event.type}${event.data ? ` ${JSON.stringify(event.data)}` : ""}`;
    root.appendChild(line);
    root.scrollTop = root.scrollHeight;
  };
}

function controlledProviderFailure(): Promise<never> {
  return new Promise((_, reject) =>
    window.setTimeout(() => reject(new Error("DEMO_PROVIDER_TIMEOUT")), 1400)
  );
}

function initLab(app: HTMLElement): void {
  const mount = app.querySelector<HTMLElement>("#qs-mount");
  const logEl = app.querySelector<HTMLElement>("#event-log");
  const classicPanel = app.querySelector<HTMLElement>("#classic-panel");
  const qsPanel = app.querySelector<HTMLElement>("#qs-panel");
  const runBtn = app.querySelector<HTMLButtonElement>("#run-demo");
  const failureBtn = app.querySelector<HTMLButtonElement>("#run-failure");
  const resetBtn = app.querySelector<HTMLButtonElement>("#reset-stats");
  const phaseEl = app.querySelector<HTMLElement>("#qs-phase");
  const segBtns = Array.from(app.querySelectorAll<HTMLButtonElement>(".seg button"));
  if (
    !mount ||
    !logEl ||
    !classicPanel ||
    !qsPanel ||
    !runBtn ||
    !failureBtn ||
    !resetBtn ||
    !phaseEl
  )
    return;

  let controller: QuickSpinController = createQuickSpin({
    target: mount,
    delayMs: 0,
    theme: LAB_THEME,
    onEvent: logEvents(logEl),
  });
  let mode: "classic" | "quickspin" = "quickspin";
  let running = false;

  const appendBubble = (label: string, role: "user" | "ai") => {
    const panel = mode === "classic" ? classicPanel : qsPanel;
    const chat = panel.querySelector<HTMLElement>(".chat");
    if (!chat) return;
    const bubble = h("div", `bubble ${role}`, label);
    chat.appendChild(bubble);
  };

  const setMode = (next: "classic" | "quickspin") => {
    mode = next;
    classicPanel.hidden = next !== "classic";
    qsPanel.hidden = next !== "quickspin";
    for (const button of segBtns)
      button.setAttribute("aria-pressed", String(button.dataset.mode === next));
  };

  const refreshStats = () => {
    const set = (id: string, value: string) => {
      const node = app.querySelector<HTMLElement>(`#${id} .num`);
      if (node) node.textContent = value;
    };
    set("stat-sessions", String(totalSessions()));
    set("stat-wait", `${Math.round(totalWaitTurnedToPlayMs() / 1000)}s`);
    set("stat-best", bestLabel("runner") ?? "—");
    const perceived = perceivedWaitStats();
    set("stat-felt", perceived.samples ? `${Math.round(perceived.avgRatio * 100)}%` : "—");
    set("stat-streak", String(currentDayStreak()));
  };

  const runClassic = async () => {
    const thinking = classicPanel.querySelector<HTMLElement>(".thinking");
    const fill = classicPanel.querySelector<HTMLElement>(".fill");
    const label = classicPanel.querySelector<HTMLElement>(".progress-label");
    const phase = classicPanel.querySelector<HTMLElement>(".spinner-label");
    if (!thinking || !fill || !label || !phase) return;
    thinking.hidden = false;
    let elapsed = 0;
    for (const item of PHASES) {
      phase.textContent = item.status;
      elapsed += item.ms;
      fill.style.width = `${Math.round((elapsed / 12000) * 100)}%`;
      label.textContent = `${Math.round((elapsed / 12000) * 100)}%`;
      await sleep(item.ms);
    }
    thinking.hidden = true;
    appendBubble("Here are five spots — assuming everyone still likes tacos.", "ai");
  };

  const runQuickSpin = async () => {
    const session = controller.start({ status: PHASES[0].status });
    session.setProgress();
    for (const item of PHASES) {
      session.setPhase(item.status);
      session.signal(item.signal);
      phaseEl.innerHTML = `Phase: <strong>${item.status.toUpperCase()}</strong> · ${item.signal.kind.toUpperCase()} / ${item.signal.label}`;
      await sleep(item.ms);
    }
    session.complete();
    phaseEl.innerHTML = `Phase: <strong>COMPLETE</strong> · inspect the Wait Receipt.`;
    appendBubble("Here are five spots — assuming everyone still likes tacos.", "ai");
    refreshStats();
  };

  const runDemo = async () => {
    if (running) return;
    running = true;
    runBtn.disabled = true;
    failureBtn.disabled = true;
    appendBubble("Where should five friends eat tonight in Austin?", "user");
    if (mode === "classic") await runClassic();
    else await runQuickSpin();
    running = false;
    runBtn.disabled = false;
    failureBtn.disabled = false;
  };

  const runFailure = async () => {
    if (running) return;
    running = true;
    setMode("quickspin");
    runBtn.disabled = true;
    failureBtn.disabled = true;
    appendBubble(
      "Find dinner options, but preserve failure truth if the provider rejects.",
      "user"
    );
    const session = controller.start({ status: "Calling provider" });
    session.setProgress();
    session.setPhase("Calling provider");
    phaseEl.innerHTML = `Negative path: <strong>PROVIDER CALL IN FLIGHT</strong> · success not assumed.`;
    try {
      await controlledProviderFailure();
    } catch (error) {
      const failure = error instanceof Error ? error : new Error(String(error));
      session.signal({
        kind: "warning",
        label: "Provider request rejected",
        evidenceRef: "demo:negative-path:promise-rejection",
      });
      session.fail(failure);
      phaseEl.innerHTML = `Negative path: <strong>FAILED / ${failure.message}</strong> · no AI answer fabricated.`;
      refreshStats();
    }
    running = false;
    runBtn.disabled = false;
    failureBtn.disabled = false;
  };

  runBtn.addEventListener("click", () => void runDemo());
  failureBtn.addEventListener("click", () => void runFailure());
  resetBtn.addEventListener("click", () => {
    controller.destroy();
    mount.innerHTML = "";
    logEl.innerHTML = "";
    resetAll();
    controller = createQuickSpin({
      target: mount,
      delayMs: 0,
      theme: LAB_THEME,
      onEvent: logEvents(logEl),
    });
    refreshStats();
  });
  for (const button of segBtns) {
    button.addEventListener("click", () => {
      if (!running) setMode(button.dataset.mode === "classic" ? "classic" : "quickspin");
    });
  }
  setMode("quickspin");
  refreshStats();
}

function main(): void {
  const app = document.getElementById("app");
  if (!app) return;
  const route = currentRoute();
  document.documentElement.dataset.page = route;
  const page =
    route === "lab"
      ? renderLab()
      : route === "proof"
        ? renderProof()
        : route === "sdk"
          ? renderSdk()
          : route === "judges"
            ? renderJudges()
            : renderHome();
  app.appendChild(pageShell(route, page));
  if (route === "lab") initLab(app);
}

main();
