# Rubric Traceability

| Judge dimension | Product answer | Evidence / artifact | Demo scene |
| --- | --- | --- | --- |
| Waiting experience | optional playable layer, anti-flash threshold, collapse/resume, truthful perceived-wait delta, historical Ghost replay | `src/sdk/widget.ts`, persistence + capsule tests | 12s run → receipt → redacted replay |
| Originality | observed execution becomes gameplay, survives privately as an Evidence Capsule, then can be reduced into a privacy-safe Wait Ghost | `WaitCapsule`, `WaitGhost`, WI V2/V3 evidence | catch signal → inspect capsule → copy/replay ghost |
| AI-native fit | phases/signals come from host runtime; unsupported signal becomes UNKNOWN; historical Ghost replay is explicitly **not** live AI | `ExecutionSignal`, `observe()`, Ghost replay contract | accepted signal → UNKNOWN → replay labelled historical |
| Repeatability | reusable SDK, React + vanilla, portable private capsule, redacted URL-hash Ghost, deterministic replay, signed wait diff | SDK outputs + `capsule.ts` | integration → share link → replay → compare |
| Execution quality | lifecycle, persistence, privacy reduction, fail-closed Ghost token validation, accessibility, CI/CodeQL/security gates | tests, workflows, Failure Ledger | malformed token / failure / Q&A |
| Evidence honesty | no fake percent, failure preserved, UNKNOWN preserved, host intent requires ack, Capsule not crypto-signed, Ghost not live AI, diff has no synthetic winner | Claim Ledger + WI V3 | negative path + ghost truth boundary |

## Canonical judge compression

**Judge memory sentence:** QuickSpin turns AI waiting into a game you can verify afterward.

**Product metaphor:** Flight recorder for playable AI waiting.

**V3 supporting phrase:** Private Capsule. Shareable Ghost. Comparable wait.

Do not replace the memory sentence with the longer supporting phrase in the opening pitch.

## Signature chain

`OBSERVED SIGNAL → PLAYABLE OBJECT → USER INTERACTION → PRIVATE EVIDENCE CAPSULE`

V3 extension:

`PRIVATE CAPSULE → REDACT → WAIT GHOST → SHARE / HISTORICAL REPLAY → SIGNED WAIT DELTA`

Counter-path:

`NO EVIDENCE → UNKNOWN → NO GAMEPLAY CLAIM`

Failure path:

`REQUEST FAILURE → FAILED CAPSULE → NO FABRICATED ANSWER`

## Head-to-head distinction

- **Agent-visualization/game entries:** QuickSpin is a reusable runtime contract with persistent evidence, not one app-specific visualization.
- **Useful-wait assistant entries:** QuickSpin keeps host-authorized intervention small instead of cloning chat/files/productivity features.
- **Generic waiting games/extensions:** the public field already contains play/quiz/focus/bubble/micro-content mechanics; QuickSpin does not compete by adding more games.
- **Observed open space:** private provenance-bearing wait record → redacted social derivative → replay → wait regression diff. This is an observed-public-field hypothesis, not an exclusivity claim.

## Privacy distinction

Full Capsule may contain host-owned provenance and failure details. Wait Ghost deliberately excludes labels, refs, arbitrary intervention payload, private record id, wall-clock timestamp, host acknowledgement reason/ref, and failure details.

Replay consumes the redacted historical timeline only. It never calls the host execution-signal contract.

## Claim boundaries

- Not claimed: QuickSpin reduces model/provider latency.
- Not claimed: every user perceives a shorter wait.
- Not claimed: deterministic demo events are live production AI.
- Not claimed: controlled failure is a live provider outage.
- Not claimed: Evidence Capsule or Wait Ghost is cryptographically signed.
- Not claimed: Wait Ghost proves host honesty.
- Not claimed: Ghost replay is live AI.
- Not claimed: wait diff determines a winner/quality score.
- Not claimed: public competitor scan covers every submission or proves exclusivity.
- Not claimed: V3 is on the public runtime until the exact post-merge deployment is verified.
