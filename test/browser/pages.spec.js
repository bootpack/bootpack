const { test, expect } = require('@playwright/test');

for (const route of ['', 'templates/starter/', 'templates/grid/', 'templates/jumbotron/', 'templates/navbar/']) {
  test(`loads ${route || 'homepage'} with working assets and navigation`, async ({ page, request }, testInfo) => {
    const failures = [];
    page.on('pageerror', error => failures.push(error.message));
    page.on('requestfailed', request => failures.push(request.url()));
    page.on('response', response => { if (response.status() >= 400) failures.push(`${response.status()}: ${response.url()}`); });
    await page.goto(route || './');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('main')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const icon = await page.locator('link[rel="icon"]').getAttribute('href');
    expect((await request.get(new URL(icon, page.url()).href)).ok()).toBe(true);
    expect(await page.locator('body').evaluate(element => getComputedStyle(element).fontFamily)).toContain('Open Sans');
    const toggle = page.locator('.navbar-toggler').first();
    if (await toggle.isVisible()) {
      await toggle.focus();
      await page.keyboard.press('Enter');
      await expect(toggle).toHaveAttribute('aria-expanded', 'true');
      const target = await toggle.getAttribute('data-bs-target');
      await expect(page.locator(target)).toHaveClass(/\bshow\b/);
    }
    const dropdown = page.locator('[data-bs-toggle="dropdown"]').first();
    await dropdown.click();
    await expect(dropdown).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('.dropdown-menu').first()).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dropdown).toHaveAttribute('aria-expanded', 'false');
    expect(failures).toEqual([]);
    if (!route) await page.screenshot({ path: testInfo.outputPath('homepage.png'), fullPage: true });
  });
}

test('missing pages render a styled self-contained 404 at any depth', async ({ page }) => {
  const failures = [];
  page.on('requestfailed', request => failures.push(request.url()));
  page.on('pageerror', error => failures.push(error.message));
  const response = await page.goto('missing/deep/page/');
  expect(response.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
  await expect(page.locator('script[src], link[href]')).toHaveCount(0);
  expect(await page.locator('body').evaluate(element => getComputedStyle(element).fontFamily)).toContain('Trebuchet MS');
  expect(failures).toEqual([]);
});
