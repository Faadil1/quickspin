import { readFileSync, writeFileSync } from "node:fs";

function patch(path, transform) {
  const before = readFileSync(path, "utf8");
  const after = transform(before);
  if (after !== before) writeFileSync(path, after);
}

function replaceExact(text, from, to, label) {
  if (!text.includes(from)) throw new Error(`missing patch anchor: ${label}`);
  return text.replace(from, to);
}

patch("src/sdk/widget.ts", (input) => {
  if (input.includes("getLastCapsule()")) return input;
  let text = input;
  text = replaceExact(text,
    `  EndReason,\n  ExecutionSignal,\n  GameDefinition,`,
    `  EndReason,\n  ExecutionSignal,\n  ExecutionTrailEntry,\n  HostIntervention,\n  HostObservation,\n  InterventionIntent,\n  InterventionResult,\n  WaitCapsule,\n  GameDefinition,`,
    "widget type imports");
  text = replaceExact(text,
    `  bestLabel,\n  recordSession,\n  totalSessions,`,
    `  bestLabel,\n  evidenceCoverageFromTrail,\n  recordSession,\n  sessionRecordToCapsule,\n  totalSessions,`,
    "widget persistence imports");
  text = replaceExact(text,
    `  const pendingSignals: ExecutionSignal[] = [];\n  let latestStatus = "Waiting for the model…";`,
    `  const pendingSignals: ExecutionSignal[] = [];\n  const executionTrail: ExecutionTrailEntry[] = [];\n  let lastCapsule: WaitCapsule | null = null;\n  let latestStatus = "Waiting for the model…";`,
    "widget evidence state");
  text = replaceExact(text,
    `  function emit(e: WaitEvent): void {\n    if (opts.onEvent) opts.onEvent(e);\n    if (externalHandler) externalHandler(e);\n  }\n`,
    `  function emit(e: WaitEvent): void {\n    if (opts.onEvent) opts.onEvent(e);\n    if (externalHandler) externalHandler(e);\n  }\n\n  function trailAtMs(): number {\n    return startedAt > 0 ? Math.max(0, performance.now() - startedAt) : 0;\n  }\n\n  function finalizeCapsule(record: Parameters<typeof sessionRecordToCapsule>[0]): void {\n    lastCapsule = sessionRecordToCapsule(record);\n    emit({ type: "capsule", data: lastCapsule });\n  }\n`,
    "widget evidence helpers");

  text = text.replace(`      outcome: "completed",\n    });`, `      outcome: "completed",\n      trail: executionTrail,\n      evidenceCoverage: evidenceCoverageFromTrail(executionTrail),\n    });`);
  text = text.replace(`      outcome: "cancelled",\n    });`, `      outcome: "cancelled",\n      trail: executionTrail,\n      evidenceCoverage: evidenceCoverageFromTrail(executionTrail),\n    });`);
  text = text.replace(`      failureMessage: failure.message.slice(0, 240),\n    });`, `      failureMessage: failure.message.slice(0, 240),\n      trail: executionTrail,\n      evidenceCoverage: evidenceCoverageFromTrail(executionTrail),\n    });`);

  text = text.replace(`    });\n    destroyGame();\n    updateFooterStats();\n\n    if (uiShown) {`, `    });\n    finalizeCapsule(rec.record);\n    destroyGame();\n    updateFooterStats();\n\n    if (uiShown) {`);
  text = text.replace(`    emit({\n      type: "cancel",\n      data: { id: rec.id, outcome: "cancelled", game: currentGame ? gameId : null },\n    });\n    destroyGame();`, `    emit({\n      type: "cancel",\n      data: { id: rec.id, outcome: "cancelled", game: currentGame ? gameId : null },\n    });\n    finalizeCapsule(rec.record);\n    destroyGame();`);
  text = text.replace(`    emit({\n      type: "fail",\n      data: {\n        id: rec.id,\n        outcome: "failed",\n        code: "HOST_REQUEST_FAILED",\n        error: { name: failure.name, message: failure.message },\n      },\n    });\n    destroyGame();`, `    emit({\n      type: "fail",\n      data: {\n        id: rec.id,\n        outcome: "failed",\n        code: "HOST_REQUEST_FAILED",\n        error: { name: failure.name, message: failure.message },\n      },\n    });\n    finalizeCapsule(rec.record);\n    destroyGame();`);

  text = replaceExact(text,
    `    pendingSignals.length = 0;\n    collapsed = false;`,
    `    pendingSignals.length = 0;\n    executionTrail.length = 0;\n    collapsed = false;`,
    "widget trail reset");
  text = replaceExact(text,
    `      if (normalized !== latestPhase) {\n        latestPhase = normalized;\n        phaseIndex += 1;\n        phaseIntensity = clamp01(0.18 + Math.max(0, phaseIndex) * 0.22);\n      }`,
    `      if (normalized !== latestPhase) {\n        latestPhase = normalized;\n        phaseIndex += 1;\n        phaseIntensity = clamp01(0.18 + Math.max(0, phaseIndex) * 0.22);\n        executionTrail.push({ type: "phase", atMs: trailAtMs(), phase: normalized });\n      }`,
    "widget phase trail");
  text = replaceExact(text,
    `      if (!normalized) {\n        emit({\n          type: "signal-rejected",`,
    `      if (!normalized) {\n        executionTrail.push({\n          type: "signal-rejected",\n          atMs: trailAtMs(),\n          phase: latestPhase ?? undefined,\n          reason: "INSUFFICIENT_EVIDENCE",\n        });\n        emit({\n          type: "signal-rejected",`,
    "widget rejected trail");
  text = replaceExact(text,
    `      if (currentGame?.signal) currentGame.signal(normalized);\n      else {`,
    `      executionTrail.push({\n        type: "signal",\n        atMs: trailAtMs(),\n        phase: latestPhase ?? undefined,\n        signal: normalized,\n      });\n\n      if (currentGame?.signal) currentGame.signal(normalized);\n      else {`,
    "widget accepted trail");
  text = replaceExact(text,
    `      return true;\n    },\n    complete() {`,
    `      return true;\n    },\n    observe(observation: HostObservation) {\n      if (!sessionActive) return false;\n      let observed = false;\n      let accepted = true;\n      const phase = typeof observation?.phase === "string" ? observation.phase.trim() : "";\n      if (phase) {\n        observed = true;\n        session.setPhase(phase);\n      }\n      if (observation?.signal) {\n        observed = true;\n        accepted = session.signal(observation.signal) && accepted;\n      }\n      return observed && accepted;\n    },\n    async intervene(intent: InterventionIntent): Promise<InterventionResult> {\n      const id = globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);\n      if (!sessionActive) return { id, accepted: false, reason: "SESSION_NOT_ACTIVE" };\n      const hostIntent: HostIntervention = {\n        kind: intent.kind,\n        label: typeof intent.label === "string" ? intent.label.slice(0, 96) : undefined,\n        payload: intent.payload,\n        id,\n        atMs: trailAtMs(),\n      };\n      executionTrail.push({ type: "intervention", atMs: hostIntent.atMs, intervention: hostIntent });\n      emit({ type: "intervention", data: hostIntent });\n      let result: InterventionResult;\n      if (!opts.onIntervention) {\n        result = { id, accepted: false, reason: "NO_HOST_HANDLER" };\n      } else {\n        try {\n          const hostResult = await opts.onIntervention(hostIntent);\n          result = {\n            id,\n            accepted: Boolean(hostResult?.accepted),\n            reason: typeof hostResult?.reason === "string" ? hostResult.reason.slice(0, 160) : undefined,\n            evidenceRef:\n              typeof hostResult?.evidenceRef === "string" && hostResult.evidenceRef.trim()\n                ? hostResult.evidenceRef.trim().slice(0, 160)\n                : undefined,\n          };\n        } catch {\n          result = { id, accepted: false, reason: "HOST_HANDLER_FAILED" };\n        }\n      }\n      executionTrail.push({ type: "intervention-result", atMs: trailAtMs(), interventionResult: result });\n      emit({ type: "intervention-result", data: result });\n      return result;\n    },\n    complete() {`,
    "widget observe intervention");
  text = replaceExact(text,
    `    on(handler) {\n      externalHandler = handler;\n      return () => {\n        if (externalHandler === handler) externalHandler = null;\n      };\n    },\n    get status() {`,
    `    on(handler) {\n      externalHandler = handler;\n      return () => {\n        if (externalHandler === handler) externalHandler = null;\n      };\n    },\n    getLastCapsule() {\n      return lastCapsule ? (JSON.parse(JSON.stringify(lastCapsule)) as WaitCapsule) : null;\n    },\n    exportLastCapsule() {\n      return lastCapsule ? JSON.stringify(lastCapsule, null, 2) : null;\n    },\n    get status() {`,
    "widget capsule API");
  return text;
});

