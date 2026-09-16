# Native Black Box Consolidation

## Why this exists

The prior live site stacked three presentation layers at runtime (`main.ts`, `jury.ts`, and `black-box-arcade.ts`) with separate CSS systems. User video review on 2026-09-16 showed visible integration failures: a coral hero block reading like a placeholder, old Future Classic panels still visible underneath Black Box treatments, inconsistent hierarchy between Home/Lab/Proof, and a patched-dashboard feel in the Lab.

## Correction

The candidate removes the overlay architecture and collapses presentation into one native render system:

- one runtime entry: `src/demo/main.ts`
- one presentation stylesheet: `src/demo/site.css`
- old `jury.*`, `black-box-arcade.*`, `black-box-luxury.css`, and the separate jury empty-state stylesheet removed
- lifecycle rail, Lab storyline, Ghost privacy boundary, Capsule→Ghost redaction split, SDK contract strip, Judge memory sentence/claim matrix, and mobile dock rendered directly in the canonical DOM
- product SDK, persistence, Evidence Capsule, Wait Ghost, replay, compare, failure and UNKNOWN contracts unchanged

## Intended visual result

The system should read as one coherent Black Box Arcade product rather than a legacy page with TRACE overlays. Color remains high-risk but structured: pitch black / graphite / acid signal / electric violet / infrared coral / oxidized copper / petrol teal. Coral is reserved for warning/refusal/error semantics and must not dominate the hero as a generic decorative block.

## Verification

The one-shot migration run `35135751219` passed Prettier, TypeScript, 41 tests, `judge:verify`, and the Vite demo build before committing the consolidation. The migration script and temporary workflow were removed after success.

Permanent PR CI + CodeQL and public-runtime verification remain required before promotion.
