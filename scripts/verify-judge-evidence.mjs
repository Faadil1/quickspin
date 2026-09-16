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
  "evidence/TRACE-BLACK-BOX-ARCADE.md": [
    "BLACK BOX ARCADE",
    "8d5ffd705588f449f54eed3365489e027bc1c84d",
    "35046055844",
    "35046055937",
    "10426614209",
    "sha256:519d81e124b251b5ffec8ea38874186d22fca5e0108a36ec69220f1cb48a49e8",
    "PASS_OFFLINE_EXACT_CI_ARTIFACT",
    "PASS_VERIFIED_VERCEL_BLACK_BOX_ARCADE_EXACT_SHA",
    "dpl_DyRMr38opKz8kkQjhrKFDSert9Xb",
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
    "GHOST_REPLAY_IS_NOT_LIVE_AI",
    "WAIT_DIFF_NO_SYNTHETIC_VERDICT",
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
    "PROJECT_COMPLETE | REFUSED_CURRENTLY",
  ],
  "evidence/runtime/VERCEL-PRODUCTION-RUNTIME.md": [
    "PASS / BLACK BOX ARCADE PUBLIC_DEPLOYMENT_PROOF CLOSED",
    "https://quickspin-runtime.vercel.app",
    "8d5ffd705588f449f54eed3365489e027bc1c84d",
    "dpl_DyRMr38opKz8kkQjhrKFDSert9Xb",
    "All five routes returned **HTTP 200 OK**",
    "/assets/index-B6DEyjeB.js",
    "/assets/index-CYrpJ5m5.css",
    "VERIFIED / 41 TESTS",
    "PRIVATE → REDACT → SHARE",
  ],
  "evidence/security/SECURITY-GATE.md": ["PASS", "0 vulnerabilities"],
  "submission/VIDEO-SHOT-LOCK.md": [
    "PROBLEM → PAIN → TRIGGER → LIVE WORKFLOW → WOW → CONSEQUENCE → ACTION → TECHNICAL PROOF → IMPACT → CLOSE",
  ],
  "state/CANONICAL-STATE.yaml": [
    "workstream: FINAL_RUNTIME_VISUAL_PROOF_LOCK",
    "branch: main",
    "product_source_sha: 8d5ffd705588f449f54eed3365489e027bc1c84d",
    "black_box_arcade:",
    "status: MERGED_CODE_VALIDATED_PIXEL_PASS_PUBLIC_RUNTIME_VERIFIED",
    "final_pr_ci_run: 35046055844",
    "final_pr_codeql_run: 35046055937",
    "post_merge_codeql_run: 35046206399",
    "artifact_id: 10426614209",
    "pixel_proof: PASS_OFFLINE_EXACT_CI_ARTIFACT",
    "public_exact_sha_runtime: PASS_VERIFIED_VERCEL_BLACK_BOX_ARCADE_EXACT_SHA",
    "runtime_gate: PASS_VERIFIED_PUBLIC_RUNTIME_BLACK_BOX_ARCADE_EXACT_SHA",
    "runtime_source_sha: 8d5ffd705588f449f54eed3365489e027bc1c84d",
    "runtime_deployment_id: dpl_DyRMr38opKz8kkQjhrKFDSert9Xb",
    "runtime_black_box_arcade: DEPLOYED_VERIFIED",
    "next_required_gate: FINAL_DEMO_VIDEO_CAPTURE_WITH_GHOST_AND_NEGATIVE_PATH",
    "project_complete: false",
  ],
  "state/HANDOVER.yaml": [
    "workstream: FINAL_RUNTIME_VISUAL_PROOF_LOCK",
    "product_source_sha: 8d5ffd705588f449f54eed3365489e027bc1c84d",
    "black_box_arcade_merge_sha: 8d5ffd705588f449f54eed3365489e027bc1c84d",
    "black_box_arcade_pixel_proof: PASS_OFFLINE_EXACT_CI_ARTIFACT",
    "public_runtime: PASS_VERIFIED_VERCEL_BLACK_BOX_ARCADE_EXACT_SHA",
    "production_deployment_id: dpl_DyRMr38opKz8kkQjhrKFDSert9Xb",
    "black_box_arcade_public_runtime_deployed: true",
    "feature_scope: FROZEN_AFTER_WINNING_INTELLIGENCE_3_OF_3",
    "project_complete: false",
    "rollback",
  ],
  ".pbpd/state/ACTIVITY-TRACE.yaml": [
    "workstream: FINAL_RUNTIME_VISUAL_PROOF_LOCK",
    "PROJECT_COMPLETE_REQUIRES_TERMINAL_RECONCILIATION",
  ],
  "HACKATHON-STATE.yaml": [
    "candidate_branch: main",
    "iteration: 3_OF_3",
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

if (!canonical.includes("product_source_sha: 8d5ffd705588f449f54eed3365489e027bc1c84d")) {
  throw new Error("canonical state is missing the Black Box Arcade product source SHA");
}
if (!canonical.includes("pixel_proof: PASS_OFFLINE_EXACT_CI_ARTIFACT")) {
  throw new Error("canonical state is missing exact-artifact Black Box Arcade pixel proof");
}
if (!canonical.includes("runtime_source_sha: 8d5ffd705588f449f54eed3365489e027bc1c84d")) {
  throw new Error("canonical runtime source SHA is not the Black Box Arcade product SHA");
}
if (!canonical.includes("runtime_deployment_id: dpl_DyRMr38opKz8kkQjhrKFDSert9Xb")) {
  throw new Error("canonical runtime is missing the Black Box Arcade Vercel deployment id");
}
if (!canonical.includes("runtime_black_box_arcade: DEPLOYED_VERIFIED")) {
  throw new Error("canonical runtime has not promoted the verified Black Box Arcade deployment");
}
if (!handover.includes("black_box_arcade_public_runtime_deployed: true")) {
  throw new Error("handover has not promoted the verified Black Box Arcade deployment");
}
if (!runtime.includes("8d5ffd705588f449f54eed3365489e027bc1c84d")) {
  throw new Error("runtime evidence is missing exact Black Box Arcade source SHA");
}
if (!runtime.includes("dpl_DyRMr38opKz8kkQjhrKFDSert9Xb")) {
  throw new Error("runtime evidence is missing exact Black Box Arcade deployment id");
}
if (canonical.includes("runtime_gate: PASS_VERIFIED_PUBLIC_RUNTIME_V3_PRE_BLACK_BOX_ARCADE")) {
  throw new Error("canonical state still treats the older V3 runtime as production authority");
}
if (canonical.includes("runtime_black_box_arcade: NOT_YET_DEPLOYED_NOT_CLAIMED")) {
  throw new Error("canonical state regressed Black Box Arcade runtime to pending");
}
if (claims.includes("Wait Ghost replay is live AI | VERIFIED")) {
  throw new Error("claim ledger illegally promotes historical Ghost replay as live AI");
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
  `judge evidence verified: ${Object.keys(required).length} canonical artifacts + Black Box Arcade exact-artifact pixel proof + exact Vercel runtime provenance + final-gate invariants`
);
