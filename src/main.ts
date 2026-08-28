import './style.css';
import {
  generateBrief,
  genres,
  groupAssets,
  mechanics,
  packetAsMarkdown,
  palettes,
  type BriefConfig,
  type BriefPacket,
  type GenreId,
  type MechanicId,
  type PaletteId,
} from './generator';

const REAL_KEY = 'pixel-brief-builder:real:v1';
const DEMO_KEY = 'demo:pixel-brief-builder:v1';
const root = document.querySelector<HTMLDivElement>('#app');

if (!root) throw new Error('The app root is missing.');
const app: HTMLDivElement = root;

let saveProblem = '';
let statusMessage = '';

const demoConfig: BriefConfig = { genre: 'quest', palette: 'moss', characters: 2, mechanic: 'light' };
const defaultConfig: BriefConfig = { genre: 'platformer', palette: 'moss', characters: 1, mechanic: 'collect' };

function isDemoRoute(): boolean {
  return location.pathname === '/demo' || new URLSearchParams(location.search).get('demo') === '1';
}

function storageKey(demo = isDemoRoute()): string {
  return demo ? DEMO_KEY : REAL_KEY;
}

function validConfig(value: unknown): value is BriefConfig {
  if (!value || typeof value !== 'object') return false;
  const config = value as Partial<BriefConfig>;
  return !!genres[config.genre as GenreId]
    && !!palettes[config.palette as PaletteId]
    && [1, 2, 3].includes(config.characters ?? 0)
    && !!mechanics[config.mechanic as MechanicId];
}

function loadPacket(demo = isDemoRoute()): BriefPacket | null {
  try {
    const raw = localStorage.getItem(storageKey(demo));
    if (!raw) return null;
    const stored = JSON.parse(raw) as Partial<BriefPacket>;
    if (!validConfig(stored.config)) throw new Error('Invalid saved setup');
    const clean = generateBrief(stored.config, stored.createdAt ? new Date(stored.createdAt) : new Date());
    const validIds = new Set(clean.assets.map((item) => item.id));
    clean.completed = Array.isArray(stored.completed)
      ? stored.completed.filter((id): id is string => typeof id === 'string' && validIds.has(id))
      : [];
    return clean;
  } catch {
    saveProblem = 'Your saved packet could not be read. Build a new packet to replace it.';
    return null;
  }
}

function savePacket(packet: BriefPacket, demo = isDemoRoute()): void {
  try {
    localStorage.setItem(storageKey(demo), JSON.stringify(packet));
    saveProblem = '';
  } catch {
    saveProblem = 'This browser blocked saving. Keep this tab open or allow site storage.';
  }
}

function seedDemo(): BriefPacket {
  const saved = loadPacket(true);
  if (saved) return saved;
  const packet = generateBrief(demoConfig);
  packet.completed = packet.assets.slice(0, 5).map((item) => item.id);
  savePacket(packet, true);
  return packet;
}

function header(): string {
  return `
    <a class="skip-link" href="#main">Skip to main content</a>
    <header class="site-header">
      <a class="wordmark" href="/" data-route aria-label="Pixel Brief Builder home">
        <span class="wordmark-grid" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
        <span>Pixel Brief Builder</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="/#builder">Build</a>
        <a href="/demo" data-route>Demo</a>
        <a href="/privacy" data-route>Privacy</a>
      </nav>
    </header>`;
}

function footer(): string {
  return `
    <footer class="site-footer">
      <div><strong>Pixel Brief Builder</strong><p>Plan a tiny game art list before you draw.</p></div>
      <nav aria-label="Footer navigation"><a href="/privacy" data-route>Privacy</a><a href="/terms" data-route>Terms</a></nav>
      <p>Built by <a href="https://sociobot.in" rel="external">Param Factory<span class="sr-only"> (external site)</span></a>. Original generated art. v1.0.0</p>
    </footer>`;
}

