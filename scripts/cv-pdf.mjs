// Génère le CV PDF depuis la page /cv/ du site construit, avec Playwright.
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { chromium } from '@playwright/test';

const PORT = 4399;
// Run the astro binary directly (not through npx) so kill() stops the server itself,
// with --ignore-lock so this one-off server never runs in the background nor holds
// Astro's preview lock, which would block the `astro preview` started by Playwright.
const server = spawn('./node_modules/.bin/astro', ['preview', '--port', String(PORT), '--ignore-lock'], {
  stdio: 'ignore',
});
const url = `http://localhost:${PORT}/cv/`;

try {
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch(url)).ok) break; } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: 'print' });
  await page.pdf({ path: 'dist/cv-emmanuel-plougoulm.pdf', format: 'A4', printBackground: true, preferCSSPageSize: true });
  await browser.close();
  console.log('cv: dist/cv-emmanuel-plougoulm.pdf');
} finally {
  const exited = once(server, 'exit');
  server.kill();
  await exited;
}
