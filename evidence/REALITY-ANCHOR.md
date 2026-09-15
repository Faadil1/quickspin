# Reality Anchor — QuickSpin

## 1. Signal positif / opportunité

AI applications routinely impose non-zero waits while reasoning, retrieving, calling tools, or
assembling outputs. A 2026 HCI experiment with 425 participants studied 10-, 30-, and 60-second
system-imposed delays and found that feedback design changes perceived wait, frustration, and
ambiguity. The opportunity is not to pretend latency disappears; it is to make unavoidable wait
states more legible, interactive, and measurable.

Source: https://arxiv.org/abs/2602.04138

## 2. Événement négatif concret, réel et vérifiable

**June 2, 2026 — OpenAI incident: Elevated error rates on Codex, ChatGPT and Responses API.**
OpenAI reported elevated errors and latency. For affected Responses API traffic, requests took
longer than normal to begin generating responses; Codex requests could receive unexpected HTTP
429 responses; ChatGPT saw login/authentication/conversation failures.

Source: https://status.openai.com/incidents/01KT5XJ5ATD6RMYP908WS69FVD/write-up

This is used only as evidence that AI latency/failure states occur in production. QuickSpin does
not claim it would have prevented this incident.

## 3. Impact observable

Verified impact from the incident: increased response-start latency, unexpected request
rejection, and failed user flows. Separately, established UX guidance notes that waits around and
beyond ten seconds break continuity of attention and require explicit feedback.

Supporting UX source: https://www.nngroup.com/articles/response-times-3-important-limits/

## 4. Leçon / implication design

- A waiting UI must not equate “still waiting” with “will definitely succeed.”
- Unknown progress must stay indeterminate; fake percentages are disallowed.
- Execution claims require host-owned provenance.
- Failure/cancellation must terminate differently from completion.
- Perceived-wait measurement must allow a negative result (“felt longer”).

## 5. Réponse / mitigation QuickSpin

QuickSpin mitigates the **experience and evidence problem**, not provider reliability itself:

- 650 ms anti-flash threshold for fast responses;
- phase-aware indeterminate waiting instead of fabricated progress;
- evidence-bearing execution signals;
- `signal-rejected → UNKNOWN / INSUFFICIENT_EVIDENCE` when provenance is missing;
- explicit completed / cancelled / failed outcomes;
- failed sessions remain persisted with code/message and no fabricated response;
- signed Wait Receipt can report shorter, equal, or longer perceived wait.
