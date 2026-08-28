# Adversarial first-read review 2 — Pixel Brief Builder

Reviewed 2026-08-28 UTC against `https://pixel-brief-builder.sociobot.in` and repository commit `6496f01841b8df6f2c0f08328e7522ef8497b635`.

## Verdict: PASS

This round found zero blocking or minor findings. The cold first read, one-click sandbox, every declared claim command, privacy/offline exercise, prior-finding retest, routes, metadata, links, accessibility, and mobile layout all passed.

## Cold first read — pass

Fresh Chromium contexts were opened at 390×844 and 1440×900 before scrolling. In both views the answer was clear:

| Viewport | What it does, in my words | Who it is for | First click |
| --- | --- | --- | --- |
| 390×844 | It makes a small, finite drawing plan for a tiny game before any art is made. | An adult and child making a game in one weekend. | **Try it with sample data**. |
| 1440×900 | It makes a small, finite drawing plan for a tiny game before any art is made. | An adult and child making a game in one weekend. | **Try it with sample data**. |

The phone screen visibly contained the job-led H1 “Plan your tiny game art first”, the audience sentence “For an adult and child making a weekend game who need a small, shared drawing list.”, the action, and its immediate outcome “Opens a finished 20-item packet.” The three supporting facts were visible below it. There is no first-read blocker.

## Copy audit — pass

Counts treat a hyphenated expression, number, URL, or code token as one word. The tables include sentences plus visitor-facing headings and actions; selector labels are audited after the landing table. Commands in README code fences are not prose sentences.

### Landing page

| Copy | Words | Result |
| --- | ---: | --- |
| Pixel Brief Builder | 3 | Pass — wordmark |
| Build | 1 | Pass — navigation |
| Demo | 1 | Pass — navigation |
| Privacy | 1 | Pass — navigation |
| A weekend-sized art plan | 4 | Pass — contextual eyebrow |
| Plan your tiny game art first | 6 | Pass — job-led H1 |
| For an adult and child making a weekend game who need a small, shared drawing list. | 16 | Pass |
| Try it with sample data | 5 | Pass — result-naming action |
| Opens a finished 20-item packet. | 5 | Pass |
| Free to use. | 3 | Pass — `free-use` |
| Saves only in this browser. | 5 | Pass — `browser-local-only` |
| Works offline after the first visit. | 6 | Pass — `offline-reload` |
| Start with the pieces your weekend can hold. | 8 | Pass — caption |
| Your four limits | 3 | Pass — context |
| Build the art packet | 4 | Pass — H2 |
| Build my art packet | 4 | Pass — result-naming action |
| Rebuilding asks before it replaces a packet with finished marks. | 10 | Pass — `rebuild-confirmation` |
| Your finite art list appears here | 6 | Pass — empty state |
| Choose the four limits. | 4 | Pass |
| Then build an 18, 20, or 22-item packet. | 8 | Pass — `finite-packet` |
| Three short moves | 3 | Pass — context |
| How the art packet works | 5 | Pass — H2 |
| Pick four limits | 3 | Pass — H3 |
| Choose the game shape, colours, cast, and main action. | 9 | Pass |
| Share one list | 3 | Pass — H3 |
| Draw from named files, sizes, prompts, and a four-colour tile guide. | 11 | Pass — covered by packet/export/print claims |
| Finish the packet | 3 | Pass — H3 |
| Tick each asset, print six scenes, or export the whole brief. | 11 | Pass — `print-packet` and `markdown-export` |
| A finite handoff | 3 | Pass — context |
| Take the packet to your drawing tool | 7 | Pass — H2 |
| The packet gives your team a finite original plan. | 9 | Pass — `finite-packet` and `original-prompts` |
| Each prompt names what to draw. | 6 | Pass — `original-prompts` |
| Your packet stays in this browser. | 6 | Pass — `browser-local-only` |
| No account, child profile, analytics, or outside script is used. | 10 | Pass — account/network behaviour covered by `free-use` and `browser-local-only` |
| Plan a tiny game art list before you draw. | 9 | Pass — footer one-liner |
| Terms | 1 | Pass — navigation |
| Built by Param Factory | 4 | Pass — attribution |
| Original generated art. | 3 | Pass — provenance label |

The selector labels **Game shape**, **Four-colour palette**, **Character count**, and **One main action** are concrete and use the same terms as the explanation. Options use those same concepts. The terms *packet*, *asset*, *brief*, *tile guide*, *storyboard*, *limits*, and *demo* remain consistent with `.factory/copy-audit.md`.

### README

