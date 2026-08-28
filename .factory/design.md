# Pixel Brief Builder — visual thesis

## Direction: brutalist concrete and moss

The product is a small workbench, not a fantasy storefront. It should feel like a game plan pinned to a concrete workshop wall while moss grows through its seams. Heavy blocks make the scope feel finite. Soft moss marks finished work and gives adults and children a calm shared signal. Nothing resembles a generic centred SaaS hero or an asset marketplace.

The experience uses one painted daytime mode. A second colour theme would weaken the material direction, so contrast and hierarchy are handled inside this deliberate single mode.

## Palette

| Token | Hex | Use |
| --- | --- | --- |
| `--concrete-0` | `#F3F0E7` | paper and primary background |
| `--concrete-1` | `#DDD8C9` | recessed slabs |
| `--concrete-2` | `#AAA698` | dividers and disabled controls |
| `--charcoal` | `#1B211C` | primary text and hard outlines |
| `--moss` | `#375C35` | primary action and progress |
| `--moss-bright` | `#B8D979` | selected fills and focus accents |
| `--lichen` | `#DCE7B4` | soft success surface |
| `--clay` | `#A64227` | warnings and destructive actions |
| `--sky-chalk` | `#D9E7E2` | informational slabs |

Body text on paper is at least 13:1. White text on moss is above 7:1. Moss is never the only completion signal: every complete item also gains a check mark and explicit text.

## Type pairing

- Display: `Arial Black`, `Impact`, `Haettenschweiler`, sans-serif. Uppercase is reserved for the wordmark and small stamped labels. Its blunt shapes match poured concrete.
- Body: `Arial`, `Helvetica Neue`, sans-serif. The familiar forms suit a mixed-age work session and avoid any font download.
- Filenames and counts: `Courier New`, monospace, with tabular figures.

This uses system fonts only. There are no remote or self-hosted font files, so the font transfer budget is zero.

## Spacing and shape

The scale is 4, 8, 12, 16, 24, 32, 48, 72, and 96 pixels. Reading columns stay below 70 characters. Controls are at least 44 pixels high.

Panels use hard 2-pixel charcoal edges, clipped upper-right corners, and 6-pixel offset shadows. Completed rows soften into lichen. Buttons are square workshop stamps, not pills. Fine, irregular aggregate marks are rendered in CSS and the generated illustration, not as a repeated stock texture.

## Layout rhythm

The landing screen is an asymmetric two-column field: a narrow instruction slab and a larger illustrated workbench. The builder becomes a left setup rail beside a live packet. On phones, the packet follows setup, the action bar stays readable, and nonessential texture drops away.

Sections change material instead of using generic cards: paper sheet, recessed concrete, then dark foundation. Checklist groups are independent slabs only because each is a separate work batch.

## Interaction grammar

- A choice presses inward by two pixels and gains a moss edge.
- Regenerating the packet replaces the old sheet and announces the new item count.
- Checking an asset draws a short moss sweep behind that row and updates the written progress count.
- The first incomplete item can be focused from the progress summary.
- Delete and demo-exit actions require clear, specific intent; demo exit discards the sandbox immediately and states that outcome.

## Motion policy

One signature motion is the **moss sweep**: a 220 ms left-to-right scale transform when an item becomes complete. Page changes use a 180 ms opacity transition. Buttons move by 2 pixels only while pressed. Nothing loops.

With `prefers-reduced-motion: reduce`, transforms and transitions are removed. Completion state, text, focus, and layout remain identical.

## Illustration and asset plan

The hero shows a top-down physical planning table: small blank pixel tiles, a six-frame storyboard strip, numbered inventory tags, moss, concrete chips, a blunt pencil, and an adult-sized and child-sized pair of hands arranging original abstract game pieces. It explains that the product produces a plan rather than game art. No screen text is embedded in the image.

Art prompt sheet:

> Editorial still life, top-down tabletop made from pale brutalist concrete, soft green moss growing through one diagonal seam, a small weekend game-planning kit arranged on the slab: blank square pixel-grid tiles, six empty storyboard frames, numbered paper inventory tags, stubby graphite pencil, two pairs of hands only at the far edges (one adult, one child) moving simple original geometric game tokens, tactile paper and aggregate materials, muted cream charcoal forest green and lichen palette, hard morning side light, crisp contact shadows, slightly imperfect handmade composition, no computer screen. No text, no letters, no numbers, no logos, no watermark, no brands, no copyrighted characters, no glossy 3D, no neon, no gradient background.

Expected outputs:

- `public/assets/hero-workbench.webp` at 1200×800, at most 300 KB.
- `public/assets/social-card.webp` at 1200×630, composed from the same generated source with CSS-free raster treatment.
- Hand-authored SVG favicon: a four-cell moss sprout breaking through a concrete square.

Provenance: generated for this product on 2026-08-28 with the Param Factory `factory-image` image deployment through `/opt/fleet/lib/gen-image.sh`. The source PNG and exact prompt sidecar are kept in `assets/src/`. Generated imagery is original to this project and carries no third-party asset dependency.

## Accessibility and responsive intent

The visual order matches DOM order. At 390 pixels, hero art appears below the first action, setup choices become one column, and packet actions wrap. The desktop rail is not sticky on small screens. At 200% text zoom, controls wrap instead of clipping. Every clipped corner has a rectangular focus outline outside it. Print output removes navigation, actions, texture, and background ink while preserving labels and checkboxes.
