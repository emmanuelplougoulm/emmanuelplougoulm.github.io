import { defineConfig, devices } from '@playwright/test';

const CI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 1 : 0,
  reporter: [['list'], ['json', { outputFile: 'report.json' }], ['html', { open: 'never' }]],
  // Les captures de référence sont générées sous Linux (CI) : polices et rendu diffèrent sur macOS.
  ignoreSnapshots: !CI,
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: 'disabled' } },
  use: {
    baseURL: 'http://localhost:4322',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } } },
    { name: 'webkit', use: { ...devices['Desktop Safari'], viewport: { width: 1280, height: 800 } }, testIgnore: /visual|links/ },
    { name: 'mobile', use: { ...devices['Pixel 7'] }, testIgnore: /links/ },
  ],
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4322',
    reuseExistingServer: !CI,
  },
});
