import { test, expect } from '@playwright/test';

for (const file of ['cv-emmanuel-plougoulm.pdf', 'cv-emmanuel-plougoulm-fr.pdf']) {
  test(`cv › ${file} is generated and downloadable`, async ({ request }) => {
    const res = await request.get(`/${file}`);
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('application/pdf');
    expect((await res.body()).subarray(0, 5).toString()).toBe('%PDF-');
  });
}

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

test('cv › french page and download', async ({ page }) => {
  await page.goto('/fr/cv/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await expect(page.getByRole('heading', { name: 'Expérience' })).toBeVisible();
  await expect(page.getByText('Fabrica (Benetton), Trévise')).toBeVisible();
  await page.goto('/fr/');
  const download = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Télécharger le CV', exact: true }).click();
  expect((await download).suggestedFilename()).toBe('cv-emmanuel-plougoulm-fr.pdf');
});
