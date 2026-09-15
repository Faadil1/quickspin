# QuickSpin — Demo Recording Script

Target: **2:30–2:55**. Keep the product proof ahead of pricing.

## Prep

1. `npm run dev` and open `http://localhost:5173`.
2. Use a 1280px+ browser window at 100% zoom.
3. Reset stats once before the take.
4. Leave the demo in **With QuickSpin** initially.
5. The local simulated model wait is now exactly **12 seconds** in both modes.

## 0:00 — The problem and the product

Show the hero.

> “AI products spend a surprising amount of their experience asking users to stare at a spinner.
> QuickSpin turns live AI execution into an optional playable waiting layer — and then measures
> whether the wait actually felt better.”

## 0:15 — Same wait, before

Switch to **Classic spinner** and run the generation.

> “This is the control. Exactly twelve seconds: reasoning, search, drafting, polishing. The progress
> here is only part of the demo simulation — in a real host, QuickSpin never needs to invent a
> percentage.”

Let the answer land.

## 0:40 — Same wait, QuickSpin

Switch to **With QuickSpin** and run again. Choose **Play while you wait** and play Wait Runner.

> “Same twelve seconds. QuickSpin starts in a real waiting state. This demo deliberately leaves
> progress indeterminate, so the host’s phase changes drive game intensity. The host also sends
> explicit execution signals — retrievals, tools, and artifacts — and those become real game events.”

Point at the phase label and event log, then collect at least one signal token. Clarify that these are
deterministic demo-host events, not AI state invented by QuickSpin.

## 1:15 — Response ready + Wait Receipt

When the response becomes ready, answer the perceived-wait question once.

> “The game ends when the request ends — not on a fake timer. Now QuickSpin asks how the wait felt.
> That answer is persisted onto this exact session.”

Show the **WAIT RECEIPT**.

> “Actual wait. Time actually played. Engagement ratio. Felt wait. And importantly, this metric can
> say the wait felt shorter, the same, or longer. We don’t force an improvement.”

Click **View response** so the widget hands off cleanly.

## 1:45 — Repeatability and accessibility

Run another QuickSpin wait and switch to **Orbit Catch**.

> “Two games ship now. Runner supports Space or pointer. Orbit supports pointer and keyboard too.
> The widget is Shadow-DOM isolated, themeable, and can collapse to a small live pill without
> disappearing — the game pauses until you resume.”

Collapse and reopen once if pacing allows.

## 2:10 — Integration proof

Scroll to the SDK block.

> “Production integration has one important guardrail: QuickSpin waits 650 milliseconds by default,
> so fast AI responses don’t flash a game UI. Mount it once, pass real phases, and when your runtime
> genuinely observes a retrieval, tool call, artifact, or warning, pass that event too. If you don’t
> know progress, leave it indeterminate.”

Point to `delayMs`, `setProgress()`, `setPhase()`, `signal()`, and `complete()`.

## 2:35 — Packaging / business model

Show pricing briefly.

> “The SDK features you just saw are honestly available in the open SDK. Team Pilot is support and
> branded setup, not a fake paywall around APIs that are already public. Hosted analytics and extra
> game packs are clearly marked as future work. If a Stripe Payment Link is configured, the paid
> button uses real Stripe; otherwise the demo is labeled preview.”

## 2:50 — Close

Return to the hero or hold on the Wait Receipt.

> “QuickSpin: make AI waiting playable, couple the play to real execution, and prove what happened.”

## Guardrails

- Never claim npm availability unless the package has actually been published.
- Never claim every user experiences a shorter wait; show the signed receipt instead.
- Never call the demo’s simulated model phases or execution signals “live production AI.”
- Do not claim hosted analytics or extra game packs exist yet.
- If Stripe is not configured, say “checkout preview,” not “payment.”
