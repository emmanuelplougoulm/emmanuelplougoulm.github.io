import fs from 'node:fs';
import path from 'node:path';

export type LighthouseSummary = {
  generatedAt: string;
  lighthouse: string;
  formFactor: 'desktop' | 'mobile';
  runs: number;
  scores: { performance: number; accessibility: number; bestPractices: number; seo: number };
};

/** Scores Lighthouse du dernier passage en CI (écrits par scripts/lighthouse.mjs). */
export function loadLighthouseSummary(): LighthouseSummary | null {
  const file = path.resolve('src/data/lighthouse-summary.json');
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf8')) as LighthouseSummary;
}
