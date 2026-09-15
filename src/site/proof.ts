import { mountPage, receiptRow, statusMark } from "./shell";

const body = `
  <section class="page-hero section-frame proof-hero">
    <div>
      <div class="kicker">PROOF / EVIDENCE INSTRUMENT</div>
      <h1>Evidence before <em>confidence.</em></h1>
      <p>QuickSpin treats waiting as an observable state, not a decorative animation. Real-world failure grounds the problem; runtime evidence decides what the interface is allowed to claim.</p>
    </div>
    <div class="proof-seal">
      <span>STATUS</span>
      <strong>VERIFIED<br/>WITH SCOPE</strong>
      <small>NO EVIDENCE → NO CLAIM</small>
    </div>
  </section>

  <section class="section-frame five-part">
    <div class="section-heading">
      <span class="eyebrow">CANONICAL REALITY ANCHOR</span>
      <h2>Five links. No theoretical pain.</h2>
    </div>
    <div class="five-chain">
      <article><span>01 / SIGNAL</span><h3>AI waits are product states.</h3><p>A 2026 HCI study with 425 participants across 10, 30 and 60-second waits found that feedback design changes perceived wait, frustration and ambiguity.</p></article>
      <article><span>02 / REAL EVENT</span><h3>OpenAI, June 2–3, 2026.</h3><p>Official incident: elevated latency and errors across Responses API, Codex and ChatGPT.</p></article>
      <article><span>03 / IMPACT</span><h3>Delay, rejection, broken flows.</h3><p>Longer response-start latency, incorrect HTTP 429 rejection and degraded login/auth/conversation paths.</p></article>
      <article><span>04 / DESIGN LESSON</span><h3>Waiting cannot imply success.</h3><p>Unknown progress stays indeterminate. Failure is not completion. Unsupported execution claims must abstain.</p></article>
      <article><span>05 / MITIGATION</span><h3>Playable, measurable, truthful.</h3><p>Anti-flash threshold, execution provenance, explicit terminal outcomes, UNKNOWN refusal and signed Wait Receipt.</p></article>
    </div>
  </section>

  <section class="section-frame receipt-stage">
    <div class="section-heading compact">
      <span class="eyebrow">WAIT RECEIPT</span>
      <h2>Do not market “felt faster.”<br/>Measure it.</h2>
      <p>The receipt is deliberately signed. A session may feel shorter, equal or longer. QuickSpin does not clamp a disappointing outcome into a positive one.</p>
    </div>
    <div class="receipt-card large-receipt">
      <div class="receipt-brand"><span>QUICKSPIN / WAIT RECEIPT</span><b>QS-RCP-012</b></div>
      ${receiptRow("ACTUAL WAIT", "12.0 s", "host lifecycle")}
      ${receiptRow("PLAYED", "9.8 s", "game active")}
      ${receiptRow("ENGAGED", "8.7 s", "foreground interaction")}
      ${receiptRow("FELT WAIT", "8.4 s", "user response")}
      <div class="receipt-delta"><span>PERCEIVED DELTA</span><strong>−30%</strong><small>example receipt / signed metric</small></div>
      <div class="receipt-rule"></div>
      <div class="receipt-footer-row"><span>OUTCOME</span>${statusMark("COMPLETED")}</div>
    </div>
  </section>

  <section class="section-frame failure-ledger-section">
    <div class="section-heading">
      <span class="eyebrow">REAL FAILURE &gt; FAKE SUCCESS</span>
      <h2>Red history stays red.</h2>
      <p>Repair does not erase evidence. The project keeps real CI, migration, deployment and verifier failures in the ledger after mitigation.</p>
    </div>
    <div class="failure-ledger-ui">
      <div class="ledger-row external"><span>F-01</span><b>OPENAI PRODUCTION INCIDENT</b><em>REAL WORLD</em><strong>RETAINED</strong></div>
      <div class="ledger-row"><span>F-02</span><b>DETERMINISTIC STREAK TEST</b><em>CI</em><strong>FIXED / RETAINED</strong></div>
      <div class="ledger-row"><span>F-06</span><b>VITE 8 / ROLLDOWN BUILD BREAK</b><em>BUILD</em><strong>MITIGATED</strong></div>
      <div class="ledger-row"><span>F-08</span><b>FIRST PAGES DEPLOYMENT BLOCKED</b><em>AUTHORITY</em><strong>RETAINED</strong></div>
      <div class="ledger-row"><span>F-10</span><b>JUDGE VERIFIER FALSE NEGATIVE</b><em>ASSURANCE</em><strong>FIXED / RETAINED</strong></div>
    </div>
    <a class="text-link" href="https://github.com/Faadil1/quickspin/blob/main/evidence/FAILURE-LEDGER.md" target="_blank" rel="noreferrer">Open the full Failure Ledger ↗</a>
  </section>

  <section class="section-frame dual-proof">
    <article class="proof-module failure-module">
      <div class="module-top"><span>NEGATIVE PATH</span>${statusMark("FAILED", "fail")}</div>
      <h3>A real rejected Promise.</h3>
      <p>The lab deliberately rejects with <code>DEMO_PROVIDER_TIMEOUT</code>. QuickSpin persists <code>outcome: failed</code>, emits structured failure evidence and does not append an AI response.</p>
      <a class="button button-danger" href="/lab/">Run the failure proof</a>
    </article>
    <article class="proof-module unknown-module">
      <div class="module-top"><span>ABSTENTION PATH</span>${statusMark("UNKNOWN", "unknown")}</div>
      <h3>No provenance, no mutation.</h3>
      <p>If an execution signal has no trustworthy <code>evidenceRef</code>, QuickSpin emits <code>signal-rejected → UNKNOWN / INSUFFICIENT_EVIDENCE</code>.</p>
      <a class="button button-quiet" href="/sdk/">Inspect the contract</a>
    </article>
  </section>

  <section class="closing-stage compact-close">
    <span class="closing-index">TRUTH / 02</span>
    <h2>Waiting can be fun.<br/>Evidence still comes first.</h2>
    <a class="button button-primary" href="/judges/">See the judge mapping <span>↗</span></a>
  </section>
`;

mountPage("proof", body);
