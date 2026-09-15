import "./jury.css";

function enhance(): void {
  const app = document.getElementById("app");
  if (!app || app.dataset.juryEnhanced === "true") return;
  app.dataset.juryEnhanced = "true";

  const skip = document.createElement("a");
  skip.className = "jury-skip";
  skip.href = "#jury-main";
  skip.textContent = "Skip to QuickSpin proof";
  document.body.prepend(skip);

  const main = app.querySelector<HTMLElement>("main.page");
  if (main) main.id = "jury-main";

  const navProof = app.querySelector<HTMLElement>(".nav-proof");
  if (navProof) navProof.textContent = "V3 runtime verified";

  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  if (path === "/") enhanceHome(app);
  if (path === "/lab") enhanceLab(app);
  if (path === "/proof") enhanceProof(app);
  if (path === "/judges") enhanceJudges(app);
}

function enhanceHome(app: HTMLElement): void {
  const heroCopy = app.querySelector<HTMLElement>(".hero-grid > div:first-child");
  const lede = heroCopy?.querySelector<HTMLElement>(".lede");
  if (lede) {
    lede.textContent =
      "Play the wait while real host events unfold. Keep a private Evidence Capsule afterward. Share only the redacted Wait Ghost.";
  }

  const display = heroCopy?.querySelector<HTMLElement>(".display");
  if (display) {
    const memory = document.createElement("div");
    memory.className = "jury-memory-line";
    memory.innerHTML =
      "<span>01 / PLAY</span><span>02 / VERIFY</span><strong>Verify afterward.</strong>";
    display.insertAdjacentElement("afterend", memory);
  }

  const actions = heroCopy?.querySelector<HTMLElement>(".route-actions");
  if (actions) {
    actions.insertAdjacentHTML(
      "afterend",
      `<section class="signature-rail" aria-label="QuickSpin evidence lifecycle">
        <div class="signature-step"><span class="signature-index">01</span><span class="signature-kicker">HOST EVENT</span><strong>Observed</strong><small>phase / signal / failure</small></div>
        <div class="signature-link" aria-hidden="true">→</div>
        <div class="signature-step"><span class="signature-index">02</span><span class="signature-kicker">PLAY</span><strong>Playable</strong><small>execution becomes game state</small></div>
        <div class="signature-link" aria-hidden="true">→</div>
        <div class="signature-step private"><span class="signature-index">03</span><span class="signature-kicker">CAPSULE</span><strong>Private proof</strong><small>full provenance retained</small></div>
        <div class="signature-link" aria-hidden="true">→</div>
        <div class="signature-step ghost"><span class="signature-index">04</span><span class="signature-kicker">WAIT GHOST</span><strong>Safe to replay</strong><small>redacted / shareable</small></div>
      </section>`
    );
  }

  const strip = app.querySelectorAll<HTMLElement>(".instrument-strip span");
  if (strip[2]) strip[2].textContent = "directional delta";

  const instrument = app.querySelector<HTMLElement>(".instrument");
  instrument?.insertAdjacentHTML(
    "beforeend",
    '<div class="instrument-proof"><span class="proof-dot"></span><span>FULL CAPSULE / PRIVATE</span><span>GHOST / REDACTED</span></div>'
  );
}

