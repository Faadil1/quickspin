import "./black-box-arcade.css";

function insertAfter(target: Element | null, html: string): void {
  if (!target) return;
  target.insertAdjacentHTML("afterend", html);
}

function route(): string {
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

function enhanceGlobal(app: HTMLElement): void {
  const main = app.querySelector<HTMLElement>("main.page");
  if (main) main.dataset.bbRoute = route().replace(/^\//, "").toUpperCase() || "HOME";

  document.body.insertAdjacentHTML("beforeend", '<div class="bb-scanline" aria-hidden="true"></div>');

  const navProof = app.querySelector<HTMLElement>(".nav-proof");
  if (navProof) navProof.textContent = "VERIFIED / 41 TESTS";

  const current = route();
  document.body.insertAdjacentHTML(
    "beforeend",
    `<nav class="bb-mobile-dock" aria-label="QuickSpin mobile routes">
      ${[
        ["/", "HOME"],
        ["/lab", "LAB"],
        ["/proof", "PROOF"],
        ["/sdk", "SDK"],
        ["/judges", "JUDGE"],
      ]
        .map(
          ([path, label]) =>
            `<a href="${path}" ${path === current ? 'aria-current="page"' : ""}>${label}</a>`
        )
        .join("")}
    </nav>`
  );

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const reactive = app.querySelectorAll<HTMLElement>(".instrument, .ghost-console, .evidence-vessel");
    for (const target of reactive) {
      target.classList.add("bb-reactive");
      target.addEventListener("pointermove", (event) => {
        const rect = target.getBoundingClientRect();
        target.style.setProperty("--bb-x", `${event.clientX - rect.left}px`);
        target.style.setProperty("--bb-y", `${event.clientY - rect.top}px`);
      });
    }
  }
}

function enhanceHome(app: HTMLElement): void {
  const hero = app.querySelector<HTMLElement>(".hero-grid > div:first-child");
  const lede = hero?.querySelector<HTMLElement>(".lede");
  if (lede) {
    lede.textContent =
      "A black-box arcade for AI waiting: real host events become play, the full run closes into a private Evidence Capsule, and only a redacted Wait Ghost is allowed to travel.";
  }

  const memory = hero?.querySelector<HTMLElement>(".jury-memory-line");
  insertAfter(
    memory,
    `<div class="bb-status-ticker" aria-label="QuickSpin proof status">
      <span class="acid">LIVE HOST EVENTS</span>
      <span class="violet">PRIVATE CAPSULE</span>
      <span>REDACTED GHOST</span>
      <span class="coral">FAILURE ≠ SUCCESS</span>
      <span>UNKNOWN STAYS UNKNOWN</span>
    </div>`
  );

  const instrument = app.querySelector<HTMLElement>(".instrument");
  if (instrument) instrument.classList.add("bb-orbit-node");

  const proofBand = app.querySelector<HTMLElement>(".proof-band");
  proofBand?.insertAdjacentHTML(
    "beforebegin",
    `<div class="bb-editorial-note" role="note"><span>DESIGN THESIS</span><strong>PLAY WITHOUT LYING ABOUT PROGRESS.</strong><small>QuickSpin makes the waiting surface expressive while keeping success, failure and uncertainty semantically separate.</small></div>`
  );
}

function enhanceLab(app: HTMLElement): void {
  const storyline = app.querySelector<HTMLElement>(".lab-storyline");
  insertAfter(
    storyline,
    `<section class="bb-mode-rail" aria-label="QuickSpin lab states">
      <div><b>01 / WAIT</b><span>Host request enters an honest waiting state.</span></div>
      <div><b>02 / PLAY</b><span>Observed events can become game mechanics.</span></div>
      <div><b>03 / RECORD</b><span>Terminal truth closes into the private Capsule.</span></div>
      <div><b>04 / DERIVE</b><span>Only the redacted Ghost is replayed or shared.</span></div>
    </section>`
  );

  const feed = app.querySelector<HTMLElement>("#event-log");
  feed?.setAttribute("aria-label", "Observed QuickSpin runtime event ledger");

  const lab = app.querySelector<HTMLElement>(".lab-grid");
  lab?.insertAdjacentHTML(
    "beforebegin",
    `<div class="bb-lab-callout"><span>LIVE / CONTROLLED 12s</span><strong>WATCH THE STATE, NOT A FAKE PERCENTAGE.</strong></div>`
  );
}

function enhanceProof(app: HTMLElement): void {
  const split = app.querySelector<HTMLElement>(".evidence-split");
  insertAfter(
    split,
    `<div class="bb-proof-seal" role="note">
      <i aria-hidden="true"></i>
      <span>TRUST BOUNDARY / THE GHOST IS A DERIVED HISTORICAL ARTIFACT, NOT LIVE AI.</span>
      <strong>PRIVATE → REDACT → SHARE</strong>
    </div>`
  );
}

function enhanceSdk(app: HTMLElement): void {
  const lifecycle = app.querySelector<HTMLElement>(".lifecycle");
  insertAfter(
    lifecycle,
    `<section class="bb-contract-strip" aria-label="Runtime contract principles">
      <article><span>HOST AUTHORITY</span><strong>QuickSpin observes; it does not invent.</strong><p>Phases, execution signals and intervention acknowledgements come from the host boundary.</p></article>
      <article><span>FAIL CLOSED</span><strong>No provenance means no gameplay claim.</strong><p>Insufficient evidence remains UNKNOWN instead of being polished into false confidence.</p></article>
      <article><span>PORTABLE PROOF</span><strong>Private Capsule. Redacted Ghost.</strong><p>The same runtime contract can power multiple wait surfaces without changing the evidence rules.</p></article>
    </section>`
  );
}

function enhanceJudges(app: HTMLElement): void {
  const memory = app.querySelector<HTMLElement>(".judge-memory");
  insertAfter(
    memory,
    `<section class="bb-claim-matrix" aria-label="QuickSpin claim classes">
      <article class="bb-claim-card verified"><b>VERIFIED</b><strong>Observed execution can become play.</strong><small>Signals require evidence-bearing host provenance before they affect the waiting layer.</small></article>
      <article class="bb-claim-card unknown"><b>UNKNOWN</b><strong>No evidence stays unresolved.</strong><small>QuickSpin rejects unsupported signal claims rather than filling the gap with animation.</small></article>
      <article class="bb-claim-card refused"><b>REFUSED</b><strong>QuickSpin does not claim faster models.</strong><small>The product changes waiting experience and evidence integrity, not provider latency.</small></article>
      <article class="bb-claim-card verified"><b>PORTABLE</b><strong>Capsule → Ghost → replay / compare.</strong><small>The shareable artifact is deliberately less informative than the private integration record.</small></article>
    </section>`
  );
}

function fixClaimLanguage(app: HTMLElement): void {
  const walker = document.createTreeWalker(app, NodeFilter.SHOW_TEXT);
  let current = walker.nextNode();
  while (current) {
    if (current.textContent?.includes("signed receipt")) {
      current.textContent = current.textContent.replace(/signed receipt/gi, "directional receipt");
    }
    current = walker.nextNode();
  }
}

function enhance(): void {
  const app = document.getElementById("app");
  if (!app || app.dataset.blackBoxArcade === "true") return;
  app.dataset.blackBoxArcade = "true";

  enhanceGlobal(app);
  const path = route();
  if (path === "/") enhanceHome(app);
  if (path === "/lab") enhanceLab(app);
  if (path === "/proof") enhanceProof(app);
  if (path === "/sdk") enhanceSdk(app);
  if (path === "/judges") enhanceJudges(app);
  fixClaimLanguage(app);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => requestAnimationFrame(enhance), { once: true });
} else {
  requestAnimationFrame(enhance);
}
