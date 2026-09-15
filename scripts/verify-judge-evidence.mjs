import { existsSync, readFileSync } from "node:fs";

const required = {
  "evidence/WINNING-INTELLIGENCE-V2.md": ["Evidence Capsule", "Flight recorder for playable AI waiting"],
  "evidence/WINNING-INTELLIGENCE-V3-OPEN-SPACE.md": [
    "Private Capsule. Shareable Ghost. Comparable wait.",
    "FULL CAPSULE IS PRIVATE EVIDENCE. WAIT GHOST IS A REDACTED DERIVATIVE.",
    "GHOST REPLAY IS NOT LIVE AI.",
    "SHOW THE DELTA. DO NOT INVENT THE VERDICT.",
    "differentiation loop **3 / 3**",
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
    "F-18",
    "35004294002",
  ],
  "evidence/CYCLE-GATE-MATRIX.md": [
    "Current iteration: **3 / 3**",
    "PASS_VERIFIED_VERCEL_RUNTIME_V3_EXACT_SHA",
    "GHOST_REPLAY_IS_NOT_LIVE_AI",
    "WAIT_DIFF_NO_SYNTHETIC_VERDICT",
    "cb3b322907197e37518e85ddb377def2053edcc3",
    "dpl_5rFD3bRMCHK5m6esVazZjz8E6kZG",
  ],
  "evidence/ORCHESTRATION-JPA.md": [
    "HOI → CHIEF OF STAFF → PROJECT AUTHORIZATION → PBPD → PROJECT FINISHER → HUMAN SUBMIT → POST-MORTEM",
    "UNKNOWN_IN_REPO / LEGACY_IMPORT",
  ],
  "evidence/RUBRIC-TRACEABILITY.md": [
    "AI-native fit",
    "Evidence honesty",
    "Private Capsule. Shareable Ghost. Comparable wait.",
  ],
  "evidence/RECONCILIATION.md": [
    "verification-before-completion",
    "BUILD_CANDIDATE_READY_WITH_LIMITATIONS",
    "Dependency security",
    "CLOSED",
  ],
  "evidence/GATE-REPORT.md": ["REAL NEGATIVE EVENT", "UNKNOWN / ABSTENTION", "PROJECT_COMPLETE"],
  "evidence/JUDGE-QA.md": [
    "What happens if the AI request fails?",
    "What exactly is a Wait Ghost?",
    "When you replay a Ghost, are you replaying the AI?",
    "What does Compare tell me?",
  ],
  "evidence/Q&A-REHEARSAL.md": ["Give me one concrete real-world failure", "QuickSpin"],
  "evidence/CLAIM-LEDGER.md": [
    "Wait Ghost replay is live AI | REFUSED",
    "wait-to-wait diff decides a winner | REFUSED",
    "WI V3 merge is green on main | VERIFIED",
    "public runtime contains WI V3 Wait Ghost changes | VERIFIED",
    "PROJECT_COMPLETE | REFUSED_CURRENTLY",
  ],
  "evidence/runtime/VERCEL-PRODUCTION-RUNTIME.md": [
    "PASS / V3 PUBLIC_DEPLOYMENT_PROOF CLOSED",
    "https://quickspin-runtime.vercel.app",
    "cb3b322907197e37518e85ddb377def2053edcc3",
    "dpl_5rFD3bRMCHK5m6esVazZjz8E6kZG",
    "All five routes returned **HTTP 200 OK**",
    "/assets/index-CRyhx7en.js",
    "Copy redacted Wait Ghost link",
    "Replay Wait Ghost",
  ],
  "evidence/security/SECURITY-GATE.md": ["PASS", "0 vulnerabilities"],
  "submission/VIDEO-SHOT-LOCK.md": [
    "PROBLEM → PAIN → TRIGGER → LIVE WORKFLOW → WOW → CONSEQUENCE → ACTION → TECHNICAL PROOF → IMPACT → CLOSE",
  ],
  "state/CANONICAL-STATE.yaml": [
    "workstream: FINAL_RUNTIME_VISUAL_PROOF_LOCK",
    "branch: main",
    "trace_visual_jury_v1:",
    "status: MERGED_CODE_VALIDATED_RUNTIME_REFRESH_PENDING",
    "merge_sha: c34012a732e8bb7cd2b5601f1a8f9862a87e4056",
    "final_pr_ci_run: 35010476926",
    "final_pr_codeql_run: 35010476921",
    "test_count: 41",
    "runtime_gate: PASS_VERIFIED_PUBLIC_RUNTIME_V3_PRE_TRACE_VISUAL",
    "runtime_source_sha: cb3b322907197e37518e85ddb377def2053edcc3",
    "runtime_deployment_id: dpl_5rFD3bRMCHK5m6esVazZjz8E6kZG",
    "runtime_trace_visual_v1: NOT_YET_DEPLOYED_NOT_CLAIMED",
    "next_required_gate: TRACE_VISUAL_JURY_V1_EXACT_MERGE_SHA_PUBLIC_RUNTIME_DEPLOY_AND_ROUTE_PROOF",
    "project_complete: false",
  ],
  "state/HANDOVER.yaml": [
    "workstream: FINAL_RUNTIME_VISUAL_PROOF_LOCK",
    "trace_visual_jury_v1_merge_sha: c34012a732e8bb7cd2b5601f1a8f9862a87e4056",
    "public_runtime: PASS_VERIFIED_VERCEL_RUNTIME_V3_PRE_TRACE_VISUAL",
    "trace_visual_runtime_deployed: false",
    "feature_scope: FROZEN_AFTER_WINNING_INTELLIGENCE_3_OF_3",
    "project_complete: false",
    "rollback",
  ],
  ".pbpd/state/ACTIVITY-TRACE.yaml": [
    "workstream: FINAL_RUNTIME_VISUAL_PROOF_LOCK",
    "v3-exact-production-deploy",
    "v3-five-route-runtime-proof",
    "v3-served-bundle-proof",
    "v3-feature-freeze",
    "github-actions:35006274961",
    "github-actions:35006274850",
    "vercel-deployment:dpl_5rFD3bRMCHK5m6esVazZjz8E6kZG",
    "PROJECT_COMPLETE_REQUIRES_TERMINAL_RECONCILIATION",
  ],
  "HACKATHON-STATE.yaml": [
    "candidate_branch: main",
    "iteration: 3_OF_3",
    "v3_code_correctness: PASS_MAIN_CI_35006274961_NODE_22_24_41_TESTS",
    "v3_codeql: PASS_MAIN_35006274850",
    "public_runtime: PASS_VERIFIED_VERCEL_RUNTIME_V3_EXACT_SHA",
    "public_runtime_deployment_id: dpl_5rFD3bRMCHK5m6esVazZjz8E6kZG",
    "project_complete: false",
  ],
  "HACKATHON-HANDOFF.yaml": [
    "Wait Ghost replay is live AI",
    "wait diff chooses a winner or quality score",
    "no other applicant has replay_share_compare",
    "REAL_FAILURE_GT_FAKE_SUCCESS",
  ],
  "HACKATHON-OPERATING-GATES.yaml": [
    "winning_intelligence_iteration: 3_OF_3",
    "PASS_VERIFIED_VERCEL_RUNTIME_V3_EXACT_SHA",
    "WAIT_GHOST_PRIVACY_REDUCTION",
    "WAIT_GHOST_REPLAY_TRUTH",
    "WAIT_DIFF_NO_SYNTHETIC_VERDICT",
    "V3_EXACT_RUNTIME_PROVENANCE",
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
const handover = loaded.get("state/HANDOVER.yaml");
const hackathon = loaded.get("HACKATHON-STATE.yaml");
const claims = loaded.get("evidence/CLAIM-LEDGER.md");
const runtime = loaded.get("evidence/runtime/VERCEL-PRODUCTION-RUNTIME.md");
const orchestration = loaded.get("evidence/ORCHESTRATION-JPA.md");
const operatingGates = loaded.get("HACKATHON-OPERATING-GATES.yaml");

for (const [name, text] of [
  ["state/CANONICAL-STATE.yaml", canonical],
  ["HACKATHON-STATE.yaml", hackathon],
]) {
  if (/project_complete:\s*true/.test(text)) throw new Error(`${name} illegally promotes PROJECT_COMPLETE`);
}

if (canonical.includes("runtime_gate: PASS_VERIFIED_PUBLIC_RUNTIME_PRE_V3")) {
  throw new Error("canonical state regressed to pre-V3 runtime");
}
if (canonical.includes("runtime_source_sha: 27de7b3b4119b6499eda79effccadf262028de58")) {
  throw new Error("canonical state regressed to the pre-V3 runtime source SHA");
}
if (canonical.includes("runtime_trace_visual_v1: DEPLOYED_VERIFIED") || handover.includes("trace_visual_runtime_deployed: true")) {
  throw new Error("TRACE visual runtime cannot be promoted before exact c34012a deployment evidence is locked");
}
if (!canonical.includes("merge_sha: c34012a732e8bb7cd2b5601f1a8f9862a87e4056")) {
  throw new Error("canonical state is missing the TRACE Visual Jury V1 merge SHA");
}
if (hackathon.includes("public_runtime: PASS_VERIFIED_VERCEL_RUNTIME_PRE_V3")) {
  throw new Error("hackathon state regressed public runtime to pre-V3");
}
if (claims.includes("public runtime contains WI V3 Wait Ghost changes | UNKNOWN")) {
  throw new Error("claim ledger regressed exact V3 runtime proof to unknown");
}
if (!runtime.includes("cb3b322907197e37518e85ddb377def2053edcc3")) {
  throw new Error("runtime evidence is missing exact V3 merge SHA");
}
if (!runtime.includes("dpl_5rFD3bRMCHK5m6esVazZjz8E6kZG")) {
  throw new Error("runtime evidence is missing exact V3 deployment id");
}
if (operatingGates.includes("WI_V3_PUBLIC_RUNTIME_REDEPLOY_AND_ROUTE_PROOF")) {
  throw new Error("operating gates still list closed V3 runtime proof as blocking");
}
if (operatingGates.includes("status: PASS_VERIFIED_LIVE_AI")) {
  throw new Error("operating gates illegally describe historical Ghost replay as live AI");
}
if (!orchestration.includes("HUMAN SUBMIT") || !orchestration.includes("POST-MORTEM")) {
  throw new Error("orchestration trace does not preserve terminal human-submit/post-mortem stages");
}
if (!orchestration.includes("UNKNOWN_IN_REPO")) {
  throw new Error("missing upstream orchestration provenance must stay UNKNOWN_IN_REPO");
}

console.log(
  `judge evidence verified: ${Object.keys(required).length} canonical artifacts + V3 runtime provenance + TRACE visual runtime-proof lock + final-gate invariants`
);
