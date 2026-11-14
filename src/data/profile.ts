// Tout le contenu éditable du site est ici.
// Règle : rien d'interne sur le poste actuel (aucun nom d'entreprise, client, produit ou collègue).

export const links = {
  linkedin: 'https://www.linkedin.com/in/emmanuel-plougoulm-89393560/',
  github: 'https://github.com/emmanuelplougoulm',
  source: 'https://github.com/emmanuelplougoulm/emmanuelplougoulm.github.io',
  email: '', // adresse pro dédiée, à ajouter quand elle existe
  cv: '/cv-emmanuel-plougoulm.pdf', // généré par Playwright au build (scripts/cv-pdf.mjs)
};

/** Technos phares. `logo` = nom d'icône Simple Icons (sans le préfixe « si »), ou `icon` = icône maison. */
export type Tech = { label: string; logo?: string; icon?: string };

export const coreStack: Tech[] = [
  { label: 'Playwright', icon: 'playwright' },
  { label: 'TypeScript', logo: 'Typescript' },
  { label: 'Vue.js', logo: 'Vuedotjs' },
  { label: 'React', logo: 'React' },
  { label: 'Node.js', logo: 'Nodedotjs' },
  { label: 'Docker', logo: 'Docker' },
  { label: 'Figma', logo: 'Figma' },
];

export type StackItem = Tech & { note: string };
export type StackGroup = { name: string; key: string; items: StackItem[] };

/** Tableau périodique de la stack. `note` = une ligne factuelle (tirée du parcours) affichée au survol. */
export const stackGroups: StackGroup[] = [
  { name: 'Testing', key: 'test', items: [
    { label: 'Playwright', icon: 'playwright', note: 'Daily driver, first suite in 2022' },
    { label: 'Vitest', logo: 'Vitest', note: 'Unit and browser tests' },
    { label: 'axe', icon: 'access', note: 'Accessibility checks in CI' },
    { label: 'Visual regression', icon: 'pixel', note: 'Screenshots rendered in Docker' },
  ] },
  { name: 'Front-end', key: 'front', items: [
    { label: 'TypeScript', logo: 'Typescript', note: 'Brought it into a legacy codebase' },
    { label: 'JavaScript', logo: 'Javascript', note: 'Where the code chapter started' },
    { label: 'Vue.js', logo: 'Vuedotjs', note: 'Led a Vue 2 to 3 migration' },
    { label: 'React', logo: 'React', note: 'HR app used by 3,000 people' },
    { label: 'Electron', logo: 'Electron', note: 'Desktop client, Figma to release' },
  ] },
  { name: 'Back-end', key: 'back', items: [
    { label: 'Node.js', logo: 'Nodedotjs', note: 'APIs and tooling' },
    { label: 'NestJS', logo: 'Nestjs', note: 'Split a monolith into services' },
  ] },
  { name: 'CI & tooling', key: 'ci', items: [
    { label: 'Docker', logo: 'Docker', note: 'Same pixels on every machine' },
    { label: 'GitLab CI', logo: 'Gitlab', note: 'Quality gates on every merge' },
    { label: 'GitHub Actions', logo: 'Githubactions', note: 'Tests, then deploy if green' },
    { label: 'Git', logo: 'Git', note: 'Everything versioned' },
    { label: 'Jira', logo: 'Jira', note: 'Test plans and defects' },
  ] },
  { name: 'Design', key: 'design', items: [
    { label: 'Figma', logo: 'Figma', note: 'From mockups to production UI' },
    { label: 'Storybook', logo: 'Storybook', note: 'Library of 30+ components' },
    { label: 'Lighthouse', logo: 'Lighthouse', note: 'Cut load time by 20%' },
  ] },
];

/** Pour le CV. */
export const cvSummary =
  'SDET in Paris, working with Playwright and TypeScript. Former fullstack JS/TS developer and graphic designer, I test front-ends the way they were built and the way they are seen: functional flows, visual regression and accessibility.';
export const certifications = [
  { when: '2025', title: 'ISTQB® Certified Tester, Foundation Level (CTFL)' },
  { when: '2025', title: 'Playwright: web automation testing (training certificate)' },
  { when: 'In progress', title: 'ISTQB® CTAL Test Automation Engineering' },
];
export const education = [{ title: 'Wild Code School', detail: 'Web development' }];
export const languages = 'French · English';

export type Role = { when: string; title: string; where: string; did: string };
export type Phase = {
  name: string;
  branch: string;
  current?: boolean;
  roles: Role[];
  /** Citation affichée sous la phase. Vide = rien n'est affiché. */
  quote?: string;
};

