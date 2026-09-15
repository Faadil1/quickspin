import "./demo.css";
import { createQuickSpin } from "../sdk/index";
import type {
  ExecutionSignal,
  PlanOption,
  QuickSpinController,
  WaitEventHandler,
} from "../sdk/types";
import { PLANS, createCheckoutFlow } from "../sdk/paywall";
import { mountHeroDemo } from "./hero";
import {
  bestLabel,
  currentDayStreak,
  perceivedWaitStats,
  resetAll,
  totalSessions,
  totalWaitTurnedToPlayMs,
} from "../sdk/index";

const STRIPE_LINKS: Record<string, string> = {};
const proLink = import.meta.env.VITE_STRIPE_PRO_LINK as string | undefined;
if (proLink) STRIPE_LINKS.pro = proLink;
const LIVE_PAYMENTS = Boolean(STRIPE_LINKS.pro);

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

function controlledProviderFailure(): Promise<never> {
  return new Promise((_, reject) => {
    window.setTimeout(() => reject(new Error("DEMO_PROVIDER_TIMEOUT")), 1400);
  });
}

/** Exactly 12 seconds: the before/after demo claim now matches runtime reality. */
interface DemoPhase {
  status: string;
  progress: number;
  ms: number;
  signal: ExecutionSignal;
}

const PHASES: DemoPhase[] = [
  {
    status: "Reasoning…",
    progress: 0.12,
    ms: 2600,
    signal: { kind: "tool", label: "Planned constraints", evidenceRef: "demo:phase:reasoning" },
  },
  {
    status: "Searching the web…",
    progress: 0.32,
    ms: 3100,
    signal: {
      kind: "retrieval",
      label: "Retrieved Austin dinner options",
      evidenceRef: "demo:phase:retrieval",
    },
  },
  {
    status: "Drafting…",
    progress: 0.62,
    ms: 3400,
    signal: {
      kind: "artifact",
      label: "Ranked five candidate spots",
      evidenceRef: "demo:phase:draft",
    },
  },
  {
    status: "Polishing…",
    progress: 0.88,
    ms: 2900,
    signal: {
      kind: "artifact",
      label: "Final answer assembled",
      evidenceRef: "demo:phase:final",
    },
  },
];

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  cls?: string,
  html?: string
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (html != null) node.innerHTML = html;
  return node;
}

function logEvents(root: HTMLElement): WaitEventHandler {
  return (e) => {
    const line = el(
      "div",
      "",
      `[${new Date().toLocaleTimeString()}] ${e.type}${e.data ? " " + JSON.stringify(e.data) : ""}`
    );
    root.appendChild(line);
    root.scrollTop = root.scrollHeight;
  };
}

