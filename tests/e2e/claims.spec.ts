import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

function relativeLuminance(rgb: string): number {
  const channels = rgb.match(/\d+(?:\.\d+)?/g)?.map(Number);
  if (!channels || channels.length < 3) throw new Error(`Expected an RGB color, received ${rgb}`);
  const [red, green, blue] = channels.slice(0, 3).map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);
}

function contrastRatio(foreground: string, background: string): number {
  const [lighter, darker] = [relativeLuminance(foreground), relativeLuminance(background)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

test('sample creates a finite packet @claim:finite-packet', async ({ page }) => {
  await page.goto('/demo');
  await expect(page.getByRole('heading', { name: 'Plan the Moss Beacon art' })).toBeVisible();
  await expect(page.getByText('20', { exact: true }).first()).toBeVisible();
  await expect(page.locator('[data-asset-id]')).toHaveCount(20);
  await expect(page.locator('[data-asset-id]:checked')).toHaveCount(5);

  page.on('dialog', (dialog) => dialog.accept());
  await page.getByLabel('Character count').selectOption('1');
  await page.getByRole('button', { name: 'Rebuild my art packet' }).click();
  await expect(page.locator('[data-asset-id]')).toHaveCount(18);

  await page.getByLabel('Character count').selectOption('3');
  await page.getByRole('button', { name: 'Rebuild my art packet' }).click();
  await expect(page.locator('[data-asset-id]')).toHaveCount(22);
});

test('rebuild confirmation protects finished marks @claim:rebuild-confirmation', async ({ page }) => {
  await page.goto('/demo');
  await expect(page.locator('[data-asset-id]')).toHaveCount(20);
  await expect(page.locator('[data-asset-id]:checked')).toHaveCount(5);
  await page.getByLabel('Character count').selectOption('3');

  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toContain('removes 5 finished marks');
    await dialog.dismiss();
  });
  await page.getByRole('button', { name: 'Rebuild my art packet' }).click();
  await expect(page.locator('[data-asset-id]')).toHaveCount(20);
  await expect(page.locator('[data-asset-id]:checked')).toHaveCount(5);

  page.once('dialog', async (dialog) => dialog.accept());
  await page.getByRole('button', { name: 'Rebuild my art packet' }).click();
  await expect(page.locator('[data-asset-id]')).toHaveCount(22);
  await expect(page.locator('[data-asset-id]:checked')).toHaveCount(0);
});

test('Reset demo preserves AA text contrast after pointer reset and keyboard focus @regression:reset-demo-contrast', async ({ page }) => {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    await page.goto('/demo');
    page.once('dialog', (dialog) => dialog.accept());
    await page.getByLabel('Character count').selectOption('3');
    await page.getByRole('button', { name: 'Rebuild my art packet' }).click();

    const reset = page.getByRole('button', { name: 'Reset demo' });
    await reset.hover();
    await reset.click();
    await reset.hover();
    const hoverColors = await reset.evaluate((element) => ({
      foreground: getComputedStyle(element).color,
      background: getComputedStyle(element.closest('.demo-banner')!).backgroundColor,
    }));
    expect(contrastRatio(hoverColors.foreground, hoverColors.background), `Reset demo hover contrast at ${viewport.width}px`).toBeGreaterThanOrEqual(4.5);

    const axe = await new AxeBuilder({ page }).analyze();
    expect(axe.violations.filter((violation) => violation.id === 'color-contrast'), `Reset demo hover axe contrast at ${viewport.width}px`).toEqual([]);

    await page.mouse.move(0, 0);
    await reset.focus();
    await expect(reset).toBeFocused();
    const focusColors = await reset.evaluate((element) => ({
      foreground: getComputedStyle(element).color,
      background: getComputedStyle(element.closest('.demo-banner')!).backgroundColor,
    }));
    expect(contrastRatio(focusColors.foreground, focusColors.background), `Reset demo focus contrast at ${viewport.width}px`).toBeGreaterThanOrEqual(4.5);
  }
});

test('demo stays in its own browser storage @claim:browser-local-only', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  await page.goto('/');
  await page.getByRole('button', { name: 'Build my art packet' }).click();
  const realPacket = await page.evaluate(() => localStorage.getItem('pixel-brief-builder:real:v1'));

  await page.goto('/demo');
  await page.locator('[data-asset-id]').nth(6).check();
  const keys = await page.evaluate(() => Object.keys(localStorage));
  expect(keys).toContain('demo:pixel-brief-builder:v1');
  expect(keys).toContain('pixel-brief-builder:real:v1');
  expect(await page.evaluate(() => localStorage.getItem('pixel-brief-builder:real:v1'))).toBe(realPacket);
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.locator('[data-asset-id]:checked')).toHaveCount(5);
  expect(await page.evaluate(() => localStorage.getItem('pixel-brief-builder:real:v1'))).toBe(realPacket);
  await page.getByRole('button', { name: 'Start for real' }).click();
  await expect(page).toHaveURL('/#builder');
  await expect(page.locator('[data-asset-id]')).toHaveCount(18);
  expect(await page.evaluate(() => localStorage.getItem('demo:pixel-brief-builder:v1'))).toBeNull();
  expect(await page.evaluate(() => localStorage.getItem('pixel-brief-builder:real:v1'))).toBe(realPacket);
  const productOrigin = new URL(page.url()).origin;
  expect(requests.every((url) => new URL(url).origin === productOrigin)).toBe(true);
});

