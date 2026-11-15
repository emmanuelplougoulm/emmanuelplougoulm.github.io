# emmanuelplougoulm.github.io

[![Test and deploy](https://github.com/emmanuelplougoulm/emmanuelplougoulm.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/emmanuelplougoulm/emmanuelplougoulm.github.io/actions/workflows/deploy.yml)

Personal website and CV of Emmanuel Plougoulm, SDET. **Live:** [emmanuelplougoulm.github.io](https://emmanuelplougoulm.github.io)

The site is also a small showcase of how I test: it only goes online if its own Playwright suite is green, and the home page displays the results of the run that deployed it.

## Stack

- **Astro 7**, static output, no client framework
- **Playwright** + **axe-core** for the tests
- **GitHub Actions** + **GitHub Pages** for CI and hosting
- The CV is a page of the site (`/cv/`), printed to PDF by Playwright at build time

## What the tests cover

| Suite | Checks |
| --- | --- |
| `smoke` | every section renders, nav anchors scroll to their target, theme toggle persists, reduced motion keeps content visible, no horizontal scroll at any width |
| `interactions` / `stack` | the interactive blocks: test-run replay, the "break this page" demo, the stack grid filters |
| `visual` | full-page screenshots compared to baselines, light and dark, desktop and mobile |
| `a11y` | axe scan in light and dark themes |
| `links` | every external link responds, every internal anchor resolves |
| `cv` | the PDF is generated and downloadable, the CV page lists experience and stack |

Tests run on Chromium, WebKit and a mobile viewport (Pixel 7).

## How the pipeline works

1. Build the site, then run the Playwright suite against the production build.
2. Visual baselines are generated on Linux in CI, because fonts and rendering differ on macOS: locally, screenshot assertions are skipped. A missing baseline is created on the first run and committed back; an existing one must match.
3. If everything is green, the JSON report is summarized (`scripts/summarize.mjs`) and the site is rebuilt with those results shown on the home page.
4. The HTML report is uploaded as an artifact, and the site is deployed to GitHub Pages.

## Run locally

Requires Node.js 22.23.4+ (CI uses Node 24).

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # static site + CV PDF in dist/
npx playwright install chromium webkit
npm test             # runs the suite against the built site
```

All editable content (experience, stack, certifications) lives in `src/data/profile.ts`.
