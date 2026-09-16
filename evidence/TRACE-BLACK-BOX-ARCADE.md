# TRACE — Black Box Arcade

Status: **MERGED / CI + CODEQL PASS / OFFLINE EXACT-ARTIFACT PIXEL PROOF PASS / PUBLIC EXACT-SHA DEPLOY PENDING**

## Product candidate

- merge SHA: `8d5ffd705588f449f54eed3365489e027bc1c84d`
- PR: #16
- final PR CI: `35046055844` — PASS
- final PR CodeQL: `35046055937` — PASS
- post-merge CI: `35046206408` — artifact produced from exact merge SHA
- tests: **41 / 41**
- demo artifact: `quickspin-demo-dist-22`
- artifact id: `10426614209`
- artifact digest: `sha256:519d81e124b251b5ffec8ea38874186d22fca5e0108a36ec69220f1cb48a49e8`

## Objective

Push QuickSpin beyond the prior future-classic treatment without changing product mechanics. The visual system must make `play + truth + replay` memorable while preserving the verified SDK/runtime contracts.

## Reference routing used

### Product flow / mobile
- Mobbin — mobile hierarchy and proven product-flow discipline
- Pageflows — task sequencing and progressive disclosure
- Beautiful UI — AI-native state/approval/thinking references

### Art direction
- Annual Report Gallery — editorial hierarchy, evidence storytelling
- Studio Thonik — typography as structure/identity
- Cue Design — premium interaction mechanisms
- Awwwards — composition ambition only, not UX authority
- Inspora — uniqueness / anti-generic audit

### Interaction / motion
- Rare UI — signature interaction language
- 60FPS Design — micro-interaction quality bar
- Motion Primitives / transitions.dev — state transition discipline
- Codrops / React Bits — localized experimental treatment only

### System / implementation
- shadcn principles — accessible/composable primitives
- ReUI / OpenSourceUI — information-dense system patterns
- UI Skills / Design System Checklist — coverage/a11y/motion gap checking

## Direction

**BLACK BOX ARCADE — forensic play for AI waiting.**

Visual tension:
- editorial seriousness
- arcade energy
- instrumentation
- redaction / evidence artifacts
- futuristic color signals without generic AI blue/navy SaaS styling

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
- action grouping retained from TRACE jury pass
- evidence ledger treated as an instrument
- failure and Ghost/replay actions use distinct semantic colors

### Proof
- Capsule vs Ghost remains the primary composition
- redaction gate is visually explicit
- trust-boundary seal added
- Coral reserved for refusal/boundary emphasis

### SDK
- contract-first presentation
- host authority / fail-closed / portable-proof strip
- petrol technical treatment
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
- Mobile: motion reduced; no pointer-only dependency
- `prefers-reduced-motion: reduce`: all ambient and decorative motion disabled

## Mobile

- dedicated 5-route bottom dock rather than desktop nav simply collapsing
- stacked proof surfaces
- no pointer spotlight on mobile
- action hierarchy preserved
- bottom padding added to prevent dock overlap

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

The exact post-merge CI demo artifact from `8d5ffd705588f449f54eed3365489e027bc1c84d` was rendered offline because the environment blocks normal localhost/file navigation. The transport was shimmed only to select each existing route; the built JS/CSS bytes were otherwise used as produced by CI.

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
- Evidence Feed empty state remains explicit rather than reading as a broken panel
- Home / Proof / Judges hierarchy remains readable without narration
- Capsule → redaction → Ghost trust boundary remains visible

Pixel verdict: **PASS_OFFLINE_EXACT_CI_ARTIFACT**.

Boundary: this does **not** prove that the public Vercel URL is serving `8d5ffd705588f449f54eed3365489e027bc1c84d`. Public exact-SHA runtime promotion remains open.

## Failures retained

- PR #16 first CI run `35045685112`: TypeScript + Prettier failed. TypeScript rejected an optional DOM target; formatting also failed.
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
- public exact-SHA runtime: **PENDING**