function main(): void {
  const app = document.getElementById("app");
  if (!app) return;
  app.appendChild(buildPage());

  const heroCanvas = app.querySelector<HTMLCanvasElement>(".hero-canvas");
  if (heroCanvas) mountHeroDemo(heroCanvas);

  const mount = app.querySelector<HTMLElement>("#qs-mount")!;
  const logEl = app.querySelector<HTMLElement>("#event-log")!;
  const classicPanel = app.querySelector<HTMLElement>("#classic-panel")!;
  const qsPanel = app.querySelector<HTMLElement>("#qs-panel")!;
  const segBtns = Array.from(app.querySelectorAll<HTMLButtonElement>(".seg button"));
  const runBtn = app.querySelector<HTMLButtonElement>("#run-demo")!;
  const failureBtn = app.querySelector<HTMLButtonElement>("#run-failure")!;
  const resetBtn = app.querySelector<HTMLButtonElement>("#reset-stats")!;
  const phaseEl = app.querySelector<HTMLElement>("#qs-phase")!;
  const classicPhase = app.querySelector<HTMLElement>("#classic-phase")!;

  let ctrl: QuickSpinController | null = createQuickSpin({
    target: mount,
    delayMs: 0, // demo: show immediately; production defaults to a 650ms anti-flash threshold
    onEvent: logEvents(logEl),
  });
  let mode: "classic" | "quickspin" = "quickspin";
  let running = false;

  const setMode = (m: "classic" | "quickspin") => {
    mode = m;
    for (const b of segBtns)
      b.setAttribute("aria-pressed", m === b.dataset.mode ? "true" : "false");
    classicPanel.style.display = m === "classic" ? "" : "none";
    qsPanel.style.display = m === "quickspin" ? "" : "none";
  };

  const appendBubble = (label: string, cls: "user" | "ai"): void => {
    const chat = (mode === "classic" ? classicPanel : qsPanel).querySelector<HTMLElement>(".chat")!;
    const b = el("div", "bubble " + cls, label);
    chat.appendChild(b);
    b.scrollIntoView({ block: "nearest" });
  };

  const runClassic = async () => {
    classicPhase.innerHTML = "";
    const chat = classicPanel.querySelector<HTMLElement>(".chat")!;
    const track = chat.querySelector<HTMLElement>(".thinking")!;
    const fill = chat.querySelector<HTMLElement>(".fill") as HTMLElement;
    const label = chat.querySelector<HTMLElement>(".progress-label")!;
    track.style.display = "flex";
    track.querySelector<HTMLElement>(".spinner-label")!.textContent = PHASES[0].status;
    for (const { status, progress: p, ms } of PHASES) {
      track.querySelector<HTMLElement>(".spinner-label")!.textContent = status;
      fill.style.width = `${Math.round(p * 100)}%`;
      label.textContent = `${Math.round(p * 100)}%`;
      await sleep(ms);
    }
    fill.style.width = "100%";
    label.textContent = "100%";
    track.style.display = "none";
    appendBubble("Here are five spots — assuming everyone still likes tacos.", "ai");
  };

  const runQuickSpin = async () => {
    phaseEl.innerHTML = "Phase: <strong>" + PHASES[0].status + "</strong>";
    const session = ctrl!.start({ status: PHASES[0].status });
    // No fake percentage: phase changes themselves drive honest game intensity.
    session.setProgress();
    for (const { status, ms, signal } of PHASES) {
      session.setPhase(status);
      session.signal(signal);
      phaseEl.innerHTML =
        "Phase: <strong>" +
        status +
        "</strong> · live signal: <strong>" +
        signal.kind +
        "</strong> — " +
        signal.label;
      await sleep(ms);
    }
    session.complete();
    phaseEl.innerHTML = "Phase: <strong>Done</strong> — response ready; inspect the Wait Receipt.";
    appendBubble("Here are five spots — assuming everyone still likes tacos.", "ai");
    refreshStats();
  };

  const runDemo = async () => {
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
    runBtn.textContent = "Run demo generation";
  };

  const runFailureProof = async (): Promise<void> => {
    if (running) return;
    running = true;
    setMode("quickspin");
    runBtn.disabled = true;
    failureBtn.disabled = true;
    failureBtn.textContent = "Running real failure…";
    appendBubble(
      "Find dinner options, but preserve failure truth if the provider rejects.",
      "user"
    );

    const session = ctrl!.start({ status: "Calling restaurant search provider…" });
    session.setProgress();
    session.setPhase("Calling restaurant search provider…");
    phaseEl.innerHTML =
      "Negative path: <strong>provider call in flight</strong> — no success has been assumed.";

    try {
      await controlledProviderFailure();
    } catch (err) {
      const failure = err instanceof Error ? err : new Error(String(err));
      session.signal({
        kind: "warning",
        label: "Provider request rejected",
        evidenceRef: "demo:negative-path:promise-rejection",
      });
      session.fail(failure);
      phaseEl.innerHTML =
        `Negative path: <strong>FAILED</strong> — ${failure.message}. ` +
        "No AI answer was fabricated; the failed outcome remains in local evidence.";
      refreshStats();
    }

    running = false;
    runBtn.disabled = false;
    failureBtn.disabled = false;
    failureBtn.textContent = "Run negative-path proof";
  };

  const refreshStats = (): void => {
    const set = (id: string, v: string) => {
      const n = app.querySelector<HTMLElement>(`#${id} .num`);
      if (n) n.textContent = v;
    };
    set("stat-sessions", String(totalSessions()));
    set("stat-wait", formatMs(totalWaitTurnedToPlayMs()));
    set("stat-best", bestLabel("runner") ?? "—");
    const ps = perceivedWaitStats();
    set("stat-felt", ps.samples > 0 ? `${Math.round(ps.avgRatio * 100)}%` : "—");
    set("stat-streak", String(currentDayStreak()));
  };

  runBtn.addEventListener("click", runDemo);
  failureBtn.addEventListener("click", () => void runFailureProof());
  resetBtn.addEventListener("click", () => {
    ctrl!.destroy();
    mount.innerHTML = "";
    ctrl = createQuickSpin({ target: mount, delayMs: 0, onEvent: logEvents(logEl) });
    resetAll();
    app.querySelector<HTMLElement>("#event-log")!.innerHTML = "";
    refreshStats();
  });

  for (const b of segBtns) {
    b.addEventListener("click", () => {
      if (running) return;
      setMode((b.dataset.mode as "classic" | "quickspin") ?? "quickspin");
    });
  }

  setMode("quickspin");
  refreshStats();
}

