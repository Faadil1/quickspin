# Judge Q&A

## “Isn’t this just a game replacing a spinner?”
No. The game lifecycle is bound to the host request. Observable phases change intensity; evidence-bearing execution events become game objects; real completion ends play; failure remains failure; and the post-run Evidence Capsule preserves what QuickSpin actually observed.

## “What is the one thing I should remember?”
**QuickSpin turns AI waiting into a game you can verify afterward.** The signature path is observed execution signal → playable object → interaction → Evidence Capsule.

## “How is this different from a visually impressive agent game?”
QuickSpin is not tied to one agent UI or one visualization. It is a reusable waiting-runtime contract: any host can provide observed phases/signals, use Runner/Orbit or another surface, preserve failure/UNKNOWN, and export the same evidence structure afterward.

## “Why not just add refine/retry/chat features like other useful waiting experiences?”
QuickSpin stays an integration layer rather than becoming another assistant. It can raise a small intervention intent such as `refine`, `retry`, `cancel`, or custom, but the host retains authority and must explicitly acknowledge or reject it.

## “If I click refine, did QuickSpin really modify the model request?”
Not by itself. `intervene()` records an intent and sends it to the host callback. Until the host returns an acknowledgement, QuickSpin does not claim that anything changed. Rejection/no handler also remains visible evidence.

## “Are those progress percentages real?”
QuickSpin does not require percentages. `setProgress()` can remain indeterminate. The classic control’s percentage is explicitly demo-only.

## “How do you know a tool/retrieval event really happened?”
QuickSpin requires a host-owned `evidenceRef`. Missing evidence is rejected as `UNKNOWN / INSUFFICIENT_EVIDENCE` and does not affect gameplay. The SDK cannot independently prove a dishonest host, so the trust boundary is explicit rather than hidden.

## “Does the Evidence Capsule prove the host is telling the truth?”
No. It proves what QuickSpin received and how QuickSpin treated it. Host-owned `evidenceRef` values create a provenance hook; external verification of those references belongs to the host/integration. The Capsule makes that boundary inspectable instead of pretending QuickSpin has omniscience.

## “Is the Evidence Capsule cryptographically signed?”
No. It is a portable JSON evidence bundle, not a cryptographic signature. We deliberately refuse that claim because there is no signing primitive in this build.

## “What does evidence coverage mean?”
Only transparent event counts: phase changes, accepted/rejected signals, unique evidence references, intervention requests and host acknowledgements/rejections. QuickSpin does **not** turn those counts into a fabricated confidence or quality score.

## “What happens if the AI request fails?”
Run the negative-path proof. A real Promise rejects, the session becomes `failed`, structured failure evidence is persisted/emitted, an Evidence Capsule can preserve the terminal truth, and no AI response is fabricated.

## “Does QuickSpin make the model faster?”
No. It targets experienced waiting, useful interaction and observability, not provider latency.

## “Can you prove users think it is faster?”
Not universally. The Wait Receipt records perceived-vs-actual wait and can say the wait felt longer. More user samples are required for a population claim.

## “Why 650 ms?”
It is an anti-flash product threshold, not a claim about human perception research. Fast replies can finish before showing the game UI; hosts can configure it.

## “Did you inspect every competitor submission?”
No. The Winning Intelligence scan only claims the public submissions/material we could observe. The Commonsmade gallery is not fully publicly indexable, so exhaustive coverage remains UNKNOWN rather than being fabricated.

## “What is still incomplete?”
The WI V2 product delta still needs independent PR CI/CodeQL and a refreshed public deployment; final desktop/mobile render inspection, video capture, live Q&A rehearsal, Commonsmade publish/attach/submission proof, final links and terminal QC also remain open.
