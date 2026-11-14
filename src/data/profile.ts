// Tout le contenu éditable du site est ici.
// Règle : rien d'interne sur le poste actuel (aucun nom d'entreprise, client, produit ou collègue).

export const links = {
  linkedin: 'https://www.linkedin.com/in/emmanuel-plougoulm-89393560/',
  github: 'https://github.com/emmanuelplougoulm',
  source: 'https://github.com/emmanuelplougoulm/emmanuelplougoulm.github.io',
  email: '', // adresse pro dédiée, à ajouter quand elle existe
  cv: '', // chemin du CV PDF (ex. '/cv-emmanuel-plougoulm.pdf'), vide = bouton masqué
};

export const tools = [
  { icon: 'play', label: 'Playwright' },
  { icon: 'code', label: 'TypeScript' },
  { icon: 'pixel', label: 'Visual regression' },
  { icon: 'access', label: 'axe' },
  { icon: 'docker', label: 'Docker' },
  { icon: 'git', label: 'CI/CD' },
];

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
    quote: '', // à écrire par Emmanuel : pourquoi le passage du dev à la QA
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
    quote: '', // à écrire par Emmanuel : pourquoi le passage du design au code
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
export const posts: Post[] = [];
