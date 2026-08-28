# Pixel Brief Builder — build handoff

Built and verified on 2026-08-28 for work order `pixel-brief-builder-build-1`.

## What shipped

- A responsive Vite and TypeScript static app with no runtime framework.
- Four setup limits: genre, four-colour palette, one to three characters, and one mechanic.
- Deterministic 18, 20, or 22-item packets with grouped checklists, dimensions, original-art prompts, and safe filenames.
- A live four-colour tile guide and printable six-panel storyboard.
- Checklist progress, progress summary, next-item keyboard focus, Markdown export, filename copy, and print layout.
- A first-class empty state, bad-storage error, offline notice, native rebuild confirmation, and completed state.
- Real routes for `/`, `/demo`, `/privacy`, `/terms`, `/print`, and a styled unknown-route view.
- An isolated `/demo` with a 20-item Moss Beacon Night packet, five finished marks, reset, and clean exit.
- Local-only persistence with separate real and demo storage keys.
- A service worker that caches the app shell and demo for offline reload.
- Route titles, canonical and social metadata, sitemap, robots file, favicon, security headers, and Azure SPA fallback.
- The original concrete-and-moss hero image, generated for this product and optimized to 163 KB WebP.

The product intentionally stops at planning. It does not create sprites, run a game, or use an AI service at runtime.

## Run and deploy

```bash
npm ci
npm test
npm run build
```

The exact production build command is `npm run build`. Output lands in `dist/`, and `dist/index.html` is at its root. Deploy the contents of `dist/` as the Azure Static Web App artifact.

The clean demo entry point is `/demo`. Sandbox details are in `.factory/demo.md`.

## Verification

- `npm test`: passed.
- Vitest: 3 tests passed.
- Playwright 1.58.2 on Chromium: 11 tests passed.
- Tagged product claims: 8 passed, including offline reload, storage isolation, finite item counts, Markdown export, print output, filename copy, free use, and original-work prompts.
- Axe through Playwright: no serious or critical findings on home, demo, privacy, terms, or the unknown-route view.
- `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173/demo .factory/evidence`: passed with no console errors, one `h1`, `lang=en`, a main landmark, and no missing image alt text.
- Mobile browser check: no horizontal overflow at 390 × 844 CSS pixels.
- `npm audit`: 0 vulnerabilities.

Lighthouse 12.8.2 mobile results against the local production build:

| Category or metric | Result |
| --- | ---: |
| Performance | 99 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| Largest Contentful Paint | 2.1 s |
| First Contentful Paint | 0.9 s |
| Total Blocking Time | 10 ms |
| Cumulative Layout Shift | 0 |

Production transfer sizes from Vite:

| Asset | Gzip or file size |
| --- | ---: |
| Initial JavaScript | 9.21 KB gzip |
| CSS | 5.20 KB gzip |
| Hero WebP | 163 KB |
| Fonts | 0 KB |

Evidence is in `.factory/evidence/`. Claim definitions and exact commands are in `.factory/claims.json`.

## Known gaps and next steps

- The success measure is not collected because v1 has no analytics. A privacy-preserving, aggregate page count could be added by the factory later.
- Local progress does not sync between devices. This matches the local-first, no-account v1 scope.
- The fixed app asset names require the service-worker cache version to change with future releases. Increment the cache key when shipping an update.
- Test the packet with adult-child pairs and classroom groups before expanding the genre list. Keep every new setup within the 24-asset ceiling.