export const phases: Phase[] = [
  {
    name: 'Quality',
    branch: 'qa · 2025 → now',
    current: true,
    roles: [
      {
        when: '2025 — now',
        title: 'SDET / Functional QA',
        where: 'SaaS platform, Paris',
        did: 'Owner of front-end quality: manual testing and Playwright automation, visual regression, test strategy.',
      },
      {
        when: '2025',
        title: 'Career change',
        where: 'Training',
        did: 'Playwright automation training, then ISTQB® CTFL. Now preparing CTAL Test Automation Engineering.',
      },
    ],
    quote: 'It felt like a natural step. Testing gives me the cross-cutting view I was looking for, and quality was already what I cared about most.',
  },
  {
    name: 'Code',
    branch: 'dev · 2018 → 2025',
    roles: [
      {
        when: '2024 — 2025',
        title: 'Software engineer & PO',
        where: 'Code-analysis startup',
        did: 'Desktop client in React and Electron, from Figma to first release.',
      },
      {
        when: '2022 — 2023',
        title: 'Fullstack developer',
        where: 'Payments fintech',
        did: 'First Playwright suite, Storybook library of 30+ components, Vue 2 → 3 migration.',
      },
      {
        when: '2018 — 2022',
        title: 'Fullstack developer',
        where: 'Consulting firm',
        did: 'React and TypeScript apps, SSO, Figma designs shipped to production.',
      },
    ],
    quote: 'I wanted to understand what happens under the hood, and to be able to build things myself, not just draw them.',
  },
  {
    name: 'Design',
    branch: 'design · 2010 → 2017',
    roles: [
      {
        when: '2014 — 2017',
        title: 'Freelance graphic designer',
        where: 'Bordeaux',
        did: 'Visual identities, print and websites for 20+ clients.',
      },
      {
        when: '2013',
        title: 'Graphic designer',
        where: 'Baillat Cardell & fils, Montréal',
        did: 'Festival identities: logos, guidelines, promotional videos.',
      },
      {
        when: '2010',
        title: 'Graphic designer',
        where: 'Fabrica (Benetton), Treviso',
        did: 'Editorial design for Colors magazine.',
      },
    ],
  },
];

export type Project = {
  title: string;
  description: string;
  stack: string[];
  badge: [string, string];
  badgeSoon?: boolean;
  url?: string;
  linkLabel?: string;
  icon?: string;
};

export const featured: Project & { meta: [string, string][] } = {
  title: 'Playwright reference suite',
  description:
    'End-to-end, API, visual and accessibility tests on a demo shop, in Playwright and TypeScript. Layered architecture, reports published on every push.',
  stack: ['Playwright', 'TypeScript', 'Docker', 'GitHub Actions', 'axe'],
  badge: ['status', 'in progress · Jan 2027'],
  badgeSoon: true,
  meta: [
    ['runner', 'GitHub Actions · Docker image'],
    ['browsers', 'chromium · webkit'],
    ['reports', 'HTML · traces · visual diffs'],
  ],
};

export const projects: Project[] = [
  {
    title: 'Task manager',
    description:
      'Vue 3 and TypeScript app with Pinia, unit-tested with Vitest, end-to-end tested with Playwright, components documented in Storybook.',
    stack: ['Vue 3', 'Pinia', 'Vitest', 'Playwright', 'Storybook'],
    badge: ['tests', 'passing'],
    url: 'https://github.com/emmanuelplougoulm/task-manager',
    linkLabel: 'Repository',
    icon: 'box',
  },
  {
    title: 'Component library',
    description:
      '20 Vue 3 components built from design challenges, each with stories and browser tests. Where design meets testing.',
    stack: ['Vue 3', 'Storybook 8', 'Vitest browser', 'Astro'],
    badge: ['storybook', 'live'],
    url: 'https://emmanuelplougoulm.github.io/components_library/storybook/',
    linkLabel: 'Open Storybook',
    icon: 'layers',
  },
];

export type Post = { date: string; title: string; summary: string; tags: string[]; url: string };

/** Articles et posts. Vide = la section Writing et son lien de navigation sont masqués. */
export const posts: Post[] = [
  {
    date: '10 Nov 2026',
    title: 'Our visual tests cried wolf. The fix was the environment.',
    summary: 'Why a flaky test is worse than no test, and why screenshots belong in Docker before you touch any tolerance threshold. On LinkedIn, in French.',
    tags: ['visual regression', 'docker', 'playwright'],
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7525822962764062720/',
  },
];
