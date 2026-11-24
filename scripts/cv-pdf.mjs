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
// Un PDF par langue : la page /cv/ en anglais, /fr/cv/ en français.
const cvs = [
  { path: '/cv/', file: 'dist/cv-emmanuel-plougoulm.pdf' },
  { path: '/fr/cv/', file: 'dist/cv-emmanuel-plougoulm-fr.pdf' },
];
const origin = `http://localhost:${PORT}`;

try {
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch(`${origin}/cv/`)).ok) break; } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const cv of cvs) {
    await page.emulateMedia({ media: 'screen' });
    await page.goto(origin + cv.path, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.emulateMedia({ media: 'print' });
    await page.pdf({ path: cv.file, format: 'A4', printBackground: true, preferCSSPageSize: true });
    console.log(`cv: ${cv.file}`);
  }
  await browser.close();
} finally {
  const exited = once(server, 'exit');
  server.kill();
  await exited;
}
