# Pixel Brief Builder — polish-1 handoff

## Outcome

Perfection-loop round 1 is complete. Candidate `a43c06640037febcb48d3f87774a2684fbd7d7f2` was repaired against review commit `1ef10fcca9d3a7a82243514c9ee825f369e898ed`. Product repair commit `ee48f3e06ed944417227d32dc001d0db983ce4d7` is pushed to `origin/main` and deployed to `https://pixel-brief-builder.sociobot.in`.

All four adversarial findings and every earlier verification finding are resolved. The artifact remains a Vite + TypeScript static web app with `dist/index.html` at its root and retains the concrete-and-moss workbench identity.

## What changed

- Fixed the seeded printable packet outline to H1 → H2 → H3 and added a seeded axe regression.
- Made Open Graph, Twitter, canonical, title, and description metadata route-specific.
- Fixed articles in every ground-tile prompt and expanded the generator matrix test.
- Added the declared `rebuild-confirmation` claim with observable cancel/accept behavior. Removed untestable negative scope wording and the unsupported “one-click” qualifier.
- Made the first-screen sample action enter the isolated `/?demo=1` sandbox directly. `/demo` remains supported and canonical.
- Strengthened demo isolation coverage: edit/reset/exit leaves an existing real packet byte-identical and removes only demo state.
- Added navigation regression coverage for H1 focus/announcement, browser Back, Privacy, Terms, live HTTP 404, and recovery.
- Added `.factory/catalog-description.txt`: “Plan a tiny game art list before you start drawing.”
- Updated the copy audit, demo documentation, claims manifest, screenshots, and `.factory/polish-1.md` finding map.

## Verification

- Final clean clone `/tmp/pixel-brief-builder-polish-1-final`: `npm ci` passed; 0 vulnerabilities.
- Every one of the nine literal commands in `.factory/claims.json` passed separately from that final clone.
- Final clean-clone `npm test`: 6 unit tests and 20 browser tests passed.
- `npx playwright test tests/e2e/service-worker-update.spec.ts --repeat-each=5`: 5/5 passed.
- Cold deployed browser suite: 18/18 passed. Strengthened live isolation/routing checks: 2/2 passed.
- Live axe: zero violations on desktop/mobile core routes and seeded `/print?demo=1`.
- Live URL verifier: PASS; see `.factory/evidence/polish-1-verify/verify.json`.
- Lighthouse mobile: 100 performance, 100 accessibility, 100 best practices, 100 SEO; LCP 1,203 ms, CLS 0, TBT 13 ms, 75,997 bytes.
- Payload: JS 26.22 KB raw / 9.38 KB gzip; CSS 20.72 KB raw / 5.23 KB gzip; no fonts; mobile hero 59,642 bytes.
- Live route status: `/`, `/demo`, `/?demo=1`, `/privacy`, `/terms`, and `/print` return 200; `/missing-tile` returns 404.
- Local and live `index.html`, `sw.js`, hashed JS, and hashed CSS match byte-for-byte. Exact hashes are in `.factory/polish-1.md`.
- Live security headers include CSP, HSTS, Referrer-Policy, X-Content-Type-Options, and Permissions-Policy. `/sw.js` is `no-cache, no-store, must-revalidate`.

## Run and deploy

```bash
npm ci
npm test
npm run build
swa deploy dist --env production --app-name sf-pixel-brief-builder --resource-group sociobot
```

## Known gaps and next steps

None in the researched scope. There is no backend, payment, sign-in, AI call, or third-party runtime dependency to verify.
