# Verified Production Runtime — Vercel

Status: **PASS / BLACK BOX ARCADE PUBLIC_DEPLOYMENT_PROOF CLOSED**

## Canonical URL

https://quickspin-runtime.vercel.app

Verified routes:

- `/`
- `/lab`
- `/proof`
- `/sdk`
- `/judges`

All five routes returned **HTTP 200 OK** after the Black Box Arcade production deployment.

## Exact production provenance

- Repository: `Faadil1/quickspin`
- product source SHA: `8d5ffd705588f449f54eed3365489e027bc1c84d`
- PR: #16
- PR CI: `35046055844` — success
- PR CodeQL: `35046055937` — success
- post-merge main CI: `35046206408` — success
- post-merge main CodeQL: `35046206399` — success
- Vercel project: `quickspin-runtime`
- Vercel project id: `prj_7BesKgTL3aTrP6xVZUwIDQSmGQ50`
- production deployment id: `dpl_DyRMr38opKz8kkQjhrKFDSert9Xb`
- production alias: `quickspin-runtime.vercel.app`
- deployment state: `READY`

## Build evidence

Vercel build logs explicitly show:

1. build bootstrap cleaned `source` and `dist-demo` before checkout;
2. `git clone https://github.com/Faadil1/quickspin.git source`;
3. checkout to exact detached HEAD `8d5ffd705588f449f54eed3365489e027bc1c84d`;
4. HEAD title `feat: Black Box Arcade — all-phase TRACE design pass`;
5. `npm ci` completed with **0 vulnerabilities**;
6. `npm run build` passed TypeScript typecheck and Vite 7.3.6 production build;
7. Vite transformed 21 modules;
8. output produced `dist-demo/index.html`, CSS and JS assets;
9. deployment completed and reached `READY`.

The npm `esbuild@0.28.2` install-script warning remains the already reviewed nonruntime supply-chain warning; it does not change the zero-audit result.

## Route proof

External production fetches returned **HTTP 200 OK** for all five canonical routes:

- Home — `/`
- Lab — `/lab`
- Proof — `/proof`
- SDK — `/sdk`
- Judges — `/judges`

The application shell references the Black Box Arcade production assets:

- CSS: `/assets/index-CYrpJ5m5.css`
- JS: `/assets/index-B6DEyjeB.js`

Document metadata includes:

- title: `QuickSpin — Play the wait. Keep the truth.`
- theme color: `#08090c`

## Served-bundle proof

The served JavaScript bundle `/assets/index-B6DEyjeB.js` was fetched directly with HTTP 200 and contains Black Box Arcade mechanisms and presentation markers, including:

- `VERIFIED / 41 TESTS`
- `PRIVATE → REDACT → SHARE`
- `WATCH THE STATE, NOT A FAKE PERCENTAGE.`
- `HOST AUTHORITY`
- `No provenance means no gameplay claim.`
- judge claim classes `VERIFIED / UNKNOWN / REFUSED / PORTABLE`
- dedicated mobile route dock `HOME / LAB / PROOF / SDK / JUDGE`
- Wait Ghost / replay / compare mechanisms from WI V3.

This closes the stale-runtime ambiguity: the public alias now serves the exact Black Box Arcade product SHA rather than the earlier V3-only bundle.

## Product/runtime boundaries retained

The production proof establishes that the exact merged Black Box Arcade artifact is live and that its five judge surfaces are reachable. It does **not** claim:

- that Wait Ghost replay is live AI;
- that Wait Ghost is cryptographically signed or tamper-proof;
- that a wait-to-wait comparison determines a winner or quality score;
- that every user experiences shorter perceived wait;
- that QuickSpin reduces provider/model latency.

## Historical runtime retained

The previously verified WI V3 production deployment remains historical fallback evidence:

- V3 source SHA: `cb3b322907197e37518e85ddb377def2053edcc3`
- V3 deployment id: `dpl_5rFD3bRMCHK5m6esVazZjz8E6kZG`

It is no longer the canonical production candidate.

## Current gate

**BLACK BOX ARCADE PUBLIC RUNTIME PROOF is closed.**

The remaining blocking work is now final video capture, live Q&A rehearsal, Commonsmade/submission lock, final asset/link lock, terminal reconciliation and final QC.

Canonical rule retained: expected hostname ≠ runtime evidence. This runtime was promoted only because the exact product SHA is present in Vercel build logs, Vercel returned `READY`, all five routes returned HTTP 200, and the served production bundle contains the Black Box Arcade implementation.
