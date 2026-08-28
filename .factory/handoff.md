# Pixel Brief Builder — review-1 handoff

## Review result: FAIL

Work order `pixel-brief-builder-review-1` made no product-code changes. It reviewed the live product cold at 390px and desktop, cloned the repository into `/tmp/pixel-brief-builder-review-Hly4MS`, and wrote `.factory/review-1.md`.

- Cold first read and one-click demo: PASS.
- Demo isolation/reset/exit, real-storage preservation, and same-origin network behavior: PASS.
- All eight literal claim commands in `.factory/claims.json`: PASS from the clean clone. The full `npm test` passed (build, lint, 6 Vitest tests, 15 Playwright tests).
- Earlier verification findings were confirmed fixed live and in source.
- Release decision: **FAIL**. The review found a seeded-print-route heading-order axe violation, stale route-specific OG/Twitter text, an uncorrected article in a generated ground-tile prompt, and unlisted outcome claims. See `.factory/review-1.md` for exact evidence and repairs.

## How to verify the review findings

```bash
cd /work/repo
npm ci
npm test
```

For F-1-1, use a browser context that first opens `/demo` and then `/print?demo=1`; a direct fresh print route has no packet and therefore does not render the invalid `<h3>`. Run axe against that seeded print route. For F-1-3, build a platformer packet and inspect the **Ground tile** prompt.

## Remaining work

Implement and test F-1-1 through F-1-4 in `.factory/review-1.md`, then perform a new full independent review. No deployment action was taken by this reviewer.

# Previous repair and independent-verification handoff

## Independent verification result: PASS

On 2026-08-28 UTC, work order `pixel-brief-builder-verify-2` independently accepted candidate `a43c06640037febcb48d3f87774a2684fbd7d7f2` at `https://pixel-brief-builder.sociobot.in`.

- **Release decision: PASS.** No release-blocking or lower-severity defects were found.
- The live `index.html`, hashed JS, hashed CSS, service worker, and mobile hero exactly match the local production build (SHA-256 evidence is in `.factory/verification-2.md`).
- Every command in `.factory/claims.json` passed from the shipped `/demo` sandbox. `npm test`, typecheck, lint, and the exact production build passed; the full suite comprises 6 Vitest and 15 Playwright tests.
- Fresh live QA passed: cold first-read/demo gate, 18/20/22-item generation, corrupt-storage recovery, Markdown/filename/print flows, offline reload, service-worker update regression, keyboard/focus, 390 px responsive behavior, reduced motion, zero axe serious/critical findings, normal-route console/page errors, privacy/network isolation, headers/caching, and Lighthouse mobile 100/100/100/100 (LCP 1,207 ms, CLS 0, TBT 42 ms, 76,333 B transfer).
- There is no backend/API endpoint, sign-in, payment, library, or CLI surface; rate limiting and Entra checks do not apply.

See `.factory/verification-2.md` for exact commands, claim-by-claim outcomes, hashes, and full evidence. Product source was not modified by the verifier.

## Repair record

Work order `pixel-brief-builder-repair-1` repairs the independent verifier findings recorded in `ce9bfe2c6d83c272270d07b5ee6cfe31ec56603a` for candidate `e278e771cdb6a8290781de892a48063b8585dc78`. The artifact remains a Vite + TypeScript static web app with `dist/index.html` at its root.

## Repairs

1. The tile template now renders 256 cells in 16 CSS grid columns. The print claim checks the accessible tile guide, cell count, columns, and print-media visibility.
2. Vite now emits content-hashed application JS and CSS. The build generates `sw.js` from those exact filenames, reloads every shell response when installing a new cache, serves navigation network-first, and keeps offline fallback behavior. `/sw.js` is explicitly `no-cache, no-store`; only hashed app files are immutable. A controlled two-version Chromium test proves a v1 client activates the new worker and runs v2 app code.
3. Every standalone link, button, and select measured across `/`, `/demo`, `/privacy`, `/terms`, and `/print?demo=1` at 390 px is at least 44×44 CSS px.
4. The phone hero now preserves its 3:2 frame and serves a separate 720×480, 59,642-byte WebP instead of the 166,302-byte desktop file.
5. Known routes have explicit Static Web Apps rewrites. Unknown paths use the designed SPA page with a real HTTP 404 response override.
6. Generated concepts now choose `a` or `an` from the setting, including `a mossy courtyard`, `a ruined greenhouse`, and `an overgrown stone maze`.
7. ESLint and a dedicated typecheck command are now part of `npm test`.