function demoBanner(): string {
  if (!isDemoRoute()) return '';
  return `<aside class="demo-banner" aria-label="Demo mode">
    <p><strong>Demo</strong> — sample data, nothing is saved to your real packet.</p>
    <div><button class="text-button" type="button" data-action="reset-demo">Reset demo</button><button class="button button-small" type="button" data-action="start-real">Start for real</button></div>
  </aside>`;
}

function offlineBanner(): string {
  return `<div class="offline-banner" data-offline ${navigator.onLine ? 'hidden' : ''}>You are offline. Your saved packet still works here.</div>`;
}

function homePage(): string {
  const packet = loadPacket(false);
  return `
    ${header()}${offlineBanner()}
    <main id="main">
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">A weekend-sized art plan</p>
          <h1 tabindex="-1">Plan your tiny game art first</h1>
          <p class="lede">For an adult and child making a weekend game who need a small, shared drawing list.</p>
          <div class="hero-action"><a class="button button-primary" href="/demo" data-route>Try it with sample data</a><span>Opens a finished 20-item packet.</span></div>
          <ul class="plain-facts" aria-label="Product facts">
            <li>Free to use.</li>
            <li>Saves only in this browser.</li>
            <li>Works offline after the first visit.</li>
          </ul>
        </div>
        <figure class="hero-art concrete-frame">
          <picture>
            <source media="(max-width: 600px)" srcset="/assets/hero-workbench-mobile.webp" />
            <img src="/assets/hero-workbench.webp" width="1200" height="800" fetchpriority="high" alt="An adult and child arrange blank game tiles and storyboard cards on a concrete table." />
          </picture>
          <figcaption>Start with the pieces your weekend can hold.</figcaption>
        </figure>
      </section>
      ${builderSection(packet, false)}
      <section class="steps slab-section" aria-labelledby="steps-heading">
        <div><p class="eyebrow">Three short moves</p><h2 id="steps-heading">How the art packet works</h2></div>
        <ol>
          <li><span>01</span><h3>Pick four limits</h3><p>Choose the game shape, colours, cast, and main action.</p></li>
          <li><span>02</span><h3>Share one list</h3><p>Draw from named files, sizes, prompts, and a four-colour tile guide.</p></li>
          <li><span>03</span><h3>Finish the packet</h3><p>Tick each asset, print six scenes, or export the whole brief.</p></li>
        </ol>
      </section>
      <section class="limits" aria-labelledby="limits-heading">
        <p class="eyebrow">A smaller promise</p>
        <h2 id="limits-heading">This tool stops before drawing</h2>
        <p>It does not generate sprites, copy known characters, or open a game engine. It gives your team a finite original plan.</p>
        <p>Your packet stays in this browser. No account, child profile, analytics, or outside script is used.</p>
      </section>
    </main>
    ${footer()}`;
}

function demoPage(): string {
  const packet = seedDemo();
  return `
    ${demoBanner()}${header()}${offlineBanner()}
    <main id="main" class="demo-main">
      <section class="demo-intro">
        <p class="eyebrow">Sample weekend game</p>
        <h1 tabindex="-1">Plan the Moss Beacon art</h1>
        <p>Five assets are already ticked. Change the limits, finish the list, or export this sample.</p>
      </section>
      ${builderSection(packet, true)}
    </main>
    ${footer()}`;
}

function builderSection(packet: BriefPacket | null, demo: boolean): string {
  const config = packet?.config ?? (demo ? demoConfig : defaultConfig);
  return `<section class="builder ${demo ? 'builder-demo' : ''}" id="builder" aria-labelledby="builder-heading">
    <div class="setup-rail">
      <p class="eyebrow">Your four limits</p>
      <h2 id="builder-heading">Build the art packet</h2>
      <form id="brief-form">
        <label for="genre">Game shape</label>
        <select id="genre" name="genre">
          ${options(genres, config.genre)}
        </select>
        <fieldset><legend>Four-colour palette</legend><div class="palette-options">
          ${Object.entries(palettes).map(([id, palette]) => `<label class="palette-choice"><input type="radio" name="palette" value="${id}" ${config.palette === id ? 'checked' : ''}><span class="swatches swatches-${id}" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span>${palette.label}</span></label>`).join('')}
        </div></fieldset>
        <label for="characters">Character count</label>
        <select id="characters" name="characters">
          <option value="1" ${config.characters === 1 ? 'selected' : ''}>1 character · 18 assets</option>
          <option value="2" ${config.characters === 2 ? 'selected' : ''}>2 characters · 20 assets</option>
          <option value="3" ${config.characters === 3 ? 'selected' : ''}>3 characters · 22 assets</option>
        </select>
        <label for="mechanic">One main action</label>
        <select id="mechanic" name="mechanic">${options(mechanics, config.mechanic)}</select>
        <button class="button button-primary build-button" type="submit">${packet ? 'Rebuild my art packet' : 'Build my art packet'}</button>
        <p class="form-note">Rebuilding replaces this packet after you confirm.</p>
      </form>
    </div>
    <div class="packet-host" id="packet-host">${packetView(packet, demo)}</div>
  </section>`;
}

