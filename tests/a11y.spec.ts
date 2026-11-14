import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const scheme of ['light', 'dark'] as const) {
  test(`a11y › no axe violations (${scheme})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme });
    await page.goto('/');
    // Attendre la fin des fondus d'apparition : axe mesurerait sinon un contraste en cours de transition.
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
