# Verification 5 — plan a tiny game art list

Verified 2026-09-06 UTC for work order `pixel-brief-builder-verify-5`.

## Verdict

**PASS.** Finding count: **0**. Untested claim count: **0**.

- Candidate implementation: `d118bd91b85e037b83b29bfc5899e59acdc2756c`.
- Documentation and evidence baseline: `07c89eda65dbb3cc3cf3767819c336aeec4a7897`.
- Live URL: `https://pixel-brief-builder.sociobot.in`.
- Product class: local-first static web app. It has no backend, account, payment, API, CLI, or library surface.

The commits after the candidate only add handoff and evidence files. A clean build from `07c89ed` matched the live route documents, worker, JavaScript, CSS, and images byte-for-byte.

## First screen and sample

Fresh 1440×900 desktop and 390×844 phone browsers showed the required answer before scrolling:

- Job: **Plan your tiny game art first**.
- Audience: **An adult and child making a weekend game who need a small, shared drawing list.**
- First action: **Try it with sample data**.

The three visible facts say it is free, saves only in this browser, and works offline after the first visit. The first action opened the sample in one click.

The sample immediately showed **Moss Beacon Night**, 20 asset rows, five finished marks, specific safe filenames, drawing prompts, a four-colour rule, a 16×16 tile template, and six storyboard panels. The banner stayed visible and said **Demo — sample data, nothing is saved to your real packet**, with **Reset demo** and **Start for real**.

Changing one mark raised the finished count to six. Reset restored five. In a separate isolation check, a real 18-item packet remained byte-identical through sample edits, reset, and exit. Exit removed the sample key and did not copy sample data.

## Declared claims

The remote clean checkout was `/tmp/pixel-brief-builder-verify-5-clean-aVxVGo` at `07c89ed`. After `npm ci`, every literal command in `.factory/claims.json` was run separately. All nine passed.

| Claim | Result |
| --- | --- |
| `finite-packet` | PASS — sample has 20 rows; one and three characters produce 18 and 22 |
| `browser-local-only` | PASS — real and sample keys stay separate; observed requests stay same-origin |
| `rebuild-confirmation` | PASS — cancel keeps five marks; accept replaces the packet |
| `offline-reload` | PASS — the controlled sample reloads with its state while offline |
| `markdown-export` | PASS — download has one checklist row per asset and six storyboard lines |
| `print-packet` | PASS — 20 rows, 256 cells in 16 columns, and six panels |
| `filename-copy` | PASS — 20 lowercase-safe `.png` names, one per line |
| `free-use` | PASS — an 18-item real packet builds without login or payment |
| `original-prompts` | PASS — all 20 assets have prompts and the original-work reminders |

Landing, legal, metadata, README, and sample copy were checked against the manifest. No unsupported or unlisted product claim remains. The catalog line, “Build a tiny game art checklist before anyone starts drawing.”, is verb-first, ten words, and 61 characters without its newline.

## Normal, invalid, boundary, and recovery paths

- Normal: build, rebuild, progress, Markdown export, filename copy, print, reset, and sample exit passed locally and live.
- Invalid saved data: corrupt JSON showed “Your saved packet could not be read. Build a new packet to replace it.” Building then recovered to 18 assets.
- Blocked storage: the packet stayed usable in the tab and the alert said to keep the tab open or allow site storage.
- Denied clipboard: the message directed the user to export the brief instead.
- Boundaries: 18-, 20-, and 22-item packets passed. Finishing all 22 showed a complete state.
- Empty print: `/print` explained that no packet was ready and linked to the builder.
- Missing route: `/missing-tile` returned the expected HTTP 404, showed “Page not found” and “This page does not exist,” and returned focus to the home H1 after recovery.
- Offline and update: live sample reload passed offline. The two-version worker test proved a current client receives the new hashed shell.

The expected HTTP 404 is not a defect. Normal routes returned 200 and the internal link crawl found no dead product route.

## Accessibility, phone, and keyboard

- The live suite ran Axe on home, sample, privacy, terms, print, and the 404 across desktop and phone coverage. There were zero violations.
- A separate seeded 390 px print scan had zero Axe violations, no horizontal overflow, 20 rows, 256 tile cells, and six panels.
- `/opt/fleet/lib/verify-url.sh` passed title, `lang=en`, one H1, main landmark, image alt text, button labels, and console checks.
- Keyboard-only use reached the skip link, opened the sample, and moved focus to the next asset. Route changes and 404 recovery focused the new H1. No trap was found.
- Focus is visible. The former Reset demo hover/focus contrast regression passed at desktop and phone widths.
- Standalone controls meet the 44 px target baseline. The 390 px layout and 200% text check had no horizontal overflow.
- Reduced motion changes scrolling to `auto`, removes the count transform, and reduces the completion transition to effectively zero.

