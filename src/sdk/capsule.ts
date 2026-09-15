import type {
  EvidenceCoverage,
  ExecutionSignalKind,
  ExecutionTrailEntryType,
  InterventionKind,
  SessionOutcome,
  WaitCapsule,
  WaitComparison,
  WaitGhost,
  WaitGhostEvent,
  WaitGhostReplayStep,
} from "./types";

const OUTCOMES = new Set<SessionOutcome>(["completed", "cancelled", "failed", "unknown"]);
const TRAIL_TYPES = new Set<ExecutionTrailEntryType>([
  "phase",
  "signal",
  "signal-rejected",
  "intervention",
  "intervention-result",
]);
const SIGNAL_KINDS = new Set<ExecutionSignalKind>(["retrieval", "tool", "artifact", "warning"]);
const INTERVENTION_KINDS = new Set<InterventionKind>(["cancel", "retry", "refine", "custom"]);

function finiteNonNegative(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function validCoverage(value: unknown): value is EvidenceCoverage {
  if (!value || typeof value !== "object") return false;
  const coverage = value as Partial<EvidenceCoverage>;
  return [
    coverage.phaseChanges,
    coverage.acceptedSignals,
    coverage.rejectedSignals,
    coverage.uniqueEvidenceRefs,
    coverage.interventions,
    coverage.acceptedInterventions,
    coverage.rejectedInterventions,
  ].every((count) => Number.isInteger(count) && (count ?? -1) >= 0);
}

/**
 * Structural validation for imported capsules. It confirms the portable shape,
 * not the truthfulness of the host-owned provenance referenced inside it.
 */
export function validateWaitCapsule(value: unknown): value is WaitCapsule {
  if (!value || typeof value !== "object") return false;
  const capsule = value as Partial<WaitCapsule>;
  if (capsule.version !== 1) return false;
  if (typeof capsule.recordId !== "string") return false;
  if (!OUTCOMES.has(capsule.outcome as SessionOutcome)) return false;
  if (!finiteNonNegative(capsule.actualWaitMs)) return false;
  if (!finiteNonNegative(capsule.engagedPlayMs)) return false;
  if (capsule.gameId !== null && typeof capsule.gameId !== "string") return false;
  if (capsule.score !== null && typeof capsule.score !== "number") return false;
  if (capsule.feltWaitMs !== null && !finiteNonNegative(capsule.feltWaitMs)) return false;
  if (!validCoverage(capsule.evidenceCoverage)) return false;
  if (!Array.isArray(capsule.trail)) return false;
  if (!finiteNonNegative(capsule.ts)) return false;
  return capsule.trail.every((entry) => {
    if (!entry || typeof entry !== "object") return false;
    const trailEntry = entry as { type?: unknown; atMs?: unknown };
    return (
      TRAIL_TYPES.has(trailEntry.type as ExecutionTrailEntryType) &&
      finiteNonNegative(trailEntry.atMs)
    );
  });
}

/**
 * A Wait Ghost is deliberately redacted. It preserves timing, event classes,
 * terminal truth and aggregate counts while removing labels, evidence refs,
 * intervention payloads, record ids, timestamps and failure details.
 */
export function createWaitGhost(capsule: WaitCapsule): WaitGhost {
  if (!validateWaitCapsule(capsule)) throw new Error("QuickSpin: invalid Wait Capsule.");
  const timeline: WaitGhostEvent[] = capsule.trail.map((entry) => {
    const ghost: WaitGhostEvent = { type: entry.type, atMs: entry.atMs };
    if (entry.type === "signal" && entry.signal) ghost.signalKind = entry.signal.kind;
    if (entry.type === "intervention" && entry.intervention)
      ghost.interventionKind = entry.intervention.kind;
    if (entry.type === "intervention-result" && entry.interventionResult)
      ghost.accepted = entry.interventionResult.accepted;
    return ghost;
  });
  return {
    version: 1,
    privacy: "redacted",
    source: "wait-capsule",
    outcome: capsule.outcome,
    actualWaitMs: capsule.actualWaitMs,
    engagedPlayMs: capsule.engagedPlayMs,
    gameId: capsule.gameId,
    score: capsule.score,
    feltWaitMs: capsule.feltWaitMs,
    evidenceCoverage: { ...capsule.evidenceCoverage },
    timeline,
  };
}

export function validateWaitGhost(value: unknown): value is WaitGhost {
  if (!value || typeof value !== "object") return false;
  const ghost = value as Partial<WaitGhost>;
  if (ghost.version !== 1 || ghost.privacy !== "redacted" || ghost.source !== "wait-capsule")
    return false;
  if (!OUTCOMES.has(ghost.outcome as SessionOutcome)) return false;
  if (!finiteNonNegative(ghost.actualWaitMs) || !finiteNonNegative(ghost.engagedPlayMs))
    return false;
  if (ghost.gameId !== null && typeof ghost.gameId !== "string") return false;
  if (ghost.score !== null && typeof ghost.score !== "number") return false;
  if (ghost.feltWaitMs !== null && !finiteNonNegative(ghost.feltWaitMs)) return false;
  if (!validCoverage(ghost.evidenceCoverage) || !Array.isArray(ghost.timeline)) return false;
  return ghost.timeline.every((event) => {
    if (!event || typeof event !== "object") return false;
    if (!TRAIL_TYPES.has(event.type)) return false;
    if (!finiteNonNegative(event.atMs)) return false;
    if (event.signalKind !== undefined && !SIGNAL_KINDS.has(event.signalKind)) return false;
    if (event.interventionKind !== undefined && !INTERVENTION_KINDS.has(event.interventionKind))
      return false;
    if (event.accepted !== undefined && typeof event.accepted !== "boolean") return false;
    return true;
  });
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(input: string): Uint8Array {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

/** Encode a redacted Wait Ghost for a URL hash or clipboard. */
export function encodeWaitGhost(ghost: WaitGhost): string {
  if (!validateWaitGhost(ghost)) throw new Error("QuickSpin: invalid Wait Ghost.");
  return bytesToBase64Url(new TextEncoder().encode(JSON.stringify(ghost)));
}

/** Decode an untrusted shared token. Invalid input returns null rather than throwing. */
export function decodeWaitGhost(token: string): WaitGhost | null {
  try {
    if (typeof token !== "string" || token.length === 0 || token.length > 32_000) return null;
    const decoded = new TextDecoder().decode(base64UrlToBytes(token));
    const parsed = JSON.parse(decoded) as unknown;
    return validateWaitGhost(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Convert a ghost timeline into deterministic playback steps. This never emits
 * live execution signals; consumers decide how to visualize the replay.
 */
export function createWaitGhostReplay(ghost: WaitGhost, speed = 1): WaitGhostReplayStep[] {
  if (!validateWaitGhost(ghost)) throw new Error("QuickSpin: invalid Wait Ghost.");
  const safeSpeed = Number.isFinite(speed) ? Math.min(20, Math.max(0.1, speed)) : 1;
  const ordered = ghost.timeline
    .map((event, index) => ({ event: { ...event }, index }))
    .sort((a, b) => a.event.atMs - b.event.atMs || a.index - b.index);
  let previousAtMs = 0;
  return ordered.map(({ event, index }) => {
    const delayMs = Math.max(0, event.atMs - previousAtMs) / safeSpeed;
    previousAtMs = event.atMs;
    return { index, delayMs, event };
  });
}

/**
 * Compare two waits without manufacturing a winner or quality score.
 * Deltas are `to - from`; negative actual-wait delta means the second wait was shorter.
 */
export function compareWaitExperiences(
  from: WaitCapsule | WaitGhost,
  to: WaitCapsule | WaitGhost
): WaitComparison {
  const feltWaitDeltaMs =
    from.feltWaitMs !== null && to.feltWaitMs !== null ? to.feltWaitMs - from.feltWaitMs : null;
  const scoreDelta = from.score !== null && to.score !== null ? to.score - from.score : null;
  return {
    actualWaitDeltaMs: to.actualWaitMs - from.actualWaitMs,
    engagedPlayDeltaMs: to.engagedPlayMs - from.engagedPlayMs,
    feltWaitDeltaMs,
    scoreDelta,
    acceptedSignalsDelta:
      to.evidenceCoverage.acceptedSignals - from.evidenceCoverage.acceptedSignals,
    rejectedSignalsDelta:
      to.evidenceCoverage.rejectedSignals - from.evidenceCoverage.rejectedSignals,
    uniqueEvidenceRefsDelta:
      to.evidenceCoverage.uniqueEvidenceRefs - from.evidenceCoverage.uniqueEvidenceRefs,
    outcomeChanged: from.outcome !== to.outcome,
    fromOutcome: from.outcome,
    toOutcome: to.outcome,
  };
}
