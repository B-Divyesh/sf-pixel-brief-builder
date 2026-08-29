# Adversarial first-read review 4 — Pixel Brief Builder

Reviewed 2026-08-29 UTC against `https://pixel-brief-builder.sociobot.in` and clean checkout `88e9115817e98f7e24179a501b7c27faa41ed802`.

## Verdict: PASS

This review found no blocking or minor finding. The cold first read, one-click isolated demo, claim gate, privacy/offline checks, prior-finding retest, routes, metadata, links, accessibility, and product-scope check passed.

## Cold first read — pass

Fresh Chromium contexts loaded the live home page before scrolling at 390×844 and 1440×900. The phone’s visible first screen included the H1, audience sentence, primary action, its immediate result, and all three plain facts.

| Viewport | What it does, in my words | For whom | What to click first |
| --- | --- | --- | --- |
| 390×844 | Makes a finite art checklist and planning sheet before a tiny game is drawn. | An adult and child making a weekend game. | **Try it with sample data**. |
| 1440×900 | Makes a finite art checklist and planning sheet before a tiny game is drawn. | An adult and child making a weekend game. | **Try it with sample data**. |

The exact first-screen text that supports those answers is “Plan your tiny game art first”; “For an adult and child making a weekend game who need a small, shared drawing list.”; and “Try it with sample data” beside “Opens a finished 20-item packet.” No first-read blocker was found.

## Copy audit — pass

Counts treat numbers, hyphenated terms, URLs, and code tokens as one word. Tables include every visitor-facing sentence plus headings and actions, so contextless headings and non-result-naming buttons are checked too. Selector labels are control labels, not sentences; they are concrete and consistent: **Game shape**, **Four-colour palette**, **Character count**, and **One main action**.

### Landing page

| Copy | Words | Result |
| --- | ---: | --- |
| Pixel Brief Builder | 3 | Pass — wordmark |
| Build | 1 | Pass — navigation |
| Demo | 1 | Pass — navigation |
| Privacy | 1 | Pass — navigation |
| Plan your tiny game art first | 6 | Pass — job-led H1 |
| For an adult and child making a weekend game who need a small, shared drawing list. | 16 | Pass |
| Try it with sample data | 5 | Pass — result-naming action |
| Opens a finished 20-item packet. | 5 | Pass |
| Free to use. | 3 | Pass — `free-use` |
| Saves only in this browser. | 5 | Pass — `browser-local-only` |
| Works offline after the first visit. | 6 | Pass — `offline-reload` |
| The planner makes a list of 18, 20, or 22 game art assets. | 13 | Pass — `finite-packet` |
| Your four limits | 3 | Pass — form context |
| Build the art packet | 4 | Pass — section heading |
| Build my art packet | 4 | Pass — result-naming action |
| Rebuilding asks before it replaces a packet with finished marks. | 10 | Pass — `rebuild-confirmation` |
| Your finite art list appears here | 6 | Pass — empty-state heading |
| Choose the four limits. | 4 | Pass |
| Then build an 18, 20, or 22-item packet. | 8 | Pass — `finite-packet` |
| Three steps | 2 | Pass — section count |
| How the art packet works | 5 | Pass — section heading |
| Pick four limits | 3 | Pass — subsection heading |
| Choose the game shape, colours, character count, and main action. | 10 | Pass |
| Share one list | 3 | Pass — subsection heading |
| Draw from named files, sizes, prompts, and a four-colour 16×16 tile template. | 12 | Pass — output names are consistent |
| Finish the packet | 3 | Pass — subsection heading |
| Tick each asset, print the six-panel storyboard, or export the whole brief. | 12 | Pass — named actions |
| Take the packet to your drawing tool | 7 | Pass — section heading |
| The packet gives your team a finite original plan. | 9 | Pass — `finite-packet`, `original-prompts` |
| Each prompt names what to draw. | 6 | Pass — `original-prompts` |
| Your packet stays in this browser. | 6 | Pass — `browser-local-only` |
| No account, child profile, analytics, or outside script is used. | 10 | Pass — `free-use`, `browser-local-only` request test |
| Plan a tiny game art list before you draw. | 9 | Pass — footer one-liner |
| Terms | 1 | Pass — navigation |
| Built by Param Factory | 4 | Pass — attribution |

The meaningful hero-image alt is “An adult and child arrange blank game tiles and storyboard cards on a concrete table.” (15 words); it describes the image’s purpose without carrying required copy. All product buttons name their outcome: **Try it with sample data**, **Build/Rebuild my art packet**, **Reset demo**, **Start for real**, **Export brief**, **Open printable packet**, **Copy filenames**, and **Focus next asset**. No sentence is over 22 words, uses a banned marketing adjective, relies on a metaphor, or needs a rewrite.

### README

| Copy | Words | Result |
| --- | ---: | --- |
| Pixel Brief Builder | 3 | Pass — H1 |
| Plan a tiny game art list before you start drawing. | 10 | Pass |
| Pixel Brief Builder is for an adult and child making a game over one weekend. | 15 | Pass |
| Four choices create an 18, 20, or 22-item art packet with prompts, safe filenames, a 16×16 tile template, and a six-panel storyboard. | 22 | Pass — at the cap, but clear |
| Try the sample with five assets already finished. | 7 | Pass |
| Demo progress uses separate browser storage and never changes a real packet. | 10 | Pass — `browser-local-only` |
| What it includes | 3 | Pass — heading |
| A finite checklist grouped into characters, world tiles, the main mechanic, and screen effects. | 14 | Pass — `finite-packet` |
| A four-colour 16×16 tile template and a printable six-panel storyboard. | 10 | Pass — `print-packet` |
| Markdown export and filename copying. | 5 | Pass — `markdown-export`, `filename-copy` |
| Browser-only progress with a separate demo namespace. | 6 | Pass — `browser-local-only` |
| Offline reload after the first visit. | 6 | Pass — `offline-reload` |
| Original-work reminders in every generated concept. | 6 | Pass — `original-prompts` |
| The tool is free and has no account or payment step. | 11 | Pass — `free-use` |
| Use the finished packet as your drawing list. | 9 | Pass — instruction |
| Run locally | 2 | Pass — heading |
| Requirements: Node.js 22.12 or newer and npm. | 7 | Pass |
| Open `http://localhost:5173`. | 2 | Pass |
| The direct demo URL is `http://localhost:5173/demo`. | 7 | Pass |
| Test and build | 3 | Pass — heading |
| `npm test` type-checks, builds, lints, and runs the unit and Playwright checks. | 11 | Pass |
| The production command is `npm run build`. | 7 | Pass |
| It writes deployable files to `dist/`, with `dist/index.html` at the root. | 10 | Pass |
| Deploy | 1 | Pass — heading |
| Deploy `dist/` as an Azure Static Web App. | 8 | Pass |
| `public/staticwebapp.config.json` supplies route-document rewrites, cache rules, and security headers. | 8 | Pass |
| No DNS, billing, environment variable, or server is required. | 9 | Pass |
| Privacy and content | 3 | Pass — heading |
| Real progress uses `pixel-brief-builder:real:v1` in local storage. | 7 | Pass |
| Demo progress uses `demo:pixel-brief-builder:v1`. | 5 | Pass |
| The app sends no packet data or usage event to another origin. | 12 | Pass — `browser-local-only` request test |
| Prompts tell users to make original shapes and avoid known character details. | 11 | Pass — `original-prompts` |
| The hero image was generated for this project. | 9 | Pass — provenance |
| Its prompt and provenance are in `.factory/design.md`. | 8 | Pass — repository reference |
| See `.factory/claims.json` for tested product claims and `.factory/demo.md` for sandbox details. | 10 | Pass |
| License | 1 | Pass — heading |
| MIT. | 1 | Pass |
| See [LICENSE](LICENSE). | 2 | Pass |

No README sentence exceeds 22 words. Product capabilities map to the nine declared claims; provenance, repository paths, and local instructions are not visitor product-outcome claims. No unlisted claim was found on the landing page or README.

## Demo and sandbox — pass

- One cold mobile click from the first screen opened `/?demo=1`; the documented direct `/demo` route also opened the same seeded sample.
- The first demo screen already showed the real product in use: **Moss Beacon Night**, 20 asset rows, five finished marks, a populated 16×16 tile template, and a six-panel storyboard.
- The persistent banner read “Demo — sample data, nothing is saved to your real packet.” **Reset demo** and **Start for real** were both present.
- In a fresh context, I created a real 18-item packet, entered demo, changed demo progress, reset it, then started for real. The real local-storage value was byte-identical before and after; reset restored exactly five demo marks; exit deleted `demo:pixel-brief-builder:v1` and restored the real packet.
- The observed demo flow made only same-origin requests to `https://pixel-brief-builder.sociobot.in` and no console errors. The claim suite separately proved service-worker-backed offline reload after the first visit.

## Claims and clean-clone gate — pass

I made a clean clone at `/tmp/pixel-brief-builder-review-4-9zcai4`, ran `npm ci` (0 vulnerabilities), and executed every literal test command from `.factory/claims.json` separately. All nine passed. The subsequent full `npm test` and final `npm run build` also passed and produced `dist/`.

