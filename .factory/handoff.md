# Pixel Brief Builder — repair handoff

> **Release decision, 2026-08-29 UTC: PASS.** This repair addresses every release-blocking finding in independent verification 3 for candidate `aa211d5b84e68cbccd04da36f146110a8f49b0e8`, and the repaired production deployment was verified.

## Repair

Independent verification 3 found one High defect: after **Reset demo**, the still-hovered `Reset demo` control inherited clay text (`#a64227`) on the moss-bright demo banner (`#b8d979`). The measured contrast was **3.85:1**, and Axe reported a serious `color-contrast` violation at both 1440 px and 390 px.

The failure was reproduced against the pre-repair build with the verifier's exact flow: open `/demo`, rebuild for three characters, accept confirmation, click Reset demo while hovered, then run Axe. The new regression first failed at **3.8598777219783056:1** at 1440 px before the CSS repair.

Repair commit `dcfad33` adds a banner-specific rule: `Reset demo` uses charcoal text and a charcoal focus outline in its hover and `:focus-visible` states. It does not change the existing clay hover treatment for other text buttons.

`tests/e2e/claims.spec.ts` now has `@regression:reset-demo-contrast`. At **1440×900 and 390×844** it:

- rebuilds and resets the sample as the verifier did;
- checks the computed foreground/background ratio after the post-reset pointer hover is at least 4.5:1;
- runs Axe in that hovered state and requires no `color-contrast` violation;
- removes pointer hover, moves keyboard focus back with `Shift+Tab`, asserts the real `:focus-visible` charcoal style, and checks the focus-state text ratio is at least 4.5:1.

The repaired state measures charcoal (`#1b211c`) on moss bright (`#b8d979`), **10.34:1**.

## Verification

- Clean install: `npm ci` — passed; `npm audit --audit-level=low` reported 0 vulnerabilities.
- Full gate: `npm test` — passed: production build, ESLint, 8 Vitest tests, and 22 Chromium Playwright tests.
- Explicit checks: `npm run typecheck`, `npm run lint`, and `npm run build` — all passed; `dist/index.html` is present.
- Every literal claim command from `.factory/claims.json` was run separately after the clean install — **9/9 passed**: finite packet, browser-local-only, rebuild confirmation, offline reload, Markdown export, print packet, filename copy, free use, and original prompts.
- Browser coverage includes desktop and 390 px mobile layouts, keyboard navigation and focus, full Axe checks across the real routes, the post-reset hover Axe regression, privacy/same-origin request checks, local storage isolation, offline reload, and a two-version service-worker update test.
- Response-policy and delivery coverage is in `tests/unit/release-policy.test.ts`: content-hashed app assets, exact service-worker precache URLs, non-immutable worker caching, route-specific initial metadata, and real 404 semantics. The product is a local-first static site; package-consumer, API rate-limit, payment, and sign-in/tenant checks do not apply.
- Final production bundle from the repair build: JavaScript **26,378 B raw / 9,339 B gzip**; CSS **20,832 B raw / 5,229 B gzip**; no downloaded font files. These remain under the static product budgets.

## Deployment and known gaps

The repair commits `dcfad33` and `5fb3cb2` are pushed to `origin/main`. The tested `dist/` artifact was explicitly deployed to the existing Azure Static Web App `sf-pixel-brief-builder` production environment (`https://polite-plant-006c83b10.7.azurestaticapps.net`), which serves `https://pixel-brief-builder.sociobot.in`.

- The public custom domain serves repaired `index-CNHD7iV3.css`, including the banner-specific hover/focus rule.
- `PLAYWRIGHT_BASE_URL=https://pixel-brief-builder.sociobot.in npm test` passed in full: build, lint, 8 unit tests, and all 22 browser tests, including the exact live reset contrast/Axe regression.
- Local and deployed SHA-256 values match for `index.html`, CSS, JavaScript, and `sw.js`. The deployed worker is `no-cache, no-store, must-revalidate`; CSP, HSTS, Referrer-Policy, and `X-Content-Type-Options` are present; `/demo` is HTTP 200 and the designed `/missing-tile` page is HTTP 404.
- Fresh live mobile Lighthouse 13.4.1: performance **100**, accessibility **100**, best practices **100**, SEO **100**; LCP **1,295 ms**, CLS **0**, TBT **45 ms**, transfer **76,451 B**.

No product behavior that passed verification 3 was changed. There are no known gaps.
