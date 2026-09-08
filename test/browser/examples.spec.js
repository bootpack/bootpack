const { test, expect } = require('@playwright/test');

test('album opens an image and restores keyboard focus', async ({ page }) => {
  await page.goto('templates/album/');
  for (const image of await page.locator('.album-image').all()) {
    expect(await image.evaluate(element => element.complete && element.naturalWidth > 0)).toBe(true);
    const bounds = await image.boundingBox();
    expect(bounds.width / bounds.height).toBeCloseTo(1.5, 1);
  }
  const imageButton = page.getByRole('button', { name: 'View Alpine water' });
  await imageButton.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('[data-album-full]')).toHaveAttribute('alt', /Turquoise/);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(imageButton).toBeFocused();
});

test('pricing changes billing and carries a plan to contact', async ({ page }) => {
  await page.goto('templates/pricing/');
  await page.getByLabel('Annual', { exact: true }).check();
  await expect(page.locator('[data-price]')).toHaveText(['$0', '$180', '$420']);
  await expect(page.locator('[data-period]')).toHaveText(['/ year', '/ year', '/ year']);
  await page.getByLabel('Monthly', { exact: true }).check();
  await expect(page.locator('[data-price]')).toHaveText(['$0', '$18', '$42']);
  await page.getByRole('link', { name: 'Choose Studio' }).click();
  await expect(page.getByLabel('Plan', { exact: true })).toHaveValue('Studio');
});

test('contact validates without sending or storing submitted fields', async ({ page }) => {
  await page.goto('templates/contact/');
  const requests = [];
  page.on('request', request => requests.push(request.url()));
  await page.getByRole('button', { name: 'Preview message' }).click();
  await expect(page.getByRole('status')).toBeEmpty();
  expect(await page.locator('form').evaluate(form => form.checkValidity())).toBe(false);
  await page.getByLabel('Name', { exact: true }).fill('Example Visitor');
  await page.getByLabel('Email', { exact: true }).fill('visitor@example.com');
  await page.getByLabel('Message', { exact: true }).fill('A sample project question.');
  await page.getByRole('button', { name: 'Preview message' }).click();
  await expect(page.getByRole('status')).toHaveText('Preview complete. No message was sent or stored.');
  expect(requests).toEqual([]);
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(page.getByRole('status')).toBeEmpty();
  await expect(page.getByLabel('Name', { exact: true })).toHaveValue('');
});

test('elements exposes collapse and form controls', async ({ page }) => {
  await page.goto('templates/elements/');
  await page.getByRole('button', { name: 'Project details' }).click();
  await expect(page.locator('#element-details')).toHaveClass(/\bshow\b/);
  await page.getByRole('switch', { name: 'Email updates' }).check();
  await expect(page.getByRole('switch', { name: 'Email updates' })).toBeChecked();
  await page.getByLabel('Project status').selectOption('Complete');
  await expect(page.getByLabel('Project status')).toHaveValue('Complete');
});