# Failure Ledger — Real failure > fake success

Failures are retained as evidence. Fixing a failure does not delete the record that it occurred.

## F-01 — External production reality

- Event: OpenAI elevated latency/errors, June 2–3, 2026.
- Evidence: https://status.openai.com/incidents/01KT5XJ5ATD6RMYP908WS69FVD/write-up
- Verified observable impact: affected Responses API traffic took longer than normal to begin generating; Codex requests were incorrectly rejected with HTTP 429; ChatGPT login, authentication and conversation flows partially failed.
- Truth: production AI latency, rejection, and failed user flows are real states.
- Product implication: QuickSpin must preserve waiting, failure, cancellation, and UNKNOWN separately from success.
- Honesty boundary: QuickSpin does not claim it would have prevented the provider incident.

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

## F-08 — First public-runtime attempt stopped at Pages authority boundary

- Event: GitHub Actions run `34929705731` passed install, the full QuickSpin quality gate, all 33 tests, judge verification, and SDK build, then failed at `actions/configure-pages@v6`.
- Evidence: https://github.com/Faadil1/quickspin/actions/runs/34929705731
- Exact failure: `Get Pages site failed ... repository has Pages enabled and configured to build using GitHub Actions ... Not Found`.
- Cause: GitHub Pages was not enabled/configured for this repository; the workflow token could not turn an absent Pages site into runtime evidence.
- Historical impact: the demo build was valid, but no public `page_url` existed at that time.
- Mitigation: the later canonical Vercel production runtime closed `PUBLIC_DEPLOYMENT_PROOF`; this failed Pages attempt remains retained.
- Lesson: a deployment workflow, expected hostname, and successful static build are not equivalent to a live runtime. **No returned/fetched URL → no live-demo claim.**

## F-09 — Temporary final-patch workflow became non-idempotent noise

- First valid run: `34930139522` succeeded and applied/validated the displayed SDK sample fix.
- Later examples: `34930293175` and `34930326398` failed after documentation-only pushes because the same one-shot patch workflow retriggered after its target text had already been changed.
- Evidence: https://github.com/Faadil1/quickspin/actions/runs/34930139522 and subsequent `Final judge patch` runs on the branch.
- Cause: a migration/patch workflow was incorrectly configured as a persistent `push` workflow instead of a one-shot validation mechanism.
- Impact: red Actions history that does not represent a product regression, and avoidable ambiguity for reviewers.
- Mitigation: retain these runs here as orchestration evidence, then remove the temporary workflow. Permanent CI remains the authority for product correctness.
- Lesson: **one-shot migration machinery must be removed or made idempotent immediately after success. Real failure stays recorded; noisy automation does not stay active.**

## F-10 — Canonical verifier produced a formatting-sensitive false negative

- Event: PR #5 CI run `34958656629` passed dependency install, format, TypeScript typecheck, and all 33 tests, then failed at `npm run judge:verify`.
- Evidence: https://github.com/Faadil1/quickspin/actions/runs/34958656629
- Exact failure: `evidence/RECONCILIATION.md missing required marker: Dependency security: CLOSED`.
- Cause: the verifier matched one exact presentation string while the canonical document represented the same fact as Markdown (`**Dependency security:** CLOSED`).
- Impact: correct canonical state was rejected because assurance logic depended on typography rather than semantic markers.
- Mitigation: validate stable semantic tokens (`Dependency security` and `CLOSED`) independently and keep cross-state assertions for stale-risk detection.
- Lesson: **assurance should be stricter about truth, not brittle about formatting. A false negative is still a real verifier failure and remains in the record.**

## F-11 — Multi-page visual candidate first pass failed the format gate

- Event: PR #7 CI run `34973010201` failed only at `npm run format:check`.
- Evidence: https://github.com/Faadil1/quickspin/actions/runs/34973010201
- Verified surrounding truth: Node 22 and Node 24 typecheck, all 33 tests, judge verification, multi-page Vite build, SDK build, artifact upload, and CodeQL all passed on the same candidate.
- Cause: `src/site/lab.ts` and `src/site/shell.ts` had not yet been normalized by the repository Prettier policy.
- Impact: the candidate correctly remained red even though its functional gates were green.
- Mitigation: a one-shot formatter normalized exactly those two files, then the temporary workflow was removed immediately after success.
- Lesson: **visual ambition does not bypass production hygiene. A formatting-only failure is still a real gate failure and remains in the evidence record.**
