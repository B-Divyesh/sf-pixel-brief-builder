const CACHE = 'pixel-brief-builder-v2';
const SHELL = [
  '/',
  '/demo',
  '/privacy',
  '/terms',
  '/print',
  '/favicon.svg',
  '/apple-touch-icon.png',
  '/assets/app.js',
  '/assets/app.css',
  '/assets/hero-workbench.webp',
  '/assets/hero-workbench-mobile.webp',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.match(event.request, { ignoreVary: true }).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          void caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        }
        return response;
      }).catch(() => {
        if (event.request.mode === 'navigate') return caches.match('/', { ignoreVary: true });
        return new Response('This file is not available offline.', { status: 503, headers: { 'Content-Type': 'text/plain' } });
      });
    }),
  );
});
