# Review 6 — plan a tiny game art list

Reviewed 2026-09-06 UTC at `https://pixel-brief-builder.sociobot.in`.

## Verdict: FAIL

The normal product, sample, all nine declared claims, local and live suites, accessibility checks, offline use, update behavior, and earlier fixes pass. One medium-severity recovery defect remains. A PASS requires zero findings.

- Findings: **1 medium**; 0 critical, 0 high, 0 low.
- Untested public claims: **0**.
- Implementation candidate: `d118bd91b85e037b83b29bfc5899e59acdc2756c`.
- Documentation baseline reviewed: `9857fb8b1e382a8792947d53f1cbc877df294d1d`.
- Product class: local-first static web app. Backend, tenant, restart, health, rate-limit, CLI, library, and desktop checks do not apply.

The commits after `d118bd9` contain reports and evidence only. A clean build matched the live route documents, worker, JavaScript, CSS, product images, icons, robots file, and sitemap byte-for-byte.

## First screen

I opened the live page in separate fresh Chromium contexts at 1440×900 and 390×844. Before scrolling, both showed:

| Required answer | Visible text |
| --- | --- |
| Job | **Plan your tiny game art first** |
| Audience | **For an adult and child making a weekend game who need a small, shared drawing list.** |
| First action | **Try it with sample data** |
| Result of the action | **Opens a finished 20-item packet.** |

The free, browser-storage, and offline facts were also visible. The title names the job, the copy uses plain words, and no metaphor or mood heading appears.

Evidence: `.factory/evidence/review-6/desktop-first-screen.png`, `.factory/evidence/review-6/phone-first-screen.png`, and `.factory/evidence/review-6/live-browser.json`.

## Sample and real data

- One click opened `/?demo=1` and immediately showed the realistic **Moss Beacon Night** packet.
- The sample had 20 asset rows, five finished marks, four named groups, specific drawing prompts, safe filenames, a 16×16 tile template, and a six-panel storyboard.
- The sticky label said **Demo — sample data, nothing is saved to your real packet** and kept **Reset demo** and **Start for real** available.
- Adding a mark raised the sample count to six. Reset restored exactly five marks.
- A separately created real 18-item packet remained byte-identical through sample edits and reset.
- **Start for real** removed the sample key, did not copy sample data, and restored the real packet.
- Every request observed through the flow used the product origin. Fresh desktop and phone flows produced no console or page errors.

## Declared claims

I cloned the repository to `/tmp/pixel-review-6-r6eU8P`. The clone was clean before and after the claim gate. After the documented `npm ci`, I ran every literal `test` command in `.factory/claims.json` separately.

| Claim | Result | Observed proof |
| --- | --- | --- |
| `finite-packet` | PASS | The sample had 20 rows; one and three characters produced 18 and 22. |
| `browser-local-only` | PASS | Real and sample keys stayed separate; reset and exit preserved real data; requests stayed same-origin. |
| `rebuild-confirmation` | PASS | Cancel kept five marks; accept replaced the packet. |
| `offline-reload` | PASS | The controlled sample reloaded with 20 rows and five marks while offline. |
| `markdown-export` | PASS | The file contained one checklist line per asset and six storyboard lines. |
| `print-packet` | PASS | Print contained 20 rows, 256 cells in 16 columns, and six panels. |
| `filename-copy` | PASS | Copy produced 20 lowercase-safe `.png` names, one per line. |
| `free-use` | PASS | A real 18-row packet built without an account or payment. |
| `original-prompts` | PASS | All 20 assets had drawing prompts and the original-work reminders. |

Landing, sample, output, legal, metadata, README, and error copy were compared with the manifest. Every supported public product outcome has a declared, passing test. Untested claim count: **0**.

## Normal, invalid, boundary, and recovery paths

- Normal build, rebuild, progress, Markdown export, filename copy, print, sample reset, and sample exit passed.
- Removing a required setup value produced: “One setup choice is missing. Choose all four limits and try again.”
- Malformed saved JSON produced a clear alert and empty state. Rebuilding replaced it with a valid 18-row packet.
- One, two, and three characters produced 18, 20, and 22 rows. Completing every sample row produced a 20-of-20 progress state and completion message.
- Clipboard rejection produced: “Filenames could not be copied. Export the brief instead.”
- An empty `/print` route said no packet was ready and linked to the builder.
- Browser storage rejection exposes finding F-6-1 below.

## Accessibility, phone, keyboard, and motion

- Independent Axe scans found zero violations on `/`, `/demo`, `/privacy`, `/terms`, `/print?demo=1`, and `/missing-tile` at 1440×900 and 390×844.
- `/opt/fleet/lib/verify-url.sh` passed the live title, `lang=en`, one H1, main landmark, image alternatives, button names, and console checks.
- Keyboard tests reached the skip link first, opened the sample with Enter, and moved focus to the next unfinished asset.
- Route changes and browser Back focused and announced the new H1. The native rebuild confirmation preserved focus and state when cancelled.
- The 390 px layout and 200% text test had no horizontal overflow. Standalone controls met the 44 px baseline.
- The former Reset demo hover and keyboard-focus contrast failure remains fixed at phone and desktop widths.
- Reduced motion changes scrolling to `auto`, removes the count transform, and removes the completion sweep.

## Routes, privacy, offline use, and links

- Home, demo, privacy, terms, and seeded print returned 200 with one H1 and route-specific titles. Direct HTML also had route-specific descriptions, canonical URLs, Open Graph fields, and Twitter fields.
- `/missing-tile` deliberately returned HTTP 404 and showed **Page not found**, a direct explanation, and **Return to the builder**. This expected 404 is not a defect.
- Every product-origin link resolved as expected. The 404 skip link correctly stays on the 404 response. Email links and the external Param Factory URL were syntax-checked but not requested outside this product scope.
- Privacy explains local storage, standard host request logs, deletion, and contact. No account, analytics, API, AI, payment, remote font, or third-party script request appeared.
- The sample reloaded offline after the first controlled visit. The two-version regression proved an existing client receives the new hashed application shell and removes the old cache.
- The response policy includes a self-only CSP, HSTS, `nosniff`, a referrer policy, and a restrictive permissions policy. The worker is not cached; hashed JavaScript and CSS are immutable.

## Build, live parity, and performance

The clean checkout passed:

```text
npm ci                                      PASS — 138 packages, 0 vulnerabilities
all 9 literal claim commands                PASS
npm test                                    PASS — 8 unit and 22 browser checks
PLAYWRIGHT_BASE_URL=<live> npm test         PASS — 8 unit and 22 browser checks
npm run build                               PASS — dist/ produced
npm audit --audit-level=low                 PASS — 0 vulnerabilities
```

The production JavaScript is 26,348 bytes raw and 9.37 kB gzip. CSS is 20,832 bytes raw and 5.25 kB gzip. Fonts transfer 0 bytes. The phone hero is 59,642 bytes and the desktop hero is 166,302 bytes.

Six route documents, the service worker, JavaScript, CSS, three product images, two icons, robots file, and sitemap matched the clean candidate build byte-for-byte. The missing route matched the candidate 404 document while correctly retaining HTTP 404.

Fresh Lighthouse 13.4.1 mobile results were 100 performance, 100 accessibility, 100 best practices, and 100 SEO. LCP was 1,275 ms, total blocking time 0 ms, CLS 0, and transferred bytes 76,481.

## Earlier findings

I read every earlier review, verification, polish report, and handoff. Their current dispositions are:

| Earlier finding | Current proof |
| --- | --- |
| V-1: 16×16 template rendered as 8×8 | Fixed. Seeded print has 256 visible cells in 16 computed columns. |
| V-1: fixed immutable application URLs could keep stale code | Fixed. JavaScript and CSS are hashed; the worker is not immutable; the two-version update test passes. |
| V-1: controls were smaller than 44 px | Fixed. The phone target regression passes on home, sample, legal, and print routes. |
| V-1: phone hero was distorted and not smaller | Fixed. The 720×480 phone source renders at 3:2. |
| V-1: missing paths returned a soft 404 | Fixed. The designed page returns HTTP 404. |
| V-1 and F-1-3: generated text used the wrong article | Fixed. Unit and live output use the correct article for all three settings. |
| F-1-1: seeded print skipped H2 | Fixed. The outline is H1 → H2 → H3 and Axe is clean. |
| F-1-2 and F-3-1: route metadata was generic or client-only | Fixed. Direct and rendered metadata are route-specific. |
| F-1-4: public outcomes were missing from the claim manifest | Fixed. Nine claims each have exactly one tagged passing test; unsupported qualifiers remain absent. |
| F-3-2: vague first-screen label | Fixed. The job-led H1 is the first hero heading. |
| F-3-3: metaphorical hero caption | Fixed. The caption states the tested 18, 20, or 22-item result. |
| F-3-4: “moves” was ambiguous | Fixed. The heading says “Three steps.” |
| F-3-5: “handoff” was unexplained | Fixed. The term is absent from product copy. |
| F-3-6: “cast” conflicted with “character count” | Fixed. Setup and explanation use “character count.” |
| F-3-7: the output had competing names | Fixed. Copy consistently uses “16×16 tile template” and “six-panel storyboard.” |
| V-3: Reset demo hover contrast failed | Fixed. Direct contrast and Axe regressions pass at both widths. |
| F-5-1: the 404 used metaphorical wording | Fixed. It now says “Page not found” and “This page does not exist.” |

No earlier finding has reopened. F-6-1 is a newly demonstrated recovery defect. It also disproves Verification 5's statement that a packet remains usable when storage is blocked.

## Finding

### F-6-1 — Medium — a packet stops working when browser storage rejects writes

**Location:** live home builder after browser storage rejects `localStorage.setItem`.

**Reproduction:**

1. Open the live home page in a fresh browser where storage writes throw `SecurityError`.
2. Choose the normal defaults and activate **Build my art packet**.
3. The page renders 18 rows and says: “This browser blocked saving. Keep this tab open or allow site storage.”
4. Activate **Export brief** or **Copy filenames**. Neither action produces a download, clipboard result, toast, or error.
5. Tick an asset. The checkbox changes visually, but the progress bar remains at `aria-valuenow="0"` and the written count remains 0 of 18.

Evidence: `.factory/evidence/review-6/blocked-storage.png` and `.factory/evidence/review-6/recovery.json`.

**Impact:** The error state presents a complete-looking packet and advises keeping the tab open, but the core progress and export actions silently fail. A person in this recovery path cannot reliably finish or take the art list into their drawing work.

**Required change:** Keep the current packet in memory when persistence fails, and make progress, export, copy, print, and rebuild use that in-memory packet for the life of the tab. Keep the storage warning visible. Add a browser regression that rejects storage writes and proves those actions still work. If in-memory use is intentionally unsupported, do not render active controls; explain the required storage change before building instead.

## Final decision

**FAIL — 1 finding and 0 untested claims.** Product code was not changed during this review.
