# Adversarial first-read review 3 — Pixel Brief Builder

Reviewed 2026-08-29 UTC against `https://pixel-brief-builder.sociobot.in` and repository commit `676f3f6106aa4ec66de1111f91b5c49c6036669a`.

## Verdict: FAIL

The cold first read, isolated demo, declared-claim commands, offline exercise, accessibility scans, and most structure checks pass. One prior P1 metadata finding is only fixed after client JavaScript runs, so the direct route responses remain wrong. Six additional copy findings remain. A PASS requires zero findings.

## Cold first read — pass

Fresh Chromium contexts were opened before scrolling.

| Viewport | What it does, in my words | For whom | What to click first |
| --- | --- | --- | --- |
| 390×844 | It makes a small drawing plan for a tiny game before anyone draws assets. | An adult and child making a game over one weekend. | **Try it with sample data**. |
| 1440×900 | It makes a small drawing plan for a tiny game before anyone draws assets. | An adult and child making a game over one weekend. | **Try it with sample data**. |

The phone first screen visibly contains “Plan your tiny game art first,” “For an adult and child making a weekend game who need a small, shared drawing list.”, the primary action, and “Opens a finished 20-item packet.” It clears the first-read gate.

## Copy audit

Counts treat a hyphenated expression, number, URL, and code token as one word. Code-fence commands are not prose sentences. `F-3-2` through `F-3-7` below are the flagged rows; all other rows are within the 22-word cap, use plain language, and have an appropriate action or heading role.

### Landing page

| Copy | Words | Result |
| --- | ---: | --- |
| Pixel Brief Builder | 3 | Pass — wordmark |
| Build | 1 | Pass — navigation |
| Demo | 1 | Pass — navigation |
| Privacy | 1 | Pass — navigation |
| A weekend-sized art plan | 4 | Flag — `F-3-2` |
| Plan your tiny game art first | 6 | Pass — job-led H1 |
| For an adult and child making a weekend game who need a small, shared drawing list. | 16 | Pass |
| Try it with sample data | 5 | Pass — result-naming action |
| Opens a finished 20-item packet. | 5 | Pass |
| Free to use. | 3 | Pass — `free-use` |
| Saves only in this browser. | 5 | Pass — `browser-local-only` |
| Works offline after the first visit. | 6 | Pass — `offline-reload` |
| Start with the pieces your weekend can hold. | 8 | Flag — `F-3-3` |
| Your four limits | 3 | Pass — form context |
| Build the art packet | 4 | Pass — H2 |
| Build my art packet | 4 | Pass — result-naming action |
| Rebuilding asks before it replaces a packet with finished marks. | 10 | Pass — `rebuild-confirmation` |
| Your finite art list appears here | 6 | Pass — empty-state heading |
| Choose the four limits. | 4 | Pass |
| Then build an 18, 20, or 22-item packet. | 8 | Pass — `finite-packet` |
| Three short moves | 3 | Flag — `F-3-4` |
| How the art packet works | 5 | Pass — H2 |
| Pick four limits | 3 | Pass — H3 |
| Choose the game shape, colours, cast, and main action. | 9 | Flag — `F-3-6` |
| Share one list | 3 | Pass — H3 |
| Draw from named files, sizes, prompts, and a four-colour tile guide. | 11 | Flag — `F-3-7` |
| Finish the packet | 3 | Pass — H3 |
| Tick each asset, print six scenes, or export the whole brief. | 11 | Pass — supported actions |
| A finite handoff | 3 | Flag — `F-3-5` |
| Take the packet to your drawing tool | 7 | Pass — H2 |
| The packet gives your team a finite original plan. | 9 | Pass — `finite-packet`, `original-prompts` |
| Each prompt names what to draw. | 6 | Pass — `original-prompts` |
| Your packet stays in this browser. | 6 | Pass — `browser-local-only` |
| No account, child profile, analytics, or outside script is used. | 10 | Pass — `free-use` and same-origin part of `browser-local-only` |
| Plan a tiny game art list before you draw. | 9 | Pass — footer one-liner |
| Terms | 1 | Pass — navigation |
| Built by Param Factory | 4 | Pass — attribution |
| Original generated art. | 3 | Pass — provenance |

