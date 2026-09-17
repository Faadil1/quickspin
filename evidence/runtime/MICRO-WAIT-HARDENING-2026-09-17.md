# QuickSpin micro-wait hardening — 2026-09-17

## Trigger

Live Tavily E2E video showed two product issues despite successful real search:

1. results from the previous query stayed visible while a new query was in flight;
2. ~1 second provider responses could mount the playable layer, producing a poor ultra-short-wait experience.

## Fix

- Clear prior sourced results, prior search failures, and prior pending state before every new real search.
- Show an explicit `Searching Tavily…` pending state for the active query.
- Raise the playable wait threshold from 650 ms to 1800 ms.
- Keep the host session active from request start so the Evidence Capsule still records real provider latency.
- If Tavily returns before 1800 ms, keep the game passive, suppress Wait Ghost controls for that run, and state the fast-path decision explicitly.
- Suppress the felt/actual stat when no wait has actually been turned into play.
- Clear stale sourced output before the controlled negative-path proof as well.

## Verification

Deterministic patch workflow runs:

- `35203974036`: `npm run check` PASS; `npm run build` PASS.
- `35204077032`: `npm run check` PASS; `npm run build` PASS.

The final branch diff against main contains the product UX change plus this evidence note; temporary patch workflows were deleted before their product commits.
