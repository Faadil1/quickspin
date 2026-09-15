from pathlib import Path


def replace_once(path: str, old: str, new: str) -> None:
    p = Path(path)
    text = p.read_text()
    if old not in text:
        raise SystemExit(f"missing patch marker in {path}: {old[:80]!r}")
    p.write_text(text.replace(old, new, 1))


# widget.ts — normalize, queue, emit, and deliver truthful host execution signals.
replace_once(
    "src/sdk/widget.ts",
    '  EndReason,\n  GameDefinition,',
    '  EndReason,\n  ExecutionSignal,\n  GameDefinition,',
)
replace_once(
    "src/sdk/widget.ts",
    'const GAMES: Record<string, GameDefinition> = {\n  runner: runnerGame,\n  orbit: orbitGame,\n};\n',
    'const GAMES: Record<string, GameDefinition> = {\n  runner: runnerGame,\n  orbit: orbitGame,\n};\n\nconst SIGNAL_KINDS = new Set<ExecutionSignal["kind"]>([\n  "retrieval",\n  "tool",\n  "artifact",\n  "warning",\n]);\n\nfunction normalizeExecutionSignal(signal: ExecutionSignal): ExecutionSignal | null {\n  const kind = signal?.kind;\n  const label = typeof signal?.label === "string" ? signal.label.trim() : "";\n  if (!SIGNAL_KINDS.has(kind) || !label) return null;\n  return { kind, label: label.slice(0, 64) };\n}\n',
)
replace_once(
    "src/sdk/widget.ts",
    '  let phaseIntensity = 0;\n  let latestStatus = "Waiting for the model…";',
    '  let phaseIntensity = 0;\n  const pendingSignals: ExecutionSignal[] = [];\n  let latestStatus = "Waiting for the model…";',
)
replace_once(
    "src/sdk/widget.ts",
    '    currentGame = g;\n    g.start();\n    emit({',
    '    currentGame = g;\n    g.start();\n    if (g.signal && pendingSignals.length > 0) {\n      const queued = pendingSignals.splice(0, pendingSignals.length);\n      for (const signal of queued) g.signal(signal);\n    }\n    emit({',
)
replace_once(
    "src/sdk/widget.ts",
    '    phaseIntensity = 0;\n    collapsed = false;',
    '    phaseIntensity = 0;\n    pendingSignals.length = 0;\n    collapsed = false;',
)
replace_once(
    "src/sdk/widget.ts",
    '    complete() {\n      completeSession();\n    },',
    '    signal(signal: ExecutionSignal) {\n      if (!sessionActive) return;\n      const normalized = normalizeExecutionSignal(signal);\n      if (!normalized) return;\n\n      if (currentGame?.signal) currentGame.signal(normalized);\n      else {\n        pendingSignals.push(normalized);\n        if (pendingSignals.length > 8) pendingSignals.shift();\n      }\n\n      emit({\n        type: "signal",\n        data: {\n          ...normalized,\n          phase: latestPhase,\n          status: machine.status,\n        },\n      });\n    },\n    complete() {\n      completeSession();\n    },',
)

# index.ts — expose the point-12 primitives/types.
replace_once(
    "src/sdk/index.ts",
    '  runnerCollides,\n  runnerGame,',
    '  runnerCollectSignal,\n  runnerCollides,\n  runnerGame,\n  runnerInjectSignal,',
)
replace_once(
    "src/sdk/index.ts",
    'export { createOrbitSurface, orbitGame, orbitResult, orbitStep, orbitTap } from "./orbit";',
    'export {\n  createOrbitSurface,\n  orbitAwardSignal,\n  orbitGame,\n  orbitResult,\n  orbitStep,\n  orbitTap,\n} from "./orbit";',
)
replace_once(
    "src/sdk/index.ts",
    '  EndReason,\n  GameDefinition,',
    '  EndReason,\n  ExecutionSignal,\n  ExecutionSignalKind,\n  GameDefinition,',
)

# runner.test.ts — the bonus only exists after a real pickup collision.
replace_once(
    "src/sdk/runner.test.ts",
    '  createRunnerSurface,\n  runnerCollides,',
    '  createRunnerSurface,\n  runnerCollectSignal,\n  runnerCollides,\n  runnerInjectSignal,',
)
replace_once(
    "src/sdk/runner.test.ts",
    '  it("reports an honest score from live state, tagged to the reason", () => {',
    '  it("only scores a host execution signal after an actual pickup collision", () => {\n    const s = createRunnerSurface(480, 220);\n    expect(\n      runnerInjectSignal(s, 480, { kind: "tool", label: "Called restaurant search" })\n    ).toBe(true);\n    expect(s.signalBonus).toBe(0);\n    s.signalX = 8;\n    s.signalY = s.playerY + 8;\n    expect(runnerCollectSignal(s)).toBe(true);\n    expect(s.signalsCollected).toBe(1);\n    expect(s.signalBonus).toBe(200);\n    expect(runnerResult(s, "ai-complete").score).toBeGreaterThanOrEqual(200);\n  });\n\n  it("reports an honest score from live state, tagged to the reason", () => {',
)

