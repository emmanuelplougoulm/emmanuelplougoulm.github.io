import { test, expect } from '@playwright/test';

// Le bloc de résultats et l'année changent à chaque build : on les masque.
const masks = (page: import('@playwright/test').Page) => [page.getByTestId('test-run'), page.locator('footer')];

for (const scheme of ['light', 'dark'] as const) {
  test(`visual › page matches baseline (${scheme})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot(`home-${scheme}.png`, { fullPage: true, mask: masks(page) });
  });
}

for (const scheme of ['light', 'dark'] as const) {
  test(`visual › a11y layer matches baseline (${scheme})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
    await page.goto('/?a11y');
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot(`home-a11y-${scheme}.png`, { mask: masks(page) });
  });
}
