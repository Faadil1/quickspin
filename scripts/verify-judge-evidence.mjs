import { existsSync, readFileSync } from "node:fs";

const required = {
  "evidence/WINNING-INTELLIGENCE-V2.md": [
    "Evidence Capsule",
    "Flight recorder for playable AI waiting",
  ],
  "evidence/WINNING-INTELLIGENCE-V3-OPEN-SPACE.md": [
    "Private Capsule. Shareable Ghost. Comparable wait.",
    "FULL CAPSULE IS PRIVATE EVIDENCE. WAIT GHOST IS A REDACTED DERIVATIVE.",
    "GHOST REPLAY IS NOT LIVE AI.",
    "SHOW THE DELTA. DO NOT INVENT THE VERDICT.",
    "differentiation loop **3 / 3**",
    "observed-open-space hypothesis",
  ],
  "evidence/REALITY-ANCHOR.md": [
    "Événement négatif concret, réel et vérifiable",
    "June 2–3, 2026",
    "REAL FAILURE > FAKE SUCCESS",
  ],
  "evidence/FAILURE-LEDGER.md": [
    "Real failure > fake success",
    "DEMO_PROVIDER_TIMEOUT",
    "UNKNOWN counter-case",
    "F-15",
    "F-16",
    "F-17",
    "35000815478",
    "679860f0afc987bc024f5fbbd55d25bb716825f2",
    "31a494459baf0dd907130578e7997641ef468078",
    "35003001488",
  ],
  "evidence/JUDGE-CYCLE.md": [
    "RUBRIC",
    "PAIN",
    "PROBLEM",
    "DIFFERENTIATOR",
    "EXECUTION",
    "EVIDENCE",
    "STORY",
    "DEMO",
    "Q&A",
  ],
  "evidence/CYCLE-GATE-MATRIX.md": [
    "Current iteration: **3 / 3**",
    "V3 privacy/social contract",
    "GHOST_REPLAY_IS_NOT_LIVE_AI",
    "WAIT_DIFF_NO_SYNTHETIC_VERDICT",
    "Faadil Agent System + Judge Performance Assurance",
    "HOI → CHIEF OF STAFF → PROJECT AUTHORIZATION → PBPD → PROJECT FINISHER → HUMAN SUBMIT → POST-MORTEM",
  ],
  "evidence/ORCHESTRATION-JPA.md": [
    "HOI → CHIEF OF STAFF → PROJECT AUTHORIZATION → PBPD → PROJECT FINISHER → HUMAN SUBMIT → POST-MORTEM",
    "UNKNOWN_IN_REPO / LEGACY_IMPORT",
  ],
  "evidence/RUBRIC-TRACEABILITY.md": [
    "AI-native fit",
    "Evidence honesty",
    "Private Capsule. Shareable Ghost. Comparable wait.",
    "PRIVATE CAPSULE → REDACT → WAIT GHOST",
  ],
  "evidence/RECONCILIATION.md": [
    "verification-before-completion",
    "BUILD_CANDIDATE_READY_WITH_LIMITATIONS",
    "Dependency security",
    "CLOSED",
  ],
  "evidence/GATE-REPORT.md": [
    "REAL NEGATIVE EVENT",
    "UNKNOWN / ABSTENTION",
    "PROJECT_COMPLETE",
  ],
  "evidence/JUDGE-QA.md": [
    "What happens if the AI request fails?",
    "What exactly is a Wait Ghost?",
    "When you replay a Ghost, are you replaying the AI?",
    "What does Compare tell me?",
  ],
  "evidence/Q&A-REHEARSAL.md": ["Give me one concrete real-world failure", "QuickSpin"],
  "evidence/CLAIM-LEDGER.md": [
    "Wait Ghost is derived from a full Wait Capsule",
    "Wait Ghost replay is live AI | REFUSED",
    "wait-to-wait diff decides a winner | REFUSED",
    "WI V3 permanent PR CI/CodeQL is green | UNKNOWN_PENDING_PR",
    "public runtime already contains WI V3 Wait Ghost changes | UNKNOWN / NOT_CLAIMED",
  ],
  "evidence/runtime/VERCEL-PRODUCTION-RUNTIME.md": [
    "PASS / PUBLIC_DEPLOYMENT_PROOF CLOSED",
    "https://quickspin-runtime.vercel.app",
    "All five routes returned **HTTP 200 OK**",
  ],
  "evidence/security/SECURITY-GATE.md": ["PASS", "0 vulnerabilities"],
  "submission/VIDEO-SHOT-LOCK.md": [
    "PROBLEM → PAIN → TRIGGER → LIVE WORKFLOW → WOW → CONSEQUENCE → ACTION → TECHNICAL PROOF → IMPACT → CLOSE",
  ],
  "state/CANONICAL-STATE.yaml": [
    "workstream: WINNING_INTELLIGENCE_V3_OPEN_SPACE",
    "branch: winning-intelligence-v3-open-space",
    "iteration: 3",
    "max_iterations: 3",
    "FULL_CAPSULE_IS_PRIVATE_EVIDENCE_WAIT_GHOST_IS_REDACTED_DERIVATIVE",
    "GHOST_REPLAY_IS_NOT_LIVE_AI",
    "SHOW_THE_DELTA_DO_NOT_INVENT_THE_VERDICT",
    "transient_validation_run: 35003001488",
    "transient_test_count: 41",
    "runtime_gate: PASS_VERIFIED_PUBLIC_RUNTIME_PRE_V3",
    "project_complete: false",
  ],
  "state/HANDOVER.yaml": [
    "workstream: WINNING_INTELLIGENCE_V3_OPEN_SPACE",
    "candidate_branch: winning-intelligence-v3-open-space",
    "Wait_Ghost_redacted_derivative",
    "ghost_replay_emits_live_execution_signals: false",
    "project_complete: false",
    "rollback",
  ],
  ".pbpd/state/ACTIVITY-TRACE.yaml": [
    "workstream: WINNING_INTELLIGENCE_V3_OPEN_SPACE",
    "v3-private-capsule-to-redacted-ghost-contract",
    "v3-historical-replay-truth",
    "v3-wait-regression-diff",
    "v3-feature-freeze",
    "github-actions:35003001488",
    "PROJECT_COMPLETE_REQUIRES_TERMINAL_RECONCILIATION",
  ],
  "HACKATHON-STATE.yaml": [
    "candidate_branch: winning-intelligence-v3-open-space",
    "iteration: 3_OF_3",
    "wait_ghost_redaction: TRANSIENT_PASS_IMPLEMENTED_AND_TESTED",
    "wait_ghost_replay: TRANSIENT_PASS_HISTORICAL_NOT_LIVE_AI",
    "wait_regression_diff: TRANSIENT_PASS_SIGNED_DELTAS_NO_WINNER_SCORE",
    "v3_codeql: PENDING_INDEPENDENT_PR",
    "public_runtime: PASS_VERIFIED_VERCEL_RUNTIME_PRE_V3",
    "project_complete: false",
  ],
  "HACKATHON-HANDOFF.yaml": [
    "to: WINNING_INTELLIGENCE_V3_OPEN_SPACE",
    "differentiation_iteration: 3_OF_3",
    "Wait Ghost replay is live AI",
    "wait diff chooses a winner or quality score",
    "no other applicant has replay_share_compare",
    "REAL_FAILURE_GT_FAKE_SUCCESS",
  ],
  "HACKATHON-OPERATING-GATES.yaml": [
    "winning_intelligence_iteration: 3_OF_3",
    "WINNING_INTELLIGENCE_V3_OPEN_SPACE",
    "WAIT_GHOST_PRIVACY_REDUCTION",
    "WAIT_GHOST_REPLAY_TRUTH",
    "WAIT_DIFF_NO_SYNTHETIC_VERDICT",
    "V3_FEATURE_FREEZE",
    "COMMONS_SUBMISSION_LOCK",
    "PROJECT_COMPLETE",
  ],
};

