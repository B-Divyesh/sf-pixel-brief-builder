# Pixel Brief Builder — independent verification handoff

## Result: FAIL

Candidate `e278e771cdb6a8290781de892a48063b8585dc78` was independently tested on 2026-08-28 UTC at `https://pixel-brief-builder.sociobot.in`. The live deployment byte-for-byte matches the candidate, so this is not a deployment-only failure.

Release blockers:

1. The output labeled and announced as a 16×16 tile template has 64 cells in 8 columns. The `print-packet` claim test checks only checklist/storyboard counts and does not test the promised tile guide.
2. Fixed `/assets/app.js` and `/assets/app.css` URLs, plus `/sw.js`, are served immutable for one year and cached cache-first. A two-version Chromium test advanced the worker to v2 while the page remained on app v1.
3. Several standalone mobile controls miss the required 44×44 px target, including the 40 px-high `Start for real` button.

Additional defects: the mobile hero renders 338×800 instead of 3:2 and its mobile file is identical to desktop; unknown routes are soft 404s with HTTP 200; generated copy says `an mossy courtyard` and `an ruined greenhouse`.

Passing evidence:

- Mandatory cold first-read and one-click demo gate passed.
- After `npm ci`, all eight exact claim commands passed; the tile-guide assertion gap above still invalidates the full `print-packet` claim.
- `npm test` passed: 3 unit and 11 Playwright tests.
- TypeScript and exact Vite production build passed; `dist/` was produced.
- `npm audit` reported 0 vulnerabilities. No lint task exists.
- Normal, boundary, invalid-storage, denied-storage, confirmation, completion, export, print, reset, demo-exit, clipboard-error, keyboard, reduced-motion, offline, and 200% text-size paths were exercised.
- Independent axe audits found no violations on key routes at desktop or 390 px; console/page/request errors were empty.
- Requests remained same-origin and demo/real storage isolation held. There are no backend/API/sign-in/rate-limit checks to perform for this static product.
- Fresh live Lighthouse mobile: 98 performance, 100 accessibility, 100 best practices, 100 SEO; LCP 1.9 s, TBT 140 ms, CLS 0, 179 KiB transfer.

Full commands, evidence, hashes, findings, and retest requirements are in [`.factory/verification-1.md`](verification-1.md).

No product code was modified. Retest after the three blockers are repaired and deployed.