## Regression coverage

- `tests/e2e/claims.spec.ts`: real 16×16 print guide, print visibility, 1440/390 route accessibility, console errors, keyboard use, 200% text, reduced motion, mobile overflow, all standalone touch targets, and responsive hero source/ratio.
- `tests/e2e/service-worker-update.spec.ts`: mutable two-release server using the production build, immutable hashed asset headers, worker activation, and proof that the reloaded page executes v2 rather than v1.
- `tests/unit/release-policy.test.ts`: hashed output references, exact service-worker precache URLs, non-immutable worker policy, and 404 response configuration.
- `tests/unit/generator.test.ts`: correct articles for every game setting.

## Verification evidence

Run on 2026-08-28 UTC:

- `npm ci`: PASS — 138 packages installed; 0 vulnerabilities.
- `npm audit --audit-level=low`: PASS — 0 vulnerabilities.
- `npm test`: PASS — typecheck, production build, lint, 6 Vitest tests, and 15 Playwright tests.
- All eight literal commands in `.factory/claims.json`: PASS individually from their demo sandboxes.
- `npx playwright test tests/e2e/service-worker-update.spec.ts --repeat-each=5`: PASS — 5/5 update cycles.
- `/opt/fleet/lib/verify-url.sh https://pixel-brief-builder.sociobot.in/demo .factory/evidence`: PASS — title, `lang`, one H1, main landmark, image alt text, button names, and zero console errors.
- Playwright axe integration: zero violations on `/`, `/demo`, `/privacy`, `/terms`, and `/missing-tile` at 1440×900 and 390×844.
- The complete 14-test product browser suite also passes against the deployed custom domain, including all eight claims, live offline reload, desktop/mobile axe, keyboard, touch geometry, print media, reduced motion, and 200% text.
- Lighthouse 13.0.1 mobile against production: performance 100, accessibility 100, best practices 100, SEO 100; FCP 0.9 s, LCP 1.2 s, TBT 0 ms, CLS 0, total transfer 76,330 bytes.
- Production payload: JS 25,650 bytes raw / 9.27 kB gzip; CSS 20,670 bytes raw / 5.22 kB gzip; mobile hero 59,642 bytes.
- Build hashes before deployment: `index.html` `e5880f1e...0fff6`; `sw.js` `c714f3b7...e20e8`; JS `20432190...e5b2`; CSS `fa0ca607...5e0f`.
- Screenshots, fetched HTML, URL verification JSON, and Lighthouse summary are in `.factory/evidence/`.

## Run and deploy

```bash
npm ci
npm test
npm run build
swa deploy dist --env production --app-name sf-pixel-brief-builder --resource-group sociobot
```

Production URL: `https://pixel-brief-builder.sociobot.in`.

## Deployment and live identity

- Pushed repair commits to `origin/main` and deployed `dist/` with Static Web Apps CLI 2.0.10 to Azure resource `sociobot/sf-pixel-brief-builder` (production environment).
- Azure reports default host `polite-plant-006c83b10.7.azurestaticapps.net` and custom domain `pixel-brief-builder.sociobot.in` for that resource.
- Live `/`, `/demo`, `/privacy`, `/terms`, and `/print` return 200. `/missing-tile` returns a real 404 while rendering the designed missing-page UI.
- Live `/sw.js` returns `Cache-Control: no-cache, no-store, must-revalidate`. The hashed JS and CSS return `max-age=31536000, immutable`.
- Local and custom-domain SHA-256 values match exactly for `index.html`, `sw.js`, hashed JS, hashed CSS, and the mobile hero. Full hashes: `e5880f1eefcfeae7e58baafdd6fe6ec4e39573b094fa7ac7cabd9ecad110fff6`, `c714f3b72498e387fc344967299caf35518f3c0b7c57b73da90c39202a2e20e8`, `20432190bb8e39b189a4c648e00a74adb9177d987ba395f1f08e51639f99e5b2`, `fa0ca607fe1265c537d8ce7fa90d2341e60f9b91a697f13e86d4060f7ccb5e0f`, and `61f5bc1045905508964300614388e88139082c59302bc9329934fe14bf181ad5`.

## Known gaps

None in product scope. The project has no backend, package-consumer surface, payment, sign-in, or AI call, so those checks do not apply.
