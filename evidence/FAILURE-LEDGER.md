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
- Cause: deterministic day-streak tests mocked `Date.now()`, while implementation used `new Date()` and therefore read the runner wall clock.
- Fix: day-streak cursor now starts from `new Date(Date.now())`.
- Rule applied: the red run remains part of history; later green runs do not rewrite it as if it never happened.

## F-03 — Controlled runtime negative path

- Trigger: **Run negative-path proof** in the demo.
- Mechanism: an actual Promise rejects after 1.4 seconds with `DEMO_PROVIDER_TIMEOUT`.
- Expected evidence: `warning` → `fail`, persisted `outcome: failed`, failure code/message, no AI answer bubble.
- Honesty boundary: controlled test failure, not a claim of a live provider outage.

## UNKNOWN counter-case

Execution signals without a valid kind, non-empty label, and `evidenceRef` are rejected. The SDK emits `signal-rejected` with `UNKNOWN / INSUFFICIENT_EVIDENCE` and does not mutate game state.
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
- Cause: GitHub Pages is not enabled/configured for this repository; the workflow token cannot turn an absent Pages site into runtime evidence.
- Impact: demo build remains valid, but no public `page_url` exists yet and `PUBLIC_DEPLOYMENT_PROOF` stays open.
- Mitigation: keep the reproducible Pages workflow, enable Pages from repository administration, rerun the workflow, then externally fetch the returned URL before promotion.
- Lesson: a deployment workflow, expected hostname, and successful static build are not equivalent to a live runtime. **No page URL → no live-demo claim.**

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

## F-11 — Future-classic production redeploy failed on restored cache state

- Event: first Vercel production redeploy of the multi-page future-classic build failed before checkout completed.
- Deployment id: `dpl_GScJ5TRx3YD9tbQTMBfanqyunstk`.
- Exact failure: `fatal: destination path 'source' already exists and is not an empty directory.`
- Cause: Vercel restored the previous build cache, including the bootstrap `source` directory, while the deployment script assumed a clean filesystem and ran `git clone ... source` directly.
- Impact: the new visual build did not reach production on the first attempt even though CI and CodeQL were already green.
- Mitigation: make the deployment bootstrap idempotent with `rm -rf source dist-demo` before cloning and rebuilding the exact canonical SHA.
- Recovery evidence: deployment `dpl_Gu77jod1hxSEPu8Sz9pRPAq3zbyL` checked out `27de7b3b4119b6499eda79effccadf262028de58`, completed `npm ci` with 0 vulnerabilities, passed TypeScript + Vite build, reached `READY`, and all five canonical routes returned HTTP 200.
- Lesson: **a green application build is not the same as an idempotent deployment pipeline. Build cache is state and must be handled explicitly.**

## F-12 — Judge verifier still pinned the pre-refactor production SHA

- Event: PR #10 CI run `34979638351` passed install, formatting, TypeScript typecheck, and all **33 tests** on Node 24, then failed at `npm run judge:verify`.
- Evidence: https://github.com/Faadil1/quickspin/actions/runs/34979638351
- Exact failure: `evidence/runtime/VERCEL-PRODUCTION-RUNTIME.md missing required marker: 83da2b807e2072bde30a76c72937c3cbe74ff389`.
- Cause: runtime evidence had correctly moved to future-classic source SHA `27de7b3b4119b6499eda79effccadf262028de58`, but the assurance script still hard-coded the older pre-refactor SHA.
- Impact: correct new runtime evidence was rejected because verifier provenance had not advanced with the canonical runtime.
- Mitigation: update `judge:verify` to require the new source SHA, the new READY deployment id, all-five-route HTTP-200 proof, the future-classic state marker, and explicitly fail if the old runtime SHA reappears.
- Lesson: **provenance locks must move atomically with canonical runtime promotion. A stale verifier is evidence drift, not a reason to weaken verification.**

## F-13 — Winning Intelligence V2 migration script failed before product mutation

