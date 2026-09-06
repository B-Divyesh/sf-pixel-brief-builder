# Review 5 — plan a tiny game art list

Reviewed 2026-09-06 UTC at `https://pixel-brief-builder.sociobot.in`.

## Verdict: FAIL

The product works end to end, and all nine public claims passed their declared tests. One low-severity copy finding remains on the 404 page. A PASS requires zero findings, so this review is a FAIL.

- Findings: 1 low; 0 critical, 0 high, 0 medium.
- Untested public claims: 0.
- Implementation candidate: `dcfad33e31daaa3815d8ca3149e1f398297cd09d`.
- Regression-test candidate: `a49078c2419c81dcbe4ad8169905d18a33e9a159`.
- Documentation baseline: `4a220061655bbee3a70f09a202bb043ed1cf4c95`.

`dcfad33` is the last commit that changes shipped product files. `a49078c` adds a test only. The source and public trees at the documentation baseline are identical to `dcfad33`, and a clean production build matches the live files byte for byte.

## First screen

I opened the live home page in separate fresh Chromium contexts at 1440×900 and 390×844. I recorded these answers before scrolling:

| View | Job | Audience | First action |
| --- | --- | --- | --- |
| Desktop | Make a finite art checklist before drawing a tiny game. | An adult and child making a weekend game. | **Try it with sample data**. |
| Phone | Make a finite art checklist before drawing a tiny game. | An adult and child making a weekend game. | **Try it with sample data**. |

The visible evidence was the H1 “Plan your tiny game art first,” the named adult-and-child audience, the sample action, its “finished 20-item packet” result, and the three facts about price, browser storage, and offline use. All were above the fold at both sizes.

Screenshots: [desktop first screen](evidence/review-5/desktop-first-screen.png), [phone first screen](evidence/review-5/phone-first-screen.png), [desktop sample](evidence/review-5/desktop-demo.png), and [phone sample](evidence/review-5/phone-demo.png).

## Sample and real data

- One click opened `/?demo=1` with the populated **Moss Beacon Night** packet.
- The sample contained 20 assets, five finished marks, original drawing prompts, safe filenames, a 256-cell 16×16 tile template, and six storyboard panels.
- The banner remained present on the sample and printable sample. It said “Demo — sample data, nothing is saved to your real packet” and included **Reset demo** and **Start for real**.
- I first created a real 18-item packet. I then changed and reset the sample. The real storage value remained byte-identical.
- Reset restored exactly five sample marks. Starting for real removed the demo key, returned to `/#builder`, and restored the real packet unchanged.
- Every observed request during the home and sample flows used the product origin. There were no console or page errors.

## Claims

I cloned the repository into `/tmp/pbb-review5-xX8WSe`, ran `npm ci`, and then ran every literal command in `.factory/claims.json` separately. All nine passed.

| Claim | Result | Observed proof |
| --- | --- | --- |
| `finite-packet` | PASS | Sample has 20 rows; one and three characters produce 18 and 22. |
| `browser-local-only` | PASS | Real and sample keys remain separate; reset and exit preserve real data; requests stay same-origin. |
| `rebuild-confirmation` | PASS | Cancel preserves five marks; accept replaces the packet. |
| `offline-reload` | PASS | The controlled sample reloads with 20 rows and five marks while offline. |
| `markdown-export` | PASS | The download contains 20 checklist lines and six storyboard lines. |
| `print-packet` | PASS | Print contains 20 rows, 256 cells in 16 columns, and six panels. |
| `filename-copy` | PASS | Copy produces 20 lowercase-safe `.png` names, one per line. |
| `free-use` | PASS | A real 18-row packet builds without an account or payment. |
| `original-prompts` | PASS | All 20 assets have a drawing prompt and the original-work reminders. |

I compared the live landing page, sample, privacy page, terms page, generated output, and README with the manifest. Every visitor-facing product outcome maps to a declared claim and observable test. Untested claim count: **0**.

## Normal, invalid, boundary, and recovery paths

- Normal: built a real packet, changed progress, exported Markdown, copied filenames, and opened print output.
- Boundaries: one, two, and three characters produced 18, 20, and 22 assets.
- Invalid setup: a missing form choice produced “One setup choice is missing. Choose all four limits and try again.”
- Invalid saved state: malformed local storage produced “Your saved packet could not be read. Build a new packet to replace it.” Rebuilding produced 18 valid rows.
- Blocked storage: the page kept the packet open and showed “This browser blocked saving. Keep this tab open or allow site storage.”
- Clipboard failure: the live region said “Filenames could not be copied. Export the brief instead.”
- Empty print route: it showed “No packet is ready” and linked back to build one.
- Rebuild with finished marks: the native confirmation preserved the packet when cancelled and replaced it when accepted.

## Accessibility and responsive behavior

- Independent Axe scans found zero violations on `/`, `/demo`, `/privacy`, `/terms`, seeded `/print?demo=1`, and `/missing-tile` at both 1440×900 and 390×844.
- `/opt/fleet/lib/verify-url.sh` passed: `lang="en"`, one H1, a main landmark, no missing alt text, no unnamed buttons, and no console errors. Evidence: [verify result](evidence/review-5/verify/verify.json).
- Keyboard use reached the skip link first, opened the sample with Enter, activated **Focus next asset**, and moved focus to the first unfinished checkbox.
- Route changes and browser Back moved focus to and announced the route H1 in the production suite.
- At 200% text size, the 390-pixel layout had no horizontal overflow. Standalone controls met the 44-pixel target test.
- With reduced motion enabled, smooth scrolling became `auto` and the completion transition duration was effectively zero.
- The prior Reset-demo hover and keyboard-focus contrast regression passed at phone and desktop sizes.

