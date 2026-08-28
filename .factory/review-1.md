# Adversarial first-read review 1 — Pixel Brief Builder

Reviewed 2026-08-28 UTC against `https://pixel-brief-builder.sociobot.in`, commit `94ed5506914ca6dec04ed6736ef3cef855a6c8dc`.

## Verdict: FAIL

The cold first-read, demo, all eight declared claim commands, all discovered links, and the earlier repair findings pass. The findings below remain, so this is not ready for a PASS.

## First read — pass

Fresh browser contexts, before scrolling:

| Viewport | What it does | For whom | First click |
| --- | --- | --- | --- |
| 390×844 | Makes a small game-art plan before drawing. | An adult and child making a weekend game. | **Try it with sample data**. |
| 1440×900 | Makes a small game-art plan before drawing. | An adult and child making a weekend game. | **Try it with sample data**. |

The visible phone text answers all three within one screen: “Plan your tiny game art first”; “For an adult and child making a weekend game who need a small, shared drawing list.”; and “Try it with sample data” / “Opens a finished 20-item packet.” No first-read blocker.

## Copy audit

Counts treat a hyphenated expression, a number, and a URL as one word. The table includes every prose sentence and every user-facing heading/action phrase on the live landing page; selector/radio labels are control labels rather than sentences and are reviewed after it.

### Landing page

| Copy | Words | Result |
| --- | ---: | --- |
| Pixel Brief Builder | 3 | Pass — wordmark |
| Build | 1 | Pass — navigation link |
| Demo | 1 | Pass — navigation link |
| Privacy | 1 | Pass — navigation link |
| A weekend-sized art plan | 4 | Pass — contextual eyebrow |
| Plan your tiny game art first | 6 | Pass — job-led H1 |
| For an adult and child making a weekend game who need a small, shared drawing list. | 16 | Pass |
| Try it with sample data | 5 | Pass — result-naming action |
| Opens a finished 20-item packet. | 5 | Pass |
| Free to use. | 3 | Pass |
| Saves only in this browser. | 5 | Pass |
| Works offline after the first visit. | 6 | Pass |
| Start with the pieces your weekend can hold. | 8 | Pass |
| Your four limits | 3 | Pass — builder eyebrow |
| Build the art packet | 4 | Pass — H2 |
| Build my art packet | 4 | Pass — result-naming action |
| Rebuilding replaces this packet after you confirm. | 7 | See F-1-4 |
| Your finite art list appears here | 6 | Pass — empty-state heading |
| Choose the four limits. | 4 | Pass |
| Then build an 18, 20, or 22-item packet. | 8 | Pass |
| Three short moves | 3 | Pass — contextual eyebrow |
| How the art packet works | 5 | Pass — H2 |
| Pick four limits | 3 | Pass — H3 |
| Choose the game shape, colours, cast, and main action. | 9 | Pass |
| Share one list | 3 | Pass — H3 |
| Draw from named files, sizes, prompts, and a four-colour tile guide. | 11 | Pass |
| Finish the packet | 3 | Pass — H3 |
| Tick each asset, print six scenes, or export the whole brief. | 11 | Pass |
| A smaller promise | 3 | Pass — contextual eyebrow |
| This tool stops before drawing | 5 | Pass — H2 |
| It does not generate sprites, copy known characters, or open a game engine. | 13 | See F-1-4 |
| It gives your team a finite original plan. | 8 | Pass — finite/original outcomes are covered by declared claims |
| Your packet stays in this browser. | 6 | Pass — covered by `browser-local-only` |
| No account, child profile, analytics, or outside script is used. | 10 | Pass — account/network portions covered by `free-use` and `browser-local-only` |
| Plan a tiny game art list before you draw. | 9 | Pass — footer one-liner |
| Terms | 1 | Pass — navigation link |
| Built by Param Factory | 4 | Pass — attribution |
| Original generated art. | 3 | Pass — provenance label |

The four selector labels and all options are concrete and consistent: **Game shape**, **Four-colour palette**, **Character count**, **One main action**. The terms **packet**, **asset**, **brief**, **tile guide**, **storyboard**, **limits**, and **demo** retain the meanings recorded in `.factory/copy-audit.md`. No landing sentence exceeds 22 words or contains a banned marketing word. The required demo labels are present; “Start for real” is the wording required by the supplied demo contract.

### README

