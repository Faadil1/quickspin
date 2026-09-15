# Verification / Reconciliation

Canonical terminal order:

`verification-before-completion` → `REQUIREMENTS ↔ EVIDENCE ↔ ARTIFACTS ↔ RISKS ↔ PROJECT STATE ↔ ACTUAL BUILD` → `build-readiness` → `handoff-to-finisher`

## REQUIREMENTS ↔ EVIDENCE

- Real waiting comparison: exact 12-second control/happy-path simulation.
- Real negative behavior: actual rejected Promise in negative-path harness.
- Failure truth: explicit persisted terminal outcome + structured fail event.
- UNKNOWN/refusal: execution signal without evidence reference is rejected.
- Measurement honesty: Wait Receipt signed; longer is allowed.

## EVIDENCE ↔ ARTIFACTS

- `evidence/REALITY-ANCHOR.md` — external production + HCI grounding.
- `evidence/FAILURE-LEDGER.md` — external, internal CI, controlled runtime failures.
- `demo.md` — judge narrative including negative path.
- `src/sdk/*` — runtime truth.
- GitHub Actions — build/test evidence.

## RISKS

1. **Dependency audit open:** prior `npm ci` reported 5 vulnerabilities (3 moderate, 1 high, 1
   critical). Exploitability in the shipped browser bundle has not yet been reconciled. This blocks
   any “security-complete” claim; it does not get silently ignored.
2. **Live deployment proof:** public production deployment is not yet canonical evidence in this
   repository.
3. **Demo capture:** negative-path recording evidence remains pending until an actual take is
   captured.
4. **User validation:** Wait Receipt is measurement infrastructure, not proof yet that users
   universally prefer QuickSpin.

## PROJECT STATE ↔ ACTUAL BUILD

Current target is `BUILD_CANDIDATE_READY_WITH_LIMITATIONS`, not `PROJECT_COMPLETE`. Final QC,
claim↔evidence challenge, deployment/submission readiness and final packaging belong to the
finisher stage.