## Routes, privacy, offline use, and links

- `/`, `/demo`, `/privacy`, `/terms`, and `/print?demo=1` returned 200 with distinct titles and one H1.
- `/missing-tile` intentionally returned 404 and showed a designed recovery page with a home action. The 404 status is expected and is not the finding below.
- Direct HTML responses contained the correct title, description, canonical URL, Open Graph text, and Twitter text before JavaScript ran.
- All product-origin links returned their expected status. The skip link on the 404 document correctly stays on that 404 document. `mailto:` links and the external Param Factory link were checked for valid destinations but were not requested because this work order permits connections only to the product subdomain.
- Privacy and Terms are available as real routes. Privacy explains browser storage, hosting request logs, deletion, and a contact address.
- The service-worker offline claim passed against production. The two-version update regression also passed, including hashed shell replacement and old-cache removal.
- The live CSP allows only product resources and sends `frame-ancestors 'none'` as a response header. Referrer, content-type, HSTS, and restrictive permissions headers are present.
- This is a static product. Backend tenant isolation, SQLite persistence, health, restart persistence, and 429 behavior do not apply. CLI, library, and desktop artifact checks do not apply.

## Build, deployment identity, and performance

The clean checkout passed:

```text
npm ci                         PASS — 138 packages, 0 vulnerabilities
npm test                       PASS — 8 unit and 22 browser tests
npm run lint                   PASS
npm run typecheck              PASS
npm run build                  PASS — dist/ produced
npm audit --audit-level=low    PASS — 0 vulnerabilities
live npm test                  PASS — 8 unit and 22 browser tests
```

The live `index.html`, all route documents including the 404 body, service worker, hashed JavaScript and CSS, both hero images, and social card matched the clean build byte for byte. Representative hashes are `5ec1b690…f3e47` for `index.html`, `5a9911a0…217d` for JavaScript, `95fd6391…e9b` for CSS, and `4a98c0d1…4489` for `sw.js`.

Fresh mobile Lighthouse results were 100 performance, 100 accessibility, 100 best practices, and 100 SEO. LCP was 1,258 ms, total blocking time 44 ms, CLS 0, and transferred bytes 76,460. Raw evidence: [Lighthouse JSON](evidence/review-5/lighthouse.json).

The production JavaScript is 26,378 bytes raw and 9.39 kB gzip. CSS is 20,832 bytes raw and 5.25 kB gzip. The mobile hero is 59,642 bytes. All are within the supplied static-product budgets.

## Earlier findings

I read every earlier review, verification, polish report, and handoff. Their findings have these current dispositions:

| Earlier finding | Current proof |
| --- | --- |
| V-1: the 16×16 template was 8×8 | Fixed. Seeded print has 256 cells in 16 columns. |
| V-1: fixed app URLs could keep stale code | Fixed. Assets are hashed; the worker is not immutable; the two-version update test passes. |
| V-1: controls were smaller than 44 pixels | Fixed. The phone target regression passes on home, sample, legal, and print routes. |
| V-1: phone hero was distorted and not smaller | Fixed. The phone uses the separate 720×480 source at 3:2. |
| V-1: missing paths returned a soft 404 | Fixed. The designed page returns HTTP 404. |
| V-1 and F-1-3: generated text used the wrong article | Fixed. Live and unit output use “a ruined greenhouse”; all settings are covered. |
| F-1-1: seeded print skipped H2 | Fixed. The outline is H1 → H2 → H3 and Axe is clean. |
| F-1-2 and F-3-1: route metadata was generic or only fixed after JavaScript | Fixed. Direct and rendered metadata are route-specific. |
| F-1-4: outcome claims were missing from the manifest | Fixed. Confirmation is declared and tested; unsupported qualifiers remain absent. |
| F-3-2 through F-3-7: vague headings and inconsistent output terms | Fixed on the landing page and README. The text uses “Three steps,” “character count,” “16×16 tile template,” and “six-panel storyboard.” |
| V-3: Reset demo hover contrast failed | Fixed. Axe and direct contrast checks pass after pointer reset and keyboard focus. |

Earlier PASS reviews and verifications contained no additional defects to retest.

## Finding

### F-5-1 — Low — the 404 page uses metaphor instead of a plain heading

**Location:** `https://pixel-brief-builder.sociobot.in/missing-tile`

**Current text:** H1 “This path ends at concrete” followed by “The page is not in this tiny map.”

**Evidence:** The route correctly returns HTTP 404, has one H1, passes Axe, and provides **Return to the builder**. The defect is the wording, not the HTTP status or recovery path.

**Why this is a finding:** The attached plain-words contract bans metaphor and requires headings to name the section or state directly. “Concrete” and “tiny map” make the error less direct than “Page not found.”

**Required change:** Use a plain H1 such as “Page not found” and a direct explanation such as “This page does not exist.” Keep the existing recovery action and designed visual treatment. Add the 404 text to `.factory/copy-audit.md` so future copy checks cover it.

## Final decision

**FAIL.** There is one finding and zero untested claims. Product code was not changed during this review.
