# Claim Ledger

Every material claim must be one of: `VERIFIED`, `VERIFIED_WITH_SCOPE`, `UNKNOWN`, `REFUSED`, or `NOT_IMPLEMENTED`. Absence of evidence is not promoted into a positive claim.

| Claim | Status | Evidence / boundary |
| --- | --- | --- |
| exact same 12s simulated happy-path wait | VERIFIED_IN_CODE | `src/demo/main.ts` phase durations sum to 12000 ms |
| no fabricated progress required | VERIFIED_IN_CODE | `setProgress()` supports indeterminate mode |
| execution signals affect gameplay | VERIFIED_BY_TESTS | Runner/Orbit signal tests |
| execution signals require provenance | VERIFIED_IN_CODE | valid kind + label + `evidenceRef`; otherwise rejection |
| insufficient signal evidence becomes UNKNOWN / no gameplay mutation | VERIFIED_IN_CODE_AND_TESTS | `signal-rejected`, `UNKNOWN / INSUFFICIENT_EVIDENCE` |
| execution provenance survives after terminal outcome | VERIFIED_IN_CODE_PENDING_INDEPENDENT_PR | `ExecutionTrailEntry` persisted into session record and `WaitCapsule` |
| Evidence Capsule is portable JSON | VERIFIED_IN_CODE_PENDING_INDEPENDENT_PR | `getLastCapsule()` / `exportLastCapsule()` |
| Evidence Capsule is cryptographically signed | REFUSED | no cryptographic primitive/signature exists; “Capsule” means evidence bundle only |
| evidence coverage is transparent counts, not a quality/confidence score | VERIFIED_IN_CODE_PENDING_INDEPENDENT_PR | phase/signal/ref/intervention counts from execution trail |
| host `observe()` bridge infers AI actions | REFUSED | bridge only forwards host-supplied phase/signal values; no inference |
| intervention intent means the model request was changed | REFUSED | QuickSpin emits intent only; host must explicitly acknowledge/reject |
| host intervention acknowledgement can carry evidence provenance | VERIFIED_IN_CODE_PENDING_INDEPENDENT_PR | `InterventionResult.evidenceRef` |
| failed request does not become completed | VERIFIED_BY_TESTS | explicit persisted failed outcome |
| negative demo performs an actual Promise rejection | VERIFIED_IN_CODE_PENDING_CAPTURE | controlled `DEMO_PROVIDER_TIMEOUT` harness; video still pending |
| external AI latency/rejection/failure is a real production condition | VERIFIED_PRIMARY_SOURCE | OpenAI June 2–3, 2026 official incident write-up |
| QuickSpin would have prevented the OpenAI incident | REFUSED | outside product mechanism and unsupported |
| every wait feels shorter | REFUSED | Wait Receipt explicitly allows equal/longer perceived wait |
| QuickSpin reduces provider/model latency | REFUSED | outside product mechanism |
| public competitor scan covers every Commonsmade applicant | REFUSED | public gallery/search coverage is incomplete; VibeQuest/Mochi observations are scoped public intelligence only |
| VibeQuest and Mochi occupy different public differentiation axes | VERIFIED_WITH_SCOPE | observed public submission/product descriptions; not an exhaustive field map |
| dependency-security gate is closed | VERIFIED_WITH_SCOPE | Vite 7.3.6 + Vitest 5; full and production npm audit = 0; package boundary verified |
| QuickSpin is absolutely “security complete” | REFUSED | no finite audit justifies an absolute security claim |
| previous future-classic CI/CodeQL candidate is green | VERIFIED | previous merged future-classic candidate passed CI + CodeQL |
| WI V2 product delta is independently CI/CodeQL green | UNKNOWN_PENDING_PR | transient migration validation passed; independent PR checks still required |
| public judge runtime is live | VERIFIED | Vercel production runtime reached READY and all five canonical routes returned HTTP 200; current runtime still represents the pre-WI-v2 future-classic candidate until WI V2 is redeployed |
| public runtime already contains WI V2 Evidence Capsule changes | UNKNOWN / NOT_CLAIMED | requires post-merge WI V2 production redeploy and route verification |
| expected GitHub Pages hostname is a live URL | REFUSED | Pages remains unverified and is not the canonical judge runtime |
| project is published/attached/submitted in Commonsmade hackathon | UNKNOWN_PENDING_HUMAN_PLATFORM_PROOF | `COMMONS_SUBMISSION_LOCK` remains open |
| npm package is publicly published | UNKNOWN / NOT_CLAIMED | no publication evidence locked |
| hosted analytics exists | NOT_IMPLEMENTED / NOT_CLAIMED | roadmap only |
| controlled demo failure is a live provider outage | REFUSED | controlled failure is explicitly labeled controlled evidence |
| PROJECT_COMPLETE | REFUSED_CURRENTLY | WI V2 PR/runtime proof, visual inspection, capture, live rehearsal, Commons lock and final submission lock remain open |

Canonical runtime proof: `evidence/runtime/VERCEL-PRODUCTION-RUNTIME.md`.
Canonical differentiation proof: `evidence/WINNING-INTELLIGENCE-V2.md`.
