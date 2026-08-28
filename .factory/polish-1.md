# Pixel Brief Builder — perfection-loop polish 1

Polished candidate `a43c06640037febcb48d3f87774a2684fbd7d7f2` from review commit `1ef10fcca9d3a7a82243514c9ee825f369e898ed`. Production was deployed from repair commit `ee48f3e06ed944417227d32dc001d0db983ce4d7` to `https://pixel-brief-builder.sociobot.in` on 2026-08-28 UTC.

## Adversarial review findings

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 — seeded print skipped H2 | Print packets now render the packet title as H2 and every packet section as H3. Builder packets retain their H3/H4 outline. | `seeded print headings pass axe` and `@claim:print-packet`; zero axe violations live; `.factory/evidence/polish-1-print-seeded.png`; cold live `/demo` → `/print?demo=1`. |
| F-1-2 — route social text stayed on home copy | Every render now updates description, canonical, `og:title`, `og:description`, `og:url`, `twitter:title`, and `twitter:description` from route metadata. The query demo canonicals to `/demo`. | `route metadata stays coherent`; live assertions for `/`, `/demo`, `/?demo=1`, `/privacy`, `/terms`, `/print?demo=1`, and `/missing-tile`; `.factory/evidence/polish-1-print-seeded.png`. |
| F-1-3 — ground prompt said “an ruined” | The ground-tile template now uses the same `articleFor()` helper as the concept. | Unit test `uses the correct article in concepts and ground-tile prompts for every setting`; all platformer, maze, and quest cases pass; `.factory/evidence/polish-1-ground-article.png`; live real builder. |
| F-1-4 — unregistered outcome claims | Added `rebuild-confirmation` to `.factory/claims.json` with a cancel/accept state test. Rewrote help text to match actual conditional confirmation. Removed the untestable negative scope sentence and the unmeasured “one-click” copy qualifier while retaining tested finite-plan and original-prompt facts. | `@claim:rebuild-confirmation`; all nine literal claim commands pass from `/tmp/pixel-brief-builder-polish-1-clean`; `.factory/evidence/polish-1-demo-query-mobile.png`; live `/demo`. |

## Earlier verification findings rechecked

| Finding | Change retained | Evidence |
| --- | --- | --- |
| V-1 P1 — 16×16 claim rendered 8×8 | The guide remains 256 cells in 16 computed columns and stays visible in print media. | `@claim:print-packet`; `.factory/evidence/polish-1-print-seeded.png`; live `/print?demo=1`. |
| V-1 P1 — immutable fixed app files stranded clients | Vite emits hashed JS/CSS, the worker precaches exact hashes, navigations are network-first, and `/sw.js` is not immutable. | `release-policy.test.ts`; service-worker update test repeated 5/5; live `/sw.js` has `no-cache, no-store, must-revalidate`. |
| V-1 P1 — controls below 44 px | Standalone links, buttons, and selects remain at least 44×44 CSS px at 390 px. | `standalone mobile controls meet the 44px touch target baseline`; `.factory/evidence/polish-1-demo-query-mobile.png`; live mobile `/`, `/demo`, `/privacy`, `/terms`, `/print?demo=1`. |
| V-1 P2 — distorted/full-size phone hero | The 3:2 phone frame still selects the separate 720×480, 59,642-byte image. | `mobile hero keeps its 3:2 frame and serves a smaller source`; `.factory/evidence/polish-1-home-mobile.png`; cold live `/`. |
| V-1 P2 — soft 404 | Unknown paths still use the designed recovery page with HTTP 404 on Azure Static Web Apps. | `routing restores focus, announces pages, and keeps legal and 404 routes real`; `curl` returned 404; `.factory/evidence/polish-1-404.png`; live `/missing-tile`. |
| V-1 P3 — wrong articles in concepts | Concepts still use `a ruined greenhouse`, `an overgrown stone maze`, and `a mossy courtyard`. | Expanded article unit test; `.factory/evidence/polish-1-ground-article.png`; live real builder. |

## Controller acceptance rechecks

| Area | Result and evidence |
| --- | --- |
| First screen | Job-led six-word H1, named adult/child situation, sample action, adjacent result, and three facts remain visible at 390×844. `.factory/evidence/polish-1-home-mobile.png`. |
| One-click isolated demo | The first-screen action now enters `/?demo=1` directly. It shows the finished 20-item sample, persistent banner, Reset demo, and Start for real. Reset/exit preserve an existing real packet byte-for-byte and discard the demo key. `@claim:browser-local-only`; `.factory/evidence/polish-1-demo-query-mobile.png`. |
| Titles, real routes, focus, legal links, 404 | Route titles/social metadata/canonicals are coherent; Privacy and Terms are real URLs; pushState and Back focus and announce H1; missing routes return 404 and recover home. `route metadata stays coherent` and `routing restores focus, announces pages, and keeps legal and 404 routes real`. |
| Mobile/accessibility | Desktop and 390 px axe scans are clean, seeded print axe is clean, 200% text has no horizontal overflow, focus is visible, touch targets pass, and reduced motion disables movement. Live verifier result: `.factory/evidence/polish-1-verify/verify.json`. |
| Privacy/offline | All exercised requests stay same-origin; demo and real keys remain isolated; offline `/demo` reload works after first visit. `@claim:browser-local-only` and `@claim:offline-reload`. |

## Final evidence

- Clean clone: `npm ci` passed with 0 vulnerabilities; all nine literal claim commands passed separately.
- Final clean clone `/tmp/pixel-brief-builder-polish-1-final`: all nine literal claim commands passed separately, then `npm test` passed 6 unit and 20 browser tests.
- Live browser suite: 18/18 passed after deployment; the later strengthened isolation/routing pair also passed live 2/2.
- Lighthouse 13.4.1 mobile: performance 100, accessibility 100, best practices 100, SEO 100; LCP 1,203 ms, CLS 0, TBT 13 ms, transfer 75,997 bytes. Raw report: `.factory/evidence/polish-1-lighthouse.json`.
- Local/live SHA-256 parity: `index.html` `f74aec80…6f01`, `sw.js` `cfa0136e…d940`, JS `13761292…f5bc`, CSS `476aaa2b…bb2`.
- `/opt/fleet/lib/verify-url.sh` passed the live demo with title `Demo — Pixel Brief Builder`, `lang=en`, one H1, a main landmark, no missing alt text, no unnamed buttons, and no console errors.

No finding from `.factory/review-1.md` or `.factory/verification-1.md` remains unresolved.