patch("src/sdk/persistence.test.ts", (input) => {
  if (input.includes("builds a portable Evidence Capsule")) return input;
  let text = input;
  text = replaceExact(text,
    `  currentDayStreak,\n  leaderboard,\n  loadStorage,`,
    `  currentDayStreak,\n  evidenceCoverageFromTrail,\n  latestWaitCapsule,\n  leaderboard,\n  loadStorage,`,
    "test imports");
  text = replaceExact(text,
    `  it("resetAll clears everything", () => {`,
    `  it("builds a portable Evidence Capsule with transparent coverage", () => {\n    const trail = [\n      { type: "phase" as const, atMs: 10, phase: "Searching" },\n      { type: "signal" as const, atMs: 20, signal: { kind: "retrieval" as const, label: "Retrieved sources", evidenceRef: "run:retrieval:1" } },\n      { type: "signal-rejected" as const, atMs: 30, reason: "INSUFFICIENT_EVIDENCE" },\n      { type: "intervention-result" as const, atMs: 40, interventionResult: { id: "intent-1", accepted: true, evidenceRef: "run:intent:1" } },\n    ];\n    const coverage = evidenceCoverageFromTrail(trail);\n    expect(coverage).toMatchObject({ phaseChanges: 1, acceptedSignals: 1, rejectedSignals: 1, uniqueEvidenceRefs: 2, acceptedInterventions: 1 });\n    recordSession({ gameId: "runner", score: 42, actualWaitMs: 12000, engagedPlayMs: 8000, completed: true, outcome: "completed", trail, evidenceCoverage: coverage });\n    const capsule = latestWaitCapsule();\n    expect(capsule?.outcome).toBe("completed");\n    expect(capsule?.trail).toHaveLength(4);\n    expect(capsule?.trail[1].signal?.evidenceRef).toBe("run:retrieval:1");\n    expect(capsule?.evidenceCoverage.rejectedSignals).toBe(1);\n  });\n\n  it("preserves failure truth inside the Evidence Capsule", () => {\n    recordSession({ gameId: null, score: null, actualWaitMs: 1400, engagedPlayMs: 0, completed: false, outcome: "failed", failureCode: "HOST_REQUEST_FAILED", failureMessage: "DEMO_PROVIDER_TIMEOUT", trail: [{ type: "signal-rejected", atMs: 100, reason: "INSUFFICIENT_EVIDENCE" }] });\n    const capsule = latestWaitCapsule();\n    expect(capsule?.outcome).toBe("failed");\n    expect(capsule?.failureMessage).toBe("DEMO_PROVIDER_TIMEOUT");\n    expect(capsule?.evidenceCoverage.rejectedSignals).toBe(1);\n  });\n\n  it("resetAll clears everything", () => {`,
    "capsule tests");
  return text;
});

