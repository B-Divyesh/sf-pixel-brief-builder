# Independent product verification 3 — FAIL

Verified 2026-08-29 UTC for work order `pixel-brief-builder-verify-3`.

- Candidate commit: `aa211d5b84e68cbccd04da36f146110a8f49b0e8`
- Checked deployment: `https://pixel-brief-builder.sociobot.in`
- Product class: local-first static web app/PWA. There is no backend endpoint, sign-in, payment, library, or CLI surface.
- Decision: **FAIL — release blocked by one serious accessibility defect.**

No product source was changed during this verification. This report and the handoff update are the only intended repository changes.

## Mandatory first read and sample demo

A cold desktop and 390 px live visit passed the plain-words gate. The first screen says the product does “Plan your tiny game art first,” names “an adult and child making a weekend game,” and places **Try it with sample data** beside “Opens a finished 20-item packet.” It also gives the three short facts: free to use, browser-local storage, and offline after the first visit.

The one-click action opened the realistic Moss Beacon sample. It immediately showed 20 asset rows and five finished marks, plus the persistent `Demo — sample data, nothing is saved to your real packet` banner with **Reset demo** and **Start for real**. The first-read and demo-sandbox gates pass.

## Claim gate — PASS (9/9)

`.factory/claims.json` exists and lists nine claims. From this clean checkout, after `npm ci`, I ran every literal `test` command separately against the local `/demo` entry point. All passed:

| Claim | Result |
| --- | --- |
| `finite-packet` | PASS — seeded 20-item packet and rebuilt 18- and 22-item packets |
| `browser-local-only` | PASS — real/demo browser keys stay separate and requests remain same-origin |
| `rebuild-confirmation` | PASS — dismiss preserves finished marks; accept replaces the packet |
| `offline-reload` | PASS — controlled demo reload works offline after first visit |
| `markdown-export` | PASS — checklist rows and six storyboard entries download as Markdown |
| `print-packet` | PASS — 20 rows, visible 16×16/256-cell tile guide, and six storyboard panels |
| `filename-copy` | PASS — 20 lowercase safe `.png` names copied one per line |
| `free-use` | PASS — real 18-item packet builds without account or payment input |
| `original-prompts` | PASS — 20 drawing prompts and original/no-known-character constraints |

The manifest/unit check also proves every declared id has exactly one tagged browser test.

## Local and live execution — PASS

- Clean `npm ci`: PASS; 138 packages installed and npm reported 0 vulnerabilities.
- Local `npm test`: PASS — production build, ESLint, 8 Vitest tests, and 21 Playwright tests.
- Separate `npm run typecheck`, `npm run lint`, and exact `npm run build`: PASS; `dist/` was produced.
- `PLAYWRIGHT_BASE_URL=https://pixel-brief-builder.sociobot.in npm test`: PASS — the same 8 unit and 21 browser tests passed against the deployed URL.
- Representative live use passed: 20-item seeded packet; rebuild to 22 items; progress changes; Reset demo restores five marks; Markdown export; copied filenames; print route; and a corrupt real-storage value produces the clear recovery alert then rebuilds to 18 assets.
- Keyboard-only use passed: Tab reaches and visibly focuses the skip link (4 px `#b8d979` outline plus charcoal halo); Enter opens the demo; **Focus next asset** moves focus to the next checkbox. No trap found.
- Reduced motion passed: computed `scroll-behavior` is `auto` and completion sweep duration is `0.00001s`.
- At 390 px, `/demo` had zero horizontal overflow. The supplied mobile layout was visually inspected.
- The PWA update test passed locally. A live demo visit also passed an offline reload in the deployed Playwright suite.

## Privacy, headers, caching, budget, and deployment parity — PASS

Fresh live Playwright request logs for the landing page and full demo flow contained only same-origin document, JS, CSS, and image requests. There are no analytics, API, payment, AI, or third-party font/script requests. The separate storage keys are `pixel-brief-builder:real:v1` and `demo:pixel-brief-builder:v1`.

Live responses include a self-only CSP, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, restrictive Permissions-Policy, and HSTS. `/sw.js` is `no-cache, no-store, must-revalidate`; hashed JS/CSS are `public, max-age=31536000, immutable`; `/missing-tile` returns the designed page with HTTP 404. `/`, `/demo`, `/privacy`, `/terms`, and `/print?demo=1` return 200. The sole external footer link, `https://sociobot.in/`, returned 200.

Local build and deployment SHA-256 values match byte-for-byte for the landing and route HTML documents, service worker, JS, CSS, and desktop/mobile hero assets. Thus the live deployment is this candidate, not a deployment-only failure.

| Asset/budget | Observed |
| --- | ---: |
| JS | 26,378 B raw; 9,345 B gzip |
| CSS | 20,708 B raw; 5,226 B gzip |
| Desktop hero | 166,302 B |
| Mobile hero | 59,642 B |
| Font transfer | 0 B (system font stack) |
| Fresh live Lighthouse performance / accessibility / best practices / SEO | 100 / 100 / 100 / 100 |
| Lighthouse LCP / CLS / TBT / transfer | 1,292 ms / 0 / 63 ms / 76,422 B |

These values are within the stated static-web budgets. `verify-url.sh` was not present in the checkout, so its requested baseline was covered with independent Playwright checks for title, lang, main landmark, alt text, console/page errors, requests, headers, and axe.

## Release-blocking defect

### High — serious WCAG contrast failure after Reset demo

**Reproduction (fresh live browser, reproducible at 1440 px and 390 px):**

1. Open `https://pixel-brief-builder.sociobot.in/demo`.
2. Change Character count to 3 and accept the rebuild confirmation.
3. Activate **Reset demo**. The pointer remains over the button, which enters its hover state.
4. Run axe after the reset.

`@axe-core/playwright` reports `color-contrast` with **serious** impact for `button[data-action="reset-demo"]` on both viewports. Its hover foreground is `#a64227` (clay) over the demo-banner background `#b8d979` (moss bright), a **3.85:1** ratio where WCAG AA requires **4.5:1** for its 16 px bold text. The relevant stylesheet rules are `.text-button:hover { color: var(--clay); }` and `.demo-banner { background: var(--moss-bright); }`.

This violates the supplied accessibility contract and the repository definition of done (“contrast ≥ 4.5:1”; fix all serious/critical axe issues). It is therefore release-blocking even though the initial static demo scan and Lighthouse score do not encounter the post-interaction hover state.

## Defects by severity

- **High:** Reset demo hover contrast is 3.85:1, serious axe violation, desktop and mobile. Release blocker.
- **Medium / Low:** None found.

## Scope notes

Rate-limit testing and Entra tenant validation are not applicable: this static product exposes no server-side endpoint or sign-in. The deterministic, local-first builder fulfils the researched job without an AI call; adding one would not improve the stated product and would weaken the privacy posture.