function enhanceLab(app: HTMLElement): void {
  const actions = app.querySelector<HTMLElement>(".lab-actions");
  if (actions) {
    const run = app.querySelector<HTMLButtonElement>("#run-demo");
    const failure = app.querySelector<HTMLButtonElement>("#run-failure");
    const capsule = app.querySelector<HTMLButtonElement>("#copy-capsule");
    const ghost = app.querySelector<HTMLButtonElement>("#copy-ghost");
    const replay = app.querySelector<HTMLButtonElement>("#replay-ghost");
    const reset = app.querySelector<HTMLButtonElement>("#reset-stats");

    const primary = document.createElement("div");
    primary.className = "lab-action-group lab-action-primary";
    primary.innerHTML = '<span class="lab-action-label">RUN</span>';
    if (run) primary.appendChild(run);
    if (failure) primary.appendChild(failure);

    const proof = document.createElement("div");
    proof.className = "lab-action-group lab-action-proof";
    proof.innerHTML = '<span class="lab-action-label">AFTER THE WAIT</span>';
    if (capsule) proof.appendChild(capsule);
    if (ghost) proof.appendChild(ghost);
    if (replay) proof.appendChild(replay);

    actions.replaceChildren(primary, proof);
    if (reset) {
      reset.classList.add("lab-reset");
      actions.insertAdjacentElement("afterend", reset);
    }
  }

  const ghostStatus = app.querySelector<HTMLElement>("#ghost-status");
  if (ghostStatus && !ghostStatus.closest(".ghost-console")) {
    const consoleEl = document.createElement("section");
    consoleEl.className = "ghost-console";
    consoleEl.setAttribute("aria-label", "Wait Ghost privacy and replay status");
    consoleEl.innerHTML = `<div class="ghost-console-head">
      <div><span class="ghost-mark" aria-hidden="true"></span><strong>WAIT GHOST</strong></div>
      <span class="ghost-badge">REDACTED DERIVATIVE</span>
    </div>
    <div class="ghost-privacy-row">
      <span>NO PROMPT</span><span>NO LABELS</span><span>NO EVIDENCE REFS</span><span>NO PAYLOADS</span>
    </div>`;
    ghostStatus.parentElement?.insertBefore(consoleEl, ghostStatus);
    consoleEl.appendChild(ghostStatus);
  }

  const panelKicker = app.querySelector<HTMLElement>(".lab-panel .panel-kicker");
  panelKicker?.insertAdjacentHTML(
    "afterend",
    '<div class="lab-storyline"><span>WAIT</span><i></i><span>PLAY</span><i></i><span>CAPSULE</span><i></i><span>GHOST</span><i></i><span>REPLAY</span></div>'
  );
}

function enhanceProof(app: HTMLElement): void {
  const receipt = app.querySelector<HTMLElement>(".receipt");
  receipt?.insertAdjacentHTML(
    "afterend",
    `<section class="evidence-split" aria-label="Private and shareable evidence boundary">
      <article class="evidence-vessel capsule-vessel">
        <div class="vessel-top"><span>PRIVATE</span><strong>EVIDENCE CAPSULE</strong></div>
        <p>Full runtime record for the host integration.</p>
        <div class="vessel-tags"><span>provenance</span><span>trail</span><span>outcome</span><span>coverage</span></div>
      </article>
      <div class="redaction-gate" aria-label="Redaction boundary"><span>REDACT</span><b>→</b><small>minimum shareable truth</small></div>
      <article class="evidence-vessel ghost-vessel">
        <div class="vessel-top"><span>SHAREABLE</span><strong>WAIT GHOST</strong></div>
        <p>Historical timing shape without sensitive provenance content.</p>
        <div class="vessel-tags"><span>timing</span><span>event types</span><span>outcome</span><span>replay</span></div>
      </article>
    </section>`
  );
}

function enhanceJudges(app: HTMLElement): void {
  const head = app.querySelector<HTMLElement>(".page-head");
  head?.insertAdjacentHTML(
    "afterend",
    `<section class="judge-memory" aria-label="QuickSpin judge memory sentence">
      <span class="judge-memory-kicker">REMEMBER ONE THING</span>
      <strong>QuickSpin turns AI waiting into a game you can verify afterward.</strong>
      <div><span>PRIVATE CAPSULE</span><b>→</b><span>REDACTED GHOST</span><b>→</b><span>REPLAY / COMPARE</span></div>
    </section>`
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => requestAnimationFrame(enhance), {
    once: true,
  });
} else {
  requestAnimationFrame(enhance);
}
