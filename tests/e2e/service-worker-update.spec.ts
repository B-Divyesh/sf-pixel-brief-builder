import { createServer, type Server } from 'node:http';
import { cp, mkdtemp, readFile, readdir, rm, unlink, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { test, expect } from '@playwright/test';

const contentTypes: Record<string, string> = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
};

test('an existing client receives the new hashed app shell after a worker update', async ({ browser }) => {
  const temporary = await mkdtemp(join(tmpdir(), 'pixel-brief-update-'));
  const versionOne = join(temporary, 'v1');
  const versionTwo = join(temporary, 'v2');
  let activeRoot = versionOne;
  let server: Server | undefined;

  try {
    await cp('dist', versionOne, { recursive: true });
    await cp('dist', versionTwo, { recursive: true });

    const indexOne = await readFile(join(versionOne, 'index.html'), 'utf8');
    const scriptPath = indexOne.match(/src="(\/assets\/[^"]+\.js)"/)?.[1];
    if (!scriptPath) throw new Error('Built application script was not found.');
    const relativeScript = scriptPath.slice(1);
    const originalScript = await readFile(join(versionOne, relativeScript), 'utf8');
    await writeFile(join(versionOne, relativeScript), `${originalScript}\nglobalThis.__PIXEL_BUILD__='v1';\n`);

    const versionTwoScript = scriptPath.replace(/\.js$/, '-next.js');
    await writeFile(join(versionTwo, versionTwoScript.slice(1)), `${originalScript}\nglobalThis.__PIXEL_BUILD__='v2';\n`);
    await unlink(join(versionTwo, relativeScript));
    await writeFile(join(versionTwo, 'index.html'), indexOne.replace(scriptPath, versionTwoScript));
    const workerTwo = (await readFile(join(versionTwo, 'sw.js'), 'utf8'))
      .replaceAll(scriptPath, versionTwoScript)
      .replace(/pixel-brief-builder-[a-f0-9]+/, 'pixel-brief-builder-browser-update');
    await writeFile(join(versionTwo, 'sw.js'), workerTwo);

    server = createServer(async (request, response) => {
      const pathname = new URL(request.url ?? '/', 'http://127.0.0.1').pathname;
      const relative = pathname === '/' ? 'index.html' : pathname.slice(1);
      let filePath = join(activeRoot, relative);
      let status = 200;
      try {
        const entries = await readdir(filePath);
        if (entries) filePath = join(filePath, 'index.html');
      } catch {
        // A normal file does not need directory handling.
      }
      try {
        const body = await readFile(filePath);
        response.statusCode = status;
        response.setHeader('Content-Type', contentTypes[extname(filePath)] ?? 'application/octet-stream');
        response.setHeader('Cache-Control', pathname === '/sw.js' ? 'no-cache, no-store, must-revalidate' : pathname.startsWith('/assets/index-') ? 'public, max-age=31536000, immutable' : 'no-cache');
        response.end(body);
      } catch {
        status = ['/demo', '/privacy', '/terms', '/print'].includes(pathname) ? 200 : 404;
        response.statusCode = status;
        response.setHeader('Content-Type', contentTypes['.html']);
        response.setHeader('Cache-Control', 'no-cache');
        response.end(await readFile(join(activeRoot, 'index.html')));
      }
    });
    await new Promise<void>((resolve) => server?.listen(0, '127.0.0.1', resolve));
    const address = server.address();
    if (!address || typeof address === 'string') throw new Error('Update test server did not start.');
    const origin = `http://127.0.0.1:${address.port}`;
    const context = await browser.newContext({ serviceWorkers: 'allow' });
    const page = await context.newPage();

    await page.goto(`${origin}/demo`);
    await page.evaluate(async () => {
      await navigator.serviceWorker.ready;
      if (!navigator.serviceWorker.controller) {
        await new Promise<void>((resolve) => navigator.serviceWorker.addEventListener('controllerchange', () => resolve(), { once: true }));
      }
    });
    await expect.poll(() => page.evaluate(() => (globalThis as typeof globalThis & { __PIXEL_BUILD__?: string }).__PIXEL_BUILD__)).toBe('v1');

    activeRoot = versionTwo;
    await page.evaluate(async () => {
      const registration = await navigator.serviceWorker.getRegistration();
      await registration?.update();
    });
    await expect.poll(() => page.evaluate(() => caches.keys())).toContain('pixel-brief-builder-browser-update');
    await page.reload();
    await expect.poll(() => page.evaluate(() => (globalThis as typeof globalThis & { __PIXEL_BUILD__?: string }).__PIXEL_BUILD__)).toBe('v2');
    await expect(page.getByRole('heading', { name: 'Plan the Moss Beacon art' })).toBeVisible();
    await context.close();
  } finally {
    await new Promise<void>((resolve) => server?.close(() => resolve()) ?? resolve());
    await rm(temporary, { recursive: true, force: true });
  }
});
