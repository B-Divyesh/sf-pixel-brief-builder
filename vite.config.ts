import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import { notFoundMeta, routeMeta, SITE_ORIGIN, type RouteMetadata } from './src/route-meta.ts';

const shellRoutes = ['/', '/demo', '/privacy', '/terms', '/print'];
const routeDocuments = {
  '/demo': { fileName: 'demo.html', meta: routeMeta['/demo'] },
  '/privacy': { fileName: 'privacy.html', meta: routeMeta['/privacy'] },
  '/terms': { fileName: 'terms.html', meta: routeMeta['/terms'] },
  '/print': { fileName: 'print.html', meta: routeMeta['/print'] },
} as const;
const publicAssets = [
  '/favicon.svg',
  '/apple-touch-icon.png',
  '/assets/hero-workbench.webp',
  '/assets/hero-workbench-mobile.webp',
];

function replaceAttribute(html: string, selector: RegExp, value: string): string {
  return html.replace(selector, `$1${value}$2`);
}

function routeDocument(homeHtml: string, meta: RouteMetadata): string {
  const canonical = `${SITE_ORIGIN}${meta.canonicalPath}`;
  let html = homeHtml.replace(/(<title>)[^<]*(<\/title>)/, `$1${meta.title}$2`);
  html = replaceAttribute(html, /(<meta name="description" content=")[^"]*(" \/>)/, meta.description);
  html = replaceAttribute(html, /(<link rel="canonical" href=")[^"]*(" \/>)/, canonical);
  html = replaceAttribute(html, /(<meta property="og:title" content=")[^"]*(" \/>)/, meta.title);
  html = replaceAttribute(html, /(<meta property="og:description" content=")[^"]*(" \/>)/, meta.description);
  html = replaceAttribute(html, /(<meta property="og:url" content=")[^"]*(" \/>)/, canonical);
  html = replaceAttribute(html, /(<meta name="twitter:title" content=")[^"]*(" \/>)/, meta.title);
  return replaceAttribute(html, /(<meta name="twitter:description" content=")[^"]*(" \/>)/, meta.description);
}

function documentRoute(pathname: string): { fileName: string; meta: RouteMetadata; status: number } | undefined {
  const document = routeDocuments[pathname as keyof typeof routeDocuments];
  if (document) return { ...document, status: 200 };
  if (pathname === '/') return undefined;
  if (/\.[a-z0-9]+$/i.test(pathname)) return undefined;
  return { fileName: '404.html', meta: notFoundMeta, status: 404 };
}

function routeHtmlDocuments(): Plugin {
  let outputDirectory = resolve(process.cwd(), 'dist');
  return {
    name: 'pixel-brief-route-documents',
    enforce: 'pre',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        try {
          const url = new URL(request.url ?? '/', 'http://local.test');
          const route = documentRoute(url.pathname);
          if (!route || !request.headers.accept?.includes('text/html')) return next();
          const source = await readFile(resolve(server.config.root, 'index.html'), 'utf8');
          const html = await server.transformIndexHtml(url.pathname, routeDocument(source, route.meta));
          response.statusCode = route.status;
          response.setHeader('Content-Type', 'text/html; charset=utf-8');
          response.setHeader('Cache-Control', 'no-cache');
          response.end(html);
        } catch (error) {
          next(error as Error);
        }
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (request, response, next) => {
        try {
          const url = new URL(request.url ?? '/', 'http://local.test');
          const route = documentRoute(url.pathname);
          if (!route || !request.headers.accept?.includes('text/html')) return next();
          const html = await readFile(resolve(server.config.root, server.config.build.outDir, route.fileName), 'utf8');
          response.statusCode = route.status;
          response.setHeader('Content-Type', 'text/html; charset=utf-8');
          response.setHeader('Cache-Control', 'no-cache');
          response.end(html);
        } catch (error) {
          next(error as Error);
        }
      });
    },
    configResolved(config) {
      outputDirectory = resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      const homeDocument = await readFile(resolve(outputDirectory, 'index.html'), 'utf8');
      for (const { fileName, meta } of Object.values(routeDocuments)) {
        await writeFile(resolve(outputDirectory, fileName), routeDocument(homeDocument, meta));
      }
      await writeFile(resolve(outputDirectory, '404.html'), routeDocument(homeDocument, notFoundMeta));
    },
  };
}

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
  plugins: [routeHtmlDocuments(), serviceWorker()],
  build: {
    target: 'es2022',
    sourcemap: true,
  },
});
