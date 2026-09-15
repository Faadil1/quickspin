# Visual / Jury Review

Status: **TRACE VISUAL JURY V1 MERGED + CODE-VALIDATED — EXACT-SHA RUNTIME / PIXEL INSPECTION STILL OPEN**

## Product presentation objective

QuickSpin should read in seconds as a **playable waiting instrument / flight recorder**, not as a generic AI SaaS landing page or a collection of mini-games.

Canonical memory sentence:

**QuickSpin turns AI waiting into a game you can verify afterward.**

Secondary reveal:

**Private Capsule. Shareable Ghost. Comparable wait.**

## Existing architecture retained

The product remains a five-surface experience:

1. `/` — thesis + signature lifecycle;
2. `/lab` — controlled wait, playable execution, Capsule/Ghost/replay/negative path;
3. `/proof` — receipt, evidence boundary, failure and UNKNOWN truth;
4. `/sdk` — lifecycle + provenance-aware integration;
5. `/judges` — rubric compression + canonical memory sentence.

TRACE Visual Jury V1 deliberately did **not** reopen the product architecture or SDK contract.

## TRACE Visual Jury V1 — implemented delta

Exact visual merge SHA:

`c34012a732e8bb7cd2b5601f1a8f9862a87e4056`

Scope lock: only `index.html`, `src/demo/jury.ts`, and `src/demo/jury.css` changed in PR #14.

### 1. Above-the-fold signature path

The home surface now makes the product mechanism visible as:

`HOST EVENT → PLAY → PRIVATE CAPSULE → REDACTED WAIT GHOST`

A short `PLAY → VERIFY → Verify afterward.` memory line reinforces the canonical pitch without adding another product claim.

### 2. Lab hierarchy

The previous six flat actions are regrouped into two conceptual zones:

- `RUN`
- `AFTER THE WAIT`

This makes the judge sequence readable as execution first, evidence/replay second.

### 3. Wait Ghost as a privacy object

The Lab exposes the Ghost reduction boundary directly:

`NO PROMPT · NO LABELS · NO EVIDENCE REFS · NO PAYLOADS`

This is backed by V3 data-reduction behavior; it is not decorative privacy copy.

### 4. Capsule → Ghost boundary on Proof

The Proof route now treats the two artifacts as separate visual vessels:

`PRIVATE EVIDENCE CAPSULE → REDACT → SHAREABLE WAIT GHOST`

The visual structure makes data minimization legible without requiring a paragraph of explanation.

### 5. Judge memory surface

The Judges route now includes an explicit memory block:

`QuickSpin turns AI waiting into a game you can verify afterward.`

with the secondary lifecycle:

`PRIVATE CAPSULE → REDACTED GHOST → REPLAY / COMPARE`

### 6. Claim-hygiene cleanup

Ambiguous `signed receipt` wording was removed from page metadata/instrument language. The product uses **truthful / directional delta** language unless actual cryptographic signing exists.

### 7. Input / mobile / reduced-motion improvements

- stronger `:focus-visible` treatment;
- material Lab actions use larger touch targets;
- signature rail, Ghost privacy row, redaction split and judge-memory block receive mobile stacking;
- TRACE-only motion is wrapped in `prefers-reduced-motion: no-preference`;
- product meaning remains present when those animations are absent.

## Aesthetic lineage check

### Primary lineage

**Instrument panel / flight recorder / evidence sheet.**

The product should feel like a timing instrument that happens to be playful, not a game portal with analytics attached afterward.

### Secondary influences

- editorial/archival proof sheets;
- industrial state labeling;
- receipt/accounting structures;
- lightweight game feedback;
- measurement and provenance diagrams.

### Accidental lineages actively avoided

- generic dark-blue/black AI dashboards;
- purple/cyan “AI glow” gradients;
- glassmorphism;
- feature-card soup;
- arbitrary 3D chrome;
- decorative mascots disconnected from state;
- synthetic confidence gauges;
- crypto-proof visual language unsupported by implementation.

## Canonical palette / material language

- **Smoked Pearl / Mineral Silver** — base;
- **Paper Silver** — evidence/content surfaces;
- **Graphite** — typography, hard structure and high-contrast controls;
- **Oxidized Copper** — editorial/instrument accent;
- **Electric Signal** — verified/live/interactive cue only;
- controlled danger red only for failure.

The intended tension remains **futuristic × classical × instrumental**, not cyberpunk.

## Engineering proof for TRACE V1

- final PR CI `35010476926` — PASS;
- final PR CodeQL `35010476921` — PASS;
- post-merge main CI `35010625808` — PASS;
- post-merge main CodeQL `35010625877` — PASS;
- 41 automated tests remain green;
- no SDK/runtime contract file changed in the visual PR.

Retained visual-pass failures are documented in `evidence/TRACE-VISUAL-JURY-V1.md`.

## Runtime provenance boundary

The currently verified public runtime is still the **pre-TRACE V3** production deployment:

- URL: `https://quickspin-runtime.vercel.app`
- source SHA: `cb3b322907197e37518e85ddb377def2053edcc3`
- deployment: `dpl_5rFD3bRMCHK5m6esVazZjz8E6kZG`
- five canonical routes: HTTP 200 verified.

TRACE Visual Jury V1 source `c34012a732e8bb7cd2b5601f1a8f9862a87e4056` is merged and code-validated but **not yet claimed live**.

Therefore implementation presence is **not** promoted into runtime/pixel proof.

## Final rendered acceptance test still required

After an exact `c34012a...` production deployment is proven, a rendered desktop/mobile/reduced-motion pass must explicitly verify:

1. **5-second thesis** — Home communicates wait → play → verify without narration;
2. **signature rail** — Host Event → Play → Capsule → Ghost reads in order and does not wrap into ambiguity;
3. **instrument balance** — new evidence labels do not collide with the timing instrument at common desktop widths;
4. **Lab hierarchy** — Run and After the Wait groups are visually distinct and material controls remain immediately discoverable;
5. **Ghost privacy console** — all four redaction labels remain legible at capture resolution;
6. **negative state distinction** — failure cannot be mistaken for completion/replay/success;
7. **receipt legibility** — actual / played / engaged / felt values remain readable;
8. **Proof boundary** — Capsule and Ghost read as two distinct artifacts with a clear reduction gate;
9. **mobile ~390 px** — no horizontal overflow, clipped labels, illegible arrow rail or collapsed evidence relationship;
10. **touch hierarchy** — primary buttons remain comfortably targetable and do not become an undifferentiated button stack;
11. **reduced motion** — removing TRACE motion does not remove state meaning, redaction meaning, or proof hierarchy;
12. **Electric Signal discipline** — lime remains a verified/interactive cue rather than decorative noise;
13. **classical/futuristic balance** — serif/copper/instrument geometry reads intentional, not themed;
14. **no telemetry overclaim** — visual polish does not imply live provider telemetry where the demo uses controlled host events;
15. **capture safety** — the page remains legible at the dimensions used for the final demo video.

## Current verdict

**PASS_IN_CODE / RUNTIME_VISUAL_PROOF_PENDING.**

The jury hierarchy is merged and fully engineering-validated. Final promotion to visual `PASS` requires an exact `c34012a...` public deployment followed by desktop/mobile/reduced-motion rendered inspection. Until then, the verified pre-TRACE V3 runtime remains the production fallback.
