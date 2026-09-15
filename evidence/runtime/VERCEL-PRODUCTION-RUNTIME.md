# Verified Production Runtime — Vercel

Status: **PASS / V3 PUBLIC_DEPLOYMENT_PROOF CLOSED**

## Canonical URL

https://quickspin-runtime.vercel.app

Verified routes:

- `/`
- `/lab`
- `/proof`
- `/sdk`
- `/judges`

All five routes returned **HTTP 200 OK** after the V3 production deployment.

## Exact V3 provenance

- Repository: `Faadil1/quickspin`
- V3 squash merge SHA: `cb3b322907197e37518e85ddb377def2053edcc3`
- Post-merge main CI: `35006274961` — success
- Post-merge main CodeQL: `35006274850` — success
- Vercel project: `quickspin-runtime`
- Vercel project id: `prj_7BesKgTL3aTrP6xVZUwIDQSmGQ50`
- V3 production deployment id: `dpl_5rFD3bRMCHK5m6esVazZjz8E6kZG`
- Production alias: `quickspin-runtime.vercel.app`
- Deployment state: `READY`

## Build evidence

Vercel build logs explicitly show:

1. cleanup of cached bootstrap folders before checkout;
2. `git clone https://github.com/Faadil1/quickspin.git source`;
3. checkout to exact detached HEAD `cb3b322907197e37518e85ddb377def2053edcc3`;
4. `npm ci` completed with **0 vulnerabilities**;
5. `npm run build` passed TypeScript typecheck and Vite 7.3.6 production build;
6. Vite transformed 15 modules and produced the V3 bundle;
7. output produced `dist-demo/index.html`, CSS and JS assets;
8. deployment completed and reached `READY`.

The npm `esbuild@0.28.2` install-script warning remains classified separately as a reviewed nonruntime supply-chain warning; it did not change the zero-audit result.

## V3 route proof

External post-deploy fetches returned **HTTP 200 OK** for all five canonical routes:

- Home — `/`
- Lab — `/lab`
- Proof — `/proof`
- SDK — `/sdk`
- Judges — `/judges`

The application shell references the V3 production assets:

- CSS: `/assets/index-C8XKUdEe.css`
- JS: `/assets/index-CRyhx7en.js`

Document metadata remains:

- title: `QuickSpin — Play the wait. Keep the truth.`
- theme color: `#d5d6d0`

## V3 bundle-content proof

The served production JavaScript bundle `/assets/index-CRyhx7en.js` was fetched directly with HTTP 200 and contains the V3 mechanisms, including:

- `Copy redacted Wait Ghost link`
- `Replay Wait Ghost`
- `Wait Ghost: none loaded. Shared ghosts are redacted replay artifacts — never live AI.`
- the Proof surface `WAIT GHOST` row with `REDACTED / REPLAYABLE / SHAREABLE`
- the wait comparison copy ending in `No winner score.`
- the loaded-Ghost boundary `Replay is historical, not live AI.`
- private Evidence Capsule → redacted Wait Ghost judge/product framing.

This closes the stale-cache ambiguity: the live alias serves the V3 bundle, not only an HTTP-200 shell from the previous future-classic deployment.

## Product/runtime boundaries retained

The production proof establishes that the exact merged V3 artifact is live and that its five judge surfaces are reachable. It does **not** claim:

- that Wait Ghost replay is live AI;
- that Wait Ghost is cryptographically signed or tamper-proof;
- that a wait-to-wait comparison determines a winner or quality score;
- that every user experiences shorter perceived wait;
- that QuickSpin reduces provider/model latency.

## Historical deployment failure retained

The earlier future-classic deployment cache failure remains preserved in `evidence/FAILURE-LEDGER.md` as F-11. Its mitigation — deleting cached bootstrap folders before cloning — remains in the V3 bootstrap and succeeded here.

## Remaining runtime-adjacent gate

**PUBLIC V3 RUNTIME PROOF is closed.** The next separate gate is final desktop/mobile/reduced-motion visual inspection. Runtime existence is not a substitute for pixel-level jury review.

Canonical rule retained: expected hostname ≠ runtime evidence. V3 is promoted only because the exact merge SHA is present in build logs, Vercel returned `READY`, all five routes returned HTTP 200, and the served bundle contains the V3 Wait Ghost/replay/diff implementation.