function options(collection: Record<string, { label: string }>, selected: string): string {
  return Object.entries(collection).map(([id, entry]) => `<option value="${id}" ${selected === id ? 'selected' : ''}>${entry.label}</option>`).join('');
}

function packetView(packet: BriefPacket | null, demo: boolean): string {
  if (!packet) {
    return `<div class="empty-packet concrete-frame">
      <span class="empty-grid" aria-hidden="true"></span>
      <h3>Your finite art list appears here</h3>
      <p>Choose the four limits. Then build an 18, 20, or 22-item packet.</p>
      ${saveProblem ? `<p class="error-note" role="alert">${saveProblem}</p>` : ''}
    </div>`;
  }
  const completed = packet.completed.length;
  const percent = Math.round((completed / packet.assets.length) * 100);
  return `<article class="packet paper-sheet" aria-labelledby="packet-title">
    <header class="packet-header">
      <div><p class="stamp">Pixel art brief</p><h3 id="packet-title">${packet.title}</h3><p>${packet.concept}</p></div>
      <div class="packet-count"><strong>${packet.assets.length}</strong><span>assets total</span></div>
    </header>
    ${saveProblem ? `<p class="error-note" role="alert">${saveProblem}</p>` : ''}
    <section class="progress-block" aria-labelledby="progress-heading">
      <div><h4 id="progress-heading">Packet progress</h4><p><strong>${completed} of ${packet.assets.length}</strong> assets finished</p></div>
      <div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="${packet.assets.length}" aria-valuenow="${completed}" aria-label="${completed} of ${packet.assets.length} assets finished"><i class="progress-${percentClass(percent)}"></i></div>
      ${completed < packet.assets.length ? `<button class="text-button" type="button" data-action="next-asset">Focus next asset</button>` : '<p class="complete-note">Packet complete. Your engine can stay small.</p>'}
    </section>
    <section class="concept-strip" aria-labelledby="palette-heading"><div><h4 id="palette-heading">Four-colour rule</h4><p>${packet.palette.name}</p></div><div class="packet-palette ${paletteClass(packet.config.palette)}" role="img" aria-label="Colours: ${packet.palette.colors.join(', ')}"><i></i><i></i><i></i><i></i></div></section>
    <div class="asset-groups">${assetGroups(packet)}</div>
    ${tileTemplate(packet)}
    ${storyboard(packet)}
    <div class="packet-actions">
      <button class="button button-primary" type="button" data-action="export">Export brief</button>
      <a class="button button-secondary" href="/print${demo ? '?demo=1' : ''}" data-route>Open printable packet</a>
      <button class="text-button" type="button" data-action="copy-files">Copy filenames</button>
    </div>
  </article>`;
}

function assetGroups(packet: BriefPacket): string {
  return [...groupAssets(packet.assets)].map(([group, items]) => `<section class="asset-group" aria-labelledby="group-${slug(group)}">
    <h4 id="group-${slug(group)}">${group}<span>${items.length}</span></h4>
    <ul>${items.map((item) => {
      const done = packet.completed.includes(item.id);
      return `<li class="asset-row ${done ? 'is-complete' : ''}">
        <input type="checkbox" id="asset-${item.id}" data-asset-id="${item.id}" ${done ? 'checked' : ''}>
        <label for="asset-${item.id}"><span class="asset-name">${item.label}${done ? '<em>Finished</em>' : ''}</span><code>${item.filename}</code><small>${item.size} · ${item.prompt}</small></label>
      </li>`;
    }).join('')}</ul>
  </section>`).join('');
}

