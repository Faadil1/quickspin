import type {
  EvidenceCoverage,
  ExecutionTrailEntry,
  SessionOutcome,
  WaitCapsule,
} from "./types";

export type { SessionOutcome } from "./types";

const STORAGE_KEY = "quickspin:sessions:v1";

export interface SessionRecord {
  id: string;
  gameId: string | null;
  score: number | null;
  /** Time from session.start() to terminal outcome — the real AI wait. */
  actualWaitMs: number;
  /** Time the player was actively in a running game during the wait. */
  engagedPlayMs: number;
  /** What the user told us the wait felt like (perceived-wait question). */
  feltWaitMs: number | null;
  completed: boolean;
  /** Explicit terminal truth. Old records may not contain this field. */
  outcome: SessionOutcome;
  failureCode: string | null;
  failureMessage: string | null;
  /** Portable evidence trail. Missing on older v1 records and normalized on read. */
  trail?: ExecutionTrailEntry[];
  /** Transparent event counts, not a synthetic trust score. */
  evidenceCoverage?: EvidenceCoverage;
  ts: number;
}

interface Persisted {
  version: 1;
  records: SessionRecord[];
}

const CAP = 1000;

function emptyCoverage(): EvidenceCoverage {
  return {
    phaseChanges: 0,
    acceptedSignals: 0,
    rejectedSignals: 0,
    uniqueEvidenceRefs: 0,
    interventions: 0,
    acceptedInterventions: 0,
    rejectedInterventions: 0,
  };
}

export function evidenceCoverageFromTrail(trail: ExecutionTrailEntry[]): EvidenceCoverage {
  const refs = new Set<string>();
  const coverage = emptyCoverage();
  for (const entry of trail) {
    if (entry.type === "phase") coverage.phaseChanges += 1;
    if (entry.type === "signal") {
      coverage.acceptedSignals += 1;
      if (entry.signal?.evidenceRef) refs.add(entry.signal.evidenceRef);
    }
    if (entry.type === "signal-rejected") coverage.rejectedSignals += 1;
    if (entry.type === "intervention") coverage.interventions += 1;
    if (entry.type === "intervention-result") {
      if (entry.interventionResult?.accepted) coverage.acceptedInterventions += 1;
      else coverage.rejectedInterventions += 1;
      if (entry.interventionResult?.evidenceRef) refs.add(entry.interventionResult.evidenceRef);
    }
  }
  coverage.uniqueEvidenceRefs = refs.size;
  return coverage;
}

export function loadStorage(): Persisted {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { version: 1, records: [] };
    const parsed = JSON.parse(raw) as Partial<Persisted>;
    if (!Array.isArray(parsed.records)) return { version: 1, records: [] };
    const records = parsed.records.filter((r) => typeof r?.ts === "number").slice(-CAP);
    return { version: 1, records };
  } catch {
    return { version: 1, records: [] };
  }
}

function save(p: Persisted): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    /* private mode / quota — non-fatal */
  }
}

function sessionStreak(records: SessionRecord[]): number {
  let streak = 0;
  for (let i = records.length - 1; i >= 0; i--) {
    if (!records[i].completed) break;
    streak += 1;
  }
  return streak;
}

export function recordSession(input: {
  gameId: string | null;
  score: number | null;
  actualWaitMs: number;
  engagedPlayMs: number;
  feltWaitMs?: number | null;
  completed: boolean;
  outcome?: SessionOutcome;
  failureCode?: string | null;
  failureMessage?: string | null;
  trail?: ExecutionTrailEntry[];
  evidenceCoverage?: EvidenceCoverage;
}): {
  id: string;
  isHighScore: boolean;
  dayStreak: number;
  sessionStreak: number;
  record: SessionRecord;
} {
  const p = loadStorage();
  const previousBest = input.gameId ? bestScore(input.gameId) : 0;
  const isHighScore = input.completed && !!input.gameId && (input.score ?? 0) > previousBest;
  const id = (globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)) as string;
  const trail = (input.trail ?? []).map((entry) => ({ ...entry }));
  const evidenceCoverage = input.evidenceCoverage ?? evidenceCoverageFromTrail(trail);
  const record: SessionRecord = {
    id,
    gameId: input.gameId,
    score: input.completed ? input.score : null,
    actualWaitMs: input.actualWaitMs,
    engagedPlayMs: input.engagedPlayMs,
    feltWaitMs: input.feltWaitMs ?? null,
    completed: input.completed,
    outcome: input.outcome ?? (input.completed ? "completed" : "unknown"),
    failureCode: input.failureCode ?? null,
    failureMessage: input.failureMessage ?? null,
    trail,
    evidenceCoverage,
    ts: Date.now(),
  };

  p.records.push(record);
  if (p.records.length > CAP) p.records = p.records.slice(-CAP);
  save(p);

  return {
    id,
    isHighScore,
    dayStreak: currentDayStreak(),
    sessionStreak: sessionStreak(p.records),
    record: { ...record, trail: [...trail], evidenceCoverage: { ...evidenceCoverage } },
  };
}

