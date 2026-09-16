import { readFileSync, writeFileSync } from "node:fs";

const path = "src/demo/main.ts";
let source = readFileSync(path, "utf8");

const replacements = [
  [
    '<a class="nav-proof" href="/proof">Runtime verified</a>',
    '<a class="nav-proof" href="/proof">LIVE / 41 TESTS</a>',
  ],
  [
    '      ${content}\n      <footer>',
    '      ${content}\n      <nav class="mobile-dock" aria-label="Mobile navigation">${links}</nav>\n      <footer>',
  ],
  [
    '<p class="lede">QuickSpin turns real host-observed AI execution into optional gameplay, preserves a private Evidence Capsule, and can derive a redacted Wait Ghost you can replay or share without exposing provenance labels or payloads.</p>',
    '<p class="lede">A black-box arcade for AI waiting: host-observed events become play, the full run closes into a private Evidence Capsule, and only a redacted Wait Ghost is allowed to travel.</p>',
  ],
  [
    '<div><strong>±</strong><span>signed receipt</span></div>',
    '<div><strong>±</strong><span>directional delta</span></div>',
  ],
  [
    '    </section>\n    <section class="proof-band" aria-label="Core QuickSpin proof">',
    '    </section>\n    <section class="signature-rail" aria-label="QuickSpin evidence lifecycle">\n      <article><span>01 / HOST EVENT</span><strong>Observed</strong><small>phase · signal · failure</small></article>\n      <i>→</i>\n      <article><span>02 / PLAY</span><strong>Playable</strong><small>execution becomes game state</small></article>\n      <i>→</i>\n      <article class="private"><span>03 / CAPSULE</span><strong>Private proof</strong><small>full provenance retained</small></article>\n      <i>→</i>\n      <article class="ghost"><span>04 / WAIT GHOST</span><strong>Safe to replay</strong><small>redacted · historical · shareable</small></article>\n    </section>\n    <section class="proof-band" aria-label="Core QuickSpin proof">',
  ],
  [
    '<div class="panel-kicker"><span>EXPERIMENT / QS-12</span><span>CONTROLLED 12.0s</span></div>\n        <div class="seg"',
    '<div class="panel-kicker"><span>EXPERIMENT / QS-12</span><span>CONTROLLED 12.0s</span></div>\n        <div class="lab-storyline" aria-label="QuickSpin lab flow"><span>WAIT</span><i></i><span>PLAY</span><i></i><span>RECORD</span><i></i><span>DERIVE</span></div>\n        <div class="seg"',
  ],
  [
    '        <div id="ghost-status" class="qs-phase">Wait Ghost: none loaded. Shared ghosts are redacted replay artifacts — never live AI.</div>',
    '        <section class="ghost-console" aria-label="Wait Ghost boundary"><div class="ghost-console-head"><strong>WAIT GHOST</strong><span>REDACTED DERIVATIVE</span></div><div class="ghost-privacy"><span>NO PROMPT</span><span>NO LABELS</span><span>NO EVIDENCE REFS</span><span>NO PAYLOADS</span></div><div id="ghost-status" class="qs-phase">Wait Ghost: none loaded. Shared ghosts are redacted replay artifacts — never live AI.</div></section>',
  ],
  [
    '      <div class="receipt-foot">Illustrative receipt layout. The live lab records the actual session values; perceived-wait delta is allowed to be shorter, equal, or longer.</div>\n    </section>\n    <section class="evidence-grid"',
    '      <div class="receipt-foot">Illustrative receipt layout. The live lab records the actual session values; perceived-wait delta is allowed to be shorter, equal, or longer.</div>\n    </section>\n    <section class="evidence-split" aria-label="Private and shareable evidence boundary">\n      <article class="evidence-vessel capsule-vessel"><span>PRIVATE</span><h2>Evidence Capsule</h2><p>Full host-side run record with provenance, outcome and evidence coverage.</p><div><b>provenance</b><b>trail</b><b>outcome</b><b>coverage</b></div></article>\n      <div class="redaction-gate"><span>REDACT</span><strong>→</strong><small>minimum shareable truth</small></div>\n      <article class="evidence-vessel ghost-vessel"><span>SHAREABLE</span><h2>Wait Ghost</h2><p>Historical timing shape without prompts, labels, evidence refs or intervention payloads.</p><div><b>timing</b><b>event types</b><b>outcome</b><b>replay</b></div></article>\n    </section>\n    <div class="trust-boundary">PRIVATE → REDACT → SHARE · GHOST REPLAY IS HISTORICAL, NOT LIVE AI</div>\n    <section class="evidence-grid"',
  ],
  [
    '    </section>\n    <section class="code-panel"><div class="code-head"><span>Vanilla integration</span>',
    '    </section>\n    <section class="contract-strip" aria-label="Runtime contract principles">\n      <article><span>HOST AUTHORITY</span><strong>Observe. Do not invent.</strong><p>Phases and signals come from the host boundary.</p></article>\n      <article><span>FAIL CLOSED</span><strong>No provenance, no gameplay claim.</strong><p>Insufficient evidence remains UNKNOWN.</p></article>\n      <article><span>PORTABLE PROOF</span><strong>Private Capsule. Redacted Ghost.</strong><p>One contract across multiple waiting surfaces.</p></article>\n    </section>\n    <section class="code-panel"><div class="code-head"><span>Vanilla integration</span>',
  ],
  [
    '      "Playable wait, provenance, explicit terminal outcomes and signed receipt.",',
    '      "Playable wait, provenance, explicit terminal outcomes and directional receipt.",',
  ],
  [
    '    ${pageHead("Judge surface", "Every claim has a route to proof.", "This page compresses the build into judge logic: criterion → behavior → evidence → demo. It is intentionally explicit about what is verified, controlled, unknown, or refused.", "05 / JUDGES")}\n    <section class="judge-cycle">',
    '    ${pageHead("Judge surface", "Every claim has a route to proof.", "This page compresses the build into judge logic: criterion → behavior → evidence → demo. It is intentionally explicit about what is verified, controlled, unknown, or refused.", "05 / JUDGES")}\n    <section class="judge-memory"><span>REMEMBER ONE THING</span><strong>QuickSpin turns AI waiting into a game you can verify afterward.</strong><div>PRIVATE CAPSULE → REDACTED GHOST → REPLAY / COMPARE</div></section>\n    <section class="claim-matrix" aria-label="Claim classes"><article class="verified"><b>VERIFIED</b><strong>Observed execution can become play.</strong></article><article class="unknown"><b>UNKNOWN</b><strong>No evidence stays unresolved.</strong></article><article class="refused"><b>REFUSED</b><strong>QuickSpin does not claim faster models.</strong></article><article class="portable"><b>PORTABLE</b><strong>Capsule → Ghost → replay / compare.</strong></article></section>\n    <section class="judge-cycle">',
  ],
];

for (const [from, to] of replacements) {
  if (!source.includes(from)) {
    throw new Error(`Missing consolidation marker: ${from.slice(0, 90)}`);
  }
  source = source.replace(from, to);
}

writeFileSync(path, source);
console.log(`native Black Box consolidation applied: ${replacements.length} replacements`);