### README

| Copy | Words | Result |
| --- | ---: | --- |
| Pixel Brief Builder | 3 | Pass — H1 |
| Plan a tiny game art list before you start drawing. | 10 | Pass |
| Pixel Brief Builder is for an adult and child making a game over one weekend. | 15 | Pass |
| Four choices create an 18, 20, or 22-item art packet with original prompts, safe filenames, a tile guide, and a six-panel storyboard. | 22 | Flag — `F-3-7` terminology |
| Try the sample with five assets already finished. | 7 | Pass |
| Demo progress uses separate browser storage and never changes a real packet. | 10 | Pass — `browser-local-only` |
| What it includes | 3 | Pass — H2 |
| A finite checklist grouped into characters, world tiles, the main mechanic, and screen effects. | 14 | Pass — `finite-packet` |
| A four-colour tile template and six printable story panels. | 9 | Flag — `F-3-7` terminology |
| Markdown export and filename copying. | 5 | Pass — declared actions |
| Browser-only progress with a separate demo namespace. | 6 | Pass — `browser-local-only` |
| Offline reload after the first visit. | 6 | Pass — `offline-reload` |
| Original-work reminders in every generated concept. | 6 | Pass — `original-prompts` |
| The tool is free and has no account or payment step. | 11 | Pass — `free-use` |
| Use the finished packet as your drawing list. | 9 | Pass — instruction |
| Run locally | 2 | Pass — H2 |
| Requirements: Node.js 22.12 or newer and npm. | 7 | Pass — local setup |
| Open `http://localhost:5173`. | 2 | Pass |
| The direct demo URL is `http://localhost:5173/demo`. | 7 | Pass |
| Test and build | 3 | Pass — H2 |
| `npm test` type-checks, builds, lints, and runs the unit and Playwright checks. | 11 | Pass |
| The production command is `npm run build`. | 7 | Pass |
| It writes deployable files to `dist/`, with `dist/index.html` at the root. | 10 | Pass |
| Deploy | 1 | Pass — H2 |
| Deploy `dist/` as an Azure Static Web App. | 8 | Pass |
| `public/staticwebapp.config.json` supplies SPA routing, cache rules, and security headers. | 8 | Pass |
| No DNS, billing, environment variable, or server is required. | 9 | Pass — deployment scope |
| Privacy and content | 3 | Pass — H2 |
| Real progress uses `pixel-brief-builder:real:v1` in local storage. | 7 | Pass |
| Demo progress uses `demo:pixel-brief-builder:v1`. | 5 | Pass |
| The app sends no packet data or usage event to another origin. | 12 | Pass — `browser-local-only` request log |
| Prompts tell users to make original shapes and avoid known character details. | 11 | Pass — `original-prompts` |
| The hero image was generated for this project. | 9 | Pass — provenance |
| Its prompt and provenance are in `.factory/design.md`. | 8 | Pass — repository reference |
| See `.factory/claims.json` for tested product claims and `.factory/demo.md` for sandbox details. | 10 | Pass |
| License | 1 | Pass — H2 |
| MIT. | 1 | Pass |
| See [LICENSE](LICENSE). | 2 | Pass |

## Demo and sandbox — pass

- One cold phone click on **Try it with sample data** opened `/?demo=1` and immediately showed the real sample in use: **Moss Beacon Night**, 20 assets, six scenes, and five finished marks.
- The persistent banner read “Demo — sample data, nothing is saved to your real packet.” It exposed **Reset demo** and **Start for real**.
- After a real 18-item packet was created, checking a sixth demo item left the exact real storage value unchanged. Reset returned the demo to five checks. Start for real removed `demo:pixel-brief-builder:v1`, returned to the real 18-item packet, and preserved that real value byte-for-byte.
- The entire exercise requested only `https://pixel-brief-builder.sociobot.in`. After service-worker control, a fresh `/demo` context reloaded offline with the sample heading, 20 items, and the offline status.

## Claim gate — pass

I created clean clone `/tmp/pixel-brief-builder-review-3-fk9XP3` at the reviewed commit and ran `npm ci` (0 vulnerabilities). Every literal claim command in `.factory/claims.json` passed from that clone. `npm test` then passed build, lint, 6 unit tests, and 20 Playwright tests; a final `npm run build` produced `dist/` with 9.38 KB gzip JavaScript.

| Claim ID | Result |
| --- | --- |
| `finite-packet` | PASS — demo 20; three-character rebuild 22 |
| `browser-local-only` | PASS — isolated keys, reset/exit behavior, same-origin request log |
| `rebuild-confirmation` | PASS — cancel preserves; accept replaces |
| `offline-reload` | PASS — controlled demo reloads offline |
| `markdown-export` | PASS — 20 checklist rows and six story rows |
| `print-packet` | PASS — 20 rows, 256 cells in 16 columns, six panels under print media |
| `filename-copy` | PASS — 20 safe filenames |
| `free-use` | PASS — real packet without login or payment |
| `original-prompts` | PASS — all 20 prompts and original-work constraints |

## Earlier findings — rechecked

| Earlier finding | Current confirmation |
| --- | --- |
| F-1-1 / V-1 P1 — seeded print outline and 16×16 grid | Fixed. Live seeded print is H1 → H2 → H3, has 256 tile cells in 16 columns, and has no axe violations. |
| F-1-2 — route social metadata used home text | **Not fixed; reopened as F-3-1.** Browser-side mutation does not repair the direct HTML response used by crawlers. |
| F-1-3 / V-1 P3 — wrong `a`/`an` article | Fixed. The generator’s `articleFor()` is used for both the concept and ground prompt; all settings are unit-tested. |
| F-1-4 — unregistered rebuild/scope/one-click claims | Fixed. `rebuild-confirmation` is declared and passes; unsupported wording is absent. |
| V-1 P1 — fixed immutable asset names | Fixed. The production app files are hashed, `sw.js` is no-cache, and the two-version worker test passes. |
| V-1 P1 — controls below 44 px | Fixed. The 390 px control test passes across the listed routes. |
| V-1 P2 — tall/full-size mobile hero | Fixed. The 390 px live source is `hero-workbench-mobile.webp`; the tested rendered ratio is 3:2. |
| V-1 P2 — soft 404 | Fixed. `/missing-tile` returns HTTP 404 and has a recovery action. |

## Structure, routes, accessibility, and identity

Passes: live `/`, `/demo`, `/privacy`, `/terms`, `/print?demo=1`, assets, sitemap, and robots returned 200; `/missing-tile` returned 404. All product links and the Param Factory external link resolved. Browser-rendered routes have one H1, expected browser titles, descriptions, canonical/OG/Twitter values, focus transfer, and polite route announcements. Live mobile axe scans of `/`, `/demo`, `/privacy`, `/terms`, `/print?demo=1`, and `/missing-tile` found no violations. The concrete/moss workbench uses original art and a distinct non-generic layout consistent with `.factory/design.md`.

The direct-response metadata failure is the exception: `curl` received the same home title and `og:title` for all routes, including `/demo`, `/privacy`, `/terms`, `/print?demo=1`, and `/missing-tile`.

## Missed leverage — no finding

The brief’s implied high-value outputs are already present: a deterministic plan, printable checklist/template/storyboard, Markdown export, filename copy, local persistence, and a sandboxed sample. An AI feature would add key/privacy setup without resolving a missing job; no decorative AI feature or provider key is present.

## Findings

### F-3-1 (reopens F-1-2) — P1 BLOCKING — direct routes send home metadata

**Location/quote:** Direct `GET` responses for `/demo`, `/privacy`, `/terms`, `/print?demo=1`, and `/missing-tile` all contain `<title>Pixel Brief Builder — plan a tiny game art list</title>` and `og:title` “Pixel Brief Builder — plan a tiny game art list.” The source of truth is `index.html`, whose head has the home metadata; `src/main.ts` changes it only after JavaScript executes.