- Events: GitHub Actions runs `34999196264` and `34999366553` failed during the temporary migration workflow.
- Evidence: https://github.com/Faadil1/quickspin/actions/runs/34999196264 and https://github.com/Faadil1/quickspin/actions/runs/34999366553
- First exact failure: Node rejected the one-shot migration script with `SyntaxError: missing ) after argument list` because a generated TypeScript template literal was nested unescaped inside the migration script's own template literal.
- Impact: no product files from that migration were committed; typecheck/tests were correctly never treated as passed for the attempted mutation.
- Mitigation: replace the migration with a parse-safe idempotent script, rerun format + TypeScript + tests + judge verification, then remove all one-shot migration machinery after the successful commit.
- Recovery evidence: run `34999396864` passed migration, formatting, TypeScript, tests, judge verification and committed the P0 deltas.
- Lesson: **automation that writes assurance-sensitive product code must itself be parseable, deterministic and disposable. A failed migration attempt remains evidence even when no product mutation escaped it.**

## F-14 — WI V2 independent PR rejected unformatted SDK contract files

- Event: PR #11 CI run `35000339670` reached the permanent merge-ref quality gate and failed only the Prettier check on `src/sdk/persistence.ts` and `src/sdk/types.ts`.
- Evidence: https://github.com/Faadil1/quickspin/actions/runs/35000339670
- Concurrent truth: Node 22 had already passed TypeScript, the expanded test suite, `judge:verify`, demo build and was building the SDK; the failure was not reclassified as a product pass because the permanent CI requires formatting too.
- Cause: those two files were authored directly before the temporary migration run; the migration formatter did not commit their formatting because its commit allowlist only included later-mutated files.
- Impact: WI V2 remained non-mergeable despite functional checks passing.
- Mitigation: run a disposable formatter only on the two flagged SDK files, commit the formatting, remove the formatter workflow, then require a fresh full PR CI + CodeQL run.
- Lesson: **a quality gate is conjunctive. Functional correctness does not erase a formatting failure, and a temporary migration workflow must not accidentally define the final merge standard.**

## F-15 — V2 state promotion exposed a stale verifier assertion

- Event: CI run `35000815478` failed after V2 had been promoted from `IMPLEMENTED_PENDING_PR_VALIDATION` to a validated state.
- Evidence: https://github.com/Faadil1/quickspin/actions/runs/35000815478
- Exact problem: `judge:verify` still required the old marker `evidence_capsule: IMPLEMENTED_PENDING_PR_VALIDATION` while canonical state had correctly moved the gate forward.
- Impact: the assurance layer rejected a truthful state transition even though the product delta itself had already passed the prior functional gates. The failure was retained rather than bypassed.
- Mitigation: update verifier markers and cross-state checks to follow the promoted semantic state, then rerun the complete permanent gate.
- Recovery evidence: final V2 CI `35001906327` and CodeQL `35001906289` both passed before merge.
- Lesson: **state promotion and verifier provenance must advance atomically; an assurance system can itself become stale.**

## F-16 — Accidental placeholder write landed on main and was immediately removed

- Event: commit `679860f0afc987bc024f5fbbd55d25bb716825f2` accidentally created `evidence/placeholder` on `main` with commit message `temp` while preparing the V3 branch.
- Parent truth: the last intended product merge was V2 squash SHA `98c87f409c8b4b9586ef398812fb4d995fd1b5da`.
- Recovery: commit `2ee56ce711e6ee495f38908b21767698da9fe394` immediately removed the placeholder before V3 branching.
- Impact: no product/runtime source file changed and the net tree after removal matched the intended V2 product tree, but main history contains the accidental write and therefore it is retained here.
- Mitigation: create/isolate the candidate branch before any new contents write and verify main diff after corrective deletion.
- Lesson: **repository authority matters even for harmless files. “Net no-op” is not permission to erase the mutation from history.**

## F-17 — V3 diff gate caught an overbroad widget replacement before candidate validation

- Event: commit `31a494459baf0dd907130578e7997641ef468078` attempted a privacy hardening change but replaced far more of `src/sdk/widget.ts` than intended.
- Observable signal: compare showed roughly **845 changed lines** (344 additions / 501 deletions) for a change whose intended product delta was only to stop persisting arbitrary intervention payloads.
- Impact: the edit was considered scope drift and was not accepted as the V3 candidate despite being syntactically plausible.
- Recovery: commit `944781484a592028c65367a68503daafc1ac95d5` restored the exact previously validated widget blob, then run `35003001488` applied only surgical V3 patches and passed TypeScript plus **41 tests**.
- Lesson: **diff size and shape are an assurance gate. An overbroad edit should be discarded before CI can normalize it into false confidence.**
