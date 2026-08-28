import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('sample creates a finite packet @claim:finite-packet', async ({ page }) => {
  await page.goto('/demo');
  await expect(page.getByRole('heading', { name: 'Plan the Moss Beacon art' })).toBeVisible();
  await expect(page.getByText('20', { exact: true }).first()).toBeVisible();
  await expect(page.locator('[data-asset-id]')).toHaveCount(20);
  await expect(page.locator('[data-asset-id]:checked')).toHaveCount(5);

  page.on('dialog', (dialog) => dialog.accept());
  await page.getByLabel('Character count').selectOption('3');
  await page.getByRole('button', { name: 'Rebuild my art packet' }).click();
  await expect(page.locator('[data-asset-id]')).toHaveCount(22);
});

test('demo stays in its own browser storage @claim:browser-local-only', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  await page.goto('/demo');
  await page.locator('[data-asset-id]').nth(6).check();
  const keys = await page.evaluate(() => Object.keys(localStorage));
  expect(keys).toContain('demo:pixel-brief-builder:v1');
  expect(keys).not.toContain('pixel-brief-builder:real:v1');
  expect(requests.every((url) => new URL(url).origin === 'http://127.0.0.1:4173')).toBe(true);
});

test('demo reloads offline after one visit @claim:offline-reload', async ({ page, context }) => {
  await page.goto('/demo');
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) {
      await new Promise<void>((resolve) => navigator.serviceWorker.addEventListener('controllerchange', () => resolve(), { once: true }));
    }
  });
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Plan the Moss Beacon art' })).toBeVisible();
  await expect(page.getByText('You are offline. Your saved packet still works here.')).toBeVisible();
});

test('export contains every checklist row @claim:markdown-export', async ({ page }) => {
  await page.goto('/demo');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export brief' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('moss-beacon-night-pixel-brief.md');
  const stream = await download.createReadStream();
  const chunks: Buffer[] = [];
  for await (const chunk of stream) chunks.push(Buffer.from(chunk));
  const content = Buffer.concat(chunks).toString('utf8');
  expect(content.match(/^- \[[ x]\]/gm)).toHaveLength(20);
  expect(content.match(/^\d\. /gm)).toHaveLength(6);
});

test('print route includes the checklist and storyboard @claim:print-packet', async ({ page }) => {
  await page.goto('/demo');
  await page.getByRole('link', { name: 'Open printable packet' }).click();
  await expect(page).toHaveURL('/print?demo=1');
  await expect(page.getByRole('heading', { name: 'Print your tiny game plan' })).toBeVisible();
  await expect(page.locator('[data-asset-id]')).toHaveCount(20);
  await expect(page.locator('.story-section li')).toHaveCount(6);
});

test('filenames copy as one line per asset @claim:filename-copy', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/demo');
  await page.getByRole('button', { name: 'Copy filenames' }).click();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied.trim().split('\n')).toHaveLength(20);
  expect(copied).toContain('hero_idle_16.png');
});

test('the real builder works without login or payment @claim:free-use', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Build my art packet' }).click();
  await expect(page.locator('[data-asset-id]')).toHaveCount(18);
  await expect(page.locator('input[type="password"]')).toHaveCount(0);
  await expect(page.getByText('Free to use.')).toBeVisible();
});

test('generated prompts require original shapes @claim:original-prompts', async ({ page }) => {
  await page.goto('/demo');
  await expect(page.getByText(/Create original shapes without references to known games or characters/)).toBeVisible();
  await expect(page.getByText(/Use a clear silhouette and no known character details/).first()).toBeVisible();
});

test('key routes have one h1, route titles, and no serious axe findings', async ({ page }) => {
  for (const route of ['/', '/demo', '/privacy', '/terms', '/missing-tile']) {
    await page.goto(route);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page).toHaveTitle(/Pixel Brief Builder/);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]);
  }
});

test('keyboard opens the demo and reaches a checklist item', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  await page.getByRole('link', { name: 'Try it with sample data' }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/demo');
  await page.getByRole('button', { name: 'Focus next asset' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-asset-id]').nth(5)).toBeFocused();
});

test('mobile layout stays inside the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/demo');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  await expect(page.getByRole('button', { name: 'Export brief' })).toBeVisible();
});
