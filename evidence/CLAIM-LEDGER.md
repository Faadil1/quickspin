# Claim Ledger

Every material claim must be one of: `VERIFIED`, `VERIFIED_WITH_SCOPE`, `UNKNOWN`, `REFUSED`, or `NOT_IMPLEMENTED`. Absence of evidence is not promoted into a positive claim.

| Claim | Status | Evidence / boundary |
| --- | --- | --- |
| exact same 12s simulated happy-path wait | VERIFIED_IN_CODE | `src/demo/main.ts` phase durations sum to 12000 ms |
| no fabricated progress required | VERIFIED_IN_CODE | `setProgress()` supports indeterminate mode |
| execution signals affect gameplay | VERIFIED_BY_TESTS | Runner/Orbit signal tests |
| execution signals require provenance | VERIFIED_IN_CODE | valid kind + label + `evidenceRef`; otherwise rejection |
| insufficient signal evidence becomes UNKNOWN / no gameplay mutation | VERIFIED_IN_CODE_AND_TESTS | `signal-rejected`, `UNKNOWN / INSUFFICIENT_EVIDENCE` |
| failed request does not become completed | VERIFIED_BY_TESTS | explicit persisted failed outcome |
| negative demo performs an actual Promise rejection | VERIFIED_IN_CODE_PENDING_CAPTURE | controlled `DEMO_PROVIDER_TIMEOUT` harness; video still pending |
| external AI latency/rejection/failure is a real production condition | VERIFIED_PRIMARY_SOURCE | OpenAI June 2–3, 2026 official incident write-up |
| QuickSpin would have prevented the OpenAI incident | REFUSED | outside product mechanism and unsupported |
| every wait feels shorter | REFUSED | signed Wait Receipt explicitly allows equal/longer |
| QuickSpin reduces provider/model latency | REFUSED | outside product mechanism |
| dependency-security gate is closed | VERIFIED_WITH_SCOPE | Vite 7.3.6 + Vitest 5; full and production npm audit = 0; package boundary verified |
| QuickSpin is absolutely “security complete” | REFUSED | no finite audit justifies an absolute security claim |
| current CI/CodeQL candidate is green | VERIFIED | PR #4 checks + security validation evidence |
| public judge runtime is live | UNKNOWN / NOT_CLAIMED | first Pages attempt stopped at repository Pages enablement; no verified `page_url` yet |
| expected GitHub Pages hostname is a live URL | REFUSED_UNTIL_FETCHED | hostname expectation is not runtime evidence |
| npm package is publicly published | UNKNOWN / NOT_CLAIMED | no publication evidence locked |
| hosted analytics exists | NOT_IMPLEMENTED / NOT_CLAIMED | roadmap only |
| controlled demo failure is a live provider outage | REFUSED | controlled failure is explicitly labeled controlled evidence |
| PROJECT_COMPLETE | REFUSED_CURRENTLY | deployment, capture, visual runtime inspection, final rehearsal/submission lock remain open |