| Copy | Words | Result |
| --- | ---: | --- |
| Pixel Brief Builder | 3 | Pass — H1 |
| Plan a tiny game art list before you start drawing. | 10 | Pass |
| Pixel Brief Builder is for an adult and child making a game over one weekend. | 15 | Pass |
| Four choices create an 18, 20, or 22-item art packet with original prompts, safe filenames, a tile guide, and a six-panel storyboard. | 22 | Pass — at cap, but clear |
| Try the sample with five assets already finished. | 7 | Pass |
| Demo progress uses separate browser storage and never changes a real packet. | 10 | Pass — covered by `browser-local-only` |
| What it includes | 3 | Pass — H2 |
| A finite checklist grouped into characters, world tiles, the main mechanic, and screen effects. | 14 | Pass — covered by `finite-packet` |
| A four-colour tile template and six printable story panels. | 9 | Pass — covered by `print-packet` |
| Markdown export and a one-click filename copy action. | 8 | See F-1-4 |
| Browser-only progress with a separate demo namespace. | 6 | Pass — covered by `browser-local-only` |
| Offline reload after the first visit. | 6 | Pass — covered by `offline-reload` |
| Original-work reminders in every generated concept. | 6 | Pass — covered by `original-prompts` |
| The tool is free and has no account or payment step. | 11 | Pass — covered by `free-use` |
| It does not draw sprites or open a game engine. | 10 | See F-1-4 |
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
| The app sends no packet data or usage event to another origin. | 12 | Pass — covered by `browser-local-only` network interception |
| Prompts tell users to make original shapes and avoid known character details. | 11 | Pass — covered by `original-prompts` |
| The hero image was generated for this project. | 9 | Pass — provenance, not a product outcome |
| Its prompt and provenance are in `.factory/design.md`. | 8 | Pass — repository reference |
| See `.factory/claims.json` for tested product claims and `.factory/demo.md` for sandbox details. | 10 | Pass |
| License | 1 | Pass — H2 |
| MIT. | 1 | Pass |
| See [LICENSE](LICENSE). | 2 | Pass |

No README sentence exceeds 22 words or uses a banned marketing adjective. The report does not treat code-block commands as prose sentences.

## Demo and sandbox — pass

- One cold click on **Try it with sample data** reached `/demo`. Its first screen showed the real **Moss Beacon Night** packet: 20 assets, five completed marks, the builder, and packet actions.
- The persistent banner read: “Demo — sample data, nothing is saved to your real packet.” It exposed **Reset demo** and **Start for real**.
- In a fresh mobile context, a pre-existing real 18-item packet was saved first. Entering demo, checking a sixth sample item, and resetting demo left the exact real-storage value unchanged. Reset restored exactly five completed sample items. **Start for real** removed `demo:pixel-brief-builder:v1`, returned to `/`, and restored the real 18-item packet.
- During that whole browser exercise, every request origin was `https://pixel-brief-builder.sociobot.in`. The declared offline claim also passed from a clean clone using `context.setOffline(true)` after service-worker activation.

## Claim gate — pass

`.factory/claims.json` has eight entries. In fresh clone `/tmp/pixel-brief-builder-review-Hly4MS` after `npm ci`, every literal command passed. A first `print-packet` attempt collided with the reviewer’s already-running sequential claim loop and returned `ERR_CONNECTION_REFUSED`; after that unrelated process completed, the same literal command passed. The full single-run suite also passed, so this is not a product claim failure.

| Claim ID | Result |
| --- | --- |
| `finite-packet` | PASS — 20 seeded items, 22 after rebuild |
| `browser-local-only` | PASS — demo storage and same-origin requests |
| `offline-reload` | PASS — service-worker-backed offline demo reload |
| `markdown-export` | PASS — 20 checklist lines and six storyboard lines |
| `print-packet` | PASS — 20 rows, 256-cell/16-column guide, six panels |
| `filename-copy` | PASS — 20 newline-separated safe filenames |
| `free-use` | PASS — real 18-item packet without sign-in/payment |
| `original-prompts` | PASS — generated concept and character constraints |

`npm test` also passed in that clean clone: build, ESLint, six Vitest tests, and 15 Playwright tests.

## Earlier review and handoff findings — confirmed fixed

There are no earlier `.factory/review-*.md` or `.factory/polish-*.md` files. I read `.factory/verification-1.md`, `.factory/verification-2.md`, and `.factory/handoff.md`.

| Earlier finding | Live/code confirmation |
| --- | --- |
| P1: claimed 16×16 guide was only 8×8 | Fixed. The seeded print packet has 256 `<i>` cells in 16 computed columns; the declared print claim verifies it. |
| P1: fixed immutable asset names could strand clients | Fixed. The live app uses hashed `index-*.js`/`index-*.css`; the clean suite’s two-version service-worker test passes. |
| P1: 44px touch targets | Fixed. The clean mobile target test passes on `/`, `/demo`, `/privacy`, `/terms`, and `/print?demo=1`. |
| P2: mobile hero was distorted and not smaller | Fixed. A 390px cold load used `hero-workbench-mobile.webp`; its rendered ratio was 3:2. |
| P2: missing path was a soft 404 | Fixed. `/missing-tile` returned HTTP 404 and showed the designed concrete/tile recovery page. |
| P3: concept used the wrong `a`/`an` article | Fixed for the main concept: a generated platformer says “in a ruined greenhouse.” F-1-3 is a separate remaining asset-prompt template. |

## Structure, routing, accessibility, and visual identity

Passes:

- `/`, `/demo`, `/privacy`, `/terms`, `/print?demo=1` return 200; the designed `/missing-tile` returns 404. All discovered internal links and the external Param Factory link returned 200 after redirects; `mailto:` links were correctly not fetched.
- Every checked route has `lang="en"`, one H1, a route-specific document title, description, canonical URL, favicon, and footer with Privacy/Terms, product one-liner, Param Factory attribution, and version. The route navigation test moved focus and the polite live text to each destination H1; browser Back restored the home H1 and announcement.
- `robots.txt`, `sitemap.xml`, SVG favicon, apple touch icon, and the 1200×630 social card all resolve. The 404 is designed and has a recovery action.
- The concrete/moss workbench, hard edges, offset shadows, generated tabletop art, and non-card layout match `.factory/design.md`; this is not a generic SaaS-template surface.
- Live axe scans were clean at 390px for `/`, `/demo`, `/privacy`, `/terms`, and `/missing-tile`.

The exception is F-1-1. The social metadata exception is F-1-2.

## Findings

### F-1-1 — P1 — seeded printable packet skips a heading level

**Location/quote:** `/demo` then `/print?demo=1`, `#packet-title`: `<h3 id="packet-title">Moss Beacon Night</h3>` immediately follows `<h1>Print your tiny game plan</h1>`; there is no intervening H2.

**Verify:** open `/demo` first to seed its sample, then open `/print?demo=1` and run axe. Axe 4.13 reports `heading-order` (moderate) on `#packet-title`: “Heading levels should only increase by one.” A fresh direct print URL without a packet hides this error, which is why the current generic axe test misses it.

**Why this fails:** a screen-reader heading list jumps from the page topic to a third-level packet title. This violates the supplied heading-outline baseline on a documented product route.

**Concrete fix:** make the packet title an H2 when rendered on the print page (or add an H2 section heading before it while retaining a valid H1 → H2 → H3 outline). Add a Playwright axe test that seeds `/demo`, visits `/print?demo=1`, and asserts no violations.

### F-1-2 — P2 — route Open Graph text remains home-page text

**Location/quote:** live `/demo`, `/privacy`, `/terms`, `/print?demo=1`, and `/missing-tile` all expose `og:title` “Pixel Brief Builder — plan a tiny game art list” and the home OG description, even while their document titles and descriptions are route-specific. For example, `/privacy` has document title “Privacy — Pixel Brief Builder” but unchanged OG title “Pixel Brief Builder — plan a tiny game art list.”

**Why this fails:** sharing or unfurling a legal, demo, print, or missing-page URL describes the home page rather than the visited route. The site has the requested OG metadata but does not keep route metadata coherent.

**Concrete fix:** extend `routeMeta` with OG/Twitter title and description values and update `meta[property="og:title"]`, `meta[property="og:description"]`, `meta[name="twitter:title"]`, and `meta[name="twitter:description"]` during `render()`. Add route assertions for these values alongside the existing title/canonical test.

### F-1-3 — P2 — generated asset prompt still has the wrong article

**Location/quote:** build a real platformer packet, then inspect **Ground tile**. It says: “Draw a repeatable ground tile for **an ruined greenhouse**. Keep every outer edge simple.” Source: `src/generator.ts`, ground-tile template.

**Why this fails:** the core output that a family is supposed to follow contains a visible grammar error. The earlier repair fixed articles in the main concept only, so the same template issue remains in a second user-visible output.

**Concrete fix:** use `articleFor(genre.place)` in the ground-tile prompt. Extend `tests/unit/generator.test.ts` to assert correct articles in both packet concepts and the ground-tile prompt for every setting.

### F-1-4 — P3 — several outcome claims have no matching claims.json entry

**Locations/quotes:**

- Landing builder help: “Rebuilding replaces this packet after you confirm.”
- Landing limits and README: “It does not generate sprites, copy known characters, or open a game engine.” / “It does not draw sprites or open a game engine.”
- README feature list: “Markdown export and a **one-click** filename copy action.”

**Why this fails:** the supplied claims contract requires every visitor-relevant outcome to have a `claims.json` entry and an observable sandbox test. Existing claims prove packet generation, the two export outcomes, and original-work prompt language, but they do not declare or test confirmation-before-rebuild, the stated non-generation/no-engine scope, or the one-click qualifier.

**Concrete fix:** either remove the untestable qualifiers/scope promises or add entries and tagged tests. The rebuild test should cancel and accept the confirmation and assert the old/new packet states. The export/copy claim text should drop “one-click” unless a test counts one activation. Keep the no-sprite/no-engine wording only if a meaningful absence/scope test can be specified; otherwise write the narrower positive capability instead.

## What would make this perfect

Ship the four concrete fixes above, then rerun the complete clean-clone claim gate and an axe scan of seeded `/print?demo=1`. A fresh social-metadata crawl should show route-specific document, canonical, OG, and Twitter metadata together. At that point the strong first read, isolated one-click demo, local-only behavior, accessible mobile layout, and distinct workbench identity would support a PASS.
