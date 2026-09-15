# Claim Ledger

Every material claim must be one of: `VERIFIED`, `VERIFIED_WITH_SCOPE`, `UNKNOWN`, `REFUSED`, or `NOT_IMPLEMENTED`. Absence of evidence is not promoted into a positive claim.

| Claim | Status | Evidence / boundary |
| --- | --- | --- |
| exact same 12s simulated happy-path wait | VERIFIED_IN_CODE | `src/demo/main.ts` phase durations sum to 12000 ms |
| no fabricated progress required | VERIFIED_IN_CODE | `setProgress()` supports indeterminate mode |
| execution signals affect gameplay | VERIFIED_BY_TESTS | Runner/Orbit signal tests |
| execution signals require provenance | VERIFIED_IN_CODE | valid kind + label + `evidenceRef`; otherwise rejection |
| insufficient signal evidence becomes UNKNOWN / no gameplay mutation | VERIFIED_IN_CODE_AND_TESTS | `signal-rejected`, `UNKNOWN / INSUFFICIENT_EVIDENCE` |
| execution provenance survives after terminal outcome | VERIFIED | V2 `ExecutionTrailEntry` → persisted `WaitCapsule`; independently CI/CodeQL validated before merge |
| Evidence Capsule is portable JSON | VERIFIED | `getLastCapsule()` / `exportLastCapsule()`; V2 merged |
| Evidence Capsule is cryptographically signed | REFUSED | no cryptographic primitive/signature exists; “Capsule” means evidence bundle only |
| evidence coverage is transparent counts, not a quality/confidence score | VERIFIED | phase/signal/ref/intervention counts from execution trail |
| host `observe()` bridge infers AI actions | REFUSED | bridge only forwards host-supplied phase/signal values; no inference |
| intervention intent means the model request was changed | REFUSED | QuickSpin emits intent only; host must explicitly acknowledge/reject |
| host intervention acknowledgement can carry evidence provenance | VERIFIED | `InterventionResult.evidenceRef`; V2 merged |
| arbitrary intervention payload is persisted by QuickSpin | REFUSED_BY_IMPLEMENTATION | V3 stores only `RecordedIntervention` id/kind/optional label/relative time; host payload remains in-memory only |
| Wait Ghost is derived from a full Wait Capsule | VERIFIED_IN_CODE_AND_TESTS | `createWaitGhost()` + permanent V3 test suite |
| Wait Ghost exposes phase/signal/intervention labels or evidence refs | REFUSED_BY_IMPLEMENTATION_AND_TESTS | redaction tests use deliberately sensitive fixtures and assert those values are absent |
| Wait Ghost exposes record id, wall-clock timestamp or failure details | REFUSED_BY_IMPLEMENTATION_AND_TESTS | Wait Ghost schema does not contain those fields; redaction tests assert absence |
| Wait Ghost share token requires a backend upload | REFUSED | mechanism is URL-safe encoded redacted JSON in the URL hash; no hosted social backend is claimed |
| Wait Ghost is cryptographically signed or tamper-proof | REFUSED | no signature/MAC exists |
| Wait Ghost replay is live AI | REFUSED | replay returns historical deterministic steps only and does not emit host execution signals |
| malformed/oversized Wait Ghost tokens fail closed | VERIFIED_BY_TESTS | `decodeWaitGhost()` returns `null`; 32k token ceiling |
| wait-to-wait diff decides a winner | REFUSED | comparison returns signed deltas only; no winner/trust/quality score |
| wait-to-wait regression deltas are computable | VERIFIED_BY_TESTS | actual/engaged/felt/score/evidence/outcome deltas in `compareWaitExperiences()` |
| failed request does not become completed | VERIFIED_BY_TESTS | explicit persisted failed outcome |
| negative demo performs an actual Promise rejection | VERIFIED_IN_CODE_PENDING_CAPTURE | controlled `DEMO_PROVIDER_TIMEOUT` harness; video still pending |
| external AI latency/rejection/failure is a real production condition | VERIFIED_PRIMARY_SOURCE | OpenAI June 2–3, 2026 official incident write-up |
| QuickSpin would have prevented the OpenAI incident | REFUSED | outside product mechanism and unsupported |
| every wait feels shorter | REFUSED | Wait Receipt explicitly allows equal/longer perceived wait |
| QuickSpin reduces provider/model latency | REFUSED | outside product mechanism |
| public competitor scan covers every Commonsmade applicant | REFUSED | public gallery/search coverage is incomplete; observed public material only |
| VibeQuest and Mochi occupy different public differentiation axes | VERIFIED_WITH_SCOPE | observed public material; not an exhaustive field map |
| no other applicant has replay/share/compare | REFUSED | no observed public match is not proof of exclusivity |
| adjacent generic waiting-game/productivity space is already populated | VERIFIED_WITH_SCOPE | public Keel Waiting, While AI Thinks, Pop The Wait and FocusWhileAI materials |
| dependency-security gate is closed | VERIFIED_WITH_SCOPE | Vite 7.3.6 + Vitest 5; full and production npm audit = 0; package boundary verified |
| QuickSpin is absolutely “security complete” | REFUSED | no finite audit justifies an absolute security claim |
| WI V2 product delta is independently CI/CodeQL green | VERIFIED | final V2 head CI `35001906327`, CodeQL `35001906289`, then merged |
| WI V3 transient implementation passes typecheck + tests | VERIFIED_WITH_SCOPE | migration validation run `35003001488`; 5 test files / 41 tests |
| WI V3 permanent PR CI/CodeQL is green | VERIFIED | PR #12 validation head passed CI `35004024452`, CodeQL `35004024601`, Node 22/24, 41 tests, judge verifier, demo and SDK builds before state promotion |
| public judge runtime is live | VERIFIED | current Vercel future-classic runtime previously reached READY and five canonical routes returned HTTP 200 |
| public runtime already contains WI V3 Wait Ghost changes | UNKNOWN / NOT_CLAIMED | requires exact post-merge V3 deployment + route verification |
| expected GitHub Pages hostname is a live URL | REFUSED | Pages remains unverified and is not the canonical judge runtime |
| project is published/attached/submitted in Commonsmade hackathon | UNKNOWN_PENDING_HUMAN_PLATFORM_PROOF | `COMMONS_SUBMISSION_LOCK` remains open |
| npm package is publicly published | UNKNOWN / NOT_CLAIMED | no publication evidence locked |
| hosted analytics exists | NOT_IMPLEMENTED / NOT_CLAIMED | roadmap only |
| controlled demo failure is a live provider outage | REFUSED | controlled failure is explicitly labeled controlled evidence |
| PROJECT_COMPLETE | REFUSED_CURRENTLY | V3 runtime proof, visual inspection, capture, live rehearsal, Commons lock and final submission lock remain open |

Canonical runtime proof: `evidence/runtime/VERCEL-PRODUCTION-RUNTIME.md`.
Canonical V2 differentiation proof: `evidence/WINNING-INTELLIGENCE-V2.md`.
Canonical V3 open-space proof: `evidence/WINNING-INTELLIGENCE-V3-OPEN-SPACE.md`.