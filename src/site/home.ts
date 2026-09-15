import { mountPage, statusMark } from "./shell";

const body = `
  <section class="hero-stage section-frame">
    <div class="hero-copy reveal">
      <div class="kicker">MAKE WAITING FOR AI FUN / RUNTIME 01</div>
      <h1>Make the wait <em>playable.</em><br/>Keep the outcome true.</h1>
      <p class="hero-lede">QuickSpin is a reusable waiting runtime for AI products. Real host phases can shape play, observed execution can become game content, and the result ends with a receipt instead of a vague feeling.</p>
      <div class="hero-actions">
        <a class="button button-primary" href="/lab/">Enter the live lab <span>↗</span></a>
        <a class="button button-quiet" href="/proof/">Inspect the evidence</a>
      </div>
      <div class="hero-meta">
        ${statusMark("PUBLIC RUNTIME VERIFIED")}
        ${statusMark("FAILURE PRESERVED", "fail")}
        ${statusMark("UNKNOWN IS VALID", "unknown")}
      </div>
    </div>

    <div class="time-instrument reveal delay-1" aria-label="QuickSpin waiting instrument illustration">
      <div class="instrument-topline"><span>WAIT STATE</span><span>QS-012</span></div>
      <div class="dial-wrap">
        <div class="dial dial-outer"></div>
        <div class="dial dial-middle"></div>
        <div class="dial dial-inner"></div>
        <div class="dial-hand"></div>
        <div class="dial-center">
          <span>00:12</span>
          <small>PLAYABLE</small>
        </div>
        <div class="signal-pip pip-a">R</div>
        <div class="signal-pip pip-b">T</div>
        <div class="signal-pip pip-c">A</div>
      </div>
      <div class="instrument-readout">
        <div><span>PHASE</span><strong>RETRIEVING</strong></div>
        <div><span>SIGNAL</span><strong>OBSERVED / 03</strong></div>
        <div><span>TRUTH</span><strong>INDETERMINATE</strong></div>
      </div>
    </div>
  </section>

  <section class="statement-band">
    <div class="band-index">01</div>
    <p>QuickSpin does not make the model faster.</p>
    <strong>It changes what waiting feels like — without lying about what happened.</strong>
  </section>

  <section class="section-frame proof-grid-section">
    <div class="section-heading">
      <span class="eyebrow">WHY THIS IS DIFFERENT</span>
      <h2>Not a spinner skin.<br/>An execution-to-play contract.</h2>
    </div>
    <div class="proof-grid">
      <article class="proof-tile tile-time">
        <span class="tile-index">A / TIME</span>
        <h3>Actual wait stays actual.</h3>
        <p>The request lifecycle remains the authority. Fast responses stay quiet. Longer waits can open play without fabricating percent-complete progress.</p>
        <div class="mini-scale"><i></i><i></i><i></i><i></i><i></i></div>
      </article>
      <article class="proof-tile tile-signal">
        <span class="tile-index">B / SIGNAL</span>
        <h3>Observed execution becomes matter.</h3>
        <p>Retrieval, tool, artifact and warning events can enter the game — but only when the host provides provenance.</p>
        <div class="signal-track"><b>R</b><b>T</b><b>A</b><b>W</b></div>
      </article>
      <article class="proof-tile tile-receipt">
        <span class="tile-index">C / RECEIPT</span>
        <h3>The wait ends with evidence.</h3>
        <p>Actual wait, engaged play and perceived wait become a signed record. “Felt longer” is allowed.</p>
        <div class="micro-receipt"><span>ACTUAL</span><b>12.0s</b><span>FELT</span><b>8.4s</b></div>
      </article>
      <article class="proof-tile tile-failure">
        <span class="tile-index">D / FAILURE</span>
        <h3>Failure does not become success.</h3>
        <p>A rejected request stays failed. Missing evidence stays UNKNOWN. The interface refuses to manufacture confidence.</p>
        <div class="failure-stamp">FAILED ≠ COMPLETE</div>
      </article>
    </div>
  </section>

  <section class="section-frame split-story">
    <div class="section-heading compact">
      <span class="eyebrow">THE REALITY ANCHOR</span>
      <h2>Latency and rejection are production states.</h2>
      <p>On June 2–3, 2026, OpenAI documented elevated latency and errors across Responses API, Codex and ChatGPT. QuickSpin does not claim to repair provider reliability; it makes the waiting state more legible, interactive and honest.</p>
      <a class="text-link" href="/proof/">Read the five-part evidence chain →</a>
    </div>
    <div class="incident-card">
      <div class="incident-header"><span>PRIMARY-SOURCE INCIDENT</span><strong>02–03 JUN 2026</strong></div>
      <div class="incident-line"><span>RESPONSES API</span><b>↑ RESPONSE-START LATENCY</b></div>
      <div class="incident-line"><span>CODEX</span><b>HTTP 429 REJECTIONS</b></div>
      <div class="incident-line"><span>CHATGPT</span><b>FLOW DEGRADATION</b></div>
      <div class="incident-footer">DESIGN CONSEQUENCE / WAITING MUST NOT IMPLY SUCCESS</div>
    </div>
  </section>

  <section class="route-section section-frame">
    <div class="section-heading">
      <span class="eyebrow">EXPLORE THE SYSTEM</span>
      <h2>One product. Five surfaces.</h2>
    </div>
    <div class="route-grid">
      <a class="route-card is-current" href="/"><span>00</span><strong>INDEX</strong><p>Thesis and product identity.</p></a>
      <a class="route-card" href="/lab/"><span>01</span><strong>LIVE LAB</strong><p>Run the 12-second comparison and failure path.</p></a>
      <a class="route-card" href="/proof/"><span>02</span><strong>PROOF</strong><p>Wait Receipt, reality anchor and failure truth.</p></a>
      <a class="route-card" href="/sdk/"><span>03</span><strong>SDK</strong><p>Reusable host contract and integration model.</p></a>
      <a class="route-card" href="/judges/"><span>04</span><strong>JUDGES</strong><p>Rubric, story, demo path and Q&A.</p></a>
    </div>
  </section>

  <section class="closing-stage">
    <span class="closing-index">QS / 01</span>
    <h2>Play the wait.<br/>Receipt the truth.</h2>
    <a class="button button-primary" href="/lab/">Run QuickSpin now <span>↗</span></a>
  </section>
`;

mountPage("home", body);
