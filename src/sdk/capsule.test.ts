import { describe, expect, it } from "vitest";
import {
  compareWaitExperiences,
  createWaitGhost,
  createWaitGhostReplay,
  decodeWaitGhost,
  encodeWaitGhost,
  validateWaitCapsule,
  validateWaitGhost,
} from "./capsule";
import type { WaitCapsule } from "./types";

const capsule: WaitCapsule = {
  version: 1,
  recordId: "private-record-123",
  outcome: "completed",
  actualWaitMs: 12000,
  engagedPlayMs: 8400,
  gameId: "runner",
  score: 42,
  feltWaitMs: 9000,
  failureCode: null,
  failureMessage: null,
  evidenceCoverage: {
    phaseChanges: 2,
    acceptedSignals: 1,
    rejectedSignals: 1,
    uniqueEvidenceRefs: 2,
    interventions: 1,
    acceptedInterventions: 1,
    rejectedInterventions: 0,
  },
  trail: [
    { type: "phase", atMs: 100, phase: "Searching private customer records" },
    {
      type: "signal",
      atMs: 800,
      phase: "Searching private customer records",
      signal: {
        kind: "retrieval",
        label: "Retrieved Jane Doe medical note",
        evidenceRef: "secret:trace:123",
      },
    },
    {
      type: "signal-rejected",
      atMs: 1200,
      phase: "Drafting confidential answer",
      reason: "INSUFFICIENT_EVIDENCE",
    },
    {
      type: "intervention",
      atMs: 1600,
      intervention: {
        id: "intent-private-1",
        kind: "refine",
        label: "Prioritize confidential account 456",
        atMs: 1600,
      },
    },
    {
      type: "intervention-result",
      atMs: 2100,
      interventionResult: {
        id: "intent-private-1",
        accepted: true,
        reason: "HOST_APPLIED_REFINEMENT",
        evidenceRef: "secret:host:ack:456",
      },
    },
  ],
  ts: 1789490000000,
};

describe("Wait Ghost", () => {
  it("redacts private provenance while preserving replay structure", () => {
    const ghost = createWaitGhost(capsule);
    const raw = JSON.stringify(ghost);

    expect(ghost.privacy).toBe("redacted");
    expect(ghost.timeline).toHaveLength(5);
    expect(ghost.timeline[1]).toMatchObject({
      type: "signal",
      signalKind: "retrieval",
      atMs: 800,
    });
    expect(ghost.timeline[3]).toMatchObject({
      type: "intervention",
      interventionKind: "refine",
    });
    expect(ghost.timeline[4]).toMatchObject({
      type: "intervention-result",
      accepted: true,
    });

    expect(raw).not.toContain("private-record-123");
    expect(raw).not.toContain("Jane Doe");
    expect(raw).not.toContain("medical note");
    expect(raw).not.toContain("secret:trace:123");
    expect(raw).not.toContain("confidential account 456");
    expect(raw).not.toContain("secret:host:ack:456");
    expect(raw).not.toContain("HOST_APPLIED_REFINEMENT");
    expect(raw).not.toContain(String(capsule.ts));
  });

  it("round-trips through a URL-safe token", () => {
    const ghost = createWaitGhost(capsule);
    const encoded = encodeWaitGhost(ghost);
    expect(encoded).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(decodeWaitGhost(encoded)).toEqual(ghost);
  });

  it("refuses malformed or oversized shared tokens", () => {
    expect(decodeWaitGhost("not-json")).toBeNull();
    expect(decodeWaitGhost("x".repeat(32001))).toBeNull();
  });

  it("creates deterministic replay delays without emitting live signals", () => {
    const ghost = createWaitGhost(capsule);
    const replay = createWaitGhostReplay(ghost, 2);
    expect(replay.map((step) => step.delayMs)).toEqual([50, 350, 200, 200, 250]);
    expect(replay[1].event.signalKind).toBe("retrieval");
  });

  it("compares waits with signed deltas and no winner score", () => {
    const from = createWaitGhost(capsule);
    const to: WaitCapsule = {
      ...capsule,
      recordId: "second",
      outcome: "failed",
      actualWaitMs: 10000,
      engagedPlayMs: 6000,
      feltWaitMs: 11000,
      score: null,
      evidenceCoverage: {
        ...capsule.evidenceCoverage,
        acceptedSignals: 3,
        rejectedSignals: 0,
        uniqueEvidenceRefs: 4,
      },
    };
    const diff = compareWaitExperiences(from, to);
    expect(diff).toEqual({
      actualWaitDeltaMs: -2000,
      engagedPlayDeltaMs: -2400,
      feltWaitDeltaMs: 2000,
      scoreDelta: null,
      acceptedSignalsDelta: 2,
      rejectedSignalsDelta: -1,
      uniqueEvidenceRefsDelta: 2,
      outcomeChanged: true,
      fromOutcome: "completed",
      toOutcome: "failed",
    });
    expect("winner" in diff).toBe(false);
    expect("qualityScore" in diff).toBe(false);
  });

  it("validates capsules and ghosts structurally, not semantically", () => {
    expect(validateWaitCapsule(capsule)).toBe(true);
    const ghost = createWaitGhost(capsule);
    expect(validateWaitGhost(ghost)).toBe(true);
    expect(validateWaitGhost({ ...ghost, privacy: "full" })).toBe(false);
    expect(validateWaitCapsule({ ...capsule, actualWaitMs: -1 })).toBe(false);
  });
});
