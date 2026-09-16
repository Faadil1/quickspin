# Native Runtime Promotion — 2026-09-16

## Product source

- Native visual product merge: `a15d48a5090e6a9e7ce0c5bc803aa52f8ebb98c3`
- Exact build workflow run: `35156186426` — SUCCESS
- Immutable staged artifact commit: `24fff5448af26b6d584dfa43eb5f2c6dc9a85699`
- JS bundle: `index-CAcZB-rj.js`
- CSS bundle: `index-BenuXaCM.css`

## Preserved failed promotion

The first attempt to promote into the legacy Vercel project `quickspin-runtime` failed before serving changes:

- deployment: `dpl_G5aLCDikz3tMgGBSC2vBjRsXxgyn`
- state: `ERROR`
- error: `BUILD_UTILS_SPAWN_128`
- root cause: the project still carried a stale custom Build Command that cloned the repository and forced `git checkout 83da2b807e2072bde30a76c72937c3cbe74ff389`; the direct static upload was therefore intercepted by obsolete project configuration.

The prior verified production deployment remained untouched. This red run is retained as evidence instead of being laundered into a success claim.

## Clean production runtime

A clean Vercel project was created to avoid inheriting the stale build configuration:

- project: `quickspin-runtime-native`
- project id: `prj_fBE7dDskvIkzFDTubRmI88MRUM31`
- production deployment: `dpl_GXWDnXQxaiMMUK7kZfhztUm1Pgws`
- canonical runtime: `https://quickspin-runtime-native.vercel.app`
- state: `READY`

The runtime shell uses local `/assets/...` URLs. Vercel rewrites those URLs to immutable jsDelivr assets pinned to artifact commit `24fff5448af26b6d584dfa43eb5f2c6dc9a85699`, so the browser stays on the runtime origin while the asset bytes remain content-addressed by the immutable Git commit.

## Runtime verification

Verified HTTP 200:

- `/`
- `/lab`
- `/proof`
- `/sdk`
- `/judges`
- `/build.json`
- `/assets/index-CAcZB-rj.js`
- `/assets/index-BenuXaCM.css`

`/build.json` reports:

- source SHA: `a15d48a5090e6a9e7ce0c5bc803aa52f8ebb98c3`
- artifact commit: `24fff5448af26b6d584dfa43eb5f2c6dc9a85699`
- JS bundle: `index-CAcZB-rj.js`
- CSS bundle: `index-BenuXaCM.css`
- packaging: `vercel-proxied-immutable-jsdelivr-assets`

Asset headers verified:

- JS: `application/javascript; charset=utf-8`
- CSS: `text/css; charset=utf-8`
- jsDelivr version header identifies immutable commit `24fff5448af26b6d584dfa43eb5f2c6dc9a85699`.

The served CSS includes native definitions for `mobile-dock`, `signature-rail`, `lab-storyline`, `ghost-console`, `ghost-privacy`, `evidence-split`, `evidence-vessel`, `redaction-gate`, `trust-boundary`, `contract-strip`, `judge-memory`, and `claim-matrix`, plus responsive and `prefers-reduced-motion` rules. The hero decorative coral glow was replaced with violet; coral remains available for refusal/failure semantics.

## Remaining gate

HTTP/source/bundle verification is complete. Browser-level visual inspection on desktop/mobile/reduced-motion and the final demo recording remain separate gates and must not be inferred from HTTP verification alone.
