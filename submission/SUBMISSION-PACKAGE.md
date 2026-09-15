# QuickSpin — Submission Package

Status: **COPY / CLAIMS LOCKED — FINAL TRACE RUNTIME + VIDEO / COMMONS LOCK PENDING**

Challenge: Commonsmade — **Make Waiting for AI Fun**

## Project name

**QuickSpin**

## Judge memory sentence

**QuickSpin turns AI waiting into a game you can verify afterward.**

## Supporting line

**Private Capsule. Shareable Ghost. Comparable wait.**

## One-sentence pitch

QuickSpin is an embeddable waiting runtime for AI apps that turns real host-observed execution into optional gameplay, preserves the full run privately in an Evidence Capsule, and can derive a redacted Wait Ghost for historical replay, sharing, and truthful wait-to-wait comparison.

## Short description

AI apps increasingly spend noticeable time reasoning, retrieving, and calling tools. QuickSpin replaces passive waiting with a reusable playable layer driven by host-observed phases and evidence-bearing execution signals. When the request ends, QuickSpin keeps completion, failure, cancellation, and UNKNOWN distinct, records the experience in a truthful Wait Receipt and private Evidence Capsule, and can produce a privacy-reduced Wait Ghost that is safe to replay without presenting historical events as live AI.

## Why it fits the challenge

### Waiting experience

- fast replies under the default 650 ms threshold do not flash the game UI;
- longer waits can become optional play;
- users can minimize and restore the layer;
- gameplay ends when the actual host request resolves, fails, or is cancelled;
- the post-wait experience can continue through a privacy-safe historical replay rather than a dead receipt screen.

### Originality

The waiting state is not only themed. Host-observed execution can alter gameplay, the resulting run survives as a private Evidence Capsule, and a deliberately reduced Wait Ghost can be shared/replayed without leaking labels, evidence references, arbitrary intervention payloads, private record IDs, timestamps, or failure details.

### AI-native fit

Hosts can supply real phase changes plus observed retrieval, tool, artifact, and warning signals. Accepted signals require provenance. Unsupported signals become `UNKNOWN / INSUFFICIENT_EVIDENCE` and do not mutate gameplay. Historical Ghost replay never emits host execution signals and is explicitly not live AI.

### Repeatability

The same lifecycle ships as a vanilla SDK, React wrapper, ESM, CJS, and IIFE bundles. Runner and Orbit are interchangeable consumers of the same host contract. Evidence Capsule → Wait Ghost → Replay / Compare is a reusable evidence lifecycle rather than one hardcoded demo trick.

### Execution

- **41 automated tests**;
- Node 22 and Node 24 CI;
- CodeQL;
- full npm audit: 0 vulnerabilities;
- production npm audit: 0 vulnerabilities;
- package-boundary dry run confirms build/test tooling is not shipped;
- deterministic positive, UNKNOWN, and negative demo paths;
- keyboard/input parity and reduced-motion paths;
- TRACE Visual Jury V1 passed PR CI + CodeQL and post-merge main CI + CodeQL without changing SDK/runtime contracts.

## Reality anchor — canonical five-part pattern

### 1. Signal / opportunity

AI applications routinely impose non-zero waits while reasoning, retrieving, calling tools, and assembling outputs. A 2026 HCI experiment with 425 participants across 10-, 30-, and 60-second delays showed that wait feedback changes perceived wait, frustration, and ambiguity.

### 2. Concrete real negative event

On **June 2–3, 2026**, OpenAI officially documented elevated errors and latency affecting Responses API, Codex, and ChatGPT. Affected Responses API traffic took longer than normal before beginning to generate; Codex requests were incorrectly rejected with HTTP 429; ChatGPT login/authentication/conversation flows degraded.

QuickSpin does **not** claim to prevent or repair that provider incident. The event establishes that AI latency, rejection, and failed flows are real product states rather than hypothetical edge cases.

### 3. Observable impact

The incident produced increased response-start latency, unexpected request rejection, and failed/degraded user flows — exactly the class of states in which a waiting UI must remain truthful about uncertainty and outcome.

### 4. Design lesson

A waiting layer must not equate “still waiting” with “will succeed,” must not fabricate percent progress, must preserve failure/cancellation separately from completion, and must abstain when execution evidence is insufficient.

### 5. Response / mitigation

QuickSpin mitigates the waiting-experience/evidence-integrity problem through indeterminate progress, evidence-bearing execution signals, explicit terminal outcomes, UNKNOWN/refusal behavior, a 650 ms anti-flash threshold, a truthful Wait Receipt, private Evidence Capsule, and privacy-reduced Wait Ghost. Provider reliability itself remains out of scope.

