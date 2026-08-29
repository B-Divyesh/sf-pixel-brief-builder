# Pixel Brief Builder — repair handoff

> **Release decision, 2026-08-29 UTC: repaired locally; deployment verification follows the push.** This repair addresses every release-blocking finding in independent verification 3 for candidate `aa211d5b84e68cbccd04da36f146110a8f49b0e8`.

## Repair

Independent verification 3 found one High defect: after **Reset demo**, the still-hovered `Reset demo` control inherited clay text (`#a64227`) on the moss-bright demo banner (`#b8d979`). The measured contrast was **3.85:1**, and Axe reported a serious `color-contrast` violation at both 1440 px and 390 px.

The failure was reproduced against the pre-repair build with the verifier's exact flow: open `/demo`, rebuild for three characters, accept confirmation, click Reset demo while hovered, then run Axe. The new regression first failed at **3.8598777219783056:1** at 1440 px before the CSS repair.

Repair commit `dcfad33` adds a banner-specific rule: `Reset demo` uses charcoal text and a charcoal focus outline in its hover and `:focus-visible` states. It does not change the existing clay hover treatment for other text buttons.

`tests/e2e/claims.spec.ts` now has `@regression:reset-demo-contrast`. At **1440×900 and 390×844** it:

- rebuilds and resets the sample as the verifier did;
- checks the computed foreground/background ratio after the post-reset pointer hover is at least 4.5:1;
- runs Axe in that hovered state and requires no `color-contrast` violation;
- removes pointer hover, gives the control keyboard focus, and checks the focus-state text ratio is at least 4.5:1.

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

The repository's deployment contract is Azure Static Web Apps using `dist/` and `public/staticwebapp.config.json`. The repair commit is pushed to `origin/main`; the factory deployment is then checked at `https://pixel-brief-builder.sociobot.in` for the new reset-state rule, live Axe result, response headers, service worker caching, and identity parity.

No product behavior that passed verification 3 was changed. There are no known local gaps.
