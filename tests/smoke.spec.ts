import { test, expect } from '@playwright/test';

test.describe('smoke', () => {
  test('home renders all sections', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Testing like a developer\.\s*Seeing like a designer\./);
    for (const id of ['path', 'practice', 'work', 'contact']) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
    expect(errors).toEqual([]);
  });

  test('nav anchors scroll to target', async ({ page, isMobile }) => {
    test.skip(isMobile, 'navigation links are hidden on small screens');
    await page.goto('/');
    await page.getByRole('navigation', { name: 'Sections' }).getByRole('link', { name: 'Work' }).click();
    await expect(page).toHaveURL(/#work$/);
    await expect(page.getByRole('heading', { name: /Public, running, checkable/ })).toBeInViewport();
  });

  test('theme toggle switches and persists', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    const html = page.locator('html');
    await page.getByRole('button', { name: 'Toggle colour theme' }).click();
    await expect(html).toHaveAttribute('data-theme', 'dark');
    await page.reload();
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });

  test('test run card is present', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('test-run')).toContainText('npx playwright test');
  });

  test('no forbidden words on the page', async ({ page }) => {
    await page.goto('/');
    const text = (await page.locator('body').innerText()).toLowerCase();
    // Garde-fou de confidentialité : la liste vit dans une variable de CI, jamais dans le code.
    const banned = (process.env.BANNED_WORDS ?? '').split(',').map((w) => w.trim().toLowerCase()).filter(Boolean);
    for (const word of banned) expect(text, `forbidden word found`).not.toContain(word);
  });
  test('reduced motion keeps every block visible', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const hidden = await page.locator('.reveal').evaluateAll((els) => els.filter((e) => getComputedStyle(e).opacity !== '1').length);
    expect(hidden).toBe(0);
  });

  test('blocks reveal when scrolled into view', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/');
    const title = page.locator('#contact h2');
    await title.scrollIntoViewIfNeeded();
    await expect(title).toHaveClass(/\bin\b/);
    await expect(title).toHaveCSS('opacity', '1');
  });
  test('no horizontal scroll at any width', async ({ page }) => {
    await page.goto('/');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
