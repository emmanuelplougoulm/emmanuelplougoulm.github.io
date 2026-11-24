// Expériences du labo (github.com/emmanuelplougoulm/sdet-playwright-framework).
// Chaque chiffre vient du README de l'expérience : ne jamais en écrire un qui n'y figure pas.

export const labRepo = 'https://github.com/emmanuelplougoulm/sdet-playwright-framework';

export type Figure = { value: string; label: string };

export type Experiment = {
  num: string;
  slug: string;
  date: string;
  title: string;
  question: string;
  setup: string;
  figures: Figure[];
  takeaway: string;
  limit: string;
};

export const experiments: Experiment[] = [
  {
    num: '01',
    slug: '01-god-object',
    date: '22 Nov 2026',
    title: 'One God object, or fixtures split by responsibility?',
    question: 'For the same change, what does a God object cost compared with split fixtures?',
    setup:
      'The same 8 tests on a demo shop, written twice: one App class that does everything, then one class and one fixture per domain. One change applied to both: the test id of the add-to-cart button.',
    figures: [
      { value: '12 vs 38', label: 'lines to read before editing' },
      { value: '2 vs 8', label: 'tests re-run out of 8 (--only-changed)' },
      { value: '+40%', label: 'lines of code for the split version' },
    ],
    takeaway:
      'The edit itself costs the same: one line in one file. The difference is coupling: with the God object, any change re-runs the whole suite.',
    limit: 'A small suite (8 tests). Run time is not a measurable gain here: both versions do the same work.',
  },
  {
    num: '02',
    slug: '02-storage-state',
    date: '22 Nov 2026',
    title: 'Log in in every test, or share a session?',
    question: 'Which login strategy holds when the suite grows, runs in parallel and outlives a session?',
    setup:
      'Four strategies on the same read-only suite: through the login screen in every test, by request in every test, one global session, one session per worker. Two apps: Firefly III and the demo shop.',
    figures: [
      { value: '62 s vs 31 s', label: '200 tests: login screen vs session per worker' },
      { value: '40 / 40', label: 'tests failed after one logout, one global session, 1 worker' },
      { value: '8 / 8', label: 'tests broken by a broken login screen, when every test uses it' },
    ],
    takeaway:
      'A session per worker is the fastest and keeps incidents local. The login screen then needs tests of its own, or its regressions go unnoticed.',
    limit: 'Below 40 tests the gaps get lost in the noise. Durations are medians of 3 runs.',
  },
  {
    num: '03',
    slug: '03-donnees-de-test',
    date: '23 Nov 2026',
    title: 'Shared test data, or data each test creates?',
    question: 'Where should the data of a suite that writes come from, when it runs in parallel, fails halfway or gets cancelled?',
    setup:
      'Three strategies on a suite that writes to Firefly III: one shared seeded data set, a factory per test, a factory per worker. Then cancelled runs, killed runners and a test that fails before cleaning up.',
    figures: [
      { value: '10 / 40', label: 'tests failed with shared data on 4 workers' },
      { value: '25 s vs 45 s', label: '200 tests: factory per worker vs per test' },
      { value: '+25', label: 'transactions left on the shared account per run' },
    ],
    takeaway:
      'Shared data rules out parallelism, and its failures look like application bugs: a wrong balance, a missing transaction. A factory per worker was the fastest and the most isolated strategy measured.',
    limit: 'Tests in the same worker share their data: one that leaves a trace without failing passes it on.',
  },
  {
    num: '04',
    slug: '04-mocks-reseau',
    date: '23 Nov 2026',
    title: 'Mock the network, or test against the real backend?',
    question: 'A UI suite that mocks the API runs faster. Which bugs does it let through, and what do contract tests catch?',
    setup:
      'The same 6 UI tests on the demo shop, served four ways: the real backend, hand-written mocks, a recorded HAR, contract tests on the API. 10 plausible bugs injected one at a time.',
    figures: [
      { value: '10 / 10', label: 'bugs caught against the real backend' },
      { value: '1 / 10', label: 'with hand-written mocks' },
      { value: '4 / 10', label: 'with mocks and contract tests together' },
    ],
    takeaway:
      'A mocked suite tests the UI alone: 2.5 times faster, blind to what happens behind the mock. Contract tests keep mocks honest, not the app correct: the 6 bugs they missed are the ones users see.',
    limit: 'The 10 bugs were picked by hand: the mix of shape and behaviour bugs drives the contract score.',
  },
];
