# Pixel Brief Builder — repair 3 handoff

## Outcome

**PASS.** The remaining Review 5 finding is repaired and no known product defect remains.

- Deployed implementation: `d118bd91b85e037b83b29bfc5899e59acdc2756c` (`fix: use plain language on missing page`).
- Documentation baseline reviewed: `b5702f77c4ffc0583d5eee453fada47f9b7fdee2` (`docs: add independent review five`).
- This handoff and its evidence are later documentation-only work; they do not change the deployed product.
- Product: a free, local-first planner for an adult and child making a tiny game over a weekend. It creates a finite art packet before they start drawing.

## Repair

| Finding | Resolution | Regression proof |
| --- | --- | --- |
| F-5-1 — metaphorical 404 wording | The designed 404 now says **“Page not found”** and **“This page does not exist.”** The recovery action remains **“Return to the builder.”** | The browser recovery test visits an unknown URL, verifies the real HTTP 404 and clear error state, follows the recovery action, and confirms focus returns to the builder H1. |

`.factory/copy-audit.md` now covers all 404 visitor copy. It records the direct wording, short word counts, and confirms that the route has no metaphor or mood heading.

## Verification

From fresh clone `/tmp/pixel-brief-builder-repair-3-clean-mXJWjH` after `npm ci`, every literal public-claim command in `.factory/claims.json` passed separately:

```bash
npm test -- --grep @claim:finite-packet
npm test -- --grep @claim:browser-local-only
npm test -- --grep @claim:rebuild-confirmation
npm test -- --grep @claim:offline-reload
npm test -- --grep @claim:markdown-export
npm test -- --grep @claim:print-packet
npm test -- --grep @claim:filename-copy
npm test -- --grep @claim:free-use
npm test -- --grep @claim:original-prompts
```

All nine claims are tested; none is untested. Local `npm test` passed 8 unit checks and 22 browser checks. `npm run lint`, `npm run typecheck`, `npm run build`, and `npm audit --audit-level=low` also passed. The production build writes `dist/` with 9.37 kB gzip JavaScript and 5.25 kB gzip CSS.

Production verification at `https://pixel-brief-builder.sociobot.in`:

- Static deployment completed successfully from the implementation SHA above. Route documents, service worker, hashed JavaScript/CSS, and product images match the build byte for byte.
- `/missing-tile` returns HTTP 404 and renders the repaired missing-page state. The dedicated live recovery test passes.
- `/opt/fleet/lib/verify-url.sh` passes on the live landing page: title, `lang`, one H1, main landmark, alt text, labelled buttons, and console baseline are clean.
- Playwright Axe checks pass on home, demo, privacy, terms, seeded print, and the 404 at desktop and phone sizes. The post-reset contrast regression remains green.
- Lighthouse (mobile, live): performance 100, accessibility 100, best practices 100, SEO 100; LCP 1,246 ms, TBT 26 ms, CLS 0, transfer 75,978 B. Raw report: `.factory/evidence/repair-3-live-lighthouse.json`.

Fresh live browser checks, before scrolling, found the same first-screen answer at desktop and 390 px phone sizes:

- Job: **Plan your tiny game art first**.
- Audience: **An adult and child making a weekend game who need a small, shared drawing list.**
- First action: **Try it with sample data**.

One click opened the realistic Moss Beacon Night sample with 20 assets and five finished marks. The persistent demo banner stated that sample data is not saved to the real packet. Reset restored five marks; leaving the demo discarded its key and preserved the pre-existing real packet byte-for-byte.

## Earlier findings

All prior findings remain fixed: the 16×16 printable template, hashed update-safe assets, 44 px targets, mobile hero source and ratio, real HTTP 404, generator articles, seeded-print heading outline, direct route metadata, claims registration, copy terminology, and Reset-demo contrast.

The product is a static local-first app. It has no backend, account, payment offer, API endpoint, or external AI integration, so tenant isolation, restart persistence, rate-limit, billing, and installed-artifact checks do not apply.

## Evidence and remaining work

- Live first-screen and demo screenshots: `.factory/evidence/repair-3-live-desktop-home.png`, `.factory/evidence/repair-3-live-phone-home.png`, and `.factory/evidence/repair-3-live-demo.png`.
- Live repaired 404 screenshot: `.factory/evidence/repair-3-live-404-phone.png`.
- URL verifier: `.factory/evidence/repair-3-live-verify/verify.json`.
- Catalog description is verb-first, 61 characters, and copied to `/work/.evidence/catalog-description.txt`.

Known gaps: none. Preserve the missing-page recovery regression and copy audit when changing routing or 404 content.
