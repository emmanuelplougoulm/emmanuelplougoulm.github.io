import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const toggle = (page: Page) => page.getByRole('button', { name: /^A11y/ });
const panel = (page: Page) => page.getByTestId('a11y-panel');

// Même règle que le calque : éléments visibles atteignables par Tab.
const countTabStops = (page: Page) =>
  page.evaluate(() => {
    const sel = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex], [contenteditable="true"]';
    const layer = document.getElementById('a11y-layer')!;
    return [...document.querySelectorAll<HTMLElement>(sel)].filter((el) => {
      if (layer.contains(el) || el.tabIndex < 0 || el.closest('[inert], [hidden], [aria-hidden="true"]')) return false;
      const s = getComputedStyle(el);
      return s.visibility !== 'hidden' && s.display !== 'none' && el.getClientRects().length > 0;
    }).length;
  });

test.describe('a11y layer', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
  });

  test('toggles on and off from the header button', async ({ page }) => {
    await expect(toggle(page)).toHaveAttribute('aria-pressed', 'false');
    await expect(panel(page)).toBeHidden();

    await toggle(page).click();
    await expect(toggle(page)).toHaveAttribute('aria-pressed', 'true');
    await expect(panel(page)).toBeVisible();
    await expect(panel(page)).toContainText('2.4.3 Focus order');

    await toggle(page).click();
    await expect(toggle(page)).toHaveAttribute('aria-pressed', 'false');
    await expect(panel(page)).toBeHidden();
  });

  test('draws one numbered badge per tab stop', async ({ page }) => {
    await toggle(page).click();
    const expected = await countTabStops(page);
    expect(expected).toBeGreaterThan(5);
    await expect(page.locator('.a11y-stop:not([style*="display: none"])')).toHaveCount(expected);
    await expect(panel(page)).toContainText(`${expected} tab stops`);
  });

  test('follows keyboard focus and exits with Escape', async ({ page }) => {
    await toggle(page).click();
    await page.keyboard.press('Tab');
    // Le calque affiche le nom accessible : aria-label d'abord, sinon le texte.
    const focused = await page.evaluate(() => {
      const el = document.activeElement!;
      return (el.getAttribute('aria-label') ?? el.textContent ?? '').replace(/\s+/g, ' ').trim();
    });
    await expect(page.locator('.a11y-stop.active')).toHaveCount(1);
    await expect(panel(page).locator('[data-a11y="current"]')).toContainText(focused.slice(0, 10));

    await page.keyboard.press('Escape');
    await expect(panel(page)).toBeHidden();
    await expect(toggle(page)).toBeFocused();
  });

  test('opens directly from a shared link', async ({ page }) => {
    await page.goto('/?a11y');
    await expect(toggle(page)).toHaveAttribute('aria-pressed', 'true');
    await expect(panel(page)).toBeVisible();
  });

  test('passes 2.5.8 on this site: small targets keep their 24 px spacing', async ({ page }) => {
    await toggle(page).click();
    const verdict = panel(page).locator('[data-a11y="targets"]');
    await expect(verdict).toContainText(/^pass · /);
    await expect(page.locator('.a11y-stop.tight')).toHaveCount(0);
  });

  test('flags small targets that sit too close together', async ({ page }) => {
    await toggle(page).click();
    // Deux boutons de 16 px collés : leurs cercles de 24 px se chevauchent, c'est un échec 2.5.8.
    await page.evaluate(() => {
      const box = document.createElement('div');
      box.id = 'crowded';
      box.style.cssText = 'display:flex;gap:2px;padding:40px';
      for (const label of ['Zoom in', 'Zoom out']) {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', label);
        b.style.cssText = 'width:16px;height:16px;padding:0';
        box.append(b);
      }
      document.querySelector('main')!.prepend(box);
    });
    await expect(page.locator('.a11y-stop.tight')).toHaveCount(2);
    await expect(panel(page).locator('[data-a11y="targets"]')).toContainText(/^fail · 2 of \d+ small targets too close/);

    await page.getByRole('button', { name: 'Zoom in' }).focus();
    await expect(panel(page).locator('[data-a11y="current"]')).toContainText('2.5.8 too close');
  });

  test('shows the last Lighthouse audit, or says none is published yet', async ({ page }) => {
    await toggle(page).click();
    const block = page.getByTestId('a11y-lighthouse');
    await expect(block).toContainText('Lighthouse');
    const scores = block.locator('.a11y-score');
    if ((await scores.count()) === 0) {
      await expect(block).toContainText('No published audit yet');
    } else {
      await expect(scores).toHaveCount(4);
      for (const name of ['Performance', 'Accessibility', 'Best practices', 'SEO']) {
        await expect(block).toContainText(new RegExp(`${name}: \\d{1,3} out of 100`));
      }
    }
  });

  for (const scheme of ['light', 'dark'] as const) {
    test(`stays free of axe violations while on (${scheme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
      await toggle(page).click();
      const results = await new AxeBuilder({ page })
        .include('#a11y-layer')
        .include('header.top')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.length} node(s)`)).toEqual([]);
    });
  }
});
