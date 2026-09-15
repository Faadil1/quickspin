# TRACE Visual Jury V1 — code proof and retained failures

Status: **MERGED / CODE-VALIDATED / PUBLIC RUNTIME REFRESH PENDING**

Product scope remains frozen after Winning Intelligence 3/3. This pass changes presentation and judge legibility only; it does **not** change QuickSpin SDK, persistence, Wait Ghost semantics, replay semantics, or host contracts.

## Exact candidate

- PR: `#14` — `feat: TRACE visual jury V1 — make the V3 proof memorable`
- Exact visual merge SHA: `c34012a732e8bb7cd2b5601f1a8f9862a87e4056`
- Final PR CI: `35010476926` — PASS
- Final PR CodeQL: `35010476921` — PASS
- Post-merge main CI: `35010625808` — PASS
- Post-merge main CodeQL: `35010625877` — PASS
- Final test count: **41 / 41**

## Scope lock

Only three product/demo files changed in the visual PR:

1. `index.html`
2. `src/demo/jury.ts`
3. `src/demo/jury.css`

No SDK file changed.

## Judge-visible deltas

- Above-the-fold lifecycle: `HOST EVENT → PLAY → PRIVATE CAPSULE → REDACTED WAIT GHOST`
- Home memory cue: `PLAY → VERIFY → Verify afterward.`
- Lab actions grouped into `RUN` and `AFTER THE WAIT`
- Wait Ghost privacy console exposes the reduction boundary: `NO PROMPT / NO LABELS / NO EVIDENCE REFS / NO PAYLOADS`
- Proof route makes `PRIVATE EVIDENCE CAPSULE → REDACT → SHAREABLE WAIT GHOST` visible as an object relationship, not prose only
- Judges route surfaces the canonical memory sentence directly
- Keyboard focus hierarchy strengthened
- Material Lab controls use judge/touch-friendly targets
- Mobile stacking added for signature rail, redaction split, Ghost privacy row, and judge memory surface
- Motion enhancements only run under `prefers-reduced-motion: no-preference`
- Ambiguous `signed receipt` copy removed from metadata/instrument; directional/truthful language is used instead

## Aesthetic lineage check

Primary lineage: **instrument panel / flight recorder / editorial evidence sheet**.

Secondary influences: restrained industrial labeling, archival proof objects, game-native state feedback.

Accidental lineages actively avoided: generic dark AI SaaS, neon agent dashboard, decorative glassmorphism, feature-card soup, mascot-for-decoration, synthetic confidence gauges.

## Retained failures

### TRACE-F-01 — PR #14 first permanent format gate failed

- CI run: `35009685840`
- Product truth at the same time: TypeScript, tests, judge verifier, demo build and SDK build passed on Node 22/24.
- Failure truth: Prettier rejected `src/demo/jury.ts`; therefore the PR was **not** mergeable.
- Lesson: presentation-only work is still subject to the complete engineering gate.

### TRACE-F-02 — First manual formatting transcription still failed

- CI run: `35009845739`
- Exact failure surface remained `src/demo/jury.ts` formatting only.
- Cause: the manually transcribed output did not exactly match Prettier 3.9.6 quote selection for two short HTML fragments.
- Recovery: a read-only Actions inspector ran the repo-pinned Prettier and printed its exact output; the temporary inspector workflow was deleted before merge.
- Final recovery proof: `35010476926` passed format, Node 22/24, 41 tests, judge verifier, demo build, SDK build and artifacts.

### TRACE-F-03 — Canonical promotion exposed stale V3 verifier provenance

- CI run: `35010862486`
- TypeScript and all 41 tests passed; `judge:verify` failed because it still required `current_main_sha: cb3b322...` after TRACE Visual Jury V1 had truthfully moved the candidate forward.
- The failure was not bypassed.
- Mitigation: verifier now requires the TRACE merge SHA, keeps the deployed runtime pinned to the older verified V3 SHA until a new deployment is proven, and explicitly rejects premature promotion of TRACE runtime status.
- Recovery verifier commit: `b357c00f2d0943b459df160e5afc9d46df0a7818`.

## Runtime boundary

The currently verified public runtime is still the pre-TRACE V3 deployment:

- URL: `https://quickspin-runtime.vercel.app`
- Source SHA: `cb3b322907197e37518e85ddb377def2053edcc3`
- Deployment: `dpl_5rFD3bRMCHK5m6esVazZjz8E6kZG`

Therefore these claims are currently **REFUSED**:

- `TRACE Visual Jury V1 is already live in production`
- `The current public URL proves c34012a...`
- `Pixel-level desktop/mobile/reduced-motion inspection is complete`

Next required proof: deploy **exactly** `c34012a732e8bb7cd2b5601f1a8f9862a87e4056`, verify the five canonical routes and served TRACE bundle, then perform runtime visual inspection.