const loaded = new Map();
for (const [path, needles] of Object.entries(required)) {
  if (!existsSync(path)) throw new Error(`missing canonical artifact: ${path}`);
  const text = readFileSync(path, "utf8");
  loaded.set(path, text);
  for (const needle of needles) {
    if (!text.includes(needle)) throw new Error(`${path} missing required marker: ${needle}`);
  }
}

const canonical = loaded.get("state/CANONICAL-STATE.yaml");
const hackathon = loaded.get("HACKATHON-STATE.yaml");
const handoff = loaded.get("HACKATHON-HANDOFF.yaml");
const claims = loaded.get("evidence/CLAIM-LEDGER.md");
const orchestration = loaded.get("evidence/ORCHESTRATION-JPA.md");
const operatingGates = loaded.get("HACKATHON-OPERATING-GATES.yaml");

for (const [name, text] of [
  ["state/CANONICAL-STATE.yaml", canonical],
  ["HACKATHON-STATE.yaml", hackathon],
  ["HACKATHON-HANDOFF.yaml", handoff],
]) {
  if (/project_complete:\s*true/.test(text)) throw new Error(`${name} illegally promotes PROJECT_COMPLETE`);
}

if (canonical.includes("candidate:\n  branch: winning-intelligence-v2")) {
  throw new Error("canonical state still points to the V2 candidate branch");
}
if (canonical.includes("workstream: WINNING_INTELLIGENCE_V2_DIFFERENTIATION")) {
  throw new Error("canonical state still exposes V2 as the active workstream");
}
if (hackathon.includes("candidate_branch: winning-intelligence-v2")) {
  throw new Error("hackathon state still points to the V2 candidate");
}
if (hackathon.includes("v3_codeql: PASS")) {
  throw new Error("hackathon state overclaims V3 CodeQL before permanent PR evidence exists");
}
if (claims.includes("public runtime already contains WI V3 Wait Ghost changes | VERIFIED")) {
  throw new Error("claim ledger overclaims V3 public runtime before exact deployment proof");
}
if (operatingGates.includes("WAIT_GHOST_REPLAY_TRUTH\n    status: PASS_VERIFIED_LIVE_AI")) {
  throw new Error("operating gates illegally describe historical Ghost replay as live AI");
}
if (existsSync(".github/workflows/apply-v3-surgical.yml")) {
  throw new Error("temporary V3 surgical workflow must be removed before PR validation");
}
if (existsSync("scripts/apply-v3-surgical.mjs")) {
  throw new Error("temporary V3 patcher must be removed before PR validation");
}
if (!orchestration.includes("HUMAN SUBMIT") || !orchestration.includes("POST-MORTEM")) {
  throw new Error("orchestration trace does not preserve terminal human-submit/post-mortem stages");
}
if (!orchestration.includes("UNKNOWN_IN_REPO")) {
  throw new Error("missing upstream orchestration provenance must stay UNKNOWN_IN_REPO");
}

console.log(
  `judge evidence verified: ${Object.keys(required).length} canonical artifacts + V3 privacy/replay cross-state invariants`
);
