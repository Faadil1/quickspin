# Canonical Cycle & Gate Matrix — QuickSpin

This is the anti-omission control surface for the hackathon build. It combines the narrative/product cycle, Winning Intelligence, cross-cutting quality gates, platform-submission truth, and the terminal promotion sequence.

## A. Core judge/product cycle

`RUBRIC → PAIN → PROBLEM → DIFFERENTIATOR → EXECUTION → EVIDENCE → STORY → DEMO → Q&A`

| Stage | Required proof | QuickSpin status | Canonical evidence |
| --- | --- | --- | --- |
| RUBRIC | challenge-native fit and judge dimensions mapped | PASS | `RUBRIC-TRACEABILITY.md` |
| PAIN | real user/system pain, not invented | PASS | `REALITY-ANCHOR.md` |
| PROBLEM | precise failure of current waiting experience | PASS | Reality Anchor + demo before/after |
| DIFFERENTIATOR | product-specific mechanism, not cosmetic novelty | PASS_STRENGTHENED_WI_V2 | execution signals + Evidence Capsule + intervention ack contract |
| EXECUTION | working SDK/runtime and lifecycle | IMPLEMENTED_PENDING_WI_V2_PR_VALIDATION | source, tests, builds |
| EVIDENCE | claims tied to primary/first-party/runtime evidence | PASS_WITH_LIMITATIONS | Claim/Failure ledgers, CI, security evidence |
| STORY | judge narrative compresses pain → mechanism → proof | PASS_STRENGTHENED_WI_V2 | `WINNING-INTELLIGENCE-V2.md`, demo/submission draft |
| DEMO | material claims are demonstrable | IMPLEMENTED_PENDING_WI_V2_DEPLOY_AND_CAPTURE | happy path, Capsule, receipt, failure, UNKNOWN, intervention |
| Q&A | adversarial objections answered without invention | PREPARED_PENDING_LIVE_REHEARSAL | `JUDGE-QA.md`, `Q&A-REHEARSAL.md` |

## B. Winning Intelligence cycle

`QUALIFY → DECIDE → DISTINCTION GATE → DESIGN → DELIVER → AUDIT → EXPAND`

| Stage | Status | Proof |
| --- | --- | --- |
| QUALIFY | PASS | challenge/rubric fit remains valid |
| DECIDE | PASS | differentiation pass authorized before next visual pass |
| DISTINCTION GATE | PASS_IMPLEMENTED_PENDING_PR_VALIDATION | memory sentence, metaphor, signature/counter/failure paths in `WINNING-INTELLIGENCE-V2.md` |
| DESIGN | PASS_PRODUCT_CONTRACT_DELTA | Evidence Capsule + observe/intervention contracts |
| DELIVER | IMPLEMENTED_PENDING_INDEPENDENT_PR_CI_CODEQL | `winning-intelligence-v2` branch |
| AUDIT | ACTIVE | CI/CodeQL + canonical reconciliation |
| EXPAND | STOP_AFTER_VALIDATION_UNLESS_NEW_HIGH_SIGNAL_EVIDENCE | max 3 loops; avoid scope inflation |

**Judge memory sentence:** QuickSpin turns AI waiting into a game you can verify afterward.

**Product metaphor:** Flight recorder for playable AI waiting.

## C. Mandatory reality-anchor pattern

`SIGNAL / OPPORTUNITY → REAL NEGATIVE EVENT → OBSERVABLE IMPACT → DESIGN LESSON → RESPONSE / MITIGATION`

All five are **PASS** in `REALITY-ANCHOR.md`, with mitigation explicitly scoped to waiting experience/evidence integrity rather than provider reliability.

## D. Failure-truth gates

| Gate | Pass condition | Status |
| --- | --- | --- |
| REAL_FAILURE_GT_FAKE_SUCCESS | failures remain in evidence after repair | PASS |
| REAL_EXTERNAL_NEGATIVE_EVENT | at least one primary-source real event | PASS — OpenAI June 2–3, 2026 |
| RUNTIME_NEGATIVE_PATH | actual failure terminates as failure, not completion | PASS |
| UNKNOWN_ABSTENTION | insufficient provenance produces UNKNOWN/refusal | PASS |
| NO_FAKE_PROGRESS | unknown progress stays indeterminate | PASS |
| NO_FAKE_RESPONSE | failed request path produces no fabricated AI answer | PASS |
| INTERVENTION_AUTHORITY | intent is not claimed executed until host acknowledgement | IMPLEMENTED_PENDING_PR_VALIDATION |
| CAPSULE_BOUNDARY | portable evidence bundle is not mislabeled cryptographic proof | PASS_IN_CLAIM_DISCIPLINE |
| CLAIM_BOUNDARY | mitigation is not overstated as provider repair | PASS |

## E. Cross-cutting build gates

