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

test('missing pages return a real 404', async ({ request }) => {
  expect((await request.get('not-a-page/')).status()).toBe(404);
});
