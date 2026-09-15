import { readFileSync } from "node:fs";

const required = {
  "evidence/REALITY-ANCHOR.md": ["June 2, 2026", "Impact observable", "Réponse / mitigation"],
  "evidence/FAILURE-LEDGER.md": ["Real failure > fake success", "DEMO_PROVIDER_TIMEOUT", "UNKNOWN"],
  "evidence/JUDGE-CYCLE.md": ["RUBRIC", "PAIN", "Q&A"],
  "evidence/RUBRIC-TRACEABILITY.md": ["AI-native fit", "Evidence honesty"],
  "evidence/RECONCILIATION.md": ["verification-before-completion", "BUILD_CANDIDATE_READY_WITH_LIMITATIONS"],
  "evidence/GATE-REPORT.md": ["NEGATIVE PATH", "handoff-to-finisher"],
  "evidence/JUDGE-QA.md": ["What happens if the AI request fails?"],
  "evidence/CLAIM-LEDGER.md": ["REFUSED", "UNKNOWN / NOT_CLAIMED"],
  "state/CANONICAL-STATE.yaml": ["REAL_FAILURE_GT_FAKE_SUCCESS", "project_complete: false"],
  "state/HANDOVER.yaml": ["main_untouched_by_this_workstream: true", "rollback"],
};

for (const [path, needles] of Object.entries(required)) {
  const text = readFileSync(path, "utf8");
  for (const needle of needles) {
    if (!text.includes(needle)) throw new Error(`${path} missing required marker: ${needle}`);
  }
}

console.log(`judge evidence verified: ${Object.keys(required).length} canonical artifacts`);