| Gate | Why it exists | Status |
| --- | --- | --- |
| ELIGIBILITY / RULE FIT | avoid building something ineligible | PASS_WITH_CURRENT_RUBRIC_EVIDENCE |
| SCOPE LOCK | prevent late scope explosion | PASS — WI V2 limited to differentiation P0/P1; max 3 loops |
| BUILD CORRECTNESS | typecheck/tests/build must pass | WI_V2_TRANSIENT_PASS_PENDING_INDEPENDENT_PR |
| CODEQL | static security/quality scan | PASS_PRE_WI_V2; WI_V2_PR_PENDING |
| DEPENDENCY SECURITY | no unresolved npm audit findings in candidate | PASS_ZERO_NPM_AUDIT |
| SUPPLY-CHAIN INSTALL SCRIPTS | surface unreviewed dependency lifecycle scripts instead of silently trusting them | REVIEWED_WARNING_NONRUNTIME — `esbuild@0.28.2`; package boundary excludes build tooling |
| PACKAGE BOUNDARY | dev toolchain not leaked into published package surface | PASS |
| RELEASE REPRODUCIBILITY | release workflow builds SDK + demo artifacts | PASS |
| ACCESSIBILITY / INPUT PARITY | keyboard/pointer/focus support where required | PASS_WITH_IMPLEMENTATION_TEST_EVIDENCE |
| REDUCED MOTION | reduced-motion behavior exists | PASS_IN_IMPLEMENTATION_PENDING_RENDER_INSPECTION |
| FAST RESPONSE / ANTI-FLASH | game UI does not flash for short waits | PASS_IN_IMPLEMENTATION |
| STATE/LIFECYCLE INTEGRITY | waiting/playing/ready/completed/failed/cancelled are distinct | PASS |
| PERSISTENCE INTEGRITY | terminal truth + execution trail + evidence counts stay semantically correct | IMPLEMENTED_PENDING_PR_VALIDATION |
| PERFORMANCE / BUNDLE SANITY | browser SDK remains lightweight and buildable | PENDING_WI_V2_PR_BUILD_ARTIFACT |
| LICENSE / IP / THIRD-PARTY CLAIMS | no unverified asset/license claim introduced | PASS_WITH_NO_NEW_EXTERNAL_ASSET_DEPENDENCY |
| ROLLBACK / RECOVERY | candidate can be abandoned without corrupting main | PASS — isolated branch model |
| COLLABORATOR HANDOFF | state/evidence makes continuation unambiguous | PASS_ACTIVE |

## F. Judge/runtime gates

| Gate | Pass condition | Status |
| --- | --- | --- |
| UX/UI LEGIBILITY | proof readable without narration | PASS_WITH_CONDITIONS |
| ANTI-AI-SLOP / DOMAIN-NATIVE VISUAL | visual language supports waiting/play/evidence thesis | PASS_WITH_CONDITIONS |
| PUBLIC RUNTIME | returned live URL fetched and exercised | **PASS_VERIFIED_VERCEL_RUNTIME** — current future-classic runtime |
| WI_V2 PUBLIC RUNTIME REFRESH | merged WI V2 exact SHA deployed and routes reverified | PENDING_POST_MERGE |
| DESKTOP RUNTIME INSPECTION | core flow visually checked on final URL | PENDING |
| MOBILE RUNTIME INSPECTION | responsive/mobile proof checked on final URL | PENDING |
| HAPPY-PATH DEMO | exact 12s comparison + response handoff | PASS_PENDING_FINAL_CAPTURE |
| EVIDENCE CAPSULE DEMO | accepted evidence, UNKNOWN, host ack and persistent trail visible | IMPLEMENTED_PENDING_DEPLOY_AND_CAPTURE |
| WAIT RECEIPT DEMO | actual/played/engaged/felt shown | PASS_PENDING_CAPTURE |
| NEGATIVE-PATH DEMO | rejected Promise visibly becomes failed outcome | PASS_PENDING_CAPTURE |
| UNKNOWN DEMO / EXPLANATION | no evidence → no gameplay claim | PASS_IN_RUNTIME_CONTRACT; FINAL_CAPTURE_PENDING |
| VIDEO | final proof sequence captured and edited | PENDING |
| Q&A LIVE REHEARSAL | answers delivered against claim ledger without drift | PENDING |
| COMMONS SUBMISSION LOCK | candidate visibly published/attached/submitted in required Commonsmade flow | PENDING_HUMAN_PLATFORM_PROOF |
| SUBMISSION PACKAGE | runtime/repo/video/copy/evidence links final | DRAFT_READY_PENDING_LINKS |

## G. Validation/evidence gates