patch("src/demo/main.ts", (input) => {
  if (input.includes("Copy Evidence Capsule")) return input;
  let text = input;
  text = text.replace("produces a signed Wait Receipt", "produces a truthful Wait Receipt");
  text = text.replace("signed perceived wait", "perceived-wait delta");
  text = replaceExact(text,
    `<button id="run-failure" class="failure">Run negative-path proof</button>\n          <button id="reset-stats">Reset local evidence</button>`,
    `<button id="run-failure" class="failure">Run negative-path proof</button>\n          <button id="copy-capsule">Copy Evidence Capsule</button>\n          <button id="reset-stats">Reset local evidence</button>`,
    "capsule button");
  text = replaceExact(text,
    `      <div class="receipt-row"><span>PROVENANCE</span><strong>HOST-OBSERVED</strong></div>`,
    `      <div class="receipt-row"><span>PROVENANCE</span><strong>HOST-OBSERVED</strong></div>\n      <div class="receipt-row"><span>EVIDENCE CAPSULE</span><strong>PORTABLE JSON</strong></div>\n      <div class="receipt-row"><span>UNKNOWN</span><strong>RETAINED / NOT LAUNDERED</strong></div>`,
    "proof capsule rows");
  text = replaceExact(text,
    `  const failureBtn = app.querySelector<HTMLButtonElement>("#run-failure")!;\n  const resetBtn = app.querySelector<HTMLButtonElement>("#reset-stats")!;`,
    `  const failureBtn = app.querySelector<HTMLButtonElement>("#run-failure")!;\n  const copyCapsuleBtn = app.querySelector<HTMLButtonElement>("#copy-capsule")!;\n  const resetBtn = app.querySelector<HTMLButtonElement>("#reset-stats")!;`,
    "capsule selector");
  text = replaceExact(text,
    `  let ctrl: QuickSpinController = createQuickSpin({\n    target: mount,\n    delayMs: 0,\n    onEvent: logEvents,\n  });`,
    `  const controllerOptions = {\n    target: mount,\n    delayMs: 0,\n    onEvent: logEvents,\n    onIntervention: (intent: { id: string; kind: string }) => ({\n      id: intent.id,\n      accepted: intent.kind === "refine",\n      reason: intent.kind === "refine" ? "HOST_APPLIED_REFINEMENT" : "DEMO_HOST_REFUSED_INTENT",\n      evidenceRef: intent.kind === "refine" ? "demo:intervention:walkability" : undefined,\n    }),\n  };\n  let ctrl: QuickSpinController = createQuickSpin(controllerOptions);`,
    "intervention host");
  text = replaceExact(text,
    `  const runQuickSpin = async (): Promise<void> => {\n    const session = ctrl.start({ status: PHASES[0].status });\n    session.setProgress();\n    for (const phase of PHASES) {`,
    `  const runQuickSpin = async (): Promise<void> => {\n    const session = ctrl.start({ status: PHASES[0].status });\n    session.setProgress();\n    session.signal({ kind: "retrieval", label: "Unproven retrieval candidate", evidenceRef: "" });\n    const intervention = await session.intervene({ kind: "refine", label: "Prioritize walkability in the final ranking" });\n    for (const phase of PHASES) {`,
    "signature sequence");
  text = replaceExact(text,
    `    session.complete();\n    phaseEl.innerHTML = "Phase: <strong>Done</strong> — response ready; inspect the Wait Receipt.";`,
    `    session.complete();\n    const capsule = ctrl.getLastCapsule();\n    phaseEl.innerHTML =\n      "Phase: <strong>Done</strong> — Evidence Capsule retained <strong>" +\n      String(capsule?.evidenceCoverage.acceptedSignals ?? 0) +\n      "</strong> accepted signal(s), <strong>" +\n      String(capsule?.evidenceCoverage.rejectedSignals ?? 0) +\n      "</strong> UNKNOWN/rejected signal(s), and host intervention <strong>" +\n      (intervention.accepted ? "ACKNOWLEDGED" : "REJECTED") +\n      "</strong>.";`,
    "capsule summary");
  text = replaceExact(text,
    `  failureBtn.addEventListener("click", () => void runFailure());\n  resetBtn.addEventListener("click", () => {`,
    `  failureBtn.addEventListener("click", () => void runFailure());\n  copyCapsuleBtn.addEventListener("click", () => {\n    const capsule = ctrl.exportLastCapsule();\n    if (!capsule) { copyCapsuleBtn.textContent = "Run a QuickSpin path first"; return; }\n    void navigator.clipboard?.writeText(capsule);\n    copyCapsuleBtn.textContent = "Evidence Capsule copied";\n  });\n  resetBtn.addEventListener("click", () => {`,
    "capsule export");
  text = replaceExact(text,
    `    ctrl = createQuickSpin({ target: mount, delayMs: 0, onEvent: logEvents });`,
    `    ctrl = createQuickSpin(controllerOptions);\n    copyCapsuleBtn.textContent = "Copy Evidence Capsule";`,
    "reset controller");
  return text;
});

patch("scripts/verify-judge-evidence.mjs", (input) => {
  if (input.includes("WINNING-INTELLIGENCE-V2.md")) return input;
  return replaceExact(input,
    `const required = {\n`,
    `const required = {\n  "evidence/WINNING-INTELLIGENCE-V2.md": [\n    "Distinction Gate",\n    "Evidence Capsule",\n    "Flight recorder for playable AI waiting",\n    "COMMONS_SUBMISSION_LOCK",\n    "Maximum 3 product-differentiation iterations",\n  ],\n`,
    "judge verifier WI artifact");
});

console.log("Winning Intelligence V2 product migration applied.");
