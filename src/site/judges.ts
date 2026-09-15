import { mountPage, statusMark } from "./shell";

const body = `
  <section class="page-hero section-frame judges-hero">
    <div>
      <div class="kicker">JUDGE PACKET / SINGLE NARRATIVE</div>
      <h1>Problem → proof → <em>consequence.</em></h1>
      <p>This surface compresses the challenge fit, differentiation, evidence, demo path and Q&A boundaries into one judge-readable sequence.</p>
    </div>
    <div class="judge-scorecard">
      <div><span>WAIT EXPERIENCE</span><strong>PASS</strong></div>
      <div><span>ORIGINALITY</span><strong>PASS</strong></div>
      <div><span>AI-NATIVE FIT</span><strong>PASS</strong></div>
      <div><span>REPEATABILITY</span><strong>PASS</strong></div>
      <div><span>EXECUTION</span><strong>PASS</strong></div>
    </div>
  </section>

  <section class="section-frame rubric-table-section">
    <div class="section-heading">
      <span class="eyebrow">RUBRIC TRACEABILITY</span>
      <h2>Every criterion points to a behavior and a proof.</h2>
    </div>
    <div class="rubric-table">
      <div class="rubric-row header"><span>CRITERION</span><span>PRODUCT ANSWER</span><span>VISIBLE PROOF</span></div>
      <div class="rubric-row"><b>Waiting experience</b><p>Optional play, anti-flash threshold, collapse/resume, signed perceived wait.</p><strong>12s before/after + receipt</strong></div>
      <div class="rubric-row"><b>Originality</b><p>Observed execution becomes game content rather than decorative status copy.</p><strong>Signal pickups / targets</strong></div>
      <div class="rubric-row"><b>AI-native fit</b><p>Host phases, progress and execution evidence drive the wait layer.</p><strong>Phase + signal event feed</strong></div>
      <div class="rubric-row"><b>Repeatability</b><p>One SDK contract across Runner, Orbit, vanilla JavaScript and React.</p><strong>SDK page + two games</strong></div>
      <div class="rubric-row"><b>Execution quality</b><p>State machine, persistence, accessibility, CI, CodeQL, security reconciliation.</p><strong>Repo + green gates</strong></div>
    </div>
  </section>

  <section class="section-frame cycle-stage">
    <div class="section-heading compact">
      <span class="eyebrow">CANONICAL BUILD CYCLE</span>
      <h2>No jump from “works” to “winner.”</h2>
    </div>
    <div class="cycle-line">
      <span>RUBRIC</span><i></i><span>PAIN</span><i></i><span>PROBLEM</span><i></i><span>DIFFERENTIATOR</span><i></i><span>EXECUTION</span><i></i><span>EVIDENCE</span><i></i><span>STORY</span><i></i><span>DEMO</span><i></i><span>Q&A</span>
    </div>
  </section>

  <section class="section-frame demo-storyboard">
    <div class="section-heading">
      <span class="eyebrow">DEMO / 02:40–02:55</span>
      <h2>One proof sequence.</h2>
    </div>
    <div class="storyboard-grid">
      <article><span>00:00</span><b>PAIN</b><p>Real production latency/rejection exists. Waiting is not hypothetical.</p></article>
      <article><span>00:18</span><b>CONTROL</b><p>Show the exact same 12-second passive wait.</p></article>
      <article><span>00:42</span><b>WOW</b><p>QuickSpin turns real host phases and execution signals into play.</p></article>
      <article><span>01:18</span><b>EVIDENCE</b><p>Answer the perceived-wait prompt and show the signed Wait Receipt.</p></article>
      <article class="story-fail"><span>01:43</span><b>FAILURE</b><p>Run the actual rejected Promise. No answer is fabricated.</p></article>
      <article><span>02:03</span><b>UNKNOWN</b><p>No evidenceRef means no gameplay claim.</p></article>
      <article><span>02:22</span><b>DIFFERENTIATOR</b><p>Reusable SDK, not one hardcoded waiting game.</p></article>
      <article><span>02:40</span><b>CLOSE</b><p>Playable waiting, truthful outcomes, measurable experience.</p></article>
    </div>
  </section>

  <section class="section-frame qa-section">
    <div class="section-heading">
      <span class="eyebrow">ADVERSARIAL Q&A</span>
      <h2>Answers that refuse to drift beyond evidence.</h2>
    </div>
    <div class="qa-list">
      <details open><summary>“Isn’t this just a minigame replacing a spinner?”</summary><p>No. The lifecycle is bound to the host request, observed execution can become game content, real completion ends play, failure remains failure, and the Wait Receipt measures the experience.</p></details>
      <details><summary>“Are those progress percentages real?”</summary><p>QuickSpin does not require percentages. Unknown progress stays indeterminate. The classic control percentage exists only because the 12-second demo is fully controlled.</p></details>
      <details><summary>“How do you know a tool event happened?”</summary><p>The host supplies a provenance reference. Missing provenance is rejected as UNKNOWN / INSUFFICIENT_EVIDENCE and does not affect gameplay.</p></details>
      <details><summary>“What happens if the AI request fails?”</summary><p>The lab can prove it. A real Promise rejects, the session becomes failed, structured evidence persists, and no AI response is fabricated.</p></details>
      <details><summary>“Does QuickSpin make the model faster?”</summary><p>No. It targets the waiting experience and evidence integrity, not provider latency.</p></details>
      <details><summary>“Can you prove every user thinks it is faster?”</summary><p>No. The signed Wait Receipt can report equal or longer perceived wait. Broader user validation remains an explicit evidence gap.</p></details>
    </div>
  </section>

  <section class="section-frame claim-boundary">
    <div>
      <span class="eyebrow">CLAIM BOUNDARY</span>
      <h2>Strong because it says no.</h2>
    </div>
    <div class="boundary-grid">
      <div>${statusMark("VERIFIED")}<p>Public runtime, lifecycle, signals, negative path, failure persistence, security gates.</p></div>
      <div>${statusMark("REFUSED", "fail")}<p>“QuickSpin reduces provider latency.” “Every wait feels shorter.” “Controlled failure is a live outage.”</p></div>
      <div>${statusMark("UNKNOWN", "unknown")}<p>Claims without provenance, unpublished npm availability, broader user preference evidence.</p></div>
    </div>
  </section>

  <section class="section-frame judge-links">
    <a href="/lab/"><span>LIVE DEMO</span><strong>Run the wait lab →</strong></a>
    <a href="/proof/"><span>EVIDENCE</span><strong>Inspect proof →</strong></a>
    <a href="/sdk/"><span>TECHNICAL</span><strong>Read the SDK contract →</strong></a>
    <a href="https://github.com/Faadil1/quickspin" target="_blank" rel="noreferrer"><span>SOURCE</span><strong>Open repository ↗</strong></a>
  </section>

  <section class="closing-stage compact-close">
    <span class="closing-index">JUDGE / 04</span>
    <h2>Value before technology.<br/>Proof before plumbing.</h2>
    <a class="button button-primary" href="/lab/">Start the demo <span>↗</span></a>
  </section>
`;

mountPage("judges", body);
