# Pixel Brief Builder

Plan a tiny game art list before you start drawing.

Pixel Brief Builder is for an adult and child making a game over one weekend. Four choices create an 18, 20, or 22-item art packet with original prompts, safe filenames, a tile guide, and a six-panel storyboard.

[Try the sample](https://pixel-brief-builder.sociobot.in/demo) with five assets already finished. Demo progress uses separate browser storage and never changes a real packet.

## What it includes

- A finite checklist grouped into characters, world tiles, the main mechanic, and screen effects.
- A four-colour tile template and six printable story panels.
- Markdown export and a one-click filename copy action.
- Browser-only progress with a separate demo namespace.
- Offline reload after the first visit.
- Original-work reminders in every generated concept.

The tool is free and has no account or payment step. It does not draw sprites or open a game engine.

## Run locally

Requirements: Node.js 22.12 or newer and npm.

```bash
npm ci
npm run dev
```

Open `http://localhost:5173`. The direct demo URL is `http://localhost:5173/demo`.

## Test and build

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

`npm test` type-checks, builds, lints, and runs the unit and Playwright checks. The production command is `npm run build`. It writes deployable files to `dist/`, with `dist/index.html` at the root.

## Deploy

Deploy `dist/` as an Azure Static Web App. `public/staticwebapp.config.json` supplies SPA routing, cache rules, and security headers. No DNS, billing, environment variable, or server is required.

## Privacy and content

Real progress uses `pixel-brief-builder:real:v1` in local storage. Demo progress uses `demo:pixel-brief-builder:v1`. The app sends no packet data or usage event to another origin.

Prompts tell users to make original shapes and avoid known character details. The hero image was generated for this project. Its prompt and provenance are in [.factory/design.md](.factory/design.md).

See [.factory/claims.json](.factory/claims.json) for tested product claims and [.factory/demo.md](.factory/demo.md) for sandbox details.

## License

MIT. See [LICENSE](LICENSE).
