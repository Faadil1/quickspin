import { mountPage, statusMark } from "./shell";

const code = `const qs = createQuickSpin({ target: "#quickspin" });
const session = qs.start({ status: "Reasoning…" });

session.setProgress(); // indeterminate unless the host really knows progress
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
}`;

const escaped = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const body = `
  <section class="page-hero section-frame sdk-hero">
    <div>
      <div class="kicker">SDK / EXECUTION-TO-PLAY CONTRACT</div>
      <h1>The game is optional.<br/><em>The contract is the product.</em></h1>
      <p>Runner and Orbit are interchangeable consumers of one waiting lifecycle. The host remains authoritative for phase, progress, execution evidence and terminal outcome.</p>
    </div>
    <div class="sdk-specimen">
      <div><span>FORMAT</span><strong>ESM / CJS / IIFE / TYPES</strong></div>
      <div><span>HOSTS</span><strong>VANILLA / REACT</strong></div>
      <div><span>GAMES</span><strong>RUNNER / ORBIT</strong></div>
      <div><span>TRUTH</span><strong>PROVENANCE REQUIRED</strong></div>
    </div>
  </section>

  <section class="section-frame contract-flow">
    <div class="section-heading">
      <span class="eyebrow">ONE LIFECYCLE</span>
      <h2>Request in. Play during. Truth out.</h2>
    </div>
    <div class="flow-line">
      <div><span>01</span><b>START</b><small>waiting begins</small></div>
      <i>→</i>
      <div><span>02</span><b>PHASE</b><small>host-owned state</small></div>
      <i>→</i>
      <div><span>03</span><b>SIGNAL</b><small>evidence-bearing event</small></div>
      <i>→</i>
      <div><span>04</span><b>PLAY</b><small>optional interaction</small></div>
      <i>→</i>
      <div><span>05</span><b>TERMINATE</b><small>complete / fail / cancel</small></div>
    </div>
  </section>

  <section class="section-frame code-stage">
    <div class="code-meta">
      <span>REFERENCE INTEGRATION</span>
      ${statusMark("NO FAKE PROGRESS")}
      ${statusMark("FAILURE EXPLICIT", "fail")}
    </div>
    <pre class="code-window"><code>${escaped}</code></pre>
  </section>

  <section class="section-frame api-grid-section">
    <div class="section-heading">
      <span class="eyebrow">HOST API</span>
      <h2>Small surface.<br/>Strict semantics.</h2>
    </div>
    <div class="api-grid">
      <article><code>start()</code><h3>Open the wait lifecycle.</h3><p>Creates one active session. A new session cancels the previous active session instead of overlapping state.</p></article>
      <article><code>setPhase()</code><h3>Observed phase, not guessed state.</h3><p>Phase changes can alter gameplay intensity without inventing percent-complete progress.</p></article>
      <article><code>setProgress()</code><h3>Known or indeterminate.</h3><p>Call without a number when the host cannot prove progress. Unknown stays unknown.</p></article>
      <article><code>signal()</code><h3>Execution becomes game content.</h3><p>Retrieval, tool, artifact and warning events require a host-owned <code>evidenceRef</code>.</p></article>
      <article><code>complete()</code><h3>Success is terminal.</h3><p>Response readiness ends play and hands control back to the host application.</p></article>
      <article><code>fail()</code><h3>Failure remains failure.</h3><p>Persists a failed outcome, emits structured evidence and never fabricates a response.</p></article>
    </div>
  </section>

  <section class="section-frame signal-spec">
    <div class="section-heading compact">
      <span class="eyebrow">EXECUTION SIGNALS</span>
      <h2>Observed events become playable objects.</h2>
      <p>The API can accept four current signal kinds. The host supplies provenance; QuickSpin supplies a game interpretation.</p>
    </div>
    <div class="signal-kind-grid">
      <div><b>R</b><span>RETRIEVAL</span><small>source/data arrived</small></div>
      <div><b>T</b><span>TOOL</span><small>tool call observed</small></div>
      <div><b>A</b><span>ARTIFACT</span><small>draft/output materialized</small></div>
      <div class="warning-kind"><b>W</b><span>WARNING</span><small>degradation/rejection observed</small></div>
    </div>
    <div class="refusal-rule"><span>WITHOUT EVIDENCE REF</span><strong>→ UNKNOWN / INSUFFICIENT_EVIDENCE</strong><small>no gameplay mutation</small></div>
  </section>

  <section class="section-frame package-panel">
    <div>
      <span class="eyebrow">CURRENT PACKAGE TRUTH</span>
      <h2>Build outputs exist.<br/>Publication is not claimed.</h2>
      <p>The repository produces ESM, CJS, IIFE and declaration outputs and a React wrapper. The project does not claim public npm availability until publication evidence exists.</p>
    </div>
    <div class="package-list">
      <span>dist/quickspin.es.js</span>
      <span>dist/quickspin.cjs</span>
      <span>dist/quickspin.iife.js</span>
      <span>dist/*.d.ts</span>
    </div>
  </section>

  <section class="closing-stage compact-close">
    <span class="closing-index">CONTRACT / 03</span>
    <h2>Integrate the wait.<br/>Keep authority with the host.</h2>
    <a class="button button-primary" href="/lab/">See the contract run <span>↗</span></a>
  </section>
`;

mountPage("sdk", body);