function tileTemplate(packet: BriefPacket): string {
  return `<section class="tile-section" aria-labelledby="tile-heading">
    <div><h4 id="tile-heading">16×16 tile template</h4><p>Use the four colours only. Keep matching edges clear.</p></div>
    <div class="tile-guide ${paletteClass(packet.config.palette)}" role="img" aria-label="A sixteen by sixteen example tile grid using the ${packet.palette.name} palette">
      ${Array.from({ length: 64 }, (_, index) => `<i class="tile-${tileTone(index)}"></i>`).join('')}
    </div>
    <ul><li>Top: readable edge</li><li>Centre: quiet texture</li><li>Sides: repeat cleanly</li></ul>
  </section>`;
}

function storyboard(packet: BriefPacket): string {
  return `<section class="story-section" aria-labelledby="story-heading">
    <div><h4 id="story-heading">Six-panel storyboard</h4><p>Sketch the whole game before adding more assets.</p></div>
    <ol>${packet.story.map((scene, index) => `<li><span>${index + 1}</span><div class="story-frame" aria-hidden="true"><i></i></div><p>${scene}</p></li>`).join('')}</ol>
  </section>`;
}

function privacyPage(): string {
  return `${header()}<main id="main" class="legal-page"><p class="eyebrow">Privacy</p><h1 tabindex="-1">Your packet stays on your device</h1><p class="legal-lede">Pixel Brief Builder works without an account and does not collect personal data.</p>
    <section><h2>What the browser stores</h2><p>Your game setup and checklist progress use local storage in this browser. Demo progress uses a separate sample-only key.</p></section>
    <section><h2>What leaves the browser</h2><p>No packet content, child information, or usage event is sent to us. The hosting service receives standard request logs when it serves a file.</p></section>
    <section><h2>How to remove a packet</h2><p>Clear this site's browser storage. Resetting the demo removes only sample progress.</p></section>
    <section><h2>Questions</h2><p>Email <a href="mailto:privacy@sociobot.in">privacy@sociobot.in</a>.</p></section>
  </main>${footer()}`;
}

function termsPage(): string {
  return `${header()}<main id="main" class="legal-page"><p class="eyebrow">Terms</p><h1 tabindex="-1">Use the planner for original work</h1><p class="legal-lede">These terms apply when you use Pixel Brief Builder.</p>
    <section><h2>Your work</h2><p>You own the game ideas and art you make. Do not use the prompts to copy protected characters, logos, or game assets.</p></section>
    <section><h2>The free tool</h2><p>The planner is provided as is. You can use its exported briefs for personal, school, or commercial projects.</p></section>
    <section><h2>Availability</h2><p>We may improve or stop the service. Export a brief if you need a separate copy.</p></section>
    <section><h2>Questions</h2><p>Email <a href="mailto:hello@sociobot.in">hello@sociobot.in</a>.</p></section>
  </main>${footer()}`;
}

function printPage(): string {
  const packet = loadPacket(isDemoRoute());
  return `${demoBanner()}${header()}<main id="main" class="print-page">
    <p class="eyebrow">Print packet</p><h1 tabindex="-1">Print your tiny game plan</h1>
    ${packet ? `<div class="print-toolbar"><button class="button button-primary" type="button" data-action="print">Print packet</button><a href="${isDemoRoute() ? '/demo' : '/#builder'}" ${isDemoRoute() ? 'data-route' : ''}>Back to builder</a></div>${packetView(packet, isDemoRoute())}` : `<div class="empty-packet"><h2>No packet is ready</h2><p>Build an art packet before opening the print page.</p><a class="button button-primary" href="/#builder">Build an art packet</a></div>`}
  </main>${footer()}`;
}

