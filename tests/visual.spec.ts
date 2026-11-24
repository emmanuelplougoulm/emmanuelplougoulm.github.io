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
    // Un masque recouvrirait aussi le panneau posé par-dessus : on rend invisibles les zones qui changent
    // à chaque build (résultats de tests, pied de page, scores Lighthouse et leur date) sans toucher au calque.
    // Les scores sont retirés du flux : le panneau garde la même hauteur avec ou sans audit publié.
    const style = [
      '[data-testid="test-run"], footer, .a11y-lh-head span:last-child { visibility: hidden !important; }',
      '.a11y-lh ul, .a11y-lh-empty { display: none !important; }',
    ].join('\n');
    await expect(page).toHaveScreenshot(`home-a11y-${scheme}.png`, { style });
  });
}

for (const scheme of ['light', 'dark'] as const) {
  test(`visual › lab matches baseline (${scheme})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
    await page.goto('/lab/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot(`lab-${scheme}.png`, { fullPage: true, mask: [page.locator('footer')] });
  });
}
