import { createHash } from 'node:crypto';
import { defineConfig, type Plugin } from 'vite';

const shellRoutes = ['/', '/demo', '/privacy', '/terms', '/print'];
const publicAssets = [
  '/favicon.svg',
  '/apple-touch-icon.png',
  '/assets/hero-workbench.webp',
  '/assets/hero-workbench-mobile.webp',
];

function serviceWorker(): Plugin {
  return {
    name: 'pixel-brief-service-worker',
    generateBundle(_options, bundle) {
      const builtAssets = Object.keys(bundle)
        .filter((fileName) => /\.(?:js|css)$/.test(fileName))
        .map((fileName) => `/${fileName}`)
        .sort();
      const shell = [...shellRoutes, ...publicAssets, ...builtAssets];
      const version = createHash('sha256').update(shell.join('\n')).digest('hex').slice(0, 12);
      const source = `const CACHE = 'pixel-brief-builder-${version}';
const SHELL = ${JSON.stringify(shell, null, 2)};

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => Promise.all(SHELL.map(async (url) => {
    const response = await fetch(url, { cache: 'reload' });
    if (!response.ok) throw new Error(\`Could not cache \${url}\`);
    await cache.put(url, response);
  }))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).then((response) => {
      if (!response.ok) return response;
      const copy = response.clone();
      return caches.open(CACHE).then((cache) => cache.put(event.request, copy)).then(() => response);
    }).catch(async () => (await caches.match(event.request, { ignoreVary: true }))
      ?? (await caches.match('/', { ignoreVary: true }))
      ?? new Response('This page is not available offline.', { status: 503, headers: { 'Content-Type': 'text/plain' } })));
    return;
  }
  event.respondWith(caches.match(event.request, { ignoreVary: true }).then((cached) => cached ?? fetch(event.request).then((response) => {
    if (!response.ok) return response;
    const copy = response.clone();
    return caches.open(CACHE).then((cache) => cache.put(event.request, copy)).then(() => response);
  }).catch(() => new Response('This file is not available offline.', { status: 503, headers: { 'Content-Type': 'text/plain' } }))));
});
`;
      this.emitFile({ type: 'asset', fileName: 'sw.js', source });
    },
  };
}

export default defineConfig({
  plugins: [serviceWorker()],
  build: {
    target: 'es2022',
    sourcemap: true,
  },
});
