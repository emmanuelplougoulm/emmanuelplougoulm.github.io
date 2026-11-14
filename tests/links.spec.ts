import { test, expect } from '@playwright/test';

// LinkedIn bloque les requêtes automatisées (code 999) : on ne vérifie que les autres liens externes.
const SKIP = [/linkedin\.com/];

test('links › every external link responds', async ({ page, request }) => {
  await page.goto('/');
  const hrefs = await page.locator('a[href^="http"]').evaluateAll((as) => [...new Set(as.map((a) => (a as HTMLAnchorElement).href))]);
  for (const href of hrefs.filter((h) => !SKIP.some((re) => re.test(h)))) {
    const res = await request.get(href, { maxRedirects: 5 });
    expect.soft(res.status(), href).toBeLessThan(400);
  }
});

test('links › internal anchors resolve', async ({ page }) => {
  await page.goto('/');
  const ids = await page.locator('a[href^="#"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')!.slice(1)));
  for (const id of ids) await expect(page.locator(`[id="${id}"]`), `#${id}`).toHaveCount(1);
});