## Privacy, routes, and delivery

The full sample flow contacted only `https://pixel-brief-builder.sociobot.in`. There were no analytics, API, AI, payment, remote-font, or third-party-script requests. Real and sample state use the documented separate local-storage keys.

The privacy page explains browser storage, standard host logs, removal by clearing site storage, and a privacy email address. The terms page loads at its own URL. There is no collected account or server-side record that needs a deletion workflow.

Home, sample, privacy, terms, print, robots, sitemap, and worker routes returned their expected status and content type. Raw and rendered route titles, descriptions, canonicals, Open Graph fields, and Twitter fields are route-specific. Response headers include a self-only CSP, HSTS, `nosniff`, a referrer policy, and a restrictive permissions policy. Hashed application assets are immutable; the worker is `no-cache, no-store, must-revalidate`.

Backend tenant isolation, restart persistence, health, and 429/`Retry-After` checks do not apply because this product has no backend. Installed-artifact checks do not apply. The deterministic planner already completes the researched job; an AI step would add data sharing without solving a missing part of the job.

## Build, parity, and performance

- Clean `npm ci`: PASS, 138 packages, 0 vulnerabilities.
- Clean `npm test`: PASS — build, lint, 8 unit checks, and 22 browser checks.
- Live `npm test`: PASS — 8 unit checks and 22 browser checks against production.
- Exact `npm run build`: PASS; `dist/` was produced.
- JavaScript: 26.34 kB raw / 9.37 kB gzip.
- CSS: 20.83 kB raw / 5.25 kB gzip.
- Font transfer: 0 B. Desktop hero: 166,302 B. Phone hero: 59,642 B.
- Candidate/live parity: 14 checked route and asset files matched byte-for-byte, including the repaired 404 document.
- Fresh Lighthouse 13.4.1 mobile: performance 100, accessibility 100, best practices 100, SEO 100; LCP 1,230 ms, TBT 0 ms, CLS 0, total transfer 76,397 B.

## Earlier findings

| Earlier finding | Current proof |
| --- | --- |
| V-1: 16×16 template rendered as 8×8 | Fixed — 256 cells in 16 computed columns, screen and print |
| V-1: fixed immutable app URLs could keep stale code | Fixed — hashed JS/CSS, non-immutable worker, passing two-version update test |
| V-1: controls below 44 px | Fixed — phone target regression passes across product routes |
| V-1: distorted full-size phone hero | Fixed — 720×480 phone source renders at 3:2 |
| V-1: soft 404 | Fixed — expected HTTP 404 with a designed recovery route |
| V-1 / F-1-3: wrong `a`/`an` in generated text | Fixed — generator matrix and live output use the correct article |
| F-1-1: seeded print skipped H2 | Fixed — H1 → H2 → H3 outline and zero Axe violations |
| F-1-2 / F-3-1: generic or client-only route metadata | Fixed — direct and rendered metadata are route-specific |
| F-1-4: missing claims and unsupported qualifiers | Fixed — nine claims, exactly one tagged test each; unsupported wording absent |
| F-3-2 through F-3-7: vague headings and changing terms | Fixed — direct headings and consistent “character count,” “16×16 tile template,” and “six-panel storyboard” |
| V-3: Reset demo hover contrast failed | Fixed — direct contrast and Axe regression pass at both widths |
| F-5-1: 404 used metaphorical wording | Fixed — direct “Page not found” copy and passing browser recovery regression |

No earlier blocking or minor finding has reopened.

## Evidence

- First screens: `.factory/evidence/verification-5/desktop-first-screen.png`, `.factory/evidence/verification-5/phone-first-screen.png`.
- Sample: `.factory/evidence/verification-5/desktop-demo.png`, `.factory/evidence/verification-5/phone-demo.png`.
- Repaired 404: `.factory/evidence/verification-5/phone-404.png`.
- URL verifier: `.factory/evidence/verification-5/verify/verify.json` and screenshots in the same directory.
- Lighthouse: `.factory/evidence/verification-5/lighthouse.json`.

Verifier setup notes are not product findings: Playwright required the documented `npm ci`; the URL verifier required its output directory to exist; Lighthouse required the preinstalled Chromium path and `--disable-dev-shm-usage`. Each final command passed.

## Final decision

**PASS — 0 findings and 0 untested claims.**
