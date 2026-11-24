import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { getExperiments, labRepo } from '../src/data/lab';

const experiments = getExperiments('en');

test.describe('smoke', () => {
  test('lab lists every experiment with its figures and repository link', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('/lab/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Test code, measured.');
    const articles = page.locator('article.exp');
    await expect(articles).toHaveCount(experiments.length);
    for (const [i, e] of experiments.entries()) {
      const article = articles.nth(i);
      await expect(article.getByRole('heading', { level: 2 })).toHaveText(e.title);
      for (const f of e.figures) await expect(article.locator('.exp-stats')).toContainText(f.value);
      await expect(article.getByRole('link', { name: /Protocol and results/ })).toHaveAttribute(
        'href',
        `${labRepo}/tree/main/experiences/${e.slug}`,
      );
    }
    expect(errors).toEqual([]);
  });

  test('the lab is reachable from the nav and from the Work card', async ({ page, isMobile }) => {
    await page.goto('/');
    await expect(page.locator('#work a.card.feature')).toHaveAttribute('href', '/lab/');
    test.skip(isMobile, 'navigation links are hidden on small screens');
    await page.getByRole('navigation', { name: 'Sections' }).getByRole('link', { name: 'Lab' }).click();
    await expect(page).toHaveURL(/\/lab\/$/);
    await expect(page.getByRole('navigation', { name: 'Sections' }).getByRole('link', { name: 'Lab' })).toHaveAttribute('aria-current', 'page');
  });

  test('nav anchors on the lab lead back to the home sections', async ({ page, isMobile }) => {
    test.skip(isMobile, 'navigation links are hidden on small screens');
    await page.goto('/lab/');
    await page.getByRole('navigation', { name: 'Sections' }).getByRole('link', { name: 'Work' }).click();
    await expect(page).toHaveURL(/\/#work$/);
    await expect(page.getByRole('heading', { name: /Public, running, checkable/ })).toBeInViewport();
  });

  test('lab has no horizontal scroll', async ({ page }) => {
    await page.goto('/lab/');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

for (const scheme of ['light', 'dark'] as const) {
  test(`a11y › lab has no axe violations (${scheme})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
    await page.goto('/lab/');
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.length} node(s)`)).toEqual([]);
  });
}