test('the first-screen sample action enters the isolated query demo', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  await expect(page).toHaveURL('/?demo=1');
  await expect(page.getByLabel('Demo mode')).toContainText('nothing is saved to your real packet');
  await expect(page.locator('[data-asset-id]')).toHaveCount(20);
  await expect(page.getByRole('button', { name: 'Reset demo' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Start for real' })).toBeVisible();
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual(['demo:pixel-brief-builder:v1']);
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
  await expect(page.locator('[data-asset-id]')).toHaveCount(20);
  await expect(page.locator('[data-asset-id]:checked')).toHaveCount(5);
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
  expect(content).toContain('## Six-panel storyboard');
});

test('print route includes the checklist and storyboard @claim:print-packet', async ({ page }) => {
  await page.goto('/demo');
  await page.getByRole('link', { name: 'Open printable packet' }).click();
  await expect(page).toHaveURL('/print?demo=1');
  await expect(page.getByRole('heading', { name: 'Print your tiny game plan' })).toBeVisible();
  await expect(page.locator('[data-asset-id]')).toHaveCount(20);
  const tileGuide = page.getByRole('img', { name: /sixteen by sixteen example tile grid/i });
  await expect(tileGuide).toBeVisible();
  await expect(tileGuide.locator(':scope > i')).toHaveCount(256);
  expect(await tileGuide.evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length)).toBe(16);
  await expect(page.locator('.story-section li')).toHaveCount(6);
  await page.emulateMedia({ media: 'print' });
  await expect(tileGuide).toBeVisible();
  await expect(page.locator('.story-section')).toBeVisible();
});

test('filenames copy as one line per asset @claim:filename-copy', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/demo');
  await page.getByRole('button', { name: 'Copy filenames' }).click();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  const filenames = copied.trim().split('\n');
  expect(filenames).toHaveLength(20);
  expect(filenames.every((name) => /^[a-z0-9_]+\.png$/.test(name))).toBe(true);
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
  const prompts = page.locator('.asset-row small');
  await expect(prompts).toHaveCount(20);
  expect((await prompts.allTextContents()).every((line) => /\bDraw\b/.test(line))).toBe(true);
  await expect(page.getByText(/Create original shapes without references to known games or characters/)).toBeVisible();
  await expect(page.getByText(/Use a clear silhouette and no known character details/).first()).toBeVisible();
});

test('key routes have one h1, route titles, no console errors, and no axe findings', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    const expectedMissingPageResponse = new URL(page.url()).pathname === '/missing-tile'
      && message.text().includes('server responded with a status of 404');
    if (message.type() === 'error' && !expectedMissingPageResponse) errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    for (const route of ['/', '/demo', '/privacy', '/terms', '/missing-tile']) {
      await page.goto(route);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page).toHaveTitle(/Pixel Brief Builder/);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations, `${route} at ${viewport.width}px has axe violations`).toEqual([]);
    }
  }
  expect(errors).toEqual([]);
});