| Copy | Words | Result |
| --- | ---: | --- |
| Pixel Brief Builder | 3 | Pass — H1 |
| Plan a tiny game art list before you start drawing. | 10 | Pass |
| Pixel Brief Builder is for an adult and child making a game over one weekend. | 15 | Pass |
| Four choices create an 18, 20, or 22-item art packet with original prompts, safe filenames, a tile guide, and a six-panel storyboard. | 22 | Pass — clear, at cap |
| Try the sample with five assets already finished. | 7 | Pass |
| Demo progress uses separate browser storage and never changes a real packet. | 10 | Pass — `browser-local-only` |
| What it includes | 3 | Pass — H2 |
| A finite checklist grouped into characters, world tiles, the main mechanic, and screen effects. | 14 | Pass — `finite-packet` |
| A four-colour tile template and six printable story panels. | 9 | Pass — `print-packet` |
| Markdown export and filename copying. | 5 | Pass — `markdown-export` and `filename-copy` |
| Browser-only progress with a separate demo namespace. | 6 | Pass — `browser-local-only` |
| Offline reload after the first visit. | 6 | Pass — `offline-reload` |
| Original-work reminders in every generated concept. | 6 | Pass — `original-prompts` |
| The tool is free and has no account or payment step. | 11 | Pass — `free-use` |
| Use the finished packet as your drawing list. | 9 | Pass — instruction |
| Run locally | 2 | Pass — H2 |
| Requirements: Node.js 22.12 or newer and npm. | 7 | Pass |
| Open `http://localhost:5173`. | 2 | Pass |
| The direct demo URL is `http://localhost:5173/demo`. | 7 | Pass |
| Test and build | 3 | Pass — H2 |
| `npm test` type-checks, builds, lints, and runs the unit and Playwright checks. | 11 | Pass |
| The production command is `npm run build`. | 7 | Pass |
| It writes deployable files to `dist/`, with `dist/index.html` at the root. | 10 | Pass |
| Deploy | 1 | Pass — H2 |
| Deploy `dist/` as an Azure Static Web App. | 8 | Pass |
| `public/staticwebapp.config.json` supplies SPA routing, cache rules, and security headers. | 8 | Pass |
| No DNS, billing, environment variable, or server is required. | 9 | Pass |
| Privacy and content | 3 | Pass — H2 |
| Real progress uses `pixel-brief-builder:real:v1` in local storage. | 7 | Pass |
| Demo progress uses `demo:pixel-brief-builder:v1`. | 5 | Pass |
| The app sends no packet data or usage event to another origin. | 12 | Pass — `browser-local-only` network interception |
| Prompts tell users to make original shapes and avoid known character details. | 11 | Pass — `original-prompts` |
| The hero image was generated for this project. | 9 | Pass — provenance |
| Its prompt and provenance are in `.factory/design.md`. | 8 | Pass — repository reference |
| See `.factory/claims.json` for tested product claims and `.factory/demo.md` for sandbox details. | 10 | Pass |
| License | 1 | Pass — H2 |
| MIT. | 1 | Pass |
| See [LICENSE](LICENSE). | 2 | Pass |

No audited sentence exceeds 22 words. No banned marketing adjective, unexplained jargon, inconsistent term, contextless heading, or non-result-naming product button was found. Every user-relevant capability sentence maps to a declared observable claim; provenance and repository-reference lines are not product outcome claims.

## Demo and sandbox — pass

- A cold click from the first screen opened `/?demo=1` in one interaction.
- The first demo view was already in use: **Moss Beacon Night**, a realistic small top-down game with 20 asset rows, six scenes, and five completed marks.
- The persistent banner said “Demo — sample data, nothing is saved to your real packet.” Both **Reset demo** and **Start for real** were available.
- In a fresh phone context, a real 18-item packet was created before entering demo. Checking a sixth demo item did not change the real storage value. **Reset demo** returned the sample to exactly five checked rows. **Start for real** deleted `demo:pixel-brief-builder:v1`, returned to the real builder, and restored the unchanged 18-item packet.
- Request interception over the entire exercise observed only `https://pixel-brief-builder.sociobot.in`. After service-worker control, a fully offline `/demo` reload still rendered the sample heading, 20 assets, and “You are offline. Your saved packet still works here.”

## Claim gate — pass

I created a fresh clean checkout at `/tmp/pixel-brief-builder-review-2-9GsLam`, ran `npm ci` (0 vulnerabilities), then ran every literal `test` value in `.factory/claims.json` separately. All nine passed. A subsequent clean-checkout `npm test` passed: production build, ESLint, six Vitest tests, and 20 Playwright tests.

