# Pixel Brief Builder — perfection-loop polish 3

Polished released candidate `6496f01841b8df6f2c0f08328e7522ef8497b635` from review commit `653c7cd85fb9ede22cd5effe244b2151c75ce45c`. Product repairs are in `4270f67269482c0053ae9643a3e1710b2e12cac0`; deployment `745a3885-5fb6-4217-9396-8ba0cb2df00f` completed on 2026-08-29 UTC.

## Review 3 findings

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-3-1 — direct routes sent home metadata | Added shared route metadata, generated distinct `demo.html`, `privacy.html`, `terms.html`, `print.html`, and `404.html` documents, and routed Azure responses to them. Client navigation still updates every head field. | `direct route responses contain route metadata before JavaScript runs`; `builds route-specific initial metadata documents`; `route metadata stays coherent`; live cold GETs returned the correct title/canonical/OG values for `/demo`, `/privacy`, `/terms`, `/print?demo=1`, and the 404 response; [live Privacy](evidence/polish-3-live-privacy.png), [live 404](evidence/polish-3-live-404.png). |
| F-3-2 — vague hero eyebrow | Removed “A weekend-sized art plan” so the first visible line is the job-led H1. | `.factory/copy-audit.md`; live `/` cold check; [live mobile home](evidence/polish-3-live-home-mobile.png). |
| F-3-3 — metaphorical hero caption | Replaced it with the factual sentence “The planner makes a list of 18, 20, or 22 game art assets.” and linked it to the strengthened finite-packet claim. | `sample creates a finite packet @claim:finite-packet` now proves 18, 20, and 22; live `/`; [live mobile home](evidence/polish-3-live-home-mobile.png). |
| F-3-4 — ambiguous “moves” label | Replaced “Three short moves” with “Three steps.” | `.factory/copy-audit.md`; live `/`; [live mobile home](evidence/polish-3-live-home-mobile.png). |
| F-3-5 — unexplained “handoff” label | Removed “A finite handoff”; the useful heading now stands alone. | `.factory/copy-audit.md`; live `/`; [live mobile home](evidence/polish-3-live-home-mobile.png). |
| F-3-6 — “cast” conflicted with “character count” | Standardized the instruction to “Choose the game shape, colours, character count, and main action.” | `.factory/copy-audit.md`; live `/`; [live mobile home](evidence/polish-3-live-home-mobile.png). |
| F-3-7 — competing output names | Standardized landing copy, metadata, README, and claims on “16×16 tile template” and “six-panel storyboard.” | `@claim:print-packet`; `@claim:markdown-export`; live `/`, `/demo`, and `/print?demo=1`; [live query demo](evidence/polish-3-live-demo-query-mobile.png). |

## Earlier findings rechecked

| Earlier finding | Change retained or completed | Evidence |
| --- | --- | --- |
| F-1-1 — seeded print skipped H2 | Print keeps the valid H1 → H2 packet title → H3 section outline. | `seeded print headings pass axe`; `@claim:print-packet`; live `/print?demo=1` axe pass. |
| F-1-2 — route social metadata stayed on home copy | The client-side fix remains, and F-3-1 now also fixes the initial network response. | Raw response and rendered metadata tests; live cold GETs for every route. |
| F-1-3 — ground prompt used the wrong article | `articleFor()` remains shared by concept and ground-tile prompts. | `uses the correct article in concepts and ground-tile prompts for every setting`; all generator cases pass. |
| F-1-4 — unsupported or undeclared claims | Conditional rebuild confirmation remains declared and tested. Unsupported negative-scope and one-click qualifiers remain absent. A manifest test now enforces exactly one tagged test per claim. | `@claim:rebuild-confirmation`; `maps every declared claim to exactly one tagged browser test`; all nine literal claim commands passed. |
| V-1 P1 — 16×16 template was 8×8 | The template remains 256 cells in 16 computed columns on screen and in print. | `@claim:print-packet`; live `/print?demo=1`. |
| V-1 P1 — fixed immutable application URLs | Hashed JS/CSS, no-cache worker policy, and network-first navigation remain in place. | `an existing client receives the new hashed app shell after a worker update`; `emits content-hashed application assets and precaches those exact URLs`; live `/sw.js`. |
| V-1 P1 — controls below 44 px | Standalone links, buttons, and selects retain 44×44 px minimum targets. | `standalone mobile controls meet the 44px touch target baseline`; live 390 px suite. |
| V-1 P2 — distorted/full-size phone hero | The 3:2 mobile frame still serves the separate 720×480, 59,642-byte image. | `mobile hero keeps its 3:2 frame and serves a smaller source`; [live mobile home](evidence/polish-3-live-home-mobile.png). |
| V-1 P2 — unknown paths were soft 404s | Azure now rewrites 404 responses to the route-specific `404.html` while retaining HTTP 404. | `routing restores focus, announces pages, and keeps legal and 404 routes real`; live `/missing-tile` returned 404; [live 404](evidence/polish-3-live-404.png). |
| V-1 P3 — concepts used wrong articles | All setting articles remain correct in concepts and asset prompts. | Generator article test; live platformer and seeded quest packets. |

Review 2 contained no findings. Every earlier review, polish record, and verification finding was read and rechecked.

## Acceptance evidence

- Clean clone `/tmp/pixel-brief-builder-polish-3-clean-YhBeSn` at `4270f67`: `npm ci` found 0 vulnerabilities; every one of the nine literal claim commands passed separately; `npm test` passed 8 unit and 21 browser tests; `npm run build` produced `dist/`.
- Work-order build command `npm ci && npm test && npm run build`: passed before deployment.
- Production browser suite: 21/21 passed against `https://pixel-brief-builder.sociobot.in` after deployment.
- Live verifier: title `Demo — Pixel Brief Builder`, `lang=en`, one H1, main landmark present, zero missing alt text, zero unnamed buttons, and no console errors. Evidence: [live verify JSON](evidence/polish-3-live-verify/verify.json).
- Live Lighthouse 13.0.3 mobile: performance 100, accessibility 100, best practices 100, SEO 100; LCP 1,201 ms, CLS 0, TBT 15 ms, transfer 76,446 bytes. Raw report: [live Lighthouse JSON](evidence/polish-3-live-lighthouse.json).
- Production JS is 26,378 bytes raw / 9.39 kB gzip; CSS is 20,708 bytes raw / 5.22 kB gzip; fonts are 0 bytes.
- Local and live SHA-256 values match for all six HTML documents, the worker, JavaScript, and CSS. Representative hashes: `index.html` `a18c3dd2…8568`, `demo.html` `a4c91e5f…ca48`, `404.html` `195b1af0…e529`, JS `f693b3e3…0e65`, CSS `a296c8a2…d8f4`.

No blocking or minor finding remains unresolved.
