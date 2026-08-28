# Independent product verification — FAIL

Verified on 2026-08-28 UTC for work order `pixel-brief-builder-verify-1`.

- Candidate: `e278e771cdb6a8290781de892a48063b8585dc78`
- Branch state at start: `HEAD`, `origin/main`, and the requested candidate were identical.
- Live URL: `https://pixel-brief-builder.sociobot.in`
- Artifact: static web app with a service worker; no backend or sign-in.
- Decision: **FAIL — do not release this candidate.**

The live deployment is present and byte-for-byte matches the candidate production build. The result is not a deployment-only failure. Three release blockers remain in the shipped artifact: the promised 16×16 tile template is actually 8×8, the update/cache policy can keep users on old application code after a new service worker activates, and mobile touch targets miss the required baseline.

No product code was changed during verification. Only this report and the handoff were changed.

## Release-blocking findings

### P1 — the promised 16×16 tile template is an 8×8 graphic, and its claim test does not test the tile guide

The researched brief makes the tile template part of the smallest useful product. The UI and accessible name both call the output a 16×16 tile template. Fresh live-browser evidence showed:

- `.tile-guide > i`: **64** cells, not 256.
- Computed grid: **8 columns** of 19 px each.
- Heading: `16×16 tile template`.
- Accessible name: `A sixteen by sixteen example tile grid using the Moss and stone palette`.

The implementation confirms the mismatch: `src/main.ts:263` generates 64 cells and `src/style.css:323` declares `repeat(8, 1fr)`.

The declared `print-packet` claim includes a printable tile guide, but `tests/e2e/claims.spec.ts:56-63` asserts only 20 checklist rows and six storyboard panels. It never asserts that a tile guide exists, is 16×16, or appears in print media. Therefore the passing claim test does not prove the whole claim, contrary to the claims acceptance contract.

Required repair: render a genuinely usable 16×16 template (256 cells in 16 columns) in both screen and print output, then make `@claim:print-packet` assert its dimensions and print visibility.

### P1 — fixed application URLs are cached immutable for one year, so updates can serve stale code

`vite.config.ts:9-10` forces the entry and stylesheet to fixed names (`/assets/app.js` and `/assets/app.css`). `public/staticwebapp.config.json:12-24` gives `/assets/*`, all `/*.js`, and all `/*.css` `Cache-Control: public, max-age=31536000, immutable`. This also applies to the unversioned `/sw.js`. `public/sw.js:1-17` precaches those fixed URLs, and `public/sw.js:28-43` serves them cache-first.

Fresh live headers confirmed the policy:

- `/assets/app.js`: `max-age=31536000, immutable`
- `/assets/app.css`: `max-age=31536000, immutable`
- `/sw.js`: `max-age=31536000, immutable`

A controlled two-version Chromium check reproduced the impact using these same URL and cache semantics:

1. v1 loaded with request counts `app=1`, `sw=1`.
2. The server switched to v2; an ordinary reload still ran app v1 and made no new app or worker request.
3. An explicit `registration.update()` advanced the worker to v2 (`sw=2`) but app code remained v1 (`app=1`).
4. With the candidate's versioned-cache/cache-first pattern, the new v2 cache was active after reload but still contained app v1.

This can strand returning users on old code and makes a repaired deployment unreliable. The previous handoff's suggestion to increment only the service-worker cache key is insufficient because the fixed immutable app URL can still supply its old response.

Required repair: emit content-hashed JS/CSS names, reference those hashes from HTML/service-worker precache, do not mark `/sw.js` immutable, and add a two-version browser test that proves an existing client receives the new app shell.

### P1 — touch targets do not meet the supplied 44×44 px accessibility baseline

At 390×844 CSS pixels, the keyboard-focus geometry included:

- `Start for real`: 123.1×40 px.
- Wordmark/home link: 117.2×16.8 px.
- Header `Build`: 32×44 px; `Demo`: 35.6×44 px.
- Footer `Privacy` and `Terms`: 52.5×24 px and 43.6×24 px.
- Footer external link: 92.3×16 px.

Associated labels give palette radios and checklist boxes large effective targets, so those were not counted as failures. The targets above have no equivalent enclosing label. `src/style.css:180` explicitly lowers the demo action to a 38 px minimum. This fails the attached non-negotiable ≥44 px target requirement.

Required repair: give every standalone link/button at least a 44×44 px hit area while preserving the current spacing, then add mobile geometry assertions.

## Other defects

### P2 — hero image sizing breaks the intended 3:2 composition on mobile

