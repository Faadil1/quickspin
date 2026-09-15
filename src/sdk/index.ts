import { createQuickSpin } from "./widget";
export { createQuickSpin } from "./widget";
export { SessionStateMachine } from "./state-machine";
export {
  bestScore,
  bestLabel,
  completedSessions,
  currentDayStreak,
  evidenceCoverageFromTrail,
  getSessionRecord,
  latestSessionRecord,
  latestWaitCapsule,
  leaderboard,
  loadStorage,
  perceivedWaitStats,
  recordSession,
  resetAll,
  sessionRecordToCapsule,
  totalSessions,
  totalWaitTurnedToPlayMs,
  updateSessionPerception,
} from "./persistence";
export type { SessionRecord } from "./persistence";
export {
  createRunnerSurface,
  runnerCollectSignal,
  runnerCollides,
  runnerGame,
  runnerInjectSignal,
  runnerJump,
  runnerResult,
  runnerStep,
} from "./runner";
export {
  createOrbitSurface,
  orbitAwardSignal,
  orbitGame,
  orbitResult,
  orbitStep,
  orbitTap,
} from "./orbit";
export { PLANS } from "./paywall";
export type {
  CheckoutResult,
  CreateQuickSpinOptions,
  EndReason,
  EvidenceCoverage,
  ExecutionSignal,
  ExecutionSignalKind,
  ExecutionTrailEntry,
  ExecutionTrailEntryType,
  GameDefinition,
  GameHost,
  GameId,
  GameInstance,
  GameResult,
  HostIntervention,
  HostObservation,
  InterventionIntent,
  InterventionKind,
  InterventionResult,
  PlanOption,
  QuickSpinController,
  SessionOutcome,
  SessionStatus,
  ThemeConfig,
  WaitCapsule,
  WaitEvent,
  WaitEventHandler,
  WaitMetrics,
  WaitSession,
} from "./types";
export { GAME_NAME_IDS } from "./types";

function domReady(cb: () => void): void {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", cb, { once: true });
  } else {
    cb();
  }
}

/** Mount a QuickSpin instance on every `[data-quickspin]` element and `#quickspin`. */
export function autoInit(): () => void {
  const controllers: Array<{ destroy(): void }> = [];
  domReady(() => {
    const targets = Array.from(
      new Set(Array.from(document.querySelectorAll<HTMLElement>("[data-quickspin], #quickspin")))
    );
    for (const el of targets) {
      try {
        const delayAttr = el.dataset.quickspinDelay;
        const delayMs = delayAttr == null ? undefined : Number(delayAttr);
        const controller = createQuickSpin({
          target: el,
          delayMs: Number.isFinite(delayMs) ? delayMs : undefined,
        });
        controllers.push(controller);
      } catch {
        /* invalid markup, skip that node */
      }
    }
  });
  return () => {
    for (const c of controllers) c.destroy();
    controllers.length = 0;
  };
}

declare global {
  interface Window {
    QuickSpin?: {
      createQuickSpin: typeof createQuickSpin;
      autoInit: typeof autoInit;
    };
  }
}

if (typeof window !== "undefined") {
  (window as Window & { QuickSpin?: unknown }).QuickSpin = {
    createQuickSpin,
    autoInit,
  };
}
