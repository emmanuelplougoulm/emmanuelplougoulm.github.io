import { test, expect } from '@playwright/test';

test.describe('smoke', () => {
  test('every tile has a logo and the intro count matches', async ({ page }) => {
    await page.goto('/');
    const stack = page.getByTestId('stack');
    const tiles = stack.locator('.cell');
    const count = await tiles.count();
    expect(count).toBeGreaterThan(10);
    await expect(tiles.locator('.cell-logo svg')).toHaveCount(count);
    await expect(stack.locator('.stack-intro')).toContainText(`${count} tools`);
  });

  test('a family button isolates its tiles', async ({ page, isMobile }) => {
    test.skip(isMobile, 'hover-driven on desktop, tap toggles the same state');
    await page.goto('/');
    const stack = page.getByTestId('stack');
    await stack.getByRole('button', { name: /Back-end/ }).click();
    await expect(stack).toHaveAttribute('data-focus', 'back');
    await expect(stack.getByRole('button', { name: /Back-end/ })).toHaveAttribute('aria-pressed', 'true');
    await stack.getByRole('button', { name: /Back-end/ }).click();
    await expect(stack).not.toHaveAttribute('data-focus');
  });

  test('a tile reveals where the tool served', async ({ page, isMobile }) => {
    test.skip(isMobile, 'notes appear on hover or keyboard focus');
    await page.goto('/');
    const tile = page.locator('.cell', { hasText: 'Storybook' });
    await tile.focus();
    await expect(tile.locator('.cell-note')).toHaveCSS('opacity', '1');
  });
});