function formatMs(ms: number): string {
  const s = Math.round(ms / 1000);
  return `${s}s`;
}

function renderPlans(root: HTMLElement): void {
  const grid = el("div", "plans");
  for (const plan of PLANS) {
    const card = el("div", "plan" + (plan.highlighted ? " hot" : ""));
    card.appendChild(el("div", "plan-name", plan.name + (plan.highlighted ? " · PILOT" : "")));
    card.appendChild(el("div", "plan-price", `$${plan.priceUsd} <small>${plan.cadence}</small>`));
    const ul = el("ul");
    for (const f of plan.features) {
      const li = el(
        "li",
        "",
        typeof f === "string"
          ? f
          : `${f.text} <span class="note amber">(after the hackathon)</span>`
      );
      ul.appendChild(li);
    }
    card.appendChild(ul);
    const buy = el(
      "button",
      "btn " + (plan.highlighted ? "primary" : "ghost"),
      plan.priceUsd === 0
        ? "Use the SDK"
        : plan.highlighted && LIVE_PAYMENTS
          ? "Choose Team Pilot — pay with Stripe"
          : "Choose Team Pilot — checkout preview"
    );
    buy.type = "button";
    buy.addEventListener("click", () => void choosePlan(plan, buy));
    card.appendChild(buy);
    grid.appendChild(card);
  }
  root.appendChild(grid);
}

let checkoutBox: { open(): void; close(): void; destroy(): void } | null = null;

async function choosePlan(plan: PlanOption, btn: HTMLButtonElement): Promise<void> {
  if (plan.priceUsd === 0) {
    btn.textContent = "SDK active";
    btn.disabled = true;
    return;
  }
  checkoutBox = createCheckoutFlow(
    (_planId) => sleep(900).then(() => ({ ok: true, paymentId: `preview_${Date.now()}` })),
    { paymentLinks: STRIPE_LINKS }
  );
  checkoutBox.open();
}

