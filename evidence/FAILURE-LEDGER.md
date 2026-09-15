# Failure Ledger — Real failure > fake success

Failures are retained as evidence. Fixing a failure does not delete the record that it occurred.

## F-01 — External production reality

- Event: OpenAI elevated latency/errors, June 2, 2026.
- Evidence: https://status.openai.com/incidents/01KT5XJ5ATD6RMYP908WS69FVD/write-up
- Truth: production AI latency and request failures are real states.
- Product implication: QuickSpin must preserve failure/unknown separately from success.

## F-02 — QuickSpin build failure preserved

- Event: GitHub Actions run `34925583311` failed.
- Evidence: https://github.com/Faadil1/quickspin/actions/runs/34925583311
- Cause: deterministic day-streak tests mocked `Date.now()`, while implementation used
  `new Date()` and therefore read the runner wall clock.
- Fix: day-streak cursor now starts from `new Date(Date.now())`.
- Rule applied: the red run remains part of history; later green runs do not rewrite it as if it
  never happened.

## F-03 — Controlled runtime negative path

- Trigger: **Run negative-path proof** in the demo.
- Mechanism: an actual Promise rejects after 1.4 seconds with `DEMO_PROVIDER_TIMEOUT`.
- Expected evidence: `warning` → `fail`, persisted `outcome: failed`, failure code/message, no AI
  answer bubble.
- Honesty boundary: controlled test failure, not a claim of a live provider outage.

## UNKNOWN counter-case

Execution signals without a valid kind, non-empty label, and `evidenceRef` are rejected. The SDK
emits `signal-rejected` with `UNKNOWN / INSUFFICIENT_EVIDENCE` and does not mutate game state.
This is the canonical abstention path: **no evidence → no gameplay claim**.

## F-04 — Judge-assurance gate rejected its own first pass

- Event: GitHub Actions run `34928143854` failed at TypeScript typecheck.
- Evidence: https://github.com/Faadil1/quickspin/actions/runs/34928143854
- Cause: the newly added evidence test used `Array.prototype.at()`, but QuickSpin targets ES2020.
- Mitigation: the test now uses index access compatible with the actual target.
- Lesson: assurance code is subject to the same build truth as product code; a green narrative cannot override a red compiler.

## F-05 — Secure toolchain migration first pass failed

- Event: GitHub Actions run `34928931640` failed during `npm run typecheck`.
- Evidence: https://github.com/Faadil1/quickspin/actions/runs/34928931640
- Cause: Vitest 5 tightened `vi.fn()` typing; the test helper passed an untyped generic mock where `WaitEventHandler` was required.
- Mitigation: the test now creates an explicitly typed `(event: WaitEvent) => void` mock.
- Lesson: dependency security upgrades must pass the actual compiler/test contract; a zero-vulnerability install alone is not sufficient evidence.

## F-06 — Vite 8 migration exposed a Rolldown TSX incompatibility

- Event: GitHub Actions run `34929036325` passed typecheck and all 33 Vitest 5 tests, then failed in the SDK library build.
- Evidence: https://github.com/Faadil1/quickspin/actions/runs/34929036325
- Cause: Vite 8 switched the production bundler to Rolldown, which rejected the existing React TSX library entry without additional parser migration.
- Decision: use the supported Vite 7.3 security line, retaining the proven Rollup build path while closing the advisories.
- Lesson: latest-major adoption is not itself a quality gate; choose the smallest supported change that removes verified risk.

## F-07 — Security gate passed but workflow mutation push was refused

- Event: GitHub Actions run `34929187191` passed build, 33 tests, judge verification, full audit, production audit, and package-boundary checks, then failed only while pushing the commit.
- Evidence: https://github.com/Faadil1/quickspin/actions/runs/34929187191
- Cause: the Actions token was not permitted to update `.github/workflows/ci.yml` without GitHub `workflows` permission.
- Mitigation: separate product/security changes from workflow-governance changes. The bot commits only package/test/evidence state; workflow updates are applied through the authorized GitHub connection.
- Lesson: evidence generation and repository governance are separate authority surfaces; passing evidence does not grant permission to mutate CI policy.
