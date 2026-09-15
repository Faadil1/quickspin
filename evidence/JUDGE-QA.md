# Judge Q&A

## “Isn’t this just a game replacing a spinner?”
No. The game lifecycle is bound to the host request. Observable phases change intensity; evidence-bearing execution events become game objects; real completion ends play; failure remains failure; the private Evidence Capsule preserves what QuickSpin observed; and a redacted Wait Ghost can replay the wait without exposing the full provenance bundle.

## “What is the one thing I should remember?”
**QuickSpin turns AI waiting into a game you can verify afterward.** The supporting V3 phrase is: **Private Capsule. Shareable Ghost. Comparable wait.**

## “How is this different from a visually impressive agent game?”
QuickSpin is not tied to one agent UI or visualization. It is a reusable waiting-runtime contract. The game is one view; the private evidence record, redacted replay artifact and comparison contract survive beyond that view.

## “How is this different from other mini-games while AI waits?”
The public adjacent field already includes games, quizzes, focus modes, bubble popping and micro-content. QuickSpin is not trying to win through game quantity. Its distinction is observed execution → play → private evidence → redacted replay/share → directional wait deltas.

## “What exactly is a Wait Ghost?”
A privacy-reduced derivative of an Evidence Capsule. It keeps relative timing, event classes, terminal outcome and aggregate counts, but removes labels, evidence references, arbitrary intervention payloads, private record ID, wall-clock timestamp, acknowledgement details and failure details.

## “Why not just share the Evidence Capsule?”
Because the Capsule is an integration/evidence object and can contain host-owned provenance and descriptive labels. QuickSpin treats sharing as a separate data contract rather than assuming every evidence field is safe to publish.

## “Is that just privacy marketing?”
No. V3 reduces the data model before sharing. Arbitrary intervention payloads are no longer persisted into the durable execution trail, and Wait Ghost creation applies an additional redaction boundary. Privacy here is a smaller artifact, not a badge added to the UI.

## “Does a Wait Ghost prove the original host events were truthful?”
No. The Ghost is derived from what QuickSpin recorded. It deliberately carries less information, not more authority. Host truth still depends on the original integration/provenance boundary.

## “Is the Wait Ghost tamper-proof or cryptographically signed?”
No. It is URL-safe encoded redacted JSON, not a signature, MAC, blockchain proof or tamper-evident receipt. We refuse those claims.

## “When you replay a Ghost, are you replaying the AI?”
No. It is a deterministic historical timeline. Replay does not call `session.signal()`, does not mutate the host runtime and is explicitly labelled **not live AI**.

## “Could a replay accidentally look like fresh execution?”
The product labels replay as historical/redacted and the replay path never emits live host execution signals. That separation is part of the runtime contract, not just copy.

## “What if someone sends a broken Ghost link?”
The decoder validates structure, caps token size and fails closed to `null`. It does not silently reinterpret malformed input as a valid run.

## “What does Compare tell me?”
Directional deltas only: actual wait, engaged play, felt wait when available, score when comparable, accepted/rejected signal counts, unique-evidence-reference count and outcome transition. It never manufactures a winner, confidence score or quality score.

## “Why is that useful?”
It lets a team or user compare waiting experiences across runs without pretending a single metric captures quality. The product exposes the change; the human/integration decides what the change means.

## “Why not just add refine/retry/chat features like other useful waiting experiences?”
QuickSpin stays an integration layer rather than another assistant. It can raise `refine`, `retry`, `cancel`, or custom intent, but the host retains authority and must explicitly acknowledge or reject it.

## “If I click refine, did QuickSpin really modify the model request?”
Not by itself. `intervene()` sends intent to the host. QuickSpin records the request and the host response separately. V3 also prevents arbitrary intervention payloads from being stored in the durable execution trail.

## “Are those progress percentages real?”
QuickSpin does not require percentages. `setProgress()` can remain indeterminate. The classic control’s percentage is explicitly demo-only.

## “How do you know a tool/retrieval event really happened?”
QuickSpin requires a host-owned `evidenceRef`. Missing evidence is rejected as `UNKNOWN / INSUFFICIENT_EVIDENCE` and does not affect gameplay. The SDK cannot independently prove a dishonest host, so that trust boundary stays explicit.

## “Does the Evidence Capsule prove the host is telling the truth?”
No. It proves what QuickSpin received and how QuickSpin treated it. `evidenceRef` creates a provenance hook; external verification belongs to the host/integration.

## “Is the Evidence Capsule cryptographically signed?”
No. It is a portable evidence bundle, not a cryptographic signature.

## “What does evidence coverage mean?”
Transparent counts only: phase changes, accepted/rejected signals, unique evidence refs, intervention requests and host acknowledgements/rejections. It is not a trust or quality score.

## “What happens if the AI request fails?”
Run the negative-path proof. A real Promise rejects, the session becomes `failed`, structured failure evidence is persisted, and no AI response is fabricated.

## “Does QuickSpin make the model faster?”
No. It targets experienced waiting, interaction and observability, not provider latency.

## “Can you prove users think it is faster?”
Not universally. The Wait Receipt can say the wait felt longer. More user samples are required for a population claim.

## “Why 650 ms?”
It is an anti-flash product threshold, not a human-perception research claim. Hosts can configure it.

## “Did you inspect every competitor submission?”
No. The Winning Intelligence scan claims only public material we could observe. The Commonsmade gallery is not fully publicly indexable. “No public match found” is not the same as “no one else built this.”

## “What is actually live right now?”
The public V3 product runtime is verified at `https://quickspin-runtime.vercel.app`, sourced from V3 merge SHA `cb3b322907197e37518e85ddb377def2053edcc3`. TRACE Visual Jury V1 is merged and code-validated at `c34012a732e8bb7cd2b5601f1a8f9862a87e4056`, but it is **not** claimed live until that exact SHA is deployed and independently verified.

## “Why not just say the current URL contains the new TRACE visual layer?”
Because implementation presence and runtime evidence are different things. The current Vercel build log proves `cb3b322...`, not `c34012a...`. QuickSpin’s assurance rules do not let a newer GitHub merge overwrite older production provenance by narrative.

## “What changed in TRACE Visual Jury V1?”
Presentation only: the Host Event → Play → Private Capsule → Redacted Ghost lifecycle moved above the fold; Lab actions were grouped into Run vs After the Wait; the privacy boundary became a visual object relationship; the judge memory sentence became explicit; keyboard focus, touch hierarchy, mobile stacking and reduced-motion treatment were strengthened. No SDK, persistence, Ghost, replay or host-contract semantics changed.

## “What is still incomplete?”
The exact TRACE Visual Jury V1 merge SHA still needs production deployment and five-route proof, followed by desktop/mobile/reduced-motion pixel inspection. Final video capture, live Q&A rehearsal, Commonsmade publish/attach/submission proof, final link lock and terminal QC also remain open.