function buildPage(): HTMLElement {
  const page = el("div", "");

  const nav = el("nav", "nav");
  nav.appendChild(
    el(
      "div",
      "wrap",
      `<div class="logo"><img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2096%2096'%3E%3Cdefs%3E%3ClinearGradient%20id='chip'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3E%3Cstop%20offset='0'%20stop-color='%238b7cff'/%3E%3Cstop%20offset='1'%20stop-color='%236658e8'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20x='6'%20y='6'%20width='84'%20height='84'%20rx='24'%20fill='url(%23chip)'/%3E%3Cpath%20d='M%2048%2020%20A%2028%2028%200%201%200%2048%2076%20A%2028%2028%200%201%200%2048%2020%20Z%20M%2048%2034%20A%2014%2014%200%201%201%2048%2062%20A%2014%2014%200%201%201%2048%2034%20Z'%20fill='%23ffffff'%20fill-rule='evenodd'/%3E%3Cpath%20d='M%2060%2062%20Q%2072%2068%2079%2084'%20fill='none'%20stroke='%23ffe06a'%20stroke-width='12'%20stroke-linecap='round'/%3E%3C/svg%3E" width="26" height="26" alt="QuickSpin"/><span>quick</span><span>spin</span></div>
       <ul class="nav-links">
         <li><a href="#demo">Product</a></li>
         <li><a href="#games">Games</a></li>
         <li><a href="#sdk">SDK</a></li>
         <li><a href="#pricing">Pricing</a></li>
         <li><a href="#sdk">Docs</a></li>
       </ul>`
    )
  );

  const hero = el("section", "hero wrap");
  hero.appendChild(el("div", "hero-badge", "Commonsmade Build · Make Waiting for AI Fun"));
  hero.appendChild(el("h1", "", `Turn live AI execution into <em>play time.</em>`));
  hero.appendChild(
    el(
      "p",
      "lead",
      `QuickSpin is a drop-in waiting runtime for AI apps. Real model phases drive a playable layer while the request runs, ` +
        `then a Wait Receipt shows actual wait, engaged play time, and whether the wait truly felt shorter.`
    )
  );

  const heroDemo = el("div", "hero-demo");
  const heroCanvas = el("canvas", "hero-canvas");
  heroCanvas.width = 760;
  heroCanvas.height = 300;
  heroCanvas.setAttribute("aria-hidden", "true");
  heroDemo.appendChild(heroCanvas);
  hero.appendChild(heroDemo);
  const ctaRow = el("div", "cta-row");
  const runBtn = el("button", "btn primary", "Run demo generation");
  runBtn.id = "run-demo";
  runBtn.type = "button";
  const failureBtn = el("button", "btn ghost", "Run negative-path proof");
  failureBtn.id = "run-failure";
  failureBtn.type = "button";
  const resetBtn = el("button", "btn ghost", "Reset stats");
  resetBtn.id = "reset-stats";
  resetBtn.type = "button";
  ctaRow.appendChild(runBtn);
  ctaRow.appendChild(failureBtn);
  ctaRow.appendChild(resetBtn);
  hero.appendChild(ctaRow);
  hero.appendChild(
    el(
      "p",
      "sub",
      "Happy-path model work is simulated locally for exactly 12 seconds. The negative-path button runs a real rejected Promise and is explicitly labeled controlled evidence."
    )
  );

  const demo = el("section", "demo-section wrap");
  demo.id = "demo";
  demo.appendChild(el("div", "hostlabel", "HOST APP — a one-message AI client"));
  const seg = el("div", "seg");
  for (const m of ["classic", "quickspin"] as const) {
    const b = el("button", "", m === "classic" ? "Classic spinner" : "With QuickSpin");
    b.type = "button";
    b.dataset.mode = m;
    seg.appendChild(b);
  }
  demo.appendChild(seg);
  demo.appendChild(
    el("div", "seg-label hostlabel", "Same 12-second model wait. Two waiting experiences.")
  );

  const classicPanel = el("div", "");
  classicPanel.id = "classic-panel";
  classicPanel.style.display = "none";
  const classicChat = el("div", "chat");
  classicChat.innerHTML =
    `<div class="bubble user">Where should five friends eat tonight in Austin?</div>` +
    `<div class="thinking"><span class="spinner"></span><span class="spinner-label">Reasoning…</span></div>` +
    `<div class="progress-track"><div class="fill"></div></div>` +
    `<div class="progress-label">0%</div>`;
  const classicPhase = el("div", "qs-phase");
  classicPhase.id = "classic-phase";
  classicPanel.appendChild(classicChat);
  classicPanel.appendChild(classicPhase);
  demo.appendChild(classicPanel);

  const qsPanel = el("div", "");
  qsPanel.id = "qs-panel";
  const qsChat = el("div", "chat");
  qsChat.innerHTML = `<div class="bubble user">Where should five friends eat tonight in Austin?</div>`;
  const qsMount = el("div", "qs-mount");
  qsMount.id = "qs-mount";
  const qsPhase = el("div", "qs-phase");
  qsPhase.id = "qs-phase";
  qsPanel.appendChild(qsChat);
  qsPanel.appendChild(qsMount);
  qsPanel.appendChild(qsPhase);
  demo.appendChild(qsPanel);

  const eventLog = el("div", "event-log");
  eventLog.id = "event-log";
  demo.appendChild(eventLog);

  const stats = el("section", "wrap stats-grid");
  stats.innerHTML =
    `<div class="stat" id="stat-wait"><div class="num">—</div><div class="lbl">time actually played during AI wait</div></div>` +
    `<div class="stat" id="stat-sessions"><div class="num">—</div><div class="lbl">sessions on this device</div></div>` +
    `<div class="stat" id="stat-best"><div class="num">—</div><div class="lbl">best wait-run score</div></div>` +
    `<div class="stat" id="stat-felt"><div class="num">—</div><div class="lbl">average felt / actual wait</div></div>` +
    `<div class="stat" id="stat-streak"><div class="num">—</div><div class="lbl">day streak</div></div>`;

  const games = el("section", "section wrap");
  games.id = "games";
  games.appendChild(el("h2", "", "Games driven by the wait"));
  games.appendChild(
    el(
      "p",
      "",
      "Real phase changes raise game intensity, and observed host execution events become collectible or catchable gameplay signals."
    )
  );
  const gameList = el("div", "game-list");
  gameList.innerHTML =
    `<div class="game"><div class="name">Wait Runner</div><div class="tag">Jump the obstacle, outrun the wait. <kbd>Space</kbd> or tap to jump.</div></div>` +
    `<div class="game"><div class="name">Orbit Catch</div><div class="tag">Catch the glow target. Tap/click, or focus the canvas and use <kbd>Space</kbd>/<kbd>Enter</kbd>.</div></div>` +
    `<div class="game"><div class="name">Execution signals</div><div class="tag">Retrievals, tools, artifacts, and warnings become scorable game events only when the host actually sends them.</div></div>`;
  games.appendChild(gameList);

  const sdk = el("section", "section wrap");
  sdk.id = "sdk";
  sdk.appendChild(el("h2", "", "Drop-in SDK"));
  sdk.appendChild(
    el(
      "p",
      "",
      `Mount it once, feed it real model phases plus observed execution signals, and complete the session when the actual response resolves. ` +
        `Fast responses below the default 650ms threshold never flash the game UI.`
    )
  );
  const code = el("div", "code");
  code.appendChild(
    el(
      "pre",
      "",
      `<span class="tok-cmt">// npm install quickspin</span>
<span class="tok-kw">import</span> { createQuickSpin } <span class="tok-kw">from</span> <span class="tok-str">"quickspin"</span>;

<span class="tok-kw">const</span> quickSpin = createQuickSpin({
  target: <span class="tok-str">"#quickspin"</span>,
  game: <span class="tok-str">"runner"</span>,
  delayMs: 650,                     <span class="tok-cmt">// no UI flash for fast replies</span>
  onEvent: (e) => analytics.observe(e),
});

<span class="tok-kw">const</span> session = quickSpin.start({ status: <span class="tok-str">"Reasoning…"</span> });
session.setProgress();               <span class="tok-cmt">// indeterminate: do not fake a %</span>
session.setPhase(<span class="tok-str">"Searching the web…"</span>); <span class="tok-cmt">// real phase drives game intensity</span>
session.signal({ kind: <span class="tok-str">"retrieval"</span>, label: <span class="tok-str">"Retrieved 12 sources"</span>, evidenceRef: <span class="tok-str">"run_123:retrieval_4"</span> });
session.setPhase(<span class="tok-str">"Drafting…"</span>);
session.signal({ kind: <span class="tok-str">"artifact"</span>, label: <span class="tok-str">"Draft assembled"</span>, evidenceRef: <span class="tok-str">"run_123:artifact_1"</span> });

<span class="tok-kw">const</span> response = <span class="tok-kw">await</span> modelRequest();
session.complete();                  <span class="tok-cmt">// receipt + handoff</span>

<span class="tok-cmt">// or wrap the entire promise:</span>
<span class="tok-kw">const</span> answer = <span class="tok-kw">await</span> quickSpin.track(aiRun(prompt));`
    )
  );
  sdk.appendChild(code);
  sdk.appendChild(
    el(
      "p",
      "sub",
      `Declarative mounting supports both <code>&lt;div data-quickspin&gt;</code> and <code>&lt;div id="quickspin"&gt;</code>. ` +
        `The widget lives in Shadow DOM, and React ships at <code>quickspin/react</code>.`
    )
  );

  const pricing = el("section", "section wrap");
  pricing.id = "pricing";
  pricing.appendChild(el("h2", "", "Open SDK, paid team pilot"));
  pricing.appendChild(
    el(
      "p",
      "",
      LIVE_PAYMENTS
        ? `The SDK capabilities shown above stay available in Free. Team Pilot is a service layer for branded setup and integration support; ` +
            `its live button opens a real Stripe Payment Link. Hosted analytics and extra packs remain explicitly roadmap items.`
        : `The SDK capabilities shown above stay available in Free. Team Pilot is a service layer for branded setup and integration support. ` +
            `This checkout is a labeled preview; set <code>VITE_STRIPE_PRO_LINK</code> to use a real Stripe Payment Link.`
    )
  );
  const plansBox = el("div", "");
  renderPlans(plansBox);
  pricing.appendChild(plansBox);

  const thesis = buildThesis();
  const footer = el(
    "footer",
    "footer wrap",
    `QuickSpin — an entry for the Commonsmade “Make Waiting for AI Fun” build challenge.`
  );
  page.appendChild(nav);
  page.appendChild(buildStripeToastIfNeeded());
  page.appendChild(hero);
  page.appendChild(demo);
  page.appendChild(thesis);
  page.appendChild(stats);
  page.appendChild(games);
  page.appendChild(sdk);
  page.appendChild(pricing);
  page.appendChild(footer);

  return page;
}