| Claim ID | Result |
| --- | --- |
| `finite-packet` | PASS — demo starts at 20; a three-character rebuild produces 22. |
| `browser-local-only` | PASS — isolated key, exact real-data preservation, reset/exit discard, same-origin requests. |
| `rebuild-confirmation` | PASS — cancellation preserves five completed rows; acceptance replaces the packet. |
| `offline-reload` | PASS — controlled demo reload works offline after first visit. |
| `markdown-export` | PASS — 20 checklist lines and six storyboard lines. |
| `print-packet` | PASS — 20 rows, visible 256-cell/16-column tile grid, and six panels in print media. |
| `filename-copy` | PASS — 20 safe filenames copied as newline-separated text. |
| `free-use` | PASS — real 18-item packet without login or payment. |
| `original-prompts` | PASS — every asset has a draw prompt and the original-work constraints are present. |

## Earlier findings — all confirmed fixed

I read `.factory/review-1.md`, `.factory/polish-1.md`, `.factory/verification-1.md`, `.factory/verification-2.md`, and the prior handoff. The prior findings were checked again in live behaviour and source/tests.

| Earlier ID | Confirmation |
| --- | --- |
| F-1-1 / V-1 P1 — invalid seeded print outline / 8×8 tile guide | The seeded print packet is H1 → H2 → H3, live axe is clean, and the grid has 256 cells in 16 columns. |
| F-1-2 — route social metadata remained home metadata | Live rendered `/demo`, `/privacy`, `/terms`, `/print?demo=1`, and `/missing-tile` each set matching title, description, canonical, OG, and Twitter title/description. |
| F-1-3 / V-1 P3 — incorrect `a`/`an` article | The live platformer Ground tile says “for **a ruined greenhouse**”; `articleFor()` is used by both concept and ground-tile templates. |
| F-1-4 — unregistered rebuild/scope/one-click claims | `rebuild-confirmation` is declared and passing. The old unsupported negative-scope and “one-click” outcome wording is absent. |
| V-1 P1 — immutable fixed app files could strand clients | Built app CSS/JS are hashed and the passing two-version service-worker test verifies upgrade behaviour. |
| V-1 P1 — controls below 44 px | The passing 390 px target test covers home, demo, legal pages, and print. |
| V-1 P2 — distorted/full-size phone hero | At 390 px the live `picture` selected `hero-workbench-mobile.webp`, with a 3:2 rendered ratio. |
| V-1 P2 — soft 404 | `/missing-tile` returns HTTP 404 and presents the designed concrete/tile recovery page. |

## Structure, routing, links, accessibility, and visual identity — pass

- Live `/`, `/demo`, `/?demo=1`, `/privacy`, `/terms`, `/print`, and `/print?demo=1` returned 200. `/missing-tile` returned 404 as intended. `robots.txt`, `sitemap.xml`, SVG favicon, apple-touch icon, and the 1200×630 social card returned 200.
- Each rendered route has `lang="en"`, exactly one H1, a route-specific title and description, canonical URL, route-specific OG/Twitter title/description, and favicon. The query demo canonicals to `/demo`.
- Header, skip link, and footer are consistent. The footer includes the product line, Privacy, Terms, Param Factory attribution, and version. All product anchors plus the external Param Factory link returned 200; `mailto:` links were correctly not fetched. The skip-link URL on the intentionally 404 page also returns that intentional 404 and is not a dead destination.
- Internal navigation moved focus to the destination H1 and populated the polite route announcement. Browser Back restored the previous page and its H1 focus.
- Axe 4.13 scans at 390 px found zero violations on `/`, `/demo`, `/privacy`, `/terms`, `/print?demo=1`, and `/missing-tile`. The full test suite separately covers keyboard use, 200% text sizing, reduced motion, and target sizing.
- The asymmetric concrete-and-moss workbench, hard outlines, clipped slabs, original tabletop art, and non-card landing sequence match `.factory/design.md`. It is distinct from a generic centred SaaS template while retaining the required site skeleton.

## Missed leverage — no finding

The brief calls for a finite, deterministic weekend game-art planning packet. It already includes the implied printable output, Markdown export, filename copy, and local-first persistence. An AI drafting step would introduce data sharing and setup without solving a missing job in this bounded planner; no decorative AI feature or provider key is present.

## What would make this perfect

No corrective product work remains from this review. Preserve the existing claim, seeded-print accessibility, route-metadata, service-worker-update, and demo-isolation regressions whenever the copy, routing, or asset pipeline changes.