# orbit.test.ts — the bonus is awarded only after the live signal target is caught.
replace_once(
    "src/sdk/orbit.test.ts",
    'import { createOrbitSurface, orbitGame, orbitResult, orbitStep, orbitTap } from "./orbit";',
    'import {\n  createOrbitSurface,\n  orbitAwardSignal,\n  orbitGame,\n  orbitResult,\n  orbitStep,\n  orbitTap,\n} from "./orbit";',
)
replace_once(
    "src/sdk/orbit.test.ts",
    '  it("scoring accounts for accuracy and best combo", () => {',
    '  it("adds an execution-signal bonus only when the game awards a caught signal", () => {\n    const s = createOrbitSurface(480, 220);\n    expect(orbitResult(s, "ai-complete").score).toBe(0);\n    orbitAwardSignal(s, { kind: "artifact", label: "Draft assembled" });\n    expect(s.signalsCaught).toBe(1);\n    expect(s.signalBonus).toBe(250);\n    expect(orbitResult(s, "ai-complete").score).toBe(250);\n  });\n\n  it("scoring accounts for accuracy and best combo", () => {',
)

# demo — deterministic host-supplied signals ride alongside the exact same 12s wait.
replace_once(
    "src/demo/main.ts",
    'import type { PlanOption, QuickSpinController, WaitEventHandler } from "../sdk/types";',
    'import type {\n  ExecutionSignal,\n  PlanOption,\n  QuickSpinController,\n  WaitEventHandler,\n} from "../sdk/types";',
)
replace_once(
    "src/demo/main.ts",
    '/** Exactly 12 seconds: the before/after demo claim now matches runtime reality. */\nconst PHASES: Array<[string, number, number]> = [\n  ["Reasoning…", 0.12, 2600],\n  ["Searching the web…", 0.32, 3100],\n  ["Drafting…", 0.62, 3400],\n  ["Polishing…", 0.88, 2900],\n];',
    '/** Exactly 12 seconds: the before/after demo claim now matches runtime reality. */\ninterface DemoPhase {\n  status: string;\n  progress: number;\n  ms: number;\n  signal: ExecutionSignal;\n}\n\nconst PHASES: DemoPhase[] = [\n  {\n    status: "Reasoning…",\n    progress: 0.12,\n    ms: 2600,\n    signal: { kind: "tool", label: "Planned constraints" },\n  },\n  {\n    status: "Searching the web…",\n    progress: 0.32,\n    ms: 3100,\n    signal: { kind: "retrieval", label: "Retrieved Austin dinner options" },\n  },\n  {\n    status: "Drafting…",\n    progress: 0.62,\n    ms: 3400,\n    signal: { kind: "artifact", label: "Ranked five candidate spots" },\n  },\n  {\n    status: "Polishing…",\n    progress: 0.88,\n    ms: 2900,\n    signal: { kind: "artifact", label: "Final answer assembled" },\n  },\n];',
)
replace_once(
    "src/demo/main.ts",
    '    track.querySelector<HTMLElement>(".spinner-label")!.textContent = PHASES[0][0];\n    for (const [status, p, ms] of PHASES) {',
    '    track.querySelector<HTMLElement>(".spinner-label")!.textContent = PHASES[0].status;\n    for (const { status, progress: p, ms } of PHASES) {',
)
replace_once(
    "src/demo/main.ts",
    '    phaseEl.innerHTML = "Phase: <strong>" + PHASES[0][0] + "</strong>";\n    const session = ctrl!.start({ status: PHASES[0][0] });',
    '    phaseEl.innerHTML = "Phase: <strong>" + PHASES[0].status + "</strong>";\n    const session = ctrl!.start({ status: PHASES[0].status });',
)
replace_once(
    "src/demo/main.ts",
    '    for (const [status, _p, ms] of PHASES) {\n      session.setPhase(status);\n      phaseEl.innerHTML =\n        "Phase: <strong>" + status + "</strong> · game intensity follows the phase";\n      await sleep(ms);\n    }',
    '    for (const { status, ms, signal } of PHASES) {\n      session.setPhase(status);\n      session.signal(signal);\n      phaseEl.innerHTML =\n        "Phase: <strong>" +\n        status +\n        "</strong> · live signal: <strong>" +\n        signal.kind +\n        "</strong> — " +\n        signal.label;\n      await sleep(ms);\n    }',
)
replace_once(
    "src/demo/main.ts",
    '      "When the host has no trustworthy percentage, real phase changes raise game intensity instead of fabricating progress."',
    '      "Real phase changes raise game intensity, and observed host execution events become collectible or catchable gameplay signals."',
)
replace_once(
    "src/demo/main.ts",
    '`<div class="game"><div class="name">Phase coupling</div><div class="tag">Reasoning → search → draft → polish changes pace from real host signals.</div></div>`;',
    '`<div class="game"><div class="name">Execution signals</div><div class="tag">Retrievals, tools, artifacts, and warnings become scorable game events only when the host actually sends them.</div></div>`;',
)
replace_once(
    "src/demo/main.ts",
    '`Mount it once, feed it real model phases, and complete the session when the actual response resolves. ` +',
    '`Mount it once, feed it real model phases plus observed execution signals, and complete the session when the actual response resolves. ` +',
)
replace_once(
    "src/demo/main.ts",
    'session.setPhase(<span class="tok-str">"Searching the web…"</span>); <span class="tok-cmt">// real phase drives game intensity</span>\nsession.setPhase(<span class="tok-str">"Drafting…"</span>);',
    'session.setPhase(<span class="tok-str">"Searching the web…"</span>); <span class="tok-cmt">// real phase drives game intensity</span>\nsession.signal({ kind: <span class="tok-str">"retrieval"</span>, label: <span class="tok-str">"Retrieved 12 sources"</span> });\nsession.setPhase(<span class="tok-str">"Drafting…"</span>);\nsession.signal({ kind: <span class="tok-str">"artifact"</span>, label: <span class="tok-str">"Draft assembled"</span> });',
)

