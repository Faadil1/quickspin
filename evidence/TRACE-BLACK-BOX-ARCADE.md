# TRACE — Black Box Arcade

Status: **MERGED / CI + CODEQL PASS / OFFLINE EXACT-ARTIFACT PIXEL PROOF PASS / PUBLIC EXACT-SHA RUNTIME PASS**

## Product candidate

- merge SHA: `8d5ffd705588f449f54eed3365489e027bc1c84d`
- PR: #16
- final PR CI: `35046055844` — PASS
- final PR CodeQL: `35046055937` — PASS
- post-merge CI: `35046206408` — PASS / artifact produced from exact merge SHA
- post-merge CodeQL: `35046206399` — PASS
- tests: **41 / 41**
- demo artifact: `quickspin-demo-dist-22`
- artifact id: `10426614209`
- artifact digest: `sha256:519d81e124b251b5ffec8ea38874186d22fca5e0108a36ec69220f1cb48a49e8`

## Objective

Push QuickSpin beyond the prior future-classic treatment without changing product mechanics. The visual system must make `play + truth + replay` memorable while preserving the verified SDK/runtime contracts.

## Direction

**BLACK BOX ARCADE — forensic play for AI waiting.**

Visual tension:
- editorial seriousness
- arcade energy
- instrumentation
- redaction / evidence artifacts
- futuristic color signals without generic AI blue/navy SaaS styling

## Reference routing used

- Product flow / mobile: Mobbin, Pageflows, Beautiful UI
- Art direction: Annual Report Gallery, Studio Thonik, Cue Design, Awwwards, Inspora
- Interaction / motion: Rare UI, 60FPS Design, Motion Primitives, transitions.dev, Codrops, React Bits
- System / implementation: shadcn principles, ReUI, OpenSourceUI, UI Skills / Design System Checklist

## Palette

- pitch black `#08090c`
- graphite `#151920`
- paper fog `#f0ebe2`
- acid signal `#c8ff4d`
- electric violet `#785cff`
- infrared coral `#ff6957`
- oxidized copper `#c57942`
- petrol teal `#147783`

Semantic use:
- acid = live / verified / primary action
- violet = Ghost / replay / derivative artifact
- coral = failure / refusal / warning
- copper = archive / proof / editorial structure
- petrol = technical utility / SDK

## Page implementation

### Home
- Black Box hero instrument
- proof-status ticker
- evidence lifecycle rail
- editorial design-thesis note
- higher-risk dark material palette

### Lab
- clear WAIT → PLAY → RECORD → DERIVE progression
- evidence ledger treated as an instrument
- failure and Ghost/replay actions use distinct semantic colors

### Proof
- Capsule vs Ghost remains the primary composition
- redaction gate is visually explicit
- trust-boundary seal added

### SDK
- contract-first presentation
- host authority / fail-closed / portable-proof strip
- no change to SDK behavior

### Judges
- claim-class matrix: VERIFIED / UNKNOWN / REFUSED / PORTABLE
- judge-memory sentence remains dominant
- no new product claim introduced

## Motion grammar

`TARGET → TRIGGER → MOTION → TIMING → EXIT/RETURN → INPUT PARITY → REDUCED MOTION`

- Host/evidence surfaces: pointer proximity → localized spotlight → immediate return on exit
- Ghost surface: hover → modest elevation / material shift
- Global scanline: passive ambient signal only
- Buttons: hover/focus → short elevation + border emphasis
- Mobile: no pointer-only dependency
- `prefers-reduced-motion: reduce`: ambient and decorative motion disabled

## Mobile

- dedicated 5-route bottom dock rather than desktop nav simply collapsing
- stacked proof surfaces
- no pointer spotlight on mobile
- action hierarchy preserved
- bottom padding prevents dock overlap

## Scope boundary

No changes to:
- SDK contracts
- persistence schema
- Wait Capsule / Wait Ghost logic
- failure semantics
- UNKNOWN behavior
- replay semantics
- tests

Only demo/presentation surfaces changed.

## Exact-artifact pixel proof

The exact post-merge CI demo artifact from `8d5ffd705588f449f54eed3365489e027bc1c84d` was rendered offline before deployment.

Inspected routes:
- `/`
- `/lab`
- `/proof`
- `/sdk`
- `/judges`

Inspected modes:
- desktop `1440 × 1000`
- mobile `390 × 844`
- reduced-motion mobile for Home + Lab

Results:
- **0 console/page errors** across all inspected routes
- **0 horizontal overflow** across all desktop/mobile routes
- **0 running animations** under `prefers-reduced-motion: reduce`
- mobile dock does not require pointer interaction
- Home / Proof / Judges hierarchy remains readable without narration
- Capsule → redaction → Ghost trust boundary remains visible

Pixel verdict: **PASS_OFFLINE_EXACT_CI_ARTIFACT**.

## Public exact-SHA runtime proof

Production deployment:
- Vercel project: `quickspin-runtime`
- project id: `prj_7BesKgTL3aTrP6xVZUwIDQSmGQ50`
- deployment id: `dpl_DyRMr38opKz8kkQjhrKFDSert9Xb`
- canonical alias: `https://quickspin-runtime.vercel.app`
- state: **READY**

Build logs explicitly show:
- `git checkout 8d5ffd705588f449f54eed3365489e027bc1c84d`
- detached HEAD `feat: Black Box Arcade — all-phase TRACE design pass`
- `npm ci` with **0 vulnerabilities**
- TypeScript typecheck PASS
- Vite 7.3.6 build PASS
- output assets `/assets/index-B6DEyjeB.js` and `/assets/index-CYrpJ5m5.css`

External production fetches returned **HTTP 200 OK** for:
- `/`
- `/lab`
- `/proof`
- `/sdk`
- `/judges`

The served JS asset was fetched directly with HTTP 200 and contains Black Box Arcade markers including:
- `VERIFIED / 41 TESTS`
- `PRIVATE → REDACT → SHARE`
- `WATCH THE STATE, NOT A FAKE PERCENTAGE.`
- `HOST AUTHORITY`
- the `VERIFIED / UNKNOWN / REFUSED / PORTABLE` judge matrix
- the five-route mobile dock.

Public runtime verdict: **PASS_VERIFIED_VERCEL_BLACK_BOX_ARCADE_EXACT_SHA**.

## Failures retained

- PR #16 first CI run `35045685112`: TypeScript + Prettier failed.
- PR #16 second CI run `35045823209`: TypeScript was fixed, but Prettier still rejected `black-box-arcade.ts`.
- Recovery: authoritative Prettier 3.9.6 output was generated in a read-only one-shot workflow, applied exactly, and the workflow was removed before final validation.
- Final recovery proof: CI `35046055844` + CodeQL `35046055937` both passed before merge.

## Acceptance gates

- presentation-only diff: PASS
- format: PASS
- Node 22/24: PASS
- 41 tests: PASS
- judge verifier: PASS
- SDK/demo builds: PASS
- CodeQL: PASS
- desktop pixel inspection: PASS_OFFLINE_EXACT_ARTIFACT
- mobile pixel inspection: PASS_OFFLINE_EXACT_ARTIFACT
- reduced motion: PASS_OFFLINE_EXACT_ARTIFACT
- horizontal overflow: NONE OBSERVED
- unsupported claim introduced: NO
- public exact-SHA runtime: **PASS_VERIFIED_VERCEL_BLACK_BOX_ARCADE_EXACT_SHA**

`PROJECT_COMPLETE` remains false until video, live Q&A, Commonsmade/submission asset locks, terminal reconciliation and final QC are complete.
