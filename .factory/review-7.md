# Review 7 — plan a tiny game art list

Reviewed 2026-09-06 UTC for work order `pixel-brief-builder-review-7`.

## Verdict

**PASS — 0 findings and 0 untested claims.**

- Implementation reviewed: `390edb89bc38bf09891084af52b5469c78bd5651`.
- Documentation baseline: `a0d229b7a7f29cbb44fbdd59b2a2394220575f9e`.
- Live URL: `https://pixel-brief-builder.sociobot.in`.
- Product class: local-first static web app.

The commits after the implementation contain reports, copy audit notes, and evidence only. A clean build at the documentation baseline matched the live route documents, deliberate 404 body, service worker, hashed application assets, images, icons, robots file, and sitemap byte-for-byte.

The work-order path `factory-evidence/pixel-brief-builder-verify-6/qa-report.md` was not present in the container or tracked repository. I read the complete tracked `.factory/verification-6.md` and its evidence before this fresh review. The missing duplicate evidence path is a worker-environment note, not a product finding.

## First screen

I opened production in separate fresh Chromium contexts at 1440×900 and 390×844. Before scrolling, both showed:

| Required answer | Visible text |
| --- | --- |
| Job | **Plan your tiny game art first** |
| Audience | **For an adult and child making a weekend game who need a small, shared drawing list.** |
| First action | **Try it with sample data** |
| Action result | **Opens a finished 20-item packet.** |

The action ended at 668 px on desktop and 461 px on phone. The free-use, browser-only saving, and offline-reload facts were also visible. The heading names the job, and no metaphor or mood heading appears.

Evidence: [desktop first screen](evidence/review-7/desktop-first-screen.png) and [phone first screen](evidence/review-7/phone-first-screen.png).

## Sample and real data

One click opened `/?demo=1`. The populated **Moss Beacon Night** sample immediately showed 20 named assets, five finished marks, 20 specific drawing prompts, 20 lowercase-safe `.png` filenames, a 16×16 tile template, and a six-panel storyboard.

The persistent label said **Demo — sample data, nothing is saved to your real packet**. **Reset demo** and **Start for real** remained available. Adding a mark changed the count to six. Reset restored five. A separately built 18-item real packet remained byte-identical through the sample edit and reset. Starting for real removed the sample key, did not copy the sample, and restored the 18-item real packet.

Evidence: [desktop sample](evidence/review-7/desktop-sample.png) and [phone sample](evidence/review-7/phone-sample.png).

## Declared claims

The clean checkout was `/tmp/pixel-brief-builder-review-7-clean` at documentation commit `a0d229b`. After `npm ci`, I ran every literal command in `.factory/claims.json` separately. All nine passed.

| Claim | Result | Observable proof |
| --- | --- | --- |
| `finite-packet` | PASS | Sample had 20 rows; one and three characters produced 18 and 22. |
| `browser-local-only` | PASS | Real and sample keys stayed separate; reset and exit preserved real data; requests stayed same-origin. |
| `rebuild-confirmation` | PASS | Cancel kept the five marks; accept replaced the packet. |
| `offline-reload` | PASS | A controlled sample reloaded offline with 20 rows and five marks. |
| `markdown-export` | PASS | Download contained one checklist line per asset and six storyboard lines. |
| `print-packet` | PASS | Print had 20 rows, 256 cells in 16 columns, and six panels. |
| `filename-copy` | PASS | Copy produced 20 safe `.png` names, one per line. |
| `free-use` | PASS | An 18-item real packet built without an account or payment input. |
| `original-prompts` | PASS | Every asset had a drawing prompt and original-work reminders. |

Landing, sample, generated output, route metadata, README, privacy, terms, empty states, and errors were compared with the claim manifest. Each public product outcome has an observable test. Unsupported speed, synchronization, or data-collection claims are absent. Untested claim count: **0**.

## Normal, invalid, boundary, and recovery paths

- Normal build, progress, rebuild, Markdown export, filename copy, print, sample reset, and sample exit passed.
- One, two, and three characters produced 18, 20, and 22 assets. Finishing all items produced the complete state.
- A missing setup value said: “One setup choice is missing. Choose all four limits and try again.”
- Malformed stored JSON said the saved packet could not be read. Building again recovered to 18 valid rows.
- Clipboard rejection said: “Filenames could not be copied. Export the brief instead.”
- Empty `/print` said **No packet is ready** and linked to **Build an art packet**.
- A cancelled rebuild retained finished marks; an accepted rebuild removed them and built the chosen boundary size.
- With all storage writes rejected, the app kept an 18-row packet in tab memory, updated progress to 1 of 18, and exported all 18 rows while the warning remained visible. The storage key stayed empty.

The last item independently proves review 6 finding F-6-1 remains fixed. The complete browser regression also proves copy, a 22-row rebuild, print, and in-app return from tab memory.

## Accessibility, keyboard, phone, and motion

- Fresh Axe scans found zero violations on `/`, `/demo`, `/privacy`, `/terms`, seeded `/print?demo=1`, and `/missing-tile` at both 1440×900 and 390×844.
- `/opt/fleet/lib/verify-url.sh` passed the live demo: correct title, `lang=en`, one H1, main landmark, image alternatives, button names, and no console errors. Evidence: [verify result](evidence/review-7/verify-url/verify.json).
- Keyboard use reached the skip link first, opened the sample with Enter, and moved focus to the next unfinished checkbox. Route changes, browser Back, and 404 recovery focused and announced the destination H1.
- Standalone controls met the 44 px phone baseline. The 200% text test had no horizontal overflow.
- Reduced motion changed scrolling to `auto`, removed the count transform, and reduced the completion transition to zero.
- The former Reset demo hover and keyboard-focus contrast failure passed at both widths.

