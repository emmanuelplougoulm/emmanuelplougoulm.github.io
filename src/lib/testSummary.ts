import fs from 'node:fs';
import path from 'node:path';

export type TestLine = { title: string; project: string; ms: number; status: 'passed' | 'failed' | 'flaky' | 'skipped' };
export type TestSummary = {
  generatedAt: string;
  passed: number;
  failed: number;
  flaky: number;
  skipped: number;
  durationMs: number;
  tests: TestLine[];
};

/** Résultat réel de la dernière exécution de la suite Playwright (écrit par scripts/summarize.mjs). */
export function loadTestSummary(): TestSummary | null {
  const file = path.resolve('src/data/test-summary.json');
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf8')) as TestSummary;
}

export function formatMs(ms: number): string {
  return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${Math.round(ms)}ms`;
}
