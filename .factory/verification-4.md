# Independent product verification 4 — PASS

Verified 2026-08-29 UTC for work order `pixel-brief-builder-verify-4`.

- Candidate commit: `a49078c2419c81dcbe4ad8169905d18a33e9a159`
- Checked deployment: `https://pixel-brief-builder.sociobot.in`
- Product class: local-first static web app with an offline service worker
- Decision: **PASS — no release-blocking defects found.**

No product source was changed. This report, the verification evidence, and the handoff update are the only intended changes.

## Mandatory first read and demo gate — PASS

A fresh browser context opened the live home page at 1440 px and 390 px.

- What it does: **“Plan your tiny game art first.”** The adjacent text says it makes an 18, 20, or 22-item game-art list.
- Who it is for: **“For an adult and child making a weekend game who need a small, shared drawing list.”**
- What to click first: **“Try it with sample data”**, beside **“Opens a finished 20-item packet.”**

All three answers are visible without scrolling at 390×844; the sample action ends at y=461 px. One click opened `/?demo=1` with the realistic Moss Beacon Night sample, 20 asset rows, five finished marks, and the persistent `Demo — sample data, nothing is saved to your real packet` banner. **Reset demo** and **Start for real** are present. Demo storage contained only `demo:pixel-brief-builder:v1`.

Evidence: [live desktop home](evidence/verification-4/live-home-desktop.png), [live mobile demo](evidence/verification-4/live-demo-mobile.png), and [worker baseline report](evidence/verification-4/verify.json).

## Claims gate — PASS (9/9)

`.factory/claims.json` exists. After `npm ci` in the clean candidate checkout, every literal `test` command was run separately against the shipped `/demo` entry point. Every command passed.

| Claim | Result and observed proof |
| --- | --- |
| `finite-packet` | PASS — seeded 20 rows; one and three characters rebuilt to 18 and 22 rows |
| `browser-local-only` | PASS — demo and real keys stayed separate; all observed requests were same-origin |
| `rebuild-confirmation` | PASS — cancel preserved marks; accept replaced the packet |
| `offline-reload` | PASS — controlled `/demo` reloaded with its packet while offline |
| `markdown-export` | PASS — 20 checklist rows and six storyboard lines downloaded |
| `print-packet` | PASS — 20 rows, a 16-column/256-cell tile guide, and six panels rendered |
| `filename-copy` | PASS — 20 unique lowercase-safe `.png` names copied, one per line |
| `free-use` | PASS — a real 18-row packet was built with no account or payment input |
| `original-prompts` | PASS — all assets had drawing prompts and the required original-work reminders |

The claims manifest/unit test confirms exactly one browser tag per declared claim. Landing, generated-packet, legal, metadata, and README capability statements map to these nine claims; no unlisted product claim was found.

## Clean checkout, build, and test gates — PASS

- Initial checkout: clean, on `main`, exactly `a49078c2419c81dcbe4ad8169905d18a33e9a159`.
- `npm ci`: PASS; 138 packages installed; `npm audit --audit-level=low`: 0 vulnerabilities.
- `npm test`: PASS — exact production build, TypeScript, ESLint, 8 Vitest tests, and 22 Chromium Playwright tests.
- `PLAYWRIGHT_BASE_URL=https://pixel-brief-builder.sociobot.in npm test`: PASS — the same 8 unit and 22 browser tests passed with browser coverage against production. The service-worker version-change test also passed.
- `/opt/fleet/lib/verify-url.sh https://pixel-brief-builder.sociobot.in .factory/evidence/verification-4`: PASS — title, language, H1, main, image alt text, labels, and console baseline passed.
- Exact `npm run build`: PASS and produced `dist/`.

The production artifact is small: JS 26,378 B raw / 9,345 B gzip; CSS 20,832 B raw / 5,251 B gzip; no font transfer. The desktop hero is 166,302 B at 1200×800; the mobile hero is 59,642 B at 720×480. All are under the supplied budgets.

## End-to-end product exercise — PASS

Fresh live sessions covered the normal, boundary, invalid, and recovery paths.

- Built the opinionated two-character demo, then an independent maze/ember/two-character/push-block packet. The latter produced 20 unique safe filenames, setting-specific prompts, and six coherent storyboard steps.
- Rebuilt at both count boundaries: one character produced 18 assets and three characters produced 22.
- Marked all 22 assets finished; progress reached `22` and the complete state appeared.
- Canceled a rebuild with finished marks and confirmed all 22 marks remained; accepting rebuilt the packet.
- Forced a missing palette selection. The app reported: `One setup choice is missing. Choose all four limits and try again.` Selecting a palette recovered normally.
- Injected malformed saved JSON. The app announced that the saved packet could not be read and told the user to build a new one; the next build recovered to 18 rows and cleared the alert.
- Reset restored the sample's 20 rows and five marks. Starting for real discarded the demo key and did not copy sample data.
- Clipboard denial reported: `Filenames could not be copied. Export the brief instead.`
- Export downloaded `moss-beacon-night-pixel-brief.md` with 20 checklist lines and six storyboard lines.
- Print produced all 20 checklist rows, 256 tile cells, and six storyboard panels while hiding navigation and actions. Evidence: [print rendering](evidence/verification-4/live-print.png) and [generated PDF](evidence/verification-4/live-print.pdf).

