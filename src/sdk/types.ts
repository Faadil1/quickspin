export type SessionStatus =
  | "idle"
  | "waiting"
  | "playing"
  | "response-ready"
  | "completed"
  | "cancelled"
  | "failed"
  | "destroyed";

export type EndReason = "ai-complete" | "player-failed" | "cancelled";
export type SessionOutcome = "completed" | "cancelled" | "failed" | "unknown";

export type ExecutionSignalKind = "retrieval" | "tool" | "artifact" | "warning";

/**
 * A real execution event supplied by the host app. QuickSpin never invents
 * these events: hosts opt in only when they have an observed tool/retrieval/
 * artifact/warning event they can truthfully expose.
 */
export interface ExecutionSignal {
  kind: ExecutionSignalKind;
  label: string;
  /** Host-owned trace/provenance reference. Missing evidence is rejected as UNKNOWN. */
  evidenceRef: string;
}

export interface HostObservation {
  /** Optional host-observed phase. QuickSpin does not derive this value. */
  phase?: string;
  /** Optional host-observed execution signal with provenance. */
  signal?: ExecutionSignal;
}

export type InterventionKind = "cancel" | "retry" | "refine" | "custom";

/** An intent raised from the waiting surface. It is not an executed action yet. */
export interface InterventionIntent {
  kind: InterventionKind;
  label?: string;
  payload?: unknown;
}

/** The host-visible form of an intervention request. */
export interface HostIntervention extends InterventionIntent {
  id: string;
  atMs: number;
}

/** Only the host can acknowledge whether an intervention was actually accepted. */
export interface InterventionResult {
  id: string;
  accepted: boolean;
  reason?: string;
  evidenceRef?: string;
}

/** Persisted intervention metadata deliberately excludes arbitrary host payload. */
export interface RecordedIntervention {
  id: string;
  kind: InterventionKind;
  label?: string;
  atMs: number;
}

export type ExecutionTrailEntryType =
  "phase" | "signal" | "signal-rejected" | "intervention" | "intervention-result";

/** Portable, post-run evidence. Entries are facts QuickSpin observed from its own contract. */
export interface ExecutionTrailEntry {
  type: ExecutionTrailEntryType;
  atMs: number;
  phase?: string;
  signal?: ExecutionSignal;
  reason?: string;
  intervention?: RecordedIntervention;
  interventionResult?: InterventionResult;
}

/** Transparent counts only. This is not a synthetic quality/confidence score. */
export interface EvidenceCoverage {
  phaseChanges: number;
  acceptedSignals: number;
  rejectedSignals: number;
  uniqueEvidenceRefs: number;
  interventions: number;
  acceptedInterventions: number;
  rejectedInterventions: number;
}

/**
 * A portable post-run record of the wait. “Capsule” means evidence bundle,
 * not a cryptographic signature.
 */
export interface WaitCapsule {
  version: 1;
  recordId: string;
  outcome: SessionOutcome;
  actualWaitMs: number;
  engagedPlayMs: number;
  gameId: string | null;
  score: number | null;
  feltWaitMs: number | null;
  failureCode: string | null;
  failureMessage: string | null;
  evidenceCoverage: EvidenceCoverage;
  trail: ExecutionTrailEntry[];
  ts: number;
}

/**
 * Redacted share/replay event. Deliberately contains no labels, evidence refs,
 * prompts, arbitrary payloads, failure details, record ids, or timestamps.
 */
export interface WaitGhostEvent {
  type: ExecutionTrailEntryType;
  atMs: number;
  signalKind?: ExecutionSignalKind;
  interventionKind?: InterventionKind;
  accepted?: boolean;
}

/**
 * Privacy-safe social/replay derivative of a Wait Capsule. It is not live AI,
 * cryptographic proof, or a substitute for the private evidence bundle.
 */
export interface WaitGhost {
  version: 1;
  privacy: "redacted";
  source: "wait-capsule";
  outcome: SessionOutcome;
  actualWaitMs: number;
  engagedPlayMs: number;
  gameId: string | null;
  score: number | null;
  feltWaitMs: number | null;
  evidenceCoverage: EvidenceCoverage;
  timeline: WaitGhostEvent[];
}

export interface WaitGhostReplayStep {
  index: number;
  delayMs: number;
  event: WaitGhostEvent;
}

/** Signed deltas only — no synthetic winner, trust, or quality score. */
export interface WaitComparison {
  actualWaitDeltaMs: number;
  engagedPlayDeltaMs: number;
  feltWaitDeltaMs: number | null;
  scoreDelta: number | null;
  acceptedSignalsDelta: number;
  rejectedSignalsDelta: number;
  uniqueEvidenceRefsDelta: number;
  outcomeChanged: boolean;
  fromOutcome: SessionOutcome;
  toOutcome: SessionOutcome;
}

export interface GameResult {
  /** Actual gameplay score — never fabricated. */
  score: number;
  label: string;
  notes: string[];
  reason: EndReason;
}