# README — document the new host-observed execution-signal layer.
replace_once(
    "README.md",
    'Instead of leaving users on a passive\n“thinking…” spinner, a host can expose its real execution phases to a playable widget.',
    'Instead of leaving users on a passive\n“thinking…” spinner, a host can expose its real execution phases and observed execution signals to a playable widget.',
)
replace_once(
    "README.md",
    'session.setPhase("Searching the web…");\nsession.setPhase("Drafting…");',
    'session.setPhase("Searching the web…");\nsession.signal({ kind: "retrieval", label: "Retrieved 12 sources" });\nsession.setPhase("Drafting…");\nsession.signal({ kind: "artifact", label: "Draft assembled" });',
)
replace_once(
    "README.md",
    '## Wait Receipt\n',
    '## Execution Signals\n\n`setPhase()` changes the pace of the waiting game. `signal()` goes one level deeper: it lets a host\nturn a **real observed runtime event** into game content. QuickSpin supports four intentionally small\nsemantic kinds: `retrieval`, `tool`, `artifact`, and `warning`.\n\n```ts\nsession.signal({ kind: "retrieval", label: "Retrieved 12 sources" });\nsession.signal({ kind: "tool", label: "Called maps search" });\nsession.signal({ kind: "artifact", label: "Draft assembled" });\n```\n\nWait Runner emits those events as collectible diamonds; Orbit Catch attaches them to catchable\ntargets. A signal only changes the score after the player actually interacts with it. Signals that\narrive before the player starts are queued briefly and delivered when gameplay begins.\n\n**Epistemic rule:** QuickSpin never infers these events from elapsed time, phase names, or animation.\nThe host must call `session.signal(...)` from something it genuinely observed in its own AI runtime.\nIf the host has no such events, it simply does not send them.\n\n## Wait Receipt\n',
)
replace_once(
    "README.md",
    'Relevant events include `session-start`, `phase`, `progress`, `game-start`, `session-complete`,',
    'Relevant events include `session-start`, `phase`, `progress`, `signal`, `game-start`, `session-complete`,',
)

# Recording script — make the new differentiator explicit without inflating runtime.
replace_once(
    "demo.md",
    '> “Same twelve seconds. QuickSpin starts in a real waiting state. This demo deliberately leaves\n> progress indeterminate, so the host’s real phase changes drive game intensity instead: reasoning,\n> search, drafting, polishing.”\n\nPoint briefly at the phase label as the pace changes.',
    '> “Same twelve seconds. QuickSpin starts in a real waiting state. This demo deliberately leaves\n> progress indeterminate, so the host’s phase changes drive game intensity. The host also sends\n> explicit execution signals — retrievals, tools, and artifacts — and those become real game events.”\n\nPoint at the phase label and event log, then collect at least one signal token. Clarify that these are\ndeterministic demo-host events, not AI state invented by QuickSpin.',
)
replace_once(
    "demo.md",
    '> “Production integration has one important guardrail: QuickSpin waits 650 milliseconds by default,\n> so fast AI responses don’t flash a game UI. Mount it once, pass real phases, keep progress\n> indeterminate when you don’t know it, and call complete when the real response resolves.”\n\nPoint to `delayMs`, `setProgress()`, `setPhase()`, and `complete()`.',
    '> “Production integration has one important guardrail: QuickSpin waits 650 milliseconds by default,\n> so fast AI responses don’t flash a game UI. Mount it once, pass real phases, and when your runtime\n> genuinely observes a retrieval, tool call, artifact, or warning, pass that event too. If you don’t\n> know progress, leave it indeterminate.”\n\nPoint to `delayMs`, `setProgress()`, `setPhase()`, `signal()`, and `complete()`.',
)
replace_once(
    "demo.md",
    '- Never call the demo’s simulated model phases “live production AI.”',
    '- Never call the demo’s simulated model phases or execution signals “live production AI.”',
)

print("point-12 patch applied")
