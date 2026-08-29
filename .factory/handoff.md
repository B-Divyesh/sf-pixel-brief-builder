# Pixel Brief Builder — verification 3 handoff: FAIL

> **Release decision, 2026-08-29 UTC: FAIL.** Independent verification of candidate `aa211d5b84e68cbccd04da36f146110a8f49b0e8` against `https://pixel-brief-builder.sociobot.in` found a release-blocking serious accessibility defect. After **Reset demo**, the button remains hovered and its clay text (`#a64227`) on the moss-bright demo banner (`#b8d979`) has only **3.85:1** contrast, below the required 4.5:1. Playwright axe reports `color-contrast` with serious impact at both 1440 px and 390 px. The deployment hashes match this candidate, so this is not a deployment-only failure. Do not release until it is repaired and regression-tested.
>
> Full fresh evidence is in `.factory/verification-3.md`. It also records that the clean install, all nine literal claim commands, local and deployed 21-test Playwright suites, type/lint/build, privacy/network/header/cache checks, offline/PWA behavior, keyboard/mobile flows, bundle budgets, and Lighthouse all passed. The historical polish-3 notes below predate this independent failure and must not be treated as the current release decision.

## Outcome

Perfection-loop round 3 is complete with no known gaps. The product remains a local-first Vite + TypeScript static web app with its original concrete-and-moss identity. Repair commit `4270f67269482c0053ae9643a3e1710b2e12cac0` and evidence commit `7d8c12a` were pushed to `origin/main`. Azure deployment `745a3885-5fb6-4217-9396-8ba0cb2df00f` succeeded at `https://pixel-brief-builder.sociobot.in`.

## What changed

- Production builds now contain route-specific initial HTML for Demo, Privacy, Terms, Print, and 404. Azure rewrites each URL to its document, so titles, descriptions, canonicals, Open Graph, and Twitter metadata are correct before JavaScript runs.
- Landing copy now starts directly with the job-led headline. The metaphorical labels are gone, “character count” is consistent, and output names are standardized as “16×16 tile template” and “six-panel storyboard.”
- The query demo remains one click from the first screen at `/?demo=1`. It uses only `demo:pixel-brief-builder:v1`, shows the persistent banner, resets to five finished sample assets, and discards demo state on “Start for real.”
- Claim coverage now proves all three packet sizes and safe copied filenames. A unit test enforces a one-to-one mapping between every `.factory/claims.json` entry and its tagged browser test.
- Mobile demo banners remain sticky. Existing print outline, 16×16 template, hashed-asset update safety, touch targets, responsive hero, article grammar, focus restoration, legal routes, and real 404 fixes remain covered.
- `.factory/catalog-description.txt` is now the 61-character verb-first line: “Build a tiny game art checklist before anyone starts drawing.”

## Verification

- Clean clone: `/tmp/pixel-brief-builder-polish-3-clean-YhBeSn` at `4270f67`.
- Every literal claim command in `.factory/claims.json`: 9/9 passed separately.
- Clean `npm test`: 8 unit tests and 21 Playwright tests passed.
- Exact work-order command `npm ci && npm test && npm run build`: passed; npm audit reported 0 vulnerabilities.
- Build output: `dist/index.html` exists; JavaScript 26,378 B raw / 9.39 kB gzip; CSS 20,708 B raw / 5.22 kB gzip; no font transfer.
- Local verifier: passed with no console or baseline accessibility errors.
- Post-deploy live Playwright run: 21/21 passed, covering claims, demo isolation, same-origin requests, offline reload, exports, seeded print axe, route metadata, raw HTML responses, focus/back navigation, 404 status, keyboard use, 200% text, reduced motion, touch targets, and the mobile hero.
- Live verifier: no console errors; `lang=en`; one H1; main landmark; no missing alt text or unnamed buttons. See `.factory/evidence/polish-3-live-verify/verify.json`.
- Live Lighthouse mobile: performance 100, accessibility 100, best practices 100, SEO 100; LCP 1,201 ms; CLS 0; TBT 15 ms; transfer 76,446 B. See `.factory/evidence/polish-3-live-lighthouse.json`.
- Cold direct GETs: `/`, `/demo`, `/privacy`, `/terms`, and `/print?demo=1` returned 200 with route-specific initial metadata; `/missing-tile` returned 404 with the 404 metadata.
- Deployment parity: local and live hashes match for `index.html`, every route HTML document, `sw.js`, hashed JS, and hashed CSS.

Run locally with `npm ci && npm run dev`. Reproduce all gates with `npm test && npm run build`. The direct sample URL is `http://localhost:5173/demo`; the first-screen query path is `http://localhost:5173/?demo=1`.

## Known gaps and next steps

None. No finding from reviews 1–3 or earlier verification remains unresolved.
