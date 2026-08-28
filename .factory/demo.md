# Demo sandbox

## Entry point

- Deployed: `https://pixel-brief-builder.sociobot.in/demo`
- Local: `http://localhost:5173/demo`
- First-screen query form: `/?demo=1`
- Query form for the printable route: `/print?demo=1`

The first demo screen already contains the **Moss Beacon Night** sample. It is a tiny top-down quest with two characters, a moss-and-stone palette, sleeping beacons, 20 asset rows, six storyboard panels, and five finished marks.

## Isolation

Demo state uses the local storage key `demo:pixel-brief-builder:v1`. Real state uses `pixel-brief-builder:real:v1`. Code chooses one namespace from the route before every read or write. Demo tests assert that the real key is absent after editing sample progress.

No account or network API is involved. The bundled sample and app shell are available through the service worker after the first visit.

## Reset and exit

**Reset demo** deletes only the demo key and restores the seeded sample with five finished assets. **Start for real** deletes the demo key, opens the real builder, and does not copy sample data.

## Verifier path

1. Open `/demo` in a fresh browser context.
2. Confirm the demo banner, 20 rows, and five checked rows.
3. Change any of the four limits and rebuild the packet.
4. Check an asset, export the brief, copy filenames, and open the printable packet.
5. Reset the demo and confirm that the five seeded marks return.
6. Wait for the service worker, go offline, and reload `/demo`.

Every public claim and its tagged command is listed in `.factory/claims.json`.
