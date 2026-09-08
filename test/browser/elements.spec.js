const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('templates/elements/');
});

test('elements modal and offcanvas trap focus and restore it on Escape', async ({ page }) => {
  for (const [trigger, title] of [['Project summary', 'Field notes summary'], ['Open notebook', 'Notebook']]) {
    const button = page.getByRole('button', { name: trigger, exact: true });
    await button.click();
    const dialog = page.getByRole('dialog', { name: title, exact: true });
    await expect(dialog).toBeVisible();
    await expect.poll(() => dialog.evaluate(element => element.contains(document.activeElement))).toBe(true);
    const focusable = dialog.locator('button, a');
    await focusable.last().focus();
    await page.keyboard.press('Tab');
    await expect(focusable.first()).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(focusable.last()).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
    await expect(button).toBeFocused();
    await expect(page.locator('.modal-backdrop, .offcanvas-backdrop')).toHaveCount(0);
  }
});

test('elements accordion, tabs, toggle and pagination update accessible state', async ({ page }) => {
  await page.getByRole('button', { name: 'Can I invite a collaborator?' }).click();
  await expect(page.locator('#accordion-second')).toHaveClass(/\bshow\b/);
  await expect(page.locator('#accordion-first')).not.toHaveClass(/\bshow\b/);
  await page.getByRole('tab', { name: 'Overview' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Activity' })).toBeFocused();
  await expect(page.getByRole('tab', { name: 'Activity' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel', { name: 'Activity' })).toBeVisible();
  await expect(page.locator('#overview-panel')).not.toBeVisible();
  await page.getByRole('button', { name: 'Follow project' }).click();
  await expect(page.getByRole('button', { name: 'Follow project' })).toHaveAttribute('aria-pressed', 'true');
  await page.locator('label[for="visibility-public"]').click();
  await expect(page.getByLabel('Public', { exact: true })).toBeChecked();
  await expect(page.getByLabel('Private', { exact: true })).not.toBeChecked();
  await page.getByRole('button', { name: 'Project page 2' }).click();
  await expect(page.getByRole('rowheader', { name: 'Autumn collection' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Project page 2' })).toHaveAttribute('aria-current', 'page');
  await page.getByRole('button', { name: 'Project page 1' }).click();
  await expect(page.getByRole('rowheader', { name: 'Field notes' })).toBeVisible();
});

test('elements tooltips, popovers, toasts and alerts open and dismiss', async ({ page }) => {
  const tooltipButton = page.getByRole('button', { name: 'Workspace access' });
  await tooltipButton.focus();
  await expect(page.getByRole('tooltip')).toHaveText('Visible only to your team');
  await page.getByRole('button', { name: 'Plan details' }).focus();
  await expect(page.locator('.popover')).toContainText('Includes five collaborators');
  await expect(page.locator('.tooltip')).toHaveCount(0);
  await page.getByRole('button', { name: 'Show notification' }).click();
  await expect(page.locator('.popover')).toHaveCount(0);
  await expect(page.locator('#elements-toast')).toBeVisible();
  await page.getByRole('button', { name: 'Dismiss notification' }).click();
  await expect(page.locator('#elements-toast')).not.toBeVisible();
  await page.getByRole('button', { name: 'Dismiss saved alert' }).click();
  await expect(page.locator('#elements-alert')).toHaveCount(0);
});

test('elements carousel and scrollspy respond without autoplay', async ({ page }) => {
  const carousel = page.locator('#elements-carousel');
  await expect(carousel.locator('.carousel-item.active')).toHaveAttribute('aria-label', '1 of 2');
  await page.getByRole('button', { name: 'Next photograph' }).click();
  await expect(carousel.locator('.carousel-item.active')).toHaveAttribute('aria-label', '2 of 2');
  await page.getByRole('button', { name: 'Previous photograph' }).click();
  await expect(carousel.locator('.carousel-item.active')).toHaveAttribute('aria-label', '1 of 2');
  await expect(carousel).not.toHaveAttribute('data-bs-ride');
  await page.locator('[data-elements-scroll]').scrollIntoViewIfNeeded();
  await page.locator('[data-elements-scroll]').evaluate(element => { element.scrollTop = element.scrollHeight; });
  await expect(page.locator('#scrollspy-nav a[href="#chapter-return"]')).toHaveClass(/\bactive\b/);
});

test('elements form validation is local and resets cleanly', async ({ page }) => {
  const form = page.locator('[data-elements-form]');
  const requests = [];
  page.on('request', request => requests.push(request.url()));
  await page.getByRole('button', { name: 'Preview preferences' }).click();
  await expect(form).toHaveClass(/was-validated/);
  await expect(page.locator('#elements-name-error')).toBeVisible();
  await page.getByLabel('Display name').fill('Example visitor');
  await page.getByLabel('Email address', { exact: true }).fill('visitor@example.com');
  await page.getByRole('button', { name: 'Preview preferences' }).click();
  await expect(form.getByRole('status')).toHaveText('Preferences previewed. Nothing was sent or stored.');
  expect(requests).toEqual([]);
  await page.getByRole('button', { name: 'Reset preferences' }).click();
  await expect(form).not.toHaveClass(/was-validated/);
  await expect(form.getByRole('status')).toBeEmpty();
  await expect(page.getByLabel('Display name')).toBeEmpty();
});

test('elements and album receive only their assigned page assets after shared assets', async ({ page }) => {
  for (const route of ['elements', 'album', 'starter']) {
    await page.goto(`templates/${route}/`);
    const styles = await page.locator('link[rel="stylesheet"]').evaluateAll(links => links.map(link => link.href));
    const scripts = await page.locator('script[src]').evaluateAll(links => links.map(link => link.src));
    const mapped = route !== 'starter';
    expect(styles).toHaveLength(mapped ? 2 : 1);
    expect(scripts).toHaveLength(mapped ? 2 : 1);
    expect(styles[0]).toMatch(/\/css\/styles\.[a-f\d]+\.css$/);
    expect(scripts[0]).toMatch(/\/js\/index\.[a-f\d]+\.js$/);
    if (mapped) {
      expect(styles[1]).toContain(`/css/pages/templates/${route}/index.`);
      expect(scripts[1]).toContain(`/js/pages/templates/${route}/index.`);
      expect((await page.request.get(styles[1])).ok()).toBe(true);
    }
    const shared = await page.request.get(styles[0]);
    expect(await shared.text()).not.toContain('.elements-photo');
    expect(await shared.text()).not.toContain('.album-image');
  }
});