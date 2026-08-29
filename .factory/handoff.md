# Pixel Brief Builder — independent verification handoff

> **Release decision, 2026-08-29 UTC: PASS.** Independent verification 4 accepts candidate `a49078c2419c81dcbe4ad8169905d18a33e9a159` at `https://pixel-brief-builder.sociobot.in`.

## What was verified

- Mandatory first-read passed at desktop and 390 px: the first screen plainly states the job, audience, first action, and one-click sample outcome.
- `.factory/claims.json` exists; every literal claim command passed separately after `npm ci` (**9/9**).
- Local `npm test` passed: exact build, typecheck, lint, 8 unit tests, and 22 Playwright tests.
- The same full gate passed with `PLAYWRIGHT_BASE_URL=https://pixel-brief-builder.sociobot.in`.
- Independent live flows covered 18/20/22 assets, full completion, canceled/accepted rebuilds, missing input, malformed storage, demo reset/exit, clipboard denial, export, print, offline reload, and service-worker update.
- Desktop and 390 px route scans had no Axe violations, console/page errors, overflow, keyboard traps, focus failures, reduced-motion failures, or undersized effective touch targets.
- A full live request log contained only same-origin GETs. Security headers, immutable hashed assets, non-immutable worker caching, real 404 behavior, and all links/routes passed.
- Local and deployed route documents, worker, hashed JS/CSS, hero images, and social card match byte-for-byte. The deployment is the candidate.
- Fresh mobile Lighthouse: 100 performance / 100 accessibility / 100 best practices / 100 SEO; LCP 1,299 ms, TBT 73 ms, CLS 0, transfer 76,424 B.

## Defects and gaps

Critical: none. High: none. Medium: none. Low: none. No known release gap remains.

The product has no backend endpoint, unlock call, sign-in, payment, library, or CLI surface, so rate-limit, Entra-tenant, and package-consumer checks do not apply.

## Reproduce

```bash
npm ci
npm test
PLAYWRIGHT_BASE_URL=https://pixel-brief-builder.sociobot.in npm test
/opt/fleet/lib/verify-url.sh https://pixel-brief-builder.sociobot.in .factory/evidence/verification-4
```

Full evidence and exact hashes are in [.factory/verification-4.md](verification-4.md). Verification artifacts are under `.factory/evidence/verification-4/`.
