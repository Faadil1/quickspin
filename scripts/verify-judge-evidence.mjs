import { existsSync, readFileSync } from "node:fs";

const required = {
  "evidence/REALITY-ANCHOR.md": [
    "Signal positif / opportunité",
    "Événement négatif concret, réel et vérifiable",
    "Impact observable",
    "Leçon / implication design",
    "Réponse / mitigation QuickSpin",
    "June 2–3, 2026",
    "REAL FAILURE > FAKE SUCCESS",
  ],
  "evidence/FAILURE-LEDGER.md": [
    "Real failure > fake success",
    "DEMO_PROVIDER_TIMEOUT",
    "UNKNOWN counter-case",
    "F-08",
    "F-09",
  ],
  "evidence/JUDGE-CYCLE.md": ["RUBRIC", "PAIN", "PROBLEM", "DIFFERENTIATOR", "EXECUTION", "EVIDENCE", "STORY", "DEMO", "Q&A"],
  "evidence/CYCLE-GATE-MATRIX.md": [
    "Core judge/product cycle",
    "Mandatory reality-anchor pattern",
    "Failure-truth gates",
    "Cross-cutting build gates",
    "Terminal promotion sequence",
  ],
  "evidence/RUBRIC-TRACEABILITY.md": ["AI-native fit", "Evidence honesty"],
  "evidence/RECONCILIATION.md": [
    "verification-before-completion",
    "BUILD_CANDIDATE_READY_WITH_LIMITATIONS",
    "Dependency security: CLOSED",
    "Public deployment proof",
  ],
  "evidence/GATE-REPORT.md": ["REAL NEGATIVE EVENT", "UNKNOWN / ABSTENTION", "PROJECT_COMPLETE"],
  "evidence/JUDGE-QA.md": ["What happens if the AI request fails?"],
  "evidence/Q&A-REHEARSAL.md": ["QuickSpin"],
  "evidence/CLAIM-LEDGER.md": ["REFUSED", "UNKNOWN / NOT_CLAIMED", "dependency-security gate is closed", "public judge runtime is live"],
  "evidence/security/SECURITY-GATE.md": ["PASS", "0 vulnerabilities"],
  "state/CANONICAL-STATE.yaml": [
    "workstream: FINAL_QC_AND_SUBMISSION_FINISHER",
    "REAL_FAILURE_GT_FAKE_SUCCESS",
    "project_complete: false",
    "PENDING_REPOSITORY_PAGES_ENABLEMENT",
  ],
  "state/HANDOVER.yaml": ["FINAL_QC_AND_SUBMISSION_FINISHER", "project_complete: false", "rollback"],
  ".pbpd/state/ACTIVITY-TRACE.yaml": [
    "workstream: FINAL_QC_AND_SUBMISSION_FINISHER",
    "handoff-to-finisher",
    "PROJECT_COMPLETE_REQUIRES_TERMINAL_RECONCILIATION",
  ],
  "HACKATHON-STATE.yaml": [
    "BUILD_CANDIDATE_READY_WITH_LIMITATIONS",
    "project_complete: false",
    "concrete_real_negative_event: PASS",
    "handoff_to_finisher: ACTIVE",
  ],
  "HACKATHON-HANDOFF.yaml": ["ACTIVE_WITH_BLOCKING_FINAL_GATES", "forbidden_claims", "REAL_FAILURE_GT_FAKE_SUCCESS"],
  "HACKATHON-OPERATING-GATES.yaml": [
    "REAL_NEGATIVE_EVENT",
    "UNKNOWN_ABSTENTION",
    "PUBLIC_RUNTIME",
    "SUBMISSION_PACKAGE",
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
const reconciliation = loaded.get("evidence/RECONCILIATION.md");
const claims = loaded.get("evidence/CLAIM-LEDGER.md");

for (const [name, text] of [
  ["state/CANONICAL-STATE.yaml", canonical],
  ["HACKATHON-STATE.yaml", hackathon],
  ["HACKATHON-HANDOFF.yaml", handoff],
]) {
  if (/project_complete:\s*true/.test(text)) throw new Error(`${name} illegally promotes PROJECT_COMPLETE`);
}

if (canonical.includes("DEPENDENCY_VULNERABILITY_RECONCILIATION")) {
  throw new Error("canonical state still lists the closed dependency vulnerability reconciliation as open");
}
if (reconciliation.includes("Dependency audit open")) {
  throw new Error("reconciliation still describes the closed dependency audit as open");
}
if (claims.includes("security complete | REFUSED | dependency-vulnerability reconciliation still open")) {
  throw new Error("claim ledger still uses the stale dependency-security rationale");
}
if (existsSync(".github/workflows/final-judge-patch.yml")) {
  throw new Error("one-shot final judge patch workflow must not remain active after successful migration");
}

console.log(`judge evidence verified: ${Object.keys(required).length} canonical artifacts + cross-state invariants`);