At 390 px, the selected mobile image rendered at **338×800 CSS px**, while its natural size is 1200×800. The `width` and `height` attributes remain definite while CSS sets only `width: 100%`; the declared `aspect-ratio: 3 / 2` does not override the fixed height. This creates an excessively tall crop and makes the first hero section about 1,650 px tall.

The “mobile” and desktop WebP files are also byte-identical (same SHA-256 and 166,302-byte size), so the responsive source does not reduce transfer or provide a mobile crop. Lighthouse reported 13 KiB responsive-image savings and 116 KiB image-delivery savings.

### P2 — unknown paths are soft 404s

`/missing-tile` displays the designed missing-page UI but responds `HTTP 200`, not `404`. This weakens crawler and monitoring semantics for the required real 404 behavior.

### P3 — two generated concepts contain the wrong article

The live sample says `in an mossy courtyard`; platformer output says `in an ruined greenhouse`. `src/generator.ts:103` hard-codes `an` before every location. This is visible in the main generated brief and Markdown export.

## Mandatory first-read and demo gate

**PASS.** I opened the deployed home page in a fresh 1440×900 browser before inspecting repository copy.

- What it does: plans a small game art list before drawing.
- For whom: an adult and child making a weekend game.
- First click: `Try it with sample data`.
- The adjacent text says the click opens a finished 20-item packet.
- All three short facts (free, browser-only storage, offline after first visit) are present in the first viewport on 390×844 as well.

One click opened `/demo` and immediately showed the realistic **Moss Beacon Night** packet with 20 assets and five finished items. The persistent banner said `Demo — sample data, nothing is saved to your real packet` and provided `Reset demo` and `Start for real`.

## Claim gate

`.factory/claims.json` exists and declares eight claims. Before dependency installation, every literal command stopped at `tsc: not found` (exit 127); no claim assertion ran. After the required clean `npm ci`, every exact declared command passed from its declared sandbox entry point:

| Claim | Exact declared command | Result |
| --- | --- | --- |
| `finite-packet` | `npm test -- --grep @claim:finite-packet` | PASS: seeded 20, rebuilt 22 |
| `browser-local-only` | `npm test -- --grep @claim:browser-local-only` | PASS: demo key only; same-origin requests |
| `offline-reload` | `npm test -- --grep @claim:offline-reload` | PASS: controlled offline reload |
| `markdown-export` | `npm test -- --grep @claim:markdown-export` | PASS: 20 rows and six scenes |
| `print-packet` | `npm test -- --grep @claim:print-packet` | **Command passes, but claim coverage is invalid:** tile guide is not asserted and shipped dimensions are wrong |
| `filename-copy` | `npm test -- --grep @claim:filename-copy` | PASS: 20 copied filenames |
| `free-use` | `npm test -- --grep @claim:free-use` | PASS: real 18-item packet without login/payment |
| `original-prompts` | `npm test -- --grep @claim:original-prompts` | PASS for the asserted concept and character prompt |

The pre-install exit 127 is recorded for completeness as environment preparation, not as a product assertion failure. The post-install results above are the assessed claim runs.

## Build and repository gates

- `npm ci`: PASS; 54 packages installed; 0 vulnerabilities.
- `npm audit --audit-level=low`: PASS; 0 vulnerabilities.
- `npm test`: PASS; production build, 3 Vitest tests, and 11 Playwright tests passed.
- `npm run build`: PASS; TypeScript `--noEmit` and Vite production build produced `dist/`.
- Lint: no lint script or standalone lint configuration exists.
- Production output: app JS 25,549 bytes raw / 9,151 bytes gzip; CSS 20,457 bytes raw / 5,180 bytes gzip; fonts 0 bytes; hero 166,302 bytes.
- An independent generator sweep covered all 144 genre/palette/character/mechanic combinations: zero count, filename, storyboard, or original-concept failures.

## End-to-end behavior

The following fresh local-production browser paths passed:

- Empty state to a real 18-item packet.
- Demo seed: 20 items, five finished, demo key only.
- Reset demo: returned to five finished items and preserved a seeded real packet unchanged.
- Start for real: deleted the demo key, loaded the existing real packet, and did not copy sample data.
- Rebuild cancellation preserved 18 items and one finished mark; accepting rebuilt the boundary 22-item packet.
- Completing all 22 items produced `Packet complete. Your engine can stay small.`
- Markdown export produced a 3,754-byte file with 22 checklist rows and six storyboard lines.
- Printable route contained 20 checklist items and six storyboard panels; navigation/actions were hidden under print media.
- Invalid JSON in real storage produced the stated alert and recovered after rebuilding.
- Blocked storage produced the stated save error while leaving the current tab usable.
- Denied clipboard write produced `Filenames could not be copied. Export the brief instead.`
- Direct empty `/print` gave a clear explanation and `Build an art packet` recovery link.
- Native form controls handled constrained input; there are no free-text fields or server-side inputs.