function notFoundPage(): string {
  return `${header()}<main id="main" class="not-found"><div class="broken-grid" aria-hidden="true"><i></i><i></i><i></i></div><p class="eyebrow">404 · tile missing</p><h1 tabindex="-1">This path ends at concrete</h1><p>The page is not in this tiny map.</p><a class="button button-primary" href="/" data-route>Return to the builder</a></main>${footer()}`;
}

function routeView(): string {
  if (location.pathname === '/') return homePage();
  if (location.pathname === '/demo') return demoPage();
  if (location.pathname === '/privacy') return privacyPage();
  if (location.pathname === '/terms') return termsPage();
  if (location.pathname === '/print') return printPage();
  return notFoundPage();
}

const routeMeta: Record<string, { title: string; description: string }> = {
  '/': { title: 'Pixel Brief Builder — plan a tiny game art list', description: 'Choose four limits and get a small game art checklist, tile guide, storyboard, and safe filenames.' },
  '/demo': { title: 'Demo — Pixel Brief Builder', description: 'Try a complete sample game art packet without changing your real packet.' },
  '/privacy': { title: 'Privacy — Pixel Brief Builder', description: 'Read how Pixel Brief Builder keeps game packets in your browser.' },
  '/terms': { title: 'Terms — Pixel Brief Builder', description: 'Read the plain terms for using Pixel Brief Builder.' },
  '/print': { title: 'Print packet — Pixel Brief Builder', description: 'Print your game art checklist, tile guide, and six-panel storyboard.' },
};

function render(focusHeading = false): void {
  app.innerHTML = `${routeView()}<div class="sr-only" aria-live="polite" id="route-status"></div><div class="toast" role="status" aria-live="polite" hidden></div>`;
  const meta = routeMeta[location.pathname] ?? { title: 'Page not found — Pixel Brief Builder', description: 'Return to Pixel Brief Builder.' };
  document.title = meta.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://pixel-brief-builder.sociobot.in${location.pathname}`);
  bindEvents();
  if (focusHeading) {
    const heading = document.querySelector<HTMLElement>('main h1');
    heading?.focus({ preventScroll: true });
    const live = document.querySelector('#route-status');
    if (live && heading) live.textContent = heading.textContent;
    window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' });
  }
}

function bindEvents(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[data-route]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      navigate(link.getAttribute('href') ?? '/');
    });
  });
  document.querySelector<HTMLFormElement>('#brief-form')?.addEventListener('submit', onBuild);
  document.querySelectorAll<HTMLInputElement>('[data-asset-id]').forEach((checkbox) => checkbox.addEventListener('change', onCheck));
  document.querySelectorAll<HTMLElement>('[data-action]').forEach((control) => control.addEventListener('click', onAction));
}

function navigate(href: string): void {
  const url = new URL(href, location.origin);
  history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`);
  render(true);
  if (url.hash) requestAnimationFrame(() => document.querySelector(url.hash)?.scrollIntoView());
}

function onBuild(event: SubmitEvent): void {
  event.preventDefault();
  const form = event.currentTarget as HTMLFormElement;
  const data = new FormData(form);
  const config: BriefConfig = {
    genre: data.get('genre') as GenreId,
    palette: data.get('palette') as PaletteId,
    characters: Number(data.get('characters')) as 1 | 2 | 3,
    mechanic: data.get('mechanic') as MechanicId,
  };
  if (!validConfig(config)) {
    showToast('One setup choice is missing. Choose all four limits and try again.');
    return;
  }
  const previous = loadPacket();
  if (previous?.completed.length && !confirm(`Rebuilding removes ${previous.completed.length} finished marks. Rebuild this packet?`)) return;
  const packet = generateBrief(config);
  savePacket(packet);
  updatePacket(packet);
  const button = form.querySelector<HTMLButtonElement>('.build-button');
  if (button) button.textContent = 'Rebuild my art packet';
  announce(`Built ${packet.title} with ${packet.assets.length} assets.`);
}

function onCheck(event: Event): void {
  const checkbox = event.currentTarget as HTMLInputElement;
  const packet = loadPacket();
  if (!packet) return;
  const id = checkbox.dataset.assetId;
  if (!id) return;
  packet.completed = checkbox.checked
    ? [...new Set([...packet.completed, id])]
    : packet.completed.filter((entry) => entry !== id);
  savePacket(packet);
  updatePacket(packet, `asset-${id}`);
  announce(`${packet.completed.length} of ${packet.assets.length} assets finished.`);
}

function onAction(event: Event): void {
  const action = (event.currentTarget as HTMLElement).dataset.action;
  if (action === 'reset-demo') {
    localStorage.removeItem(DEMO_KEY);
    seedDemo();
    render();
    showToast('Demo reset to five finished assets.');
  } else if (action === 'start-real') {
    localStorage.removeItem(DEMO_KEY);
    navigate('/#builder');
  } else if (action === 'next-asset') {
    const packet = loadPacket();
    const next = packet?.assets.find((item) => !packet.completed.includes(item.id));
    document.querySelector<HTMLInputElement>(`#asset-${next?.id}`)?.focus();
  } else if (action === 'export') {
    const packet = loadPacket();
    if (packet) exportPacket(packet);
  } else if (action === 'copy-files') {
    const packet = loadPacket();
    if (packet) void copyFilenames(packet);
  } else if (action === 'print') {
    window.print();
  }
}

function updatePacket(packet: BriefPacket, focusId?: string): void {
  const host = document.querySelector<HTMLDivElement>('#packet-host');
  if (!host) return;
  host.innerHTML = packetView(packet, isDemoRoute());
  host.querySelectorAll<HTMLInputElement>('[data-asset-id]').forEach((checkbox) => checkbox.addEventListener('change', onCheck));
  host.querySelectorAll<HTMLElement>('[data-action]').forEach((control) => control.addEventListener('click', onAction));
  host.querySelectorAll<HTMLAnchorElement>('a[data-route]').forEach((link) => link.addEventListener('click', (event) => {
    event.preventDefault();
    navigate(link.getAttribute('href') ?? '/');
  }));
  if (focusId) document.getElementById(focusId)?.focus();
}

function exportPacket(packet: BriefPacket): void {
  const blob = new Blob([packetAsMarkdown(packet)], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${slug(packet.title)}-pixel-brief.md`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast(`Exported ${packet.assets.length} assets as a Markdown brief.`);
}

async function copyFilenames(packet: BriefPacket): Promise<void> {
  try {
    await navigator.clipboard.writeText(packet.assets.map((item) => item.filename).join('\n'));
    showToast(`Copied ${packet.assets.length} filenames.`);
  } catch {
    showToast('Filenames could not be copied. Export the brief instead.');
  }
}

function showToast(message: string): void {
  statusMessage = message;
  const toast = document.querySelector<HTMLElement>('.toast');
  if (!toast) return;
  toast.textContent = statusMessage;
  toast.hidden = false;
  window.setTimeout(() => { toast.hidden = true; }, 3500);
}

function announce(message: string): void {
  const live = document.querySelector('#route-status');
  if (live) live.textContent = message;
}

function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function paletteClass(id: PaletteId): string {
  return `swatches-${id}`;
}

function percentClass(percent: number): number {
  return Math.min(100, Math.max(0, Math.round(percent / 5) * 5));
}

function tileTone(index: number): number {
  const row = Math.floor(index / 8);
  const column = index % 8;
  if (row < 2 || column === 0 || column === 7) return 1;
  if ((row + column) % 5 === 0) return 3;
  return (row + column) % 3 === 0 ? 2 : 4;
}

function reducedMotion(): boolean {
  return matchMedia('(prefers-reduced-motion: reduce)').matches;
}

window.addEventListener('popstate', () => render(true));
window.addEventListener('online', () => document.querySelector<HTMLElement>('[data-offline]')?.setAttribute('hidden', ''));
window.addEventListener('offline', () => document.querySelector<HTMLElement>('[data-offline]')?.removeAttribute('hidden'));

render();

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => void navigator.serviceWorker.register('/sw.js'));
}
