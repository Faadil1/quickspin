# TRACE — Black Box Arcade

Status: **IMPLEMENTED / PENDING PR CI + CODEQL + PIXEL INSPECTION**

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

Only demo/presentation surfaces are changed.

## Acceptance gates

- branch diff remains presentation-only
- format + Node 22/24 + 41 tests + judge verifier + SDK/demo builds pass
- CodeQL passes
- desktop + mobile pixel inspection
- reduced-motion inspection
- no horizontal overflow
- no unsupported claim introduced