| Gate | Pass condition | Status |
| --- | --- | --- |
| PRIMARY SOURCE CHECK | real-world negative event verified from authoritative source | PASS |
| CLAIM LEDGER | every material claim classified | PASS_WITH_WI_V2_PENDING_CHECKS |
| FAILURE LEDGER | real failures retained after fixes | PASS — includes WI V2 migration failures |
| RUBRIC TRACEABILITY | every judging dimension points to proof | PASS_STRENGTHENED_WI_V2 |
| COMPETITOR INTELLIGENCE BOUNDARY | observed public submissions not overstated as exhaustive | PASS_WITH_EXPLICIT_NON_EXHAUSTIVE_BOUNDARY |
| REQUIREMENT ↔ EVIDENCE | each MUST has evidence or explicit UNKNOWN | PASS_WITH_CONDITIONS |
| EVIDENCE ↔ ARTIFACT | cited proof corresponds to actual code/build/run | PASS_WITH_CONDITIONS |
| RISK ↔ STATE | open risks match current canonical state | PASS_AFTER_WI_V2_RECONCILIATION |
| BUILD ↔ STATE | state never claims greener than actual checks | PASS_AFTER_WI_V2_RECONCILIATION |
| USER VALIDATION | broader evidence that users prefer the wait experience | OPEN_NONBLOCKING; do not overclaim |

## H. Terminal promotion sequence

The product may not jump directly from “works” to `PROJECT_COMPLETE`.

`VERIFICATION-BEFORE-COMPLETION`
→ `REQUIREMENTS ↔ EVIDENCE ↔ ARTIFACTS ↔ RISKS ↔ PROJECT STATE ↔ ACTUAL BUILD`
→ `RUNTIME + VISUAL PROOF LOCK`
→ `DEMO + VIDEO + Q&A LOCK`
→ `COMMONS PUBLISH + ATTACH + SUBMISSION LOCK`
→ `SUBMISSION PACKAGE LOCK`
→ `BUILD READINESS`
→ `HANDOFF TO FINISHER`
→ `FINAL QC`
→ `PROJECT_COMPLETE`

Current terminal verdict: **BUILD_CANDIDATE_READY_WITH_LIMITATIONS**.

## I. Blocking items before PROJECT_COMPLETE

1. Pass WI V2 independent PR CI + CodeQL.
2. Merge and redeploy the exact WI V2 candidate SHA; reverify all public routes.
3. Inspect desktop + mobile final rendering and reduced-motion behavior.
4. Capture final demo including accepted evidence → UNKNOWN → host acknowledgement → Evidence Capsule, Wait Receipt and negative path.
5. Perform live Q&A rehearsal against the Claim Ledger.
6. Obtain Commonsmade publish/attach/submit proof.
7. Lock final submission URLs/assets/copy.
8. Re-run terminal reconciliation and final QC.

Broader user validation, exhaustive gallery coverage and live-provider integration remain useful but **non-blocking** and may not be promoted into claims without new evidence.

## J. Faadil Agent System + Judge Performance Assurance

Canonical orchestration route:

`HOI → CHIEF OF STAFF → PROJECT AUTHORIZATION → PBPD → PROJECT FINISHER → HUMAN SUBMIT → POST-MORTEM`

Repo-local truth is recorded in `ORCHESTRATION-JPA.md`. Historical HOI / Chief-of-Staff proof is not present in this repository and therefore remains `UNKNOWN_IN_REPO / LEGACY_IMPORT`; it is **not** retroactively promoted to PASS.

Mandatory Judge Performance Assurance gates:

| Gate | Status | Evidence |
| --- | --- | --- |
| JUDGE COVERAGE | PASS | criterion→behavior→evidence→demo→pitch→artifact→submission→risk mapping in `ORCHESTRATION-JPA.md` |
| CRITICAL-PATH ASSURANCE | PASS_WITH_FINAL_RUNTIME_RENDER_PROOF_PENDING | positive + failure + UNKNOWN + anti-flash + capsule paths mapped |
| TECHNICAL OWNERSHIP | PASS_WITH_REHEARSAL_PENDING | implementation surfaces enumerated; live defense pending |
| SESSION CONTINUITY | PASS | state/handover/activity/claim/failure surfaces locked |
| CLAIM CLASSIFICATION | PASS | deterministic/constrained/probabilistic/human-reviewed/hybrid/unknown discipline |

Canonical final demo narrative:

`PROBLEM → PAIN → TRIGGER → LIVE WORKFLOW → WOW → CONSEQUENCE → ACTION → TECHNICAL PROOF → IMPACT → CLOSE`

The WI V2 signature moment belongs in LIVE WORKFLOW/WOW/TECHNICAL PROOF. **Value before technology; proof before plumbing; one narrative; reliability/fallback before rehearsal.**

Promotion rule:

`PROJECT FINISHER → SUBMISSION_READY → HUMAN SUBMIT → POST-MORTEM → LEARNING / SYSTEM UPDATE`

`SUBMISSION_READY` remains blocked by WI V2 independent validation/runtime refresh, render inspection, video, live Q&A, Commonsmade proof and final-link gates above.
