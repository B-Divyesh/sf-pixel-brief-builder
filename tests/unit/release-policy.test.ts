import { readFile, readdir } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

describe('production release policy', () => {
  it('emits content-hashed application assets and precaches those exact URLs', async () => {
    const index = await readFile('dist/index.html', 'utf8');
    const files = await readdir('dist/assets');
    const script = index.match(/src="(\/assets\/index-[^"]+\.js)"/)?.[1];
    const stylesheet = index.match(/href="(\/assets\/index-[^"]+\.css)"/)?.[1];

    expect(script).toMatch(/^\/assets\/index-[A-Za-z0-9_-]+\.js$/);
    expect(stylesheet).toMatch(/^\/assets\/index-[A-Za-z0-9_-]+\.css$/);
    expect(files).toContain(script?.split('/').at(-1));
    expect(files).toContain(stylesheet?.split('/').at(-1));

    const worker = await readFile('dist/sw.js', 'utf8');
    expect(worker).toContain(JSON.stringify(script));
    expect(worker).toContain(JSON.stringify(stylesheet));
    expect(worker).not.toContain('/assets/app.js');
    expect(worker).not.toContain('/assets/app.css');
    expect(worker).toContain("fetch(event.request)");
  });

  it('never marks the worker immutable and keeps real 404 response semantics', async () => {
    const config = JSON.parse(await readFile('dist/staticwebapp.config.json', 'utf8')) as {
      routes: Array<{ route: string; headers?: Record<string, string> }>;
      responseOverrides: Record<string, { rewrite: string; statusCode: number }>;
    };
    const workerPolicy = config.routes.find((route) => route.route === '/sw.js');
    expect(workerPolicy?.headers?.['Cache-Control']).toMatch(/no-cache/);
    expect(workerPolicy?.headers?.['Cache-Control']).not.toMatch(/immutable/);
    expect(config.responseOverrides['404']).toEqual({ rewrite: '/index.html', statusCode: 404 });
  });
});