| Claim ID | Result |
| --- | --- |
| `finite-packet` | PASS — seeded 20 items; one and three characters produce 18 and 22. |
| `browser-local-only` | PASS — separate demo storage, exact real-data preservation, reset/exit discard, same-origin requests. |
| `rebuild-confirmation` | PASS — cancel preserves marks; accept replaces the packet. |
| `offline-reload` | PASS — controlled demo reloads after going offline. |
| `markdown-export` | PASS — downloaded checklist has 20 asset lines and six storyboard lines. |
| `print-packet` | PASS — seeded print has 20 rows, 256 16-column cells, and six panels. |
| `filename-copy` | PASS — 20 newline-separated lowercase-safe `.png` names. |
| `free-use` | PASS — real packet builds without account, login, or payment. |
| `original-prompts` | PASS — every asset has a drawing prompt and original-work constraints. |

## Earlier findings — all confirmed fixed

I read every prior `.factory/review-*.md`, `.factory/polish-*.md`, verification record, and handoff, then retested each prior finding against the live site and relevant source/tests.

| Earlier finding | Live and code confirmation |
| --- | --- |
| F-1-1 / V-1 P1 — invalid print heading outline and 8×8 guide | Seeded print is H1 → H2 → H3, Axe is clean, and the tile template has 256 cells in 16 columns. |
| F-1-2 / F-3-1 — route metadata was only repaired after JavaScript | Raw direct responses for `/demo`, `/privacy`, `/terms`, `/print?demo=1`, and the 404 now contain their own title, description, canonical, OG, and Twitter values before JavaScript. |
| F-1-3 / V-1 P3 — wrong article in generated ground prompt | Generator uses `articleFor()` for concepts and ground prompts; live platformer output says “a ruined greenhouse.” |
| F-1-4 — unsupported or undeclared capability claims | `rebuild-confirmation` is declared and tested; unsupported negative scope and “one-click” wording remain absent. |
| V-1 P1 — immutable fixed application files | Application CSS/JS are content-hashed and the worker policy/update regression tests pass. |
| V-1 P1 — undersized touch targets | The current 390 px test suite covers the home, demo, legal, and print routes. |
| V-1 P2 — distorted/full-size phone hero | A 390 px cold load selects `hero-workbench-mobile.webp` at the intended 3:2 proportion. |
| V-1 P2 — soft 404 | `/missing-tile` returns HTTP 404 and shows a designed recovery page. |
| F-3-2 through F-3-7 — vague labels and inconsistent terms | The slogan-like eyebrow/caption/handoff language is absent; “Three steps,” “character count,” “16×16 tile template,” and “six-panel storyboard” are consistent in live copy and README. |

## Structure, routing, accessibility, and identity — pass

- `/`, `/demo`, `/privacy`, `/terms`, `/print?demo=1`, `robots.txt`, `sitemap.xml`, favicon, touch icon, and social card returned 200. `/missing-tile` returned the intended HTTP 404.
- Every tested rendered route has `lang="en"`, exactly one H1, a main landmark, route-specific title and description, canonical URL, favicon, and route-specific initial and rendered OG/Twitter values. Direct response titles follow the required product/route pattern.
- The response CSP is self-only and sends `frame-ancestors 'none'` as a header. It also sends referrer, content-type, HSTS, and restrictive permissions headers.
- All discovered internal links and the external Param Factory link resolved; `mailto:` links were explicit mail links. Header, skip link, footer, Privacy, Terms, attribution, and version are consistent.
- A seeded print page produced the valid H1 → H2 → H3 outline, 20 rows, 256 tile cells, six panels, and zero Axe violations. Axe scans at 390 px returned zero violations for `/`, `/demo`, `/privacy`, `/terms`, `/print?demo=1`, and `/missing-tile`; the 404’s network-status console message is expected for an HTTP-404 document, not an application error.
- The concrete-and-moss palette, hard outlined slabs, original tabletop image, asymmetric workbench layout, and reduced-motion policy match `.factory/design.md`; this is not a generic SaaS template.

## Missed leverage — no finding

The brief implies a finite checklist, safe filenames, a 16×16 template, printable storyboard, export, local persistence, and a safe sample; all are present. An AI step would add account/key and privacy complexity to a deterministic four-choice planning task without filling an omitted user need. No decorative AI feature or embedded provider key was found.

## What would make this perfect

No corrective product work remains from this round. Preserve the direct-response metadata, isolated demo storage, offline reload, seeded-print outline, touch-target, claim, and route regressions when changing copy, routing, or assets.
