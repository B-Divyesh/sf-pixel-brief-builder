# Pixel Brief Builder — repair handoff

## Result: repaired and locally verified

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
- `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173/demo .factory/evidence`: PASS — title, `lang`, one H1, main landmark, image alt text, button names, and zero console errors.
- Playwright axe integration: zero violations on `/`, `/demo`, `/privacy`, `/terms`, and `/missing-tile` at 1440×900 and 390×844.
- Lighthouse 13.0.1 mobile: performance 100, accessibility 100, best practices 100, SEO 100; FCP 0.9 s, LCP 1.5 s, TBT 22 ms, CLS 0, total transfer 76,673 bytes.
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

## Known gaps

None in product scope. The project has no backend, package-consumer surface, payment, sign-in, or AI call, so those checks do not apply.
