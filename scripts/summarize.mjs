// Transforme le rapport JSON de Playwright en résumé affiché sur la page d'accueil.
import fs from 'node:fs';

const report = JSON.parse(fs.readFileSync('report.json', 'utf8'));
const tests = [];

function walk(suite, prefix = []) {
  const name = suite.file ? suite.file.replace(/\.spec\.ts$/, '') : suite.title;
  // Les blocs test.describe() ont un titre différent du nom de fichier : on l'ajoute au chemin.
  const isDescribe = suite.title && suite.title !== suite.file;
  const path = isDescribe ? [...prefix, suite.title] : prefix;
  for (const spec of suite.specs ?? []) {
    for (const t of spec.tests) {
      const last = t.results.at(-1);
      const status = t.status === 'expected' ? 'passed' : t.status === 'flaky' ? 'flaky' : t.status === 'skipped' ? 'skipped' : 'failed';
      const title = spec.title.includes('›') ? spec.title : [...path, spec.title].filter(Boolean).join(' › ');
      tests.push({ title, project: t.projectName, ms: last?.duration ?? 0, status, file: name });
    }
  }
  for (const child of suite.suites ?? []) walk(child, path);
}
for (const s of report.suites) walk(s);

const count = (st) => tests.filter((t) => t.status === st).length;
// Une ligne par test (projet chromium en priorité) pour l'affichage.
const seen = new Set();
const ORDER = ['smoke', 'visual', 'a11y', 'links', 'cv'];
const rank = (t) => (t.project === 'chromium' ? 0 : 10) + Math.max(0, ORDER.indexOf(t.title.split(' › ')[0]));
const display = [...tests]
  .sort((a, b) => rank(a) - rank(b))
  .filter((t) => t.status !== 'skipped' && !seen.has(t.title) && seen.add(t.title));

const summary = {
  generatedAt: new Date().toISOString(),
  passed: count('passed'),
  failed: count('failed'),
  flaky: count('flaky'),
  skipped: count('skipped'),
  durationMs: Math.round(report.stats?.duration ?? 0),
  tests: display.map(({ title, project, ms, status }) => ({ title, project, ms, status })),
  // Run complet, rejoué test par test par le bouton « Replay the last run ».
  all: tests
    .filter((t) => t.status !== 'skipped')
    .sort((a, b) => rank(a) - rank(b))
    .map(({ title, project, ms, status }) => ({ title, project, ms, status })),
};
fs.writeFileSync('src/data/test-summary.json', JSON.stringify(summary, null, 2) + '\n');
// Publié avec le site : le build suivant le récupère pour rejouer le dernier run en ligne.
fs.writeFileSync('public/test-summary.json', JSON.stringify(summary) + '\n');
console.log(`summary: ${summary.passed} passed, ${summary.failed} failed, ${summary.flaky} flaky`);
