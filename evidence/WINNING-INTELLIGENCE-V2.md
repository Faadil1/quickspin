# QuickSpin — Winning Intelligence V2

Status: **ACTIVE PRODUCT DIFFERENTIATION PASS**

## Scope

Re-run after `Faadil1/opeyemi-handoff` was merged into `opeblow/QuickSpin:main` on 2026-09-15.

Canonical loop:

`QUALIFY → DECIDE → DISTINCTION GATE → DESIGN → DELIVER → AUDIT → EXPAND`

Judge path:

`RUBRIC → PAIN → PROBLEM → DIFFERENTIATOR → EXECUTION → EVIDENCE → STORY → DEMO → Q&A`

## Official judging surface

Publicly stated criteria for the Commonsmade “Make Waiting for AI Fun” challenge:

1. waiting experience
2. originality
3. AI-native fit
4. repeatability
5. execution

No unofficial numeric weights are assumed.

## Submission intelligence — observed public competitors

### VibeQuest

Observed public behavior:
- AI-agent build prompt
- AST / architecture-planning visualization
- mini-game attached to agent activity
- x402 packages as falling gameplay objects
- bug-squashing interaction
- educational insight / real-world takeaway
- $CMNS / compute-rebate framing

Threat to QuickSpin:
- strong immediate AI-native story
- high visual/game spectacle
- direct relationship between “what the agent is doing” and what appears in play

### Mochi

Observed public claims:
- interactive waiting layer
- task progress
- refine / retry / extend / explore while the agent works
- voice input
- file/image support
- conversation history

Threat to QuickSpin:
- converts waiting into useful work, not only entertainment
- stronger “user can act while waiting” story

### Other public submissions

Public search also surfaces broader Commonsmade entries such as LaunchX. These characterize the competitive environment but are not treated as direct waiting-UX competitors unless their public submission demonstrates challenge-specific waiting behavior.

Boundary: the Commonsmade submission gallery is not fully indexable from the public web. This intelligence pass only claims observed public submissions; it does not claim exhaustive coverage of every applicant.

## Current QuickSpin advantage

QuickSpin already owns a different axis:

> **A reusable playable waiting runtime where game content can be driven by observed execution evidence, uncertainty stays UNKNOWN, failure stays failure, and every wait can be measured.**

Existing differentiators:
- embeddable SDK instead of one host app
- truthful indeterminate progress
- evidence-bearing Execution Signals
- `UNKNOWN / INSUFFICIENT_EVIDENCE` abstention
- explicit completed / cancelled / failed outcomes
- real controlled negative path
- Wait Receipt with actual / engaged / perceived wait
- keyboard / pointer / reduced-motion support
- host lifecycle / Shadow DOM / React + JS packaging

## Hidden spots found

### H1 — Execution provenance disappears after the moment

Signals have `evidenceRef`, but persisted session records do not retain the execution trail. After the wait ends, the strongest AI-native proof is mostly ephemeral.

Decision: **BUILD** a portable Evidence Capsule / execution trail into every session record.

### H2 — “Game instead of spinner” objection can still survive the first 10 seconds

The SDK architecture disproves the objection technically, but the product needs a signature behavior that a judge can remember instantly.

Decision: canonical signature moment:

> **Catch a real execution signal → see its evidence reference survive into the Wait Capsule → deliberately reject an unproven signal as UNKNOWN → fail the request without fabricating an answer.**

### H3 — QuickSpin measures engagement, but not evidence coverage

A host may emit many phase labels and few evidence-backed signals. The receipt currently cannot distinguish a richly observed run from a mostly narrative run.

Decision: add transparent counts, not a synthetic quality score:
- accepted signals
- rejected signals
- unique evidence references
- phase changes

### H4 — Useful waiting is becoming a competitor category

Mochi demonstrates refine/retry/explore while waiting. QuickSpin should not clone that product surface.

Decision: expose a small **host intervention contract** that lets the waiting surface emit an intent such as `cancel`, `retry`, `refine`, or custom host action without pretending QuickSpin executed it. The host must acknowledge or reject the intervention.

### H5 — Real AI integration proof is still host-dependent

QuickSpin’s public demo uses deterministic observed demo events, not a live provider. That is honest, but AI-native fit could be challenged.

Decision: add a generic `observe()` bridge for real host runtime events and a deterministic replay fixture demonstrating the same contract. Do not hard-code provider-specific APIs or claim a live provider without credentials/evidence.

### H6 — Commonsmade submission is an operational gate

Public participation instructions indicate projects are built/published through Commonsmade and then added to the hackathon. External GitHub/Vercel proof is supplemental, not a substitute for the actual Commonsmade submission flow.

Decision: keep `COMMONS_SUBMISSION_LOCK` as an explicit human gate until the project is visibly published/attached in Commonsmade.

## Distinction Gate

### Non-obvious truth

Waiting is not dead time if the waiting surface is coupled to **real execution truth** — but entertainment becomes misleading the moment the interface invents progress or silently converts failure into success.

### Judge memory sentence

> **QuickSpin turns AI waiting into a game you can verify afterward.**

### Product metaphor

**Flight recorder for playable AI waiting.**

### Signature behavior

`OBSERVED SIGNAL → PLAYABLE OBJECT → USER INTERACTION → EVIDENCE CAPSULE`

Counter-path:

`NO EVIDENCE → UNKNOWN → NO GAMEPLAY CLAIM`

Failure path:

`REQUEST FAILURE → FAILED CAPSULE → NO FABRICATED ANSWER`

### Generic baseline

Spinner / progress animation / unrelated mini-game.

### Head-to-head advantage

- versus visual agent-game entries: reusable and provenance-bearing rather than one app-specific visualization.
- versus useful-wait assistant entries: integration layer for any AI app rather than another assistant surface.
- versus generic mini-games: play is coupled to observed runtime events and survives as post-run evidence.

## Anti-slop kill list

Do not add:
- fake percentages
- inferred tool calls
- generic “AI is thinking” particles as proof
- made-up provider telemetry
- chat/file features only because competitors have them
- token/points mechanics without a product reason
- dashboards whose metrics cannot be recomputed
- cryptographic/signature wording unless a real signature exists

## Product deltas authorized by this pass

P0:
1. Evidence Capsule / persistent execution trail
2. evidence coverage counts (not a synthetic score)
3. host intervention intent + explicit host acknowledgement/rejection
4. `observe()` bridge for host-observed runtime events
5. demo signature sequence covering accepted signal → UNKNOWN → failed outcome

P1:
6. export/copy capsule JSON
7. judge page head-to-head distinction panel
8. submission gate for Commonsmade publish/attach proof

## Claim classes

- deterministic: state machine, rejected-signal behavior, capsule schema, failure outcome
- constrained: public deterministic demo and replay fixtures
- probabilistic: perceived-wait improvement across users
- human-reviewed: Commonsmade submission completeness, final visual quality
- unknown until supplied: exhaustive competitor gallery, live provider integration, final judge outcome

## Stop condition

Maximum 3 product-differentiation iterations.
Stop when:
- all P0 deltas are verified,
- judge memory sentence is demonstrated by the primary demo path,
- no direct public competitor occupies the same exact provenance + reusable-runtime position,
- next improvement is primarily visual polish or yields <3 points of expected judge-path gain.