The output fulfills the researched smallest useful product: it deliberately stays within the brief's 16–24 asset boundary and provides the checklist, tile template, printable storyboard, prompts, and filenames without becoming an editor, marketplace, or generator.

## Accessibility, mobile, and interaction — PASS

Independent full Axe scans found zero violations, including zero serious/critical findings, on `/`, `/demo`, `/privacy`, `/terms`, `/print?demo=1`, and the designed 404 at both 1440×900 and 390×844. The former Reset-demo hover regression also passed Axe and contrast checks after the exact rebuild/reset flow.

- Every tested page has `lang="en"`, one H1, one main landmark, a route-specific title, and no horizontal overflow.
- Keyboard-only traversal reached the skip link, header, sample action, form controls, submit action, progress action, and checklist. Enter opened the sample; arrow/end changed the character count; Space checked an asset.
- Focus is visible: checked samples used a 4 px `#b8d979` outline. Route changes focus and announce the H1. The skip link makes the next Tab begin inside main content.
- All effective mobile touch regions, including wrapping palette labels and associated checklist labels, measured at least 44×44 CSS px.
- At a 200% root text size, the 390 px layout retained the H1 and primary action with no horizontal overflow.
- Reduced motion computed `scroll-behavior: auto`, no packet transform, and a negligible `0.00001s` completion transition.
- No normal-route console error, page error, trap, unlabeled control, or missing image alt was observed.

Evidence: [live mobile demo](evidence/verification-4/live-demo-mobile.png), [live desktop demo](evidence/verification-4/live-demo-desktop.png), and [baseline mobile screenshot](evidence/verification-4/screenshot-mobile.png).

## Privacy, headers, caching, and routes — PASS

The full independent live flow recorded nine network requests: every request was a same-origin GET for a document or bundled asset. There were no analytics, telemetry, API, payment, AI, remote-font, third-party-script, or packet-data requests. There were no failed responses, console errors, or page errors. Only the documented real and demo local-storage keys are used.

Live responses include:

- self-only CSP with `frame-ancestors 'none'` as a response header;
- HSTS `max-age=10886400; includeSubDomains; preload`;
- `Referrer-Policy: strict-origin-when-cross-origin`;
- `X-Content-Type-Options: nosniff`;
- restrictive camera, microphone, geolocation, and payment Permissions-Policy.

HTML uses 30-second revalidation. Hashed JS/CSS use `public, max-age=31536000, immutable`. The worker uses `no-cache, no-store, must-revalidate`. Product images use a one-day cache with stale-while-revalidate. `/`, `/demo`, `/privacy`, `/terms`, and `/print?demo=1` return 200; `/missing-tile` returns the designed page with HTTP 404. All discovered product links resolve as intended; the only external link, `https://sociobot.in/`, returned 200. Robots, sitemap, favicon, touch icon, and social card returned 200.

This static product has no server-side endpoint, unlock call, account, payment flow, or sign-in. API request-allowance/429 and Microsoft Entra tenant tests are therefore not applicable. It is not a library or CLI. AI would not improve the deterministic four-choice job and would weaken the child-safe local-only design; no missed AI leverage was found.

## PWA/offline behavior — PASS

The demo was loaded once, waited for service-worker control, switched offline, and reloaded with all 20 rows, five marks, and the offline banner. The two-version worker test proved that an already controlled client receives a new hashed shell, activates the new cache, deletes the old cache, and loads the new script after reload. The live `sw.js` exactly matches the candidate build and is not cached immutably.

## Deployment identity and performance — PASS

SHA-256/byte comparisons matched between `dist/` and production for all six route documents, `sw.js`, hashed JS, hashed CSS, both hero images, and the social card. Representative exact hashes:

- `index.html`: `5ec1b6903f0053ad872ad37e504585ca9226e9f54922ab5f94087d47ee0f3e47`
- `index-DGy7mSQZ.js`: `5a9911a0baea412d52f183caedf77b05db96d929da8b13905415afe0109e217d`
- `index-CNHD7iV3.css`: `95fd63914ed634279ce7ee78ee9b2256bfcaf6896a1ea9e10fad18a7d2c0efe9`
- `sw.js`: `4a98c0d11e0b1ab2847b369f4711eaa371bca39bbcc4cbc7656abdf5b3f54489`

The live deployment is the candidate artifact; the earlier deployment-only concern does not reproduce.

Fresh Lighthouse 13.4.1 mobile results:

| Measure | Result |
| --- | ---: |
| Performance | 100 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| LCP | 1,299 ms |
| FCP / Speed Index | 999 ms / 999 ms |
| TBT | 73 ms |
| CLS | 0 |
| Transfer | 76,424 B |

Evidence: [fresh Lighthouse JSON](evidence/verification-4/lighthouse.json).

## Defects by severity

- Critical: none.
- High: none.
- Medium: none.
- Low: none.

## Final decision

**PASS.** Candidate `a49078c2419c81dcbe4ad8169905d18a33e9a159` is accepted at `https://pixel-brief-builder.sociobot.in`. It satisfies the researched job, mandatory first-read and demo gates, every declared claim, local and deployed test gates, privacy and accessibility requirements, PWA checks, route/security/caching expectations, and performance budgets.
