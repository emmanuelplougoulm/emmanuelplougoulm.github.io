// Audite la page d'accueil construite avec Lighthouse et écrit les 4 scores affichés dans le calque d'accessibilité.
import fs from 'node:fs';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { chromium } from '@playwright/test';
import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';

const PORT = 4398;
const url = `http://localhost:${PORT}/`;
// Même principe que cv-pdf.mjs : binaire astro direct et --ignore-lock, pour un serveur qui s'arrête proprement.
const server = spawn('./node_modules/.bin/astro', ['preview', '--port', String(PORT), '--ignore-lock'], { stdio: 'ignore' });

try {
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch(url)).ok) break; } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  // Le Chromium déjà installé pour Playwright : pas de second navigateur à télécharger en CI.
  const chrome = await launch({ chromePath: chromium.executablePath(), chromeFlags: ['--headless=new', '--no-sandbox'] });
  try {
    // Le score de performance varie d'un passage à l'autre : 3 passages, médiane par catégorie.
    const RUNS = 3;
    const runs = [];
    for (let i = 0; i < RUNS; i++) runs.push((await lighthouse(url, { port: chrome.port, output: 'json', logLevel: 'error' }, desktopConfig)).lhr);
    const median = (xs) => xs.sort((a, b) => a - b)[Math.floor(xs.length / 2)];
    const score = (id) => median(runs.map((lhr) => Math.round((lhr.categories[id]?.score ?? 0) * 100)));
    const summary = {
      generatedAt: new Date().toISOString(),
      lighthouse: runs[0].lighthouseVersion,
      formFactor: 'desktop',
      runs: RUNS,
      scores: {
        performance: score('performance'),
        accessibility: score('accessibility'),
        bestPractices: score('best-practices'),
        seo: score('seo'),
      },
    };
    fs.writeFileSync('src/data/lighthouse-summary.json', JSON.stringify(summary, null, 2) + '\n');
    // Publié avec le site : le build suivant le récupère, comme test-summary.json.
    fs.writeFileSync('public/lighthouse-summary.json', JSON.stringify(summary) + '\n');
    const s = summary.scores;
    console.log(`lighthouse: perf ${s.performance} · a11y ${s.accessibility} · best practices ${s.bestPractices} · seo ${s.seo}`);
  } finally {
    await chrome.kill();
  }
} finally {
  const exited = once(server, 'exit');
  server.kill();
  await exited;
}
