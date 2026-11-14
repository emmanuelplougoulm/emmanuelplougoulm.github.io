import { test, expect } from '@playwright/test';

test.describe('smoke', () => {
  test('replay streams the whole last run', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const run = page.getByTestId('test-run');
    const total = await page.locator('#run-data').evaluate((el) => JSON.parse(el.textContent!).tests.length);
    await page.getByRole('button', { name: 'Replay the last run' }).click();
    await expect(run.locator('[data-lines] > div')).toHaveCount(Math.min(total, 40));
    await expect(run.locator('.suite:not(.done)')).toHaveCount(0);
    await expect(run.locator('[data-sum]')).toContainText('passed');
    await expect(page.getByRole('button', { name: 'Replay the last run' })).toBeEnabled();
  });

  test('break this page fails the visual check, restore heals it', async ({ page }) => {
    await page.goto('/');
    const breakBtn = page.getByRole('button', { name: 'Break this page' });
    const cta = page.getByRole('link', { name: 'See the work ↓' });
    const before = await cta.boundingBox();

    await breakBtn.click();
    await expect(page.locator('[data-sum]')).toContainText('1 failed');
    await expect(page.locator('[data-suite="visual"]')).toHaveClass(/failed/);
    await expect.poll(async () => (await cta.boundingBox())!.x - before!.x).toBeGreaterThan(6);

    await page.getByRole('button', { name: 'Restore baseline' }).click();
    await expect(page.locator('[data-sum]')).toContainText('deployed only if green');
    await expect.poll(async () => Math.round((await cta.boundingBox())!.x - before!.x)).toBe(0);
  });
  test('footer shows the build that is online', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('build-info')).toContainText(/build (local|[0-9a-f]{7})/);
  });

  test('header gains depth once the page scrolls', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header.top');
    await expect(header).not.toHaveClass(/scrolled/);
    await page.evaluate(() => window.scrollTo(0, 600));
    await expect(header).toHaveClass(/scrolled/);
  });
});
