import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
  { en: '/', fr: '/fr/' },
  { en: '/lab/', fr: '/fr/lab/' },
];

test.describe('smoke', () => {
  test('french home renders in French', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('/fr/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Tester comme un développeur\.\s*Voir comme un designer\./);
    for (const id of ['path', 'practice', 'work', 'contact']) await expect(page.locator(`#${id}`)).toBeVisible();
    await expect(page.locator('#work a.card.feature')).toHaveAttribute('href', '/fr/lab/');
    expect(errors).toEqual([]);
  });

  for (const p of pages) {
    test(`language switch links ${p.en} and ${p.fr}`, async ({ page }) => {
      await page.goto(p.en);
      await page.getByRole('link', { name: 'Version française' }).click();
      await expect(page).toHaveURL(new RegExp(`${p.fr.replace(/\//g, '\\/')}$`));
      await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
      await page.getByRole('link', { name: 'English version' }).click();
      await expect(page).toHaveURL(new RegExp(`${p.en.replace(/\//g, '\\/')}$`));
    });

    test(`hreflang alternates on ${p.fr}`, async ({ page }) => {
      await page.goto(p.fr);
      await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute('href', new RegExp(`${p.en}$`));
      await expect(page.locator('link[rel="alternate"][hreflang="fr"]')).toHaveAttribute('href', new RegExp(`${p.fr}$`));
    });

    test(`no horizontal scroll on ${p.fr}`, async ({ page }) => {
      await page.goto(p.fr);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  test('french nav anchors on the lab lead back to the french home', async ({ page, isMobile }) => {
    test.skip(isMobile, 'navigation links are hidden on small screens');
    await page.goto('/fr/lab/');
    await page.getByRole('navigation', { name: 'Sections' }).getByRole('link', { name: 'Projets' }).click();
    await expect(page).toHaveURL(/\/fr\/#work$/);
  });

  test('french interactions speak French', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/fr/');
    await page.getByRole('button', { name: 'Casser cette page' }).click();
    await expect(page.locator('[data-sum]')).toContainText('déploiement bloqué');
    await page.getByRole('button', { name: 'Restaurer la référence' }).click();
    await expect(page.locator('[data-sum]')).toContainText('déployé seulement si tout est vert');
  });

  test('french a11y layer speaks French', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/fr/?a11y');
    const panel = page.getByTestId('a11y-panel');
    await expect(panel).toContainText('2.4.3 Ordre du focus');
    await expect(panel).toContainText(/\d+ arrêts de tabulation/);
  });
});

for (const path of ['/fr/', '/fr/lab/']) {
  for (const scheme of ['light', 'dark'] as const) {
    test(`a11y › ${path} has no axe violations (${scheme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
      await page.goto(path);
      await page.evaluate(() =>
        Promise.all(
          document.getAnimations()
            .filter((a) => a.effect?.getTiming().iterations !== Infinity)
            .map((a) => a.finished.catch(() => undefined)),
        ),
      );
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.length} node(s)`)).toEqual([]);
    });
  }
}
