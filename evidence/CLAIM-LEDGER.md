# Claim Ledger

Every material claim must be one of: `VERIFIED`, `VERIFIED_WITH_SCOPE`, `UNKNOWN`, `REFUSED`, or `NOT_IMPLEMENTED`. Absence of evidence is not promoted into a positive claim.

| Claim | Status | Evidence / boundary |
| --- | --- | --- |
| exact same 12s simulated happy-path wait | VERIFIED_IN_CODE | `src/demo/main.ts` phase durations sum to 12000 ms |
| no fabricated progress required | VERIFIED_IN_CODE | `setProgress()` supports indeterminate mode |
| execution signals affect gameplay | VERIFIED_BY_TESTS | Runner/Orbit signal tests |
| execution signals require provenance | VERIFIED_IN_CODE | valid kind + label + `evidenceRef`; otherwise rejection |
| insufficient signal evidence becomes UNKNOWN / no gameplay mutation | VERIFIED_IN_CODE_AND_TESTS | `signal-rejected`, `UNKNOWN / INSUFFICIENT_EVIDENCE` |
| execution provenance survives after terminal outcome | VERIFIED | V2 `ExecutionTrailEntry` → persisted `WaitCapsule` |
| Evidence Capsule is portable JSON | VERIFIED | `getLastCapsule()` / `exportLastCapsule()` |
| Evidence Capsule is cryptographically signed | REFUSED | no cryptographic primitive/signature exists |
| evidence coverage is transparent counts, not a quality/confidence score | VERIFIED | phase/signal/ref/intervention counts from execution trail |
| host `observe()` bridge infers AI actions | REFUSED | bridge only forwards host-supplied values; no inference |
| intervention intent means the model request was changed | REFUSED | host must explicitly acknowledge/reject |
| arbitrary intervention payload is persisted by QuickSpin | REFUSED_BY_IMPLEMENTATION | V3 durable trail stores redacted intervention metadata only |
| Wait Ghost is derived from a full Wait Capsule | VERIFIED_IN_CODE_AND_TESTS | `createWaitGhost()` + permanent V3 suite |
| Wait Ghost exposes phase/signal/intervention labels or evidence refs | REFUSED_BY_IMPLEMENTATION_AND_TESTS | sensitive-fixture redaction tests |
| Wait Ghost exposes record id, wall-clock timestamp or failure details | REFUSED_BY_IMPLEMENTATION_AND_TESTS | schema + redaction tests |
| Wait Ghost share token requires a backend upload | REFUSED | URL-hash encoded redacted JSON; no backend social service claimed |
| Wait Ghost is cryptographically signed or tamper-proof | REFUSED | no signature/MAC exists |
| Wait Ghost replay is live AI | REFUSED | deterministic historical replay only; no host execution emissions |
| malformed/oversized Wait Ghost tokens fail closed | VERIFIED_BY_TESTS | `decodeWaitGhost()` returns `null`; 32k ceiling |
| wait-to-wait diff decides a winner | REFUSED | signed deltas only; no winner/trust/quality score |
| wait-to-wait regression deltas are computable | VERIFIED_BY_TESTS | `compareWaitExperiences()` |
| failed request does not become completed | VERIFIED_BY_TESTS | explicit persisted failed outcome |
| negative demo performs an actual Promise rejection | VERIFIED_IN_CODE_PENDING_CAPTURE | controlled `DEMO_PROVIDER_TIMEOUT`; final video pending |
| external AI latency/rejection/failure is a real production condition | VERIFIED_PRIMARY_SOURCE | OpenAI June 2–3, 2026 official incident write-up |
| QuickSpin would have prevented the OpenAI incident | REFUSED | outside product mechanism |
| every wait feels shorter | REFUSED | Wait Receipt permits equal/longer perceived wait |
| QuickSpin reduces provider/model latency | REFUSED | outside product mechanism |
| public competitor scan covers every Commonsmade applicant | REFUSED | observed public material only; not exhaustive |
| no other applicant has replay/share/compare | REFUSED | absence from observed public material is not exclusivity proof |
| dependency-security gate is closed | VERIFIED_WITH_SCOPE | Vite 7.3.6 + Vitest 5; full/production npm audit = 0 |
| QuickSpin is absolutely “security complete” | REFUSED | no finite audit supports an absolute claim |
| WI V2 product delta is independently CI/CodeQL green | VERIFIED | V2 final CI `35001906327`, CodeQL `35001906289` |
| WI V3 permanent PR CI/CodeQL is green | VERIFIED | final PR head CI `35006098609`, CodeQL `35006098565`, 41 tests |
| WI V3 merge is green on main | VERIFIED | merge SHA `cb3b322907197e37518e85ddb377def2053edcc3`; main CI `35006274961`, CodeQL `35006274850` |
| public judge runtime is live | VERIFIED | Vercel deployment `dpl_5rFD3bRMCHK5m6esVazZjz8E6kZG` reached READY |
| public runtime contains WI V3 Wait Ghost changes | VERIFIED | build log checked out exact merge SHA; five routes HTTP 200; served `/assets/index-CRyhx7en.js` contains Wait Ghost share/replay/diff strings and logic |
| expected hostname alone proves runtime | REFUSED | exact deployment, route and bundle proof are required |
| project is published/attached/submitted in Commonsmade hackathon | UNKNOWN_PENDING_HUMAN_PLATFORM_PROOF | `COMMONS_SUBMISSION_LOCK` remains open |
| npm package is publicly published | UNKNOWN / NOT_CLAIMED | no registry evidence locked |
| hosted analytics exists | NOT_IMPLEMENTED / NOT_CLAIMED | roadmap only |
| controlled demo failure is a live provider outage | REFUSED | controlled failure is explicitly labeled controlled evidence |
| PROJECT_COMPLETE | REFUSED_CURRENTLY | visual inspection, final capture, live rehearsal, Commons lock and final submission link/asset lock remain open |

Canonical runtime proof: `evidence/runtime/VERCEL-PRODUCTION-RUNTIME.md`.
Canonical V2 differentiation proof: `evidence/WINNING-INTELLIGENCE-V2.md`.
Canonical V3 open-space proof: `evidence/WINNING-INTELLIGENCE-V3-OPEN-SPACE.md`.