## Privacy, routes, offline use, and links

The fresh phone and desktop sample flows made only same-origin requests and produced no console or page errors. No analytics, API, AI, payment, remote-font, third-party-script, or packet-data request appeared. Real and sample state stayed in separate local-storage namespaces.

Privacy explains local storage, separate sample storage, standard hosting logs, removal, and a contact address. Terms load at their own URL. Product links resolve to the intended routes. Email and labelled external links have valid destinations and were not requested outside this product scope.

Home, sample, privacy, terms, print, robots, sitemap, and worker routes returned their expected status and content type. Direct and rendered titles, descriptions, canonical URLs, Open Graph fields, and Twitter fields are route-specific. Each page has one H1 and one main landmark.

`/missing-tile` deliberately returned HTTP 404 and showed **Page not found**, **This page does not exist**, and **Return to the builder**. This expected 404 is not a defect.

Response headers include a self-only CSP, HSTS, `nosniff`, a referrer policy, and a restrictive permissions policy. Hashed application assets are immutable; `sw.js` is `no-cache, no-store, must-revalidate`. A controlled production sample reloaded offline. The two-version worker regression proved that an existing client receives the new hashed shell and removes the old cache.

This product has no backend, account, payment, API, tenant, server database, CLI, library, or desktop artifact. Tenant isolation, SQLite restart persistence, health, 429/`Retry-After`, and installed-consumer checks do not apply. The deterministic planner completes the brief without an AI step or child-data sharing; no missed AI leverage was found.

## Build, parity, and performance

The clean checkout passed:

```text
npm ci                                      PASS — 138 packages, 0 vulnerabilities
all 9 literal claim commands                PASS
npm test                                    PASS — 8 unit and 23 browser tests
PLAYWRIGHT_BASE_URL=<live> npm test         PASS — 8 unit and 23 browser tests
npm audit --audit-level=low                 PASS — 0 vulnerabilities
npm run build                               PASS — dist/index.html produced
```

JavaScript is 26,734 bytes raw / 9,435 bytes gzip. CSS is 20,832 bytes raw / 5,251 bytes gzip. The phone hero is 59,642 bytes; the desktop hero is 166,302 bytes; fonts transfer 0 bytes. All are within the static-product budgets.

Fresh mobile Lighthouse 13.0.1 results:

| Measure | Result |
| --- | ---: |
| Performance | 100 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| LCP | 1,278 ms |
| TBT | 41 ms |
| CLS | 0 |
| Total transfer | 76,525 B |

Evidence: [Lighthouse JSON](evidence/review-7/lighthouse.json). The first Lighthouse wrapper invocation did not pass `CHROME_PATH` through to its child process. Running the same installed Lighthouse binary with the Playwright Chromium path completed successfully. This was reviewer setup, not a product failure.

## Earlier findings

Every earlier review, verification, and polish report was inspected. Their current dispositions are:

| Earlier finding | Current proof |
| --- | --- |
| V-1: 16×16 template rendered as 8×8 | Fixed — seeded print has 256 visible cells in 16 computed columns. |
| V-1: fixed immutable application URLs could keep stale code | Fixed — hashed JavaScript/CSS, non-immutable worker, and passing two-version update test. |
| V-1: controls were smaller than 44 px | Fixed — phone regression passes across home, sample, legal, and print routes. |
| V-1: phone hero was distorted and not smaller | Fixed — separate 720×480 source renders at 3:2. |
| V-1: missing paths returned a soft 404 | Fixed — designed missing page returns HTTP 404 and offers recovery. |
| V-1 / F-1-3: generated text used the wrong article | Fixed — unit matrix covers concepts and ground prompts for every setting. |
| F-1-1: seeded print skipped H2 | Fixed — H1 → H2 → H3 outline and zero Axe violations. |
| F-1-2 / F-3-1: route metadata was generic or client-only | Fixed — direct and rendered metadata are route-specific. |
| F-1-4: public outcomes were missing from the claim manifest | Fixed — nine claims each have exactly one tagged passing test. |
| F-3-2: vague first-screen label | Fixed — the job-led H1 is the first hero heading. |
| F-3-3: metaphorical hero caption | Fixed — the caption states the tested 18, 20, or 22-item result. |
| F-3-4: “moves” was ambiguous | Fixed — heading says **Three steps**. |
| F-3-5: “handoff” was unexplained | Fixed — the term is absent from product copy. |
| F-3-6: “cast” conflicted with “character count” | Fixed — setup and explanation both use **character count**. |
| F-3-7: output had competing names | Fixed — copy uses **16×16 tile template** and **six-panel storyboard**. |
| V-3: Reset demo hover contrast failed | Fixed — direct contrast and Axe regression pass at both widths. |
| F-5-1: 404 used metaphorical wording | Fixed — direct missing-page copy and tested recovery. |
| F-6-1: blocked-storage packets stopped working | Fixed — live tab-memory progress and export passed; full regression covers copy, rebuild, print, and return. |

No earlier blocking or minor finding reopened.

## Final decision

**PASS — 0 findings and 0 untested claims.** Candidate `390edb89bc38bf09891084af52b5469c78bd5651` is accepted at `https://pixel-brief-builder.sociobot.in`.