test('seeded print headings pass axe', async ({ page }) => {
  await page.goto('/demo');
  await page.goto('/print?demo=1');
  await expect(page.locator('#packet-title')).toHaveJSProperty('tagName', 'H2');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('route metadata stays coherent', async ({ page }) => {
  const cases = [
    ['/', 'Pixel Brief Builder — plan a tiny game art list', 'Choose four limits and get an art checklist, 16×16 tile template, six-panel storyboard, and safe filenames.'],
    ['/demo', 'Demo — Pixel Brief Builder', 'Try a complete sample game art packet without changing your real packet.'],
    ['/?demo=1', 'Demo — Pixel Brief Builder', 'Try a complete sample game art packet without changing your real packet.'],
    ['/privacy', 'Privacy — Pixel Brief Builder', 'Read how Pixel Brief Builder keeps game packets in your browser.'],
    ['/terms', 'Terms — Pixel Brief Builder', 'Read the plain terms for using Pixel Brief Builder.'],
    ['/print?demo=1', 'Print packet — Pixel Brief Builder', 'Print your checklist, 16×16 tile template, and six-panel storyboard.'],
    ['/missing-tile', 'Page not found — Pixel Brief Builder', 'Return to Pixel Brief Builder.'],
  ] as const;

  for (const [route, title, description] of cases) {
    await page.goto(route);
    const path = new URL(page.url()).pathname;
    const canonicalPath = route === '/?demo=1' ? '/demo' : path;
    const canonical = `https://pixel-brief-builder.sociobot.in${canonicalPath}`;
    await expect(page).toHaveTitle(title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', description);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', description);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', canonical);
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', title);
    await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute('content', description);
  }
});

test('direct route responses contain route metadata before JavaScript runs', async ({ request }) => {
  const cases = [
    ['/demo', 200, 'Demo — Pixel Brief Builder', 'Try a complete sample game art packet without changing your real packet.', '/demo'],
    ['/privacy', 200, 'Privacy — Pixel Brief Builder', 'Read how Pixel Brief Builder keeps game packets in your browser.', '/privacy'],
    ['/terms', 200, 'Terms — Pixel Brief Builder', 'Read the plain terms for using Pixel Brief Builder.', '/terms'],
    ['/print?demo=1', 200, 'Print packet — Pixel Brief Builder', 'Print your checklist, 16×16 tile template, and six-panel storyboard.', '/print'],
    ['/missing-tile', 404, 'Page not found — Pixel Brief Builder', 'Return to Pixel Brief Builder.', '/404'],
  ] as const;

  for (const [route, status, title, description, canonicalPath] of cases) {
    const response = await request.get(route, { headers: { Accept: 'text/html' } });
    expect(response.status(), `${route} response status`).toBe(status);
    const html = await response.text();
    const canonical = `https://pixel-brief-builder.sociobot.in${canonicalPath}`;
    expect(html).toContain(`<title>${title}</title>`);
    expect(html).toContain(`<meta name="description" content="${description}"`);
    expect(html).toContain(`<link rel="canonical" href="${canonical}"`);
    expect(html).toContain(`<meta property="og:title" content="${title}"`);
    expect(html).toContain(`<meta property="og:description" content="${description}"`);
    expect(html).toContain(`<meta property="og:url" content="${canonical}"`);
    expect(html).toContain(`<meta name="twitter:title" content="${title}"`);
    expect(html).toContain(`<meta name="twitter:description" content="${description}"`);
  }
});

test('routing restores focus, announces pages, and keeps legal and 404 routes real', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Privacy', exact: true }).first().click();
  await expect(page).toHaveURL('/privacy');
  await expect(page.getByRole('heading', { level: 1, name: 'Your packet stays on your device' })).toBeFocused();
  await expect(page.locator('#route-status')).toHaveText('Your packet stays on your device');

  await page.getByRole('link', { name: 'Terms', exact: true }).click();
  await expect(page).toHaveURL('/terms');
  await expect(page.getByRole('heading', { level: 1, name: 'Use the planner for original work' })).toBeFocused();
  await page.goBack();
  await expect(page).toHaveURL('/privacy');
  await expect(page.getByRole('heading', { level: 1, name: 'Your packet stays on your device' })).toBeFocused();

  const missing = await page.goto('/missing-tile');
  expect(missing?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1, name: 'This path ends at concrete' })).toBeVisible();
  await page.getByRole('link', { name: 'Return to the builder' }).click();
  await expect(page).toHaveURL('/');
});

test('keyboard opens the demo and reaches a checklist item', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  await page.getByRole('link', { name: 'Try it with sample data' }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/?demo=1');
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
  await page.evaluate(() => { document.documentElement.style.fontSize = '32px'; });
  const zoomedOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(zoomedOverflow).toBeLessThanOrEqual(0);
  await expect(page.getByRole('heading', { name: 'Plan the Moss Beacon art' })).toBeVisible();
});

test('reduced motion removes decorative movement', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/demo');
  expect(await page.locator('html').evaluate((element) => getComputedStyle(element).scrollBehavior)).toBe('auto');
  expect(await page.locator('.packet-count').evaluate((element) => getComputedStyle(element).transform)).toBe('none');
  const duration = await page.locator('.asset-row').first().evaluate((element) => parseFloat(getComputedStyle(element, '::before').transitionDuration));
  expect(duration).toBeLessThanOrEqual(0.001);
});

test('standalone mobile controls meet the 44px touch target baseline', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ['/', '/demo', '/privacy', '/terms', '/print?demo=1']) {
    await page.goto(route);
    const undersized = await page.locator('a[href], button, select').evaluateAll((elements) => elements.flatMap((element) => {
      const style = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      if (style.display === 'none' || style.visibility === 'hidden' || box.width === 0 || box.height === 0) return [];
      return box.width >= 43.5 && box.height >= 43.5 ? [] : [{
        label: element.getAttribute('aria-label') ?? element.textContent?.trim() ?? element.tagName,
        width: box.width,
        height: box.height,
      }];
    }));
    expect(undersized, `${route} has undersized standalone controls`).toEqual([]);
  }
});

test('mobile hero keeps its 3:2 frame and serves a smaller source', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const image = page.locator('.hero-art img');
  await expect(image).toBeVisible();
  const size = await image.evaluate((element: HTMLImageElement) => ({
    width: element.getBoundingClientRect().width,
    height: element.getBoundingClientRect().height,
    naturalWidth: element.naturalWidth,
    currentSrc: element.currentSrc,
  }));
  expect(size.width / size.height).toBeCloseTo(1.5, 1);
  expect(size.naturalWidth).toBeLessThan(1200);
  expect(size.currentSrc).toContain('hero-workbench-mobile.webp');
});
