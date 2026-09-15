# Verified Production Runtime — Vercel

Status: **PASS / PUBLIC_DEPLOYMENT_PROOF CLOSED**

## Canonical URL

https://quickspin-runtime.vercel.app

## Provenance

- Repository: `Faadil1/quickspin`
- Canonical source SHA: `83da2b807e2072bde30a76c72937c3cbe74ff389`
- Vercel project: `quickspin-runtime`
- Vercel project id: `prj_7BesKgTL3aTrP6xVZUwIDQSmGQ50`
- Production deployment id: `dpl_HF3ZxscBgQUsoqtHiA2qVhrCja9H`
- Production alias: `quickspin-runtime.vercel.app`

## Build evidence

Vercel build logs explicitly show:

1. `git clone https://github.com/Faadil1/quickspin.git source`
2. checkout to exact detached HEAD `83da2b807e2072bde30a76c72937c3cbe74ff389`
3. `npm ci` completed with **0 vulnerabilities**
4. `npm run build` passed TypeScript typecheck and Vite 7.3.6 production build
5. output produced `dist-demo/index.html`, CSS and JS assets
6. deployment completed and reached `READY`

The npm 11 `esbuild@0.28.2` install-script warning remains classified separately as a reviewed supply-chain warning; it did not prevent the verified build and does not change the zero-audit result.

## External fetch evidence

A post-deploy fetch of `https://quickspin-runtime.vercel.app` returned:

- HTTP status: **200 OK**
- title: `QuickSpin — Turn AI wait time into play time`
- description: `QuickSpin turns live AI execution into playable wait time, then produces a truthful Wait Receipt.`
- expected JS/CSS production assets referenced from `/assets/...`

Therefore the runtime gate is promoted from `PENDING` to **PASS_VERIFIED_PUBLIC_RUNTIME**.

## Boundary

This closes only **PUBLIC_DEPLOYMENT_PROOF**. It does **not** by itself close desktop/mobile visual inspection, interaction-path inspection, video capture, or live Q&A rehearsal.

Canonical rule retained: expected hostname ≠ runtime evidence; this URL was promoted only after Vercel returned a READY deployment and the public URL returned HTTP 200.