function buildThesis(): HTMLElement {
  const t = el("section", "section wrap");
  t.id = "thesis";
  t.appendChild(el("h2", "", `Don't guess whether the wait felt better. Measure it.`));
  t.appendChild(
    el(
      "p",
      "",
      `A spinner gives the user nothing to do and gives the host almost no evidence about the experience. ` +
        `QuickSpin turns real execution phases into play, records actual engaged play time, and asks the user how long the wait felt. ` +
        `The result can be positive, neutral, or negative — the receipt does not force a success story.`
    )
  );
  t.appendChild(
    el(
      "table",
      "rot-table",
      `<tr><th></th><th class="qs">Classic “thinking…”</th><th class="qs">With QuickSpin</th></tr>` +
        `<tr><td>During a real wait</td><td>Passive spinner</td><td>Optional play after a short anti-flash delay</td></tr>` +
        `<tr><td>AI state</td><td>Usually a label</td><td>Real phases can drive game intensity</td></tr>` +
        `<tr><td>Handoff</td><td>Response appears</td><td>Response ready + explicit handoff</td></tr>` +
        `<tr><td>Evidence</td><td>Elapsed time at best</td><td>Actual · played · engaged · felt</td></tr>` +
        `<tr><td>Truthfulness</td><td>Often fake progress %</td><td>Indeterminate mode works without invented progress</td></tr>`
    )
  );
  t.appendChild(el("div", "steps-hostlabel", "WHY THIS REPEATS"));
  const steps = el("div", "steps");
  steps.innerHTML =
    `<div class="step"><div class="n">01</div><div class="t">Embed once</div>` +
    `<div class="d"><code>#quickspin</code>, data attribute, or React wrapper.</div></div>` +
    `<div class="step"><div class="n">02</div><div class="t">Drive it with real AI phases</div>` +
    `<div class="d">No trustworthy percentage required; phase changes become gameplay intensity.</div></div>` +
    `<div class="step"><div class="n">03</div><div class="t">Inspect the receipt</div>` +
    `<div class="d">Measure what actually happened instead of claiming that every game makes every wait better.</div></div>`;
  t.appendChild(steps);
  return t;
}

function buildStripeToastIfNeeded(): HTMLElement {
  const params = new URLSearchParams(window.location.search);
  const viaStripe =
    params.has("payment_intent") ||
    params.has("payment_intent_client_secret") ||
    params.has("redirect_status");
  if (!viaStripe) return el("div", "");
  const toast = el("div", "toast");
  toast.appendChild(
    el(
      "span",
      "",
      `Stripe returned you here after checkout. QuickSpin does not infer payment success from the URL — ` +
        `confirm the charge in Stripe, which remains the payment source of truth.`
    )
  );
  const close = el("button", "", "\u00d7");
  close.type = "button";
  close.setAttribute("aria-label", "Dismiss");
  close.addEventListener("click", () => toast.remove());
  toast.appendChild(close);
  return toast;
}

main();
