import { test, expect } from '@playwright/test';

test('cv › pdf is generated and downloadable', async ({ request }) => {
  const res = await request.get('/cv-emmanuel-plougoulm.pdf');
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toContain('application/pdf');
  expect((await res.body()).subarray(0, 5).toString()).toBe('%PDF-');
});

test('cv › download buttons point to the pdf', async ({ page }) => {
  await page.goto('/');
  const download = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download CV', exact: true }).click();
  expect((await download).suggestedFilename()).toBe('cv-emmanuel-plougoulm.pdf');
});

test('cv › page lists experience and stack', async ({ page }) => {
  await page.goto('/cv/');
  await expect(page.getByRole('heading', { name: 'Experience' })).toBeVisible();
  await expect(page.getByText('Fabrica (Benetton), Treviso')).toBeVisible();
  await expect(page.getByText(/Playwright · Vitest/)).toBeVisible();
});