Evidence: `evidence/REALITY-ANCHOR.md`.

## Signature evidence lifecycle

`HOST EVENT → PLAY → PRIVATE EVIDENCE CAPSULE → REDACTED WAIT GHOST → HISTORICAL REPLAY / SHARE → DIRECTIONAL WAIT DELTA`

### Private Evidence Capsule

The Capsule is the richer host/integration evidence record. It may include provenance references and execution details required for inspection.

It is **not** claimed to be cryptographically signed or tamper-proof.

### Redacted Wait Ghost

The Ghost is a smaller derivative intended for sharing/replay. It excludes sensitive provenance content including:

- prompt/content payloads;
- phase/signal labels;
- evidence references;
- arbitrary intervention payloads;
- private record ID;
- wall-clock timestamp;
- detailed failure/acknowledgement content.

A Ghost share token lives in the URL hash. No hosted social backend or upload service is claimed.

### Historical replay

Ghost replay reconstructs the timing/event-type sequence as a historical artifact. It does **not** call the model, emit host execution signals, or claim the historical events are happening again.

### Compare

Wait-to-wait comparison exposes signed/directional deltas such as actual wait and engaged play. QuickSpin deliberately does **not** invent a winner, trust score, confidence score, or quality verdict.

## Negative path / Real failure > fake success

The demo's `Run negative-path proof` triggers an actual rejected Promise with controlled error `DEMO_PROVIDER_TIMEOUT`.

Expected behavior:

1. warning is emitted only after the rejection;
2. session persists `outcome: failed`;
3. structured failure evidence is emitted;
4. no AI answer bubble is fabricated;
5. failure remains in the local evidence record.

This is explicitly a controlled runtime failure, not a claim that a live provider failed during the recording.

Historical CI/deployment/orchestration failures are retained in `evidence/FAILURE-LEDGER.md` and `evidence/TRACE-VISUAL-JURY-V1.md` after mitigation. They are not deleted to make the project appear greener.

## UNKNOWN / refusal

`session.signal(...)` requires an evidence-bearing host event. Missing/invalid provenance produces `signal-rejected → UNKNOWN / INSUFFICIENT_EVIDENCE` and no gameplay mutation.

Canonical rule: **no evidence → no claim → no gameplay effect**.

## Demo proof sequence

Use `submission/VIDEO-SHOT-LOCK.md` and `demo.md`.

Minimum visible proof:

- canonical judge memory sentence;
- same exact 12-second classic control;
- same exact 12-second QuickSpin path;
- real phase-driven game intensity;
- at least one execution signal becomes a game event;
- truthful Wait Receipt;
- private Evidence Capsule;
- Wait Ghost redaction boundary;
- historical Wait Ghost replay clearly labeled not live AI;
- directional wait comparison with no winner score if included;
- actual rejected-Promise negative path;
- UNKNOWN/provenance rule;
- reusable SDK contract.

## Differentiation line

**QuickSpin is not trying to be the biggest AI waiting game. It is the reusable waiting layer that makes observed execution playable, preserves the private run for verification, and derives a smaller redacted artifact when the experience needs to be replayed or shared.**

Observed public competitor intelligence informed this direction, but the scan is **not** claimed exhaustive and QuickSpin does **not** claim no other applicant could have built similar mechanics.

## Technical integration snippet

```ts
const qs = createQuickSpin({ target: "#quickspin" });
const session = qs.start({ status: "Reasoning…" });

session.setProgress(); // indeterminate unless the host really knows progress
session.setPhase("Searching…");
session.signal({
  kind: "retrieval",
  label: "Retrieved 12 sources",
  evidenceRef: "run_123:retrieval_4",
});

try {
  const response = await modelRequest();
  session.complete();
  return response;
} catch (error) {
  session.fail(error);
  throw error;
}
```

## Runtime links and provenance