export interface WaitMetrics {
  actualWaitMs: number;
  engagedPlayMs: number;
  gameId: string | null;
  score: number | null;
  feltWaitMs?: number | null;
  perceivedRatio?: number | null;
  perceivedDeltaMs?: number | null;
}

export interface WaitEvent {
  type:
    | "session-start"
    | "phase"
    | "progress"
    | "signal"
    | "signal-rejected"
    | "intervention"
    | "intervention-result"
    | "game-start"
    | "score"
    | "session-complete"
    | "perceived-wait"
    | "receipt"
    | "capsule"
    | "cancel"
    | "fail";
  data?: unknown;
}

export type WaitEventHandler = (event: WaitEvent) => void;

export interface ThemeConfig {
  /** Light or dark game-stage palette. */
  mode?: "dark" | "light";
  primary?: string;
  surface?: string;
  /** Cards, buttons, elevated surfaces. */
  elevated?: string;
  /** The game canvas/stage surface. */
  game?: string;
  text?: string;
  muted?: string;
  border?: string;
  success?: string;
  radius?: string;
  font?: string;
}

export interface WaitSession {
  /** Update the visible AI phase label ("Drafting…"). */
  setPhase(phase: string): void;
  /**
   * Set progress 0..1. Passing nothing (or NaN) switches to an
   * indeterminate progress state. When progress is indeterminate, QuickSpin
   * derives gameplay intensity from real phase changes instead of inventing a percentage.
   */
  setProgress(value?: number): void;
  /**
   * Feed one observed host execution event into gameplay. The event must come
   * from the host's real runtime; QuickSpin does not infer or fabricate signals.
   */
  signal(signal: ExecutionSignal): boolean;
  /** Convenience bridge for events the host already observed. No inference is added. */
  observe(observation: HostObservation): boolean;
  /**
   * Raise an intent to the host. QuickSpin records the request but never claims
   * it executed unless the host explicitly acknowledges it.
   */
  intervene(intent: InterventionIntent): Promise<InterventionResult>;
  /** Mark the AI wait over and hand off to the response. */
  complete(): void;
  cancel(): void;
  fail(error?: unknown): void;
}

export interface QuickSpinController {
  start(options?: { gameId?: string; status?: string }): WaitSession;
  /** Wrap an AI request and complete/fail the session from the real promise. */
  track<T>(request: Promise<T>, options?: { gameId?: string; status?: string }): Promise<T>;
  setTheme(theme: ThemeConfig): void;
  show(): void;
  hide(): void;
  destroy(): void;
  on(handler: WaitEventHandler): () => void;
  /** Last terminal Evidence Capsule created by this controller. */
  getLastCapsule(): WaitCapsule | null;
  /** JSON export of the last capsule, or null before a terminal outcome. */
  exportLastCapsule(): string | null;
  readonly status: SessionStatus;
}

export interface CreateQuickSpinOptions {
  target?: string | HTMLElement;
  game?: string;
  theme?: ThemeConfig;
  onEvent?: WaitEventHandler;
  /**
   * Wait before showing the playable surface. Fast AI responses can finish
   * before this threshold without flashing game UI. Defaults to 650ms.
   */
  delayMs?: number;
  /** Host authority for waiting-surface intervention intents. */
  onIntervention?: (intent: HostIntervention) => InterventionResult | Promise<InterventionResult>;
  /** Called with the chosen plan when a host page asks the user to check out. */
  onCheckout?: (planId: string) => Promise<{ ok: boolean; paymentId?: string }>;
}

export interface GameHost {
  canvas: HTMLCanvasElement;
  root: HTMLElement;
  /** Logical host progress 0..1, or null when indeterminate. */
  progress: number | null;
  /**
   * Honest gameplay intensity 0..1. Uses host progress when supplied; otherwise
   * derives from observed AI phase changes.
   */
  intensity: number;
  /** Latest real phase label supplied by the host, if any. */
  phase: string | null;
  /** Summon a result from the running game for the given reason. */
  finish(reason: EndReason): GameResult;
  elapsedMs(): number;
}

export interface GameInstance {
  start(): void;
  /** Called by the controller's single animation loop (not a game-owned RAF). */
  tick(time: number, delta: number): void;
  /** Feed a truthful host execution event into the current game, if supported. */
  signal?(signal: ExecutionSignal): void;
  /** Finalize a result for the reason given, always from live game state. */
  finish(reason: EndReason): GameResult;
  pause(): void;
  resume(): void;
  destroy(): void;
}

export interface GameDefinition {
  id: string;
  name: string;
  tagline: string;
  /** Instructions shown in the widget footer. */
  controls: string;
  create(host: GameHost): GameInstance;
}

export interface PlanOption {
  id: string;
  name: string;
  priceUsd: number;
  cadence: string;
  features: Array<string | { text: string; backlog: boolean }>;
  highlighted?: boolean;
  label: string;
}

export interface CheckoutResult {
  ok: boolean;
  planId: string;
  paymentId?: string;
  amountUsd: number;
}

export const GAME_NAME_IDS = ["runner", "orbit"] as const;
export type GameId = (typeof GAME_NAME_IDS)[number];