## Accessibility, responsive behavior, and motion

- Independent axe runs on `/`, `/demo`, `/privacy`, `/terms`, and `/missing-tile`: zero serious/critical findings and zero violations overall, both desktop and 390 px live contexts.
- `/opt/fleet/lib/verify-url.sh` against local and live `/demo`: PASS; correct title/lang, one H1, main landmark, no missing alt text, no unlabeled buttons, no console errors.
- Keyboard sequence reached demo controls, skip link, navigation, native form controls, next-asset action, and checkboxes. Focus used a visible 4 px lichen outline plus 2 px charcoal halo.
- No keyboard trap was found. Enter activated links/buttons; native selects/radios retained keyboard behavior.
- Reduced motion: root scroll behavior became `auto`, completion transition computed to 0.01 ms, and decorative transforms became `none`.
- A 200% root text-size check had zero horizontal overflow at 390 px and no materially clipped content.
- No horizontal overflow was found on any audited route at 1440 or 390 px.
- Touch sizing fails as detailed in P1 above.

## Privacy, network, security, and platform scope

- All observed local and live requests stayed on the product origin. No analytics, CDN font, third-party script, AI gateway, payment, or API request occurred.
- Demo and real state remained in separate `localStorage` keys. Reset/exit isolation passed.
- Live responses set CSP, HSTS, Referrer-Policy, X-Content-Type-Options, and Permissions-Policy. No CSP or console error appeared.
- Privacy and terms routes loaded at real URLs. All discovered HTTP links, including the Param Factory external link, resolved with 200 after redirects; mail links were not network-fetched.
- The product has no server-side endpoint, unlock call, backend, library/CLI surface, or sign-in. Rate-limit, backend concurrency/persistence, package-consumer, and Entra authority checks are not applicable.
- An AI feature is not missed leverage here: the finite deterministic builder, export, and local-first constraints cover the brief without sending child/game data to a model.

## Offline and service worker

- Fresh live visit registered `/sw.js`, activated `pixel-brief-builder-v2`, and cached the documented shell routes/assets.
- With the browser context switched fully offline, `/demo` reloaded with the correct heading, 20 items, five finished marks, and the offline banner; no console error occurred.
- Service-worker update safety fails as detailed in P1 above.

## Live deployment parity and response policy

Fresh production build files matched the live deployment byte-for-byte. Representative SHA-256 evidence:

| File | Local build and live SHA-256 |
| --- | --- |
| `index.html` | `e50f24189ee999107eb26383bd4eca316d0a1cc71b83f9ca29da3c8deceb5ec5` |
| `assets/app.js` | `fe3c9593035863cd86fe40022e0bf19a30eeb0edf7bc22fe51eb53d5ad830f20` |
| `assets/app.css` | `2bc5367deb295f3d3dcd692580e4288d49e2c079c70400f0723b590209f78008` |
| `sw.js` | `12aa904bc836c42413f347c55c7b2592fe38f61534f6d88992dd7c2472a3c1b8` |
| hero WebP | `0712cea278d06433ba3461341ff1585b2f84b1313c6189fa21947e2491631e64` |

The same match was confirmed for the mobile hero, robots, sitemap, favicon, and Apple touch icon. HTML routes return 200 with 30-second revalidation. Security headers are present. The immutable fixed-name asset policy and soft 404 are findings above.

## Fresh Lighthouse 12.8.2 mobile run

Run against the live home page on 2026-08-28 UTC:

| Category or metric | Result |
| --- | ---: |
| Performance | 98 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| First Contentful Paint | 1.0 s |
| Largest Contentful Paint | 1.9 s |
| Total Blocking Time | 140 ms |
| Cumulative Layout Shift | 0 |
| Total transfer | 179 KiB |

The static-product performance budgets pass. This does not offset the functional, claim-fidelity, update, and touch-target blockers.

## Retest requirements

1. Deliver and claim-test a real 16×16 printable tile template.
2. Ship hashed application assets and prove a two-version service-worker update in Chromium.
3. Make every standalone interactive target at least 44×44 px on 390 px mobile.
4. Correct hero sizing/mobile asset behavior, return a real 404 status where the host permits it, and fix the `a/an` copy.
5. Rerun every declared claim command, the full suite/build, live parity, offline reload/update, mobile/keyboard/axe, response headers, and Lighthouse before reconsidering release.