- Repository: `https://github.com/Faadil1/quickspin`
- Current externally verified public runtime: `https://quickspin-runtime.vercel.app`
- Current verified runtime source SHA: `cb3b322907197e37518e85ddb377def2053edcc3`
- Current verified deployment: `dpl_5rFD3bRMCHK5m6esVazZjz8E6kZG`
- Current verified routes: `/`, `/lab`, `/proof`, `/sdk`, `/judges`
- TRACE Visual Jury V1 code merge SHA: `c34012a732e8bb7cd2b5601f1a8f9862a87e4056`
- **Final TRACE visual runtime refresh: PENDING EXACT-SHA DEPLOYMENT — do not claim the current public URL proves `c34012a...` until the Vercel build log does.**
- Demo video: **PENDING CAPTURE / UPLOAD**
- Failure Ledger: repository `evidence/FAILURE-LEDGER.md`
- TRACE visual evidence: repository `evidence/TRACE-VISUAL-JURY-V1.md`
- Reality Anchor: repository `evidence/REALITY-ANCHOR.md`
- Cycle/Gate Matrix: repository `evidence/CYCLE-GATE-MATRIX.md`

## Suggested final submission copy

### What we built

QuickSpin is a drop-in waiting runtime for AI apps. During a host request, observed phases can drive game intensity and evidence-bearing execution events can become playable signals. When the request ends, QuickSpin stops the game, creates a truthful Wait Receipt, and preserves the richer run in a private Evidence Capsule.

When that experience needs to be replayed or shared, QuickSpin derives a redacted Wait Ghost instead of exposing the full evidence record. The Ghost keeps the timing shape and event types required for replay while removing sensitive provenance content. Wait-to-wait Compare then exposes directional deltas without inventing a winner or quality score.

### Why it matters

Long AI waits are no longer just loading states: agents reason, browse, retrieve, and call tools for seconds or minutes. QuickSpin gives that time an interaction model while remaining honest about uncertainty and authority. It does not fake progress, does not turn failures into success, and refuses unsupported execution signals.

### What makes it different

The product is the reusable execution-to-play-to-evidence contract, not one minigame. Runner and Orbit share the same lifecycle; hosts can integrate through vanilla JavaScript or React; full evidence stays private; sharing uses a reduced derivative; replay is historical rather than fake live AI; comparison shows the delta instead of inventing a verdict.

### What we proved

The V3 product candidate has 41 automated tests, Node 22/24 CI, CodeQL, zero-finding npm audit, explicit failed/cancelled/completed outcomes, UNKNOWN/refusal behavior, a controlled rejected-Promise negative path, privacy-redaction tests for Wait Ghost, replay/diff tests, and a public V3 runtime verified across all five canonical routes. TRACE Visual Jury V1 then passed its own CI/CodeQL and post-merge checks without modifying the SDK contract. The final visual runtime refresh still requires an exact `c34012a...` deployment before that presentation layer is claimed live.

## Forbidden submission claims

Do not claim:

- QuickSpin reduces model/provider latency;
- every user perceives a shorter wait;
- controlled demo phases are live production AI;
- the induced negative-path failure is a live provider outage;
- QuickSpin would have prevented the cited OpenAI incident;
- Evidence Capsule or Wait Ghost is cryptographically signed/tamper-proof;
- Wait Ghost replay is live AI;
- Compare decides which wait is better or more trustworthy;
- the public competitor scan covers every submission;
- npm publication before publication evidence exists;
- hosted analytics / extra game packs as current shipped features;
- TRACE Visual Jury V1 is live until exact `c34012a...` deployment evidence exists;
- absolute security completeness;
- `PROJECT_COMPLETE` while final gates remain open.

## Final lock checklist

- [x] Rubric mapping
- [x] Canonical cycle `RUBRIC → PAIN → PROBLEM → DIFFERENTIATOR → EXECUTION → EVIDENCE → STORY → DEMO → Q&A`
- [x] Five-part reality anchor
- [x] Primary-source real negative event
- [x] Positive execution path
- [x] Failure path
- [x] Real failure > fake success evidence retained
- [x] UNKNOWN / abstention
- [x] Private Evidence Capsule
- [x] Redacted Wait Ghost
- [x] Historical Ghost replay
- [x] Directional wait diff / no winner score
- [x] Security gate
- [x] 41-test Node 22/24 CI + CodeQL product proof
- [x] Current V3 public runtime verified
- [x] TRACE Visual Jury V1 code CI/CodeQL + post-merge checks
- [x] Final video proof sequence locked
- [x] Q&A answer bank exists
- [x] Submission copy aligned to V3/TRACE
- [ ] Exact TRACE Visual Jury V1 merge SHA deployed and externally verified
- [ ] Final desktop/mobile/reduced-motion pixel inspection
- [ ] Final video captured and uploaded
- [ ] Adversarial Q&A rehearsed live
- [ ] Final links tested from logged-out/external context
- [ ] Terminal reconciliation / final QC rerun
- [ ] Final Commonsmade project publish/attach/submit proof
