# Independent product verification — PASS

Verified 2026-08-28 UTC for work order `pixel-brief-builder-verify-2`.

- Candidate and checked-out commit: `a43c06640037febcb48d3f87774a2684fbd7d7f2`
- Production URL: `https://pixel-brief-builder.sociobot.in`
- Product class: local-first static web app/PWA; there is no backend, sign-in, payment, library, or CLI surface.
- Decision: **PASS — release accepted.**

No product source was changed during this verification. The only changes from this work order are this report and the handoff update.

## Mandatory first read and demo

A fresh cold desktop visit to the live URL stated all required facts in the first screen:

- It does: “Plan your tiny game art first” — a finite art list before drawing.
- It is for: “an adult and child making a weekend game”.
- First action: **Try it with sample data**, with the adjacent result “Opens a finished 20-item packet.”

The visible first-screen facts also state that it is free, browser-local, and works offline after the first visit. One click opened `/demo`, immediately showed the realistic Moss Beacon sample with 20 assets and five complete, and retained the `Demo — sample data, nothing is saved to your real packet` banner with **Reset demo** and **Start for real** controls. This passes the plain-words and demo-sandbox gates.

## Claim gate — all declared commands passed

`.factory/claims.json` exists and has eight declared, tagged demo-sandbox claims. After a clean `npm ci`, every literal `test` command was run. All passed. An initial isolated offline command encountered `ERR_CONNECTION_REFUSED` while an earlier all-claims loop still owned the Playwright preview-port lifecycle; the same exact command passed after that overlapping process finished, and the full suite passed its offline case. This was a runner collision, not a reproducible product failure.

| Claim | Result/evidence |
| --- | --- |
| `finite-packet` | PASS — sample 20 items; rebuilt three-character packet 22 |
| `browser-local-only` | PASS — demo key only and same-origin requests |
| `offline-reload` | PASS — controlled demo reload offline |
| `markdown-export` | PASS — 20 checklist rows and six scenes |
| `print-packet` | PASS — 20 rows, visible 256-cell/16-column guide, six print-visible storyboard panels |
| `filename-copy` | PASS — 20 newline-separated safe filenames |
| `free-use` | PASS — real 18-item packet without account/payment |
| `original-prompts` | PASS — concept and character prompts state original-work constraints |

## Local build and regression checks

- `npm ci`: PASS — 138 packages installed; npm reported 0 vulnerabilities.
- `npm test`: PASS — typecheck, production build, ESLint, 6 Vitest tests, and 15 Playwright tests, including the two-version service-worker update test.
- `npm run typecheck`, `npm run lint`, and the exact `npm run build`: PASS. Build wrote `dist/`.
- Production build budgets: JS 25,650 B raw / 9.27 kB gzip; CSS 20,670 B raw / 5.22 kB gzip; no downloaded fonts; desktop hero 166,302 B and mobile hero 59,642 B. These are inside static-product budgets.
- Independent generator matrix: PASS for all 144 genre × palette × character-count × mechanic configurations. Every output had 18/20/22 items as appropriate, unique safe `.png` filenames, six storyboard steps, and the original-work constraint.

## End-to-end and recovery checks

Fresh live-browser checks passed for desktop and 390×844 mobile:

- Normal sample use; changing game shape/action and rebuilding a three-character packet produced 22 assets. Ticking an item updated progress; Reset demo returned to five completed items.
- Keyboard-only path: Tab reaches the skip link, whose keyboard focus has a 4 px lichen outline plus a 2 px charcoal halo; Enter opens the demo; the next-item action moves focus to the next checkbox. No trap found.
- Invalid user input is constrained by native selects/radios. A deliberately corrupt real-storage value showed the clear alert “Your saved packet could not be read. Build a new packet to replace it.” and a subsequent build recovered to 18 assets.
- Live offline reload after a first `/demo` visit showed the Moss Beacon heading, all 20 assets, and “You are offline. Your saved packet still works here.”
- Reduced motion computed `scroll-behavior: auto`, no decorative transform, and a 0.01 ms completion transition.
- At 390 px there was no horizontal overflow on `/`, `/demo`, `/privacy`, `/terms`, `/print?demo=1`, or the 404 page. All standalone links, buttons, and selects meet the 44 px baseline; labelled checklist and palette controls have an enclosing label target.
- The print packet has the 20-row checklist, real 16×16/256-cell tile guide, and six-panel storyboard under print media.

## Accessibility and errors

Independent Playwright axe scans found **zero serious or critical findings** on `/`, `/demo`, `/privacy`, `/terms`, `/print?demo=1`, and `/missing-tile` at 390 px. Each has one H1; normal routes had zero console/page errors. The expected browser console network message when deliberately visiting `/missing-tile` corresponds to its intentional HTTP 404 response and is not emitted on normal product routes.

The live documents have correct titles, `lang`, main landmark, skip link, heading structure, labelled form controls, image alt text, visible focus, and reduced-motion behavior.

## Privacy, network, delivery, and deployment parity

- Cold-load requests were only the product origin: document, same-origin JS/CSS, and same-origin hero. Exercising the demo likewise made no third-party, analytics, AI, payment, or API request. Real and demo storage use distinct keys (`pixel-brief-builder:real:v1` and `demo:pixel-brief-builder:v1`).
- The production headers include CSP restricted to `'self'`, HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and a restrictive Permissions-Policy.
- `/sw.js` is `no-cache, no-store, must-revalidate`; hashed JS/CSS use `public, max-age=31536000, immutable`; images use the stated one-day stale-while-revalidate policy. `/missing-tile` renders the designed 404 page with HTTP 404.
- Local production build and live files have identical SHA-256 values: `index.html` `e5880f1e…0fff6`; JS `20432190…e5b2`; CSS `fa0ca607…5e0f`; `sw.js` `c714f3b7…e20e8`; mobile hero `61f5bc10…ad5`.
- `https://sociobot.in/`, the sole external HTTP link, resolved 200; mail links were not fetched.

There are no server-side endpoints, so rate-limit testing is not applicable. There is no authentication, so Entra tenant testing is not applicable. The deterministic local builder already fulfils the brief; an AI feature would add unnecessary data sharing rather than useful leverage.

## Lighthouse

Fresh Lighthouse 13.4.1 mobile production run:

| Measure | Result |
| --- | ---: |
| Performance | 100 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| LCP | 1,207 ms |
| CLS | 0 |
| TBT | 42 ms |
| Total transfer | 76,333 B |

## Defects by severity

None found. The deployment is not a deployment-only failure and matches the tested candidate.
