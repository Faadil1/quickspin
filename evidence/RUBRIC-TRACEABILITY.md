# Rubric Traceability

| Judge dimension | Product answer | Evidence / artifact | Demo scene |
| --- | --- | --- | --- |
| Waiting experience | optional playable layer, anti-flash threshold, collapse/resume, truthful perceived-wait delta | `src/sdk/widget.ts`, persistence tests | 12s before/after + Wait Receipt |
| Originality | observed execution becomes game content **and survives as a post-run Evidence Capsule** rather than disappearing with the animation | Execution Signals, `WaitCapsule`, WI V2 distinction evidence | catch signal → inspect capsule |
| AI-native fit | phases, completion, tool/retrieval/artifact/warning signals come from host runtime; no-proof signal is rejected UNKNOWN; `observe()` forwards host-observed events without inference | `ExecutionSignal`, `WaitSession.observe`, execution trail | accepted signal → deliberate UNKNOWN → capsule |
| Repeatability | reusable SDK contract, two games, React + vanilla mounting, host intervention intent/ack contract, portable capsule JSON | SDK build outputs, types, README/code sample | integration block + capsule export |
| Execution quality | lifecycle state machine, persistence, accessibility, release checks, CodeQL, explicit failure truth | CI, tests, release workflow, Failure Ledger | negative path + Q&A |
| Evidence honesty | no fake percent, failed outcomes preserved, UNKNOWN rejection, host intervention is not execution until acknowledged, capsule is not claimed as cryptographic proof | Failure Ledger, Reality Anchor, Claim Ledger | negative path + evidence feed |

## Winning Intelligence V2 judge compression

**Judge memory sentence:** QuickSpin turns AI waiting into a game you can verify afterward.

**Product metaphor:** Flight recorder for playable AI waiting.

**Signature path:**

`OBSERVED SIGNAL → PLAYABLE OBJECT → USER INTERACTION → EVIDENCE CAPSULE`

**Counter-path:**

`NO EVIDENCE → UNKNOWN → NO GAMEPLAY CLAIM`

**Failure path:**

`REQUEST FAILURE → FAILED CAPSULE → NO FABRICATED ANSWER`

## Head-to-head distinction

- Versus agent-visualization games: QuickSpin is a reusable host runtime with persistent provenance rather than one app-specific visualization.
- Versus “useful waiting” assistant surfaces: QuickSpin exposes a small host-authorized intervention contract instead of cloning chat/file/productivity features.
- Versus generic waiting minigames: observed runtime signals can change gameplay and remain inspectable after the run.

Boundary: competitor intelligence is based on observed public material and is **not** claimed exhaustive across all Commonsmade applicants.

## Claim boundaries

- Not claimed: QuickSpin reduces model/provider latency.
- Not claimed: every user perceives a shorter wait.
- Not claimed: deterministic demo events are live production AI.
- Not claimed: controlled failure is a live provider outage.
- Not claimed: the Evidence Capsule is cryptographically signed.
- Not claimed: an intervention intent means a host/model action occurred before host acknowledgement.
- Not claimed: the public competitor scan covers every submission.
- Not claimed: WI V2 is already deployed publicly until post-merge runtime proof is refreshed.
