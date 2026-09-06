# Verification 6 — plan a tiny game art list

Verified 2026-09-06 UTC for work order `pixel-brief-builder-verify-6`.

## Verdict

**PASS — 0 findings and 0 untested claims.**

- Candidate implementation: `390edb89bc38bf09891084af52b5469c78bd5651`.
- Documentation baseline: `a67060aab5e85ac63613605392196198d7d23271`.
- Live URL: `https://pixel-brief-builder.sociobot.in`.
- Product class: local-first static web app.

The commits after the implementation candidate contain documentation and evidence only. Six route documents, the service worker, JavaScript, CSS, three product images, two icons, robots file, and sitemap from a clean build matched production byte-for-byte. The deliberate missing route kept HTTP 404 while its response body matched the candidate's designed 404 document.

## First screen

Fresh Chromium contexts opened production at 1440×900 and 390×844. Before scrolling, both showed:

| Required answer | Visible text |
| --- | --- |
| Job | **Plan your tiny game art first** |
| Audience | **For an adult and child making a weekend game who need a small, shared drawing list.** |
| First action | **Try it with sample data** |
| Action result | **Opens a finished 20-item packet.** |

The action ended at 668 px on the 900 px desktop and 461 px on the 844 px phone. The three facts about free use, browser-only saving, and offline reload were also visible. The heading names the job; the copy uses plain words and has no metaphor or mood heading.

Evidence: [desktop first screen](evidence/verification-6/desktop-first-screen.png), [phone first screen](evidence/verification-6/phone-first-screen.png), and [live audit](evidence/verification-6/live-audit.json).

## Sample and real data

One click opened `/?demo=1` with the realistic **Moss Beacon Night** sample. It immediately showed 20 named assets, five finished marks, 20 safe `.png` filenames, 20 specific drawing prompts, a 16×16 tile template, and a six-panel storyboard.

The persistent label said **Demo — sample data, nothing is saved to your real packet** and kept **Reset demo** and **Start for real** available. Adding a mark changed the count to six. Reset restored exactly five. A separately created real 18-item packet remained byte-identical through the sample edit and reset. Starting for real removed the sample key, did not copy sample data, and restored the real packet.

Evidence: [desktop sample](evidence/verification-6/desktop-sample.png) and [phone sample](evidence/verification-6/phone-sample.png).

## Declared claims

The remote clean checkout was `/tmp/pixel-brief-builder-verify-6-clean-t4aUFl` at documentation commit `a67060a`. After `npm ci`, I ran every literal `test` command from `.factory/claims.json` separately. All nine passed.

| Claim | Result | Observed proof |
| --- | --- | --- |
| `finite-packet` | PASS | Sample had 20 rows; one and three characters produced 18 and 22. |
| `browser-local-only` | PASS | Real and sample keys stayed separate; reset and exit preserved real data; requests stayed same-origin. |
| `rebuild-confirmation` | PASS | Cancel kept five marks; accept replaced the packet. |
| `offline-reload` | PASS | The controlled sample reloaded with 20 rows and five marks while offline. |
| `markdown-export` | PASS | The download contained one checklist row per asset and six storyboard lines. |
| `print-packet` | PASS | Print contained 20 rows, 256 cells in 16 columns, and six panels. |
| `filename-copy` | PASS | Copy produced 20 lowercase-safe `.png` names, one per line. |
| `free-use` | PASS | A real 18-row packet built without an account or payment input. |
| `original-prompts` | PASS | All 20 assets had drawing prompts and the original-work reminders. |

Landing, sample, output, legal, metadata, README, and error copy were compared with the claim manifest. Every public outcome has a declared observable test. Untested claim count: **0**.

## Normal, invalid, boundary, and recovery paths

- Normal build, rebuild, progress, Markdown export, filename copy, print, sample reset, and sample exit passed.
- One, two, and three characters produced 18, 20, and 22 items. Finishing all 22 produced the complete state.
- A missing setup choice said: “One setup choice is missing. Choose all four limits and try again.”
- Malformed stored JSON said the packet could not be read. Building again recovered to 18 valid rows.
- Clipboard rejection said: “Filenames could not be copied. Export the brief instead.”
- Empty `/print` showed **No packet is ready** and **Build an art packet**.
- A cancelled rebuild preserved completed marks; an accepted rebuild replaced them.

Review 6's blocked-storage finding is fixed. With every storage write forced to throw `SecurityError`, production rendered an 18-row packet and kept its warning visible. Marking one asset updated written and accessible progress to 1 of 18. Markdown exported all 18 rows and the mark. Copy produced 18 filenames. A confirmed rebuild produced 22 rows. Print kept 22 rows, 256 tile cells, and six panels. Returning through the app kept the 22-row packet. The storage key stayed empty throughout, proving this was tab memory rather than accidental persistence.

Evidence: [blocked-storage view](evidence/verification-6/blocked-storage.png) and the `recovery.blockedStorage` record in [live audit](evidence/verification-6/live-audit.json).

## Accessibility, phone, keyboard, and motion

- Independent Axe scans found zero violations on `/`, `/demo`, `/privacy`, `/terms`, `/print?demo=1`, and `/missing-tile` at 1440×900 and 390×844.
- `/opt/fleet/lib/verify-url.sh` passed title, `lang=en`, one H1, main landmark, image alternatives, button names, and console checks. Evidence: [verify result](evidence/verification-6/verify-url/verify.json).
- Each tested route had one H1, one main landmark, its own title, and no horizontal overflow.
- Keyboard use reached a visible skip link first, opened the sample with Enter, and moved focus to the next unfinished checkbox. No trap appeared.
- Route navigation, browser Back, and 404 recovery focus behavior passed in the production suite.
- Standalone controls met the 44 px phone baseline. The 200% text test did not overflow.
- Reduced motion changed scrolling to `auto` and reduced the completion sweep to effectively zero.
- The former Reset demo hover and keyboard-focus contrast failure passed at both widths.

## Privacy, routes, offline use, and links

The fresh desktop and phone flows made only same-origin requests and produced no console or page errors. No analytics, API, AI, payment, remote-font, third-party-script, or packet-data request appeared. The privacy page explains local storage, separate sample storage, standard host logs, removal, and a contact address. Terms load at their own URL.

Home, sample, privacy, terms, seeded print, robots, sitemap, and worker routes returned their expected status and content type. Direct and rendered route titles, descriptions, canonical URLs, Open Graph fields, and Twitter fields are route-specific. Internal links resolved. Email and the labelled external Param Factory link were syntax-checked but not requested outside this product scope.

`/missing-tile` deliberately returned HTTP 404 and showed **Page not found**, **This page does not exist**, and **Return to the builder**. The 404 status is expected and is not a defect.

The response policy includes a self-only CSP, HSTS, `nosniff`, a referrer policy, and a restrictive permissions policy. Hashed app assets are immutable; `sw.js` is `no-cache, no-store, must-revalidate`. A fresh controlled sample reloaded offline with all 20 rows and five marks. The two-version worker regression proved that an existing client receives the new hashed shell and removes the old cache.

This product has no backend, account, payment, API, tenant, server database, CLI, library, or desktop artifact. Tenant isolation, SQLite restart persistence, health, and 429/`Retry-After` checks do not apply. The deterministic planner completes the researched job without an AI step or data sharing.

## Build, parity, and performance

The clean checkout passed:

```text
npm ci                                      PASS — 138 packages, 0 vulnerabilities
all 9 literal claim commands                PASS
npm test                                    PASS — 8 unit and 23 browser checks
PLAYWRIGHT_BASE_URL=<live> npm test         PASS — 8 unit and 23 browser checks
npm audit --audit-level=low                 PASS — 0 vulnerabilities
npm run build                               PASS — dist/index.html produced
```

The built JavaScript is 26,734 bytes raw / 9,435 bytes gzip. CSS is 20,832 bytes raw / 5,251 bytes gzip. The phone hero is 59,642 bytes; the desktop hero is 166,302 bytes; fonts transfer 0 bytes. These are within the static-product budgets.

Fresh mobile Lighthouse 13.0.1 results:

| Measure | Result |
| --- | ---: |
| Performance | 100 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| LCP | 1,308 ms |
| TBT | 74 ms |
| CLS | 0 |
| Total transfer | 76,537 B |

Evidence: [Lighthouse JSON](evidence/verification-6/lighthouse.json). The first Lighthouse invocation lacked `CHROME_PATH`; rerunning with the Playwright-installed Chromium completed successfully. This was verifier setup, not a product failure.

## Earlier findings

Every earlier review, verification, and polish report was inspected. Their current dispositions are:

| Earlier finding | Current proof |
| --- | --- |
| V-1: 16×16 template rendered as 8×8 | Fixed — seeded print has 256 visible cells in 16 computed columns. |
| V-1: fixed immutable app URLs could keep stale code | Fixed — hashed JavaScript/CSS, non-immutable worker, and passing two-version update test. |
| V-1: controls were smaller than 44 px | Fixed — phone target regression passes across home, sample, legal, and print routes. |
| V-1: phone hero was distorted and not smaller | Fixed — the separate 720×480 phone source renders at 3:2. |
| V-1: missing paths returned a soft 404 | Fixed — the designed page returns HTTP 404 and offers recovery. |
| V-1 / F-1-3: generated text used the wrong article | Fixed — unit coverage confirms the right article for every setting. |
| F-1-1: seeded print skipped H2 | Fixed — H1 → H2 → H3 outline and zero Axe violations. |
| F-1-2 / F-3-1: route metadata was generic or client-only | Fixed — direct and rendered metadata are route-specific. |
| F-1-4: public outcomes were missing from the claim manifest | Fixed — nine claims each have exactly one tagged passing test; unsupported qualifiers remain absent. |
| F-3-2 through F-3-7: vague headings, metaphor, jargon, and changing terms | Fixed — direct headings and consistent “character count,” “16×16 tile template,” and “six-panel storyboard.” |
| V-3: Reset demo hover contrast failed | Fixed — direct contrast and Axe regression pass at both widths. |
| F-5-1: 404 used metaphorical wording | Fixed — direct “Page not found” copy and tested recovery route. |
| F-6-1: blocked-storage packets stopped working | Fixed — independent live progress, export, copy, rebuild, print, and return exercise passed from tab memory. |

No earlier blocking or minor finding reopened.

## Final decision

**PASS — 0 findings and 0 untested claims.** Candidate `390edb89bc38bf09891084af52b5469c78bd5651` is accepted at `https://pixel-brief-builder.sociobot.in`.
