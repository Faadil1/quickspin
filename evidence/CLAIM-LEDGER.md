# Claim Ledger

| Claim | Status | Evidence |
| --- | --- | --- |
| exact same 12s simulated happy-path wait | VERIFIED_IN_CODE | `src/demo/main.ts` durations sum to 12000 ms |
| no fabricated progress required | VERIFIED_IN_CODE | `setProgress()` supports indeterminate mode |
| execution signals affect gameplay | VERIFIED_BY_TESTS | Runner/Orbit signal tests |
| signals require provenance after this hardening | VERIFIED_IN_CODE | `evidenceRef` normalization + rejection |
| failed request does not become completed | VERIFIED_BY_TESTS | persistence failed-outcome test |
| negative demo performs actual Promise rejection | VERIFIED_IN_CODE_PENDING_CAPTURE | controlled failure harness |
| every wait feels shorter | REFUSED | signed Wait Receipt explicitly allows longer |
| QuickSpin reduces provider/model latency | REFUSED | outside product mechanism |
| npm package is publicly published | UNKNOWN / NOT_CLAIMED | no publication evidence locked |
| hosted analytics exists | NOT_IMPLEMENTED / NOT_CLAIMED | roadmap only |
| security complete | REFUSED | dependency-vulnerability reconciliation still open |