**Why this fails:** a social crawler, unfurl service, or no-JavaScript fetch of Demo, Privacy, Terms, Print, or 404 describes it as the home page. The earlier browser-DOM test passes only because it runs JavaScript, so it does not prove the published response. This is the earlier F-1-2 unresolved in code and live behavior; per review history requirements it is blocking.

**Concrete fix:** build distinct HTML entry documents for `/demo`, `/privacy`, `/terms`, `/print`, and the 404 response (or prerender those routes) with the matching route title, description, canonical, OG, and Twitter values in the initial head. Keep the SPA updates for in-app navigation. Add a regression test that fetches each built route without a browser and asserts those initial tags.

### F-3-2 — P2 — landing eyebrow is a vague slogan

**Location/quote:** Landing hero eyebrow: “A weekend-sized art plan”.

**Why this fails:** it does not name a section or explain a usable product fact beyond the H1. “Weekend-sized” is a vague sizing metaphor, so it adds brand tone before the visitor has a task model.

**Concrete fix:** delete the eyebrow; the H1 and audience sentence already give the necessary first-screen context.

### F-3-3 — P2 — hero caption is a metaphor that adds no instruction

**Location/quote:** Landing hero figcaption: “Start with the pieces your weekend can hold.”

**Why this fails:** a weekend cannot literally hold pieces, and the caption neither explains the image nor tells the visitor how to use the planner. It is a slogan that could describe many unrelated planning products.

**Concrete fix:** replace it with “The planner makes a list of 18, 20, or 22 game art assets.” Add the matching `finite-packet` claim reference/test coverage if that sentence is retained, or remove the caption.

### F-3-4 — P2 — “moves” uses game language for setup steps

**Location/quote:** Landing explanation eyebrow: “Three short moves”.

**Why this fails:** in a game-art planner, “moves” can mean gameplay actions rather than three instructions. It is not the name of the section and carries no additional usable information beyond the adjacent H2.

**Concrete fix:** delete it, or change it to “Three steps” if the count is important.

### F-3-5 — P2 — “handoff” is unexplained process jargon

**Location/quote:** Landing lower-section eyebrow: “A finite handoff”.

**Why this fails:** a first-time adult/child visitor is not told what a “handoff” is or what will be handed off. The adjacent H2 already names the useful outcome.

**Concrete fix:** delete the eyebrow. If a label is needed, use “Use your art packet” and retain the existing H2.

### F-3-6 — P2 — character terminology changes within one instruction

**Location/quote:** The form label says “Character count”; the how-it-works sentence says “Choose the game shape, colours, cast, and main action.”

**Why this fails:** “cast” and “character count” name the same selection differently. A cold visitor must map an entertainment-industry term back to a form field, despite the plain-words requirement to use one term for one concept.

**Concrete fix:** rewrite the sentence as “Choose the game shape, colours, character count, and main action.”

### F-3-7 — P2 — the same output has three competing names

**Location/quote:** Landing says “four-colour tile guide”; README first paragraph says “a tile guide”; README list says “A four-colour tile template”; the product UI heading says “16×16 tile template.” The README also alternates “six-panel storyboard” and “six printable story panels.”

**Why this fails:** the visitor cannot tell whether these are separate deliverables or the same deliverable. The product has one 16×16 template and one six-panel storyboard, but its copy gives each multiple names.

**Concrete fix:** use **16×16 tile template** everywhere for that output and **six-panel storyboard** everywhere for the scene output. For example: “Draw from named files, sizes, prompts, and a four-colour 16×16 tile template.” Update the README list to “A four-colour 16×16 tile template and a printable six-panel storyboard.”

## What would make this perfect

Serve route-specific metadata in the initial direct HTML response, then remove the four non-informational labels and standardize the two output names. Preserve the passing sandbox, claim, offline, accessibility, service-worker, mobile, and seeded-print regression checks while making those changes.
