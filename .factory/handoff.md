# Pixel Brief Builder — repair 4 handoff

## Outcome

**PASS — review 6 finding F-6-1 is fixed. No known product defect remains.**

- Implementation SHA: `390edb89bc38bf09891084af52b5469c78bd5651`.
- Live URL: `https://pixel-brief-builder.sociobot.in`.
- Deployed to the existing `sf-pixel-brief-builder` static app on 2026-09-06 UTC.
- No DNS, billing, staging, backend, shared database, or other product resource was changed.

## Repair

The app now keeps the active real and demo packets in separate tab-memory slots. A packet becomes authoritative in memory before the app attempts a browser-storage write. If that write fails, the warning remains visible while progress, Markdown export, filename copy, confirmed rebuild, printable output, and in-app route changes use the same packet.

The real printable view now returns through client-side routing. This preserves an unsaved in-memory packet when the person returns to the builder.

The new browser regression rejects `Storage.setItem`, proves no value was persisted, and then proves all of these outcomes:

- an 18-row packet renders with the storage warning;
- checking one asset changes written and accessible progress to 1 of 18;
- Markdown exports all 18 rows and the finished mark;
- the clipboard receives 18 safe filenames;
- a confirmed rebuild produces 22 rows;
- print contains 22 rows, 256 tile cells, and six storyboard panels;
- returning from print keeps the 22-row packet and warning.

## Verification

Clean checkout: `/tmp/pixel-brief-repair-4-clean-LK4Uk5`.

- `npm ci`: pass, 138 packages, 0 vulnerabilities.
- Every literal `test` command in `.factory/claims.json`: pass separately, 9 of 9.
- `npm test`: pass, 8 unit checks and 23 Chromium checks.
- `npm run build`: pass; `dist/` contains `index.html` at its root.
- Production `npm test`: pass, 8 unit checks and 23 Chromium checks.
- `/opt/fleet/lib/verify-url.sh`: pass; correct title, `lang=en`, one H1, main landmark, image alternatives, button names, and no console errors.
- Playwright Axe scans: zero violations on home, demo, privacy, terms, seeded print, and the designed 404 at desktop and phone sizes.
- The intended missing route returns HTTP 404 and keeps its direct recovery copy.
- Local and live `index.html` and `index-DBryPx0J.js` SHA-256 values match.

Fresh mobile Lighthouse 13.4.1:

| Measure | Result |
| --- | ---: |
| Performance | 100 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| LCP | 1,001 ms |
| TBT | 41 ms |
| CLS | 0 |
| Total transfer | 76,510 B |

Production budgets remain within contract: JavaScript is 26,734 B raw / 9,435 B gzip; CSS is 20,832 B raw / 5,251 B gzip; the phone hero is 59,642 B; fonts transfer 0 B.

## Cold production exercise

Fresh 1440×900 and 390×844 browsers showed, before scrolling:

- job: **Plan your tiny game art first**;
- audience: an adult and child making a weekend game;
- first action: **Try it with sample data**;
- action result: a finished 20-item packet.

One click opened the populated Moss Beacon Night sample with 20 rows, five finished marks, 256 tile cells, and six storyboard panels. The demo label, reset action, and real-mode action remained present. Editing and resetting the sample returned to five marks and left the separately created real packet byte-identical.

The live blocked-storage exercise rendered 18 rows, changed progress to 1, copied 18 filenames, kept the warning visible, and left the storage key empty. The complete export, rebuild, print, and return path also passed against production in the browser suite.

## Earlier findings

Every earlier repair remains covered and passing: the true 16×16 template, hashed update-safe assets, 44 px controls, phone hero sizing, real 404, correct articles, print heading order, initial and rendered route metadata, complete claims manifest, consistent plain copy, and Reset demo contrast.

## Evidence

- `.factory/evidence/repair-4-live/cold-browser.json`
- `.factory/evidence/repair-4-live/blocked-storage.png`
- `.factory/evidence/repair-4-live/desktop-first-screen.png`
- `.factory/evidence/repair-4-live/phone-first-screen.png`
- `.factory/evidence/repair-4-live/desktop-sample.png`
- `.factory/evidence/repair-4-live/phone-sample.png`
- `.factory/evidence/repair-4-live/verify.json`
- `.factory/evidence/repair-4-live/lighthouse.json`

## Known limits and next steps

The in-memory fallback intentionally lasts only for the current document session. Closing or reloading a tab cannot preserve a packet when the browser rejects storage; the persistent warning tells the person to keep the tab open or allow site storage. This matches the recovery contract.

No backend, account, payment, AI integration, or shared state exists, so tenant, SQLite, health, restart, 429, entitlement, and billing-registration checks do not apply. No paid offer metadata is required because the researched product is free.