/** Persist the perception answer onto the exact completed wait record. */
export function updateSessionPerception(id: string, feltWaitMs: number): SessionRecord | null {
  const p = loadStorage();
  const record = p.records.find((r) => r.id === id);
  if (!record || !record.completed || !Number.isFinite(feltWaitMs) || feltWaitMs < 0) return null;
  record.feltWaitMs = feltWaitMs;
  save(p);
  return { ...record };
}

export function getSessionRecord(id: string): SessionRecord | null {
  const record = loadStorage().records.find((r) => r.id === id);
  return record ? { ...record, trail: [...(record.trail ?? [])] } : null;
}

export function latestSessionRecord(): SessionRecord | null {
  const records = loadStorage().records;
  const record = records[records.length - 1];
  return record ? { ...record, trail: [...(record.trail ?? [])] } : null;
}

export function sessionRecordToCapsule(record: SessionRecord): WaitCapsule {
  const trail = [...(record.trail ?? [])];
  return {
    version: 1,
    recordId: record.id,
    outcome: record.outcome ?? (record.completed ? "completed" : "unknown"),
    actualWaitMs: record.actualWaitMs,
    engagedPlayMs: record.engagedPlayMs,
    gameId: record.gameId,
    score: record.score,
    feltWaitMs: record.feltWaitMs ?? null,
    failureCode: record.failureCode ?? null,
    failureMessage: record.failureMessage ?? null,
    evidenceCoverage: record.evidenceCoverage ?? evidenceCoverageFromTrail(trail),
    trail,
    ts: record.ts,
  };
}

export function latestWaitCapsule(): WaitCapsule | null {
  const record = latestSessionRecord();
  return record ? sessionRecordToCapsule(record) : null;
}

export function bestScore(gameId: string): number {
  const p = loadStorage();
  return p.records
    .filter((r) => r.gameId === gameId && r.completed && typeof r.score === "number")
    .reduce((max, r) => (r.score! > max ? r.score! : max), 0);
}

export function bestLabel(gameId: string): string | null {
  const p = loadStorage();
  const best = p.records
    .filter((r) => r.gameId === gameId && r.completed && typeof r.score === "number")
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))[0];
  return best ? `${best.score}` : null;
}

/** Total time actually spent playing during completed AI waits. */
export function totalWaitTurnedToPlayMs(): number {
  const p = loadStorage();
  return p.records
    .filter((r) => r.completed)
    .reduce((sum, r) => sum + Math.min(r.actualWaitMs, Math.max(0, r.engagedPlayMs)), 0);
}

export function totalSessions(): number {
  return loadStorage().records.length;
}

export function completedSessions(): number {
  return loadStorage().records.filter((r) => r.completed).length;
}

/** Consecutive calendar days (ending today) that contain a completed session. */
export function currentDayStreak(): number {
  const p = loadStorage();
  const days = new Set(
    p.records.filter((r) => r.completed).map((r) => new Date(r.ts).toDateString())
  );
  let streak = 0;
  const cursor = new Date(Date.now());
  while (days.has(cursor.toDateString())) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/** Average perceived-vs-actual ratio and signed felt-time delta. */
export function perceivedWaitStats(): { samples: number; avgRatio: number; avgDeltaMs: number } {
  const p = loadStorage();
  const felt = p.records.filter((r) => typeof r.feltWaitMs === "number" && r.actualWaitMs > 0);
  if (felt.length === 0) return { samples: 0, avgRatio: 0, avgDeltaMs: 0 };
  const sumRatio = felt.reduce((s, r) => s + (r.feltWaitMs ?? 0) / r.actualWaitMs, 0);
  const sumDelta = felt.reduce((s, r) => s + ((r.feltWaitMs ?? 0) - r.actualWaitMs), 0);
  return {
    samples: felt.length,
    avgRatio: sumRatio / felt.length,
    avgDeltaMs: sumDelta / felt.length,
  };
}

export function leaderboard(gameId: string, limit = 10): { score: number; ts: number }[] {
  const p = loadStorage();
  return p.records
    .filter((r) => r.gameId === gameId && r.completed && typeof r.score === "number")
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, limit)
    .map((r) => ({ score: r.score!, ts: r.ts }));
}

export function resetAll(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
}
