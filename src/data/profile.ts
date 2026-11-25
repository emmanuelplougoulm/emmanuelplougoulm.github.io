// Tout le contenu éditable du site est ici, en anglais et en français côte à côte.
// Règle : rien d'interne sur le poste actuel (aucun client, produit ou collègue). Les employeurs sont nommés, comme sur LinkedIn.
import type { Lang, T } from '../i18n';

export const links = {
  linkedin: 'https://www.linkedin.com/in/emmanuel-plougoulm-89393560/',
  github: 'https://github.com/emmanuelplougoulm',
  source: 'https://github.com/emmanuelplougoulm/emmanuelplougoulm.github.io',
  email: '', // adresse pro dédiée, à ajouter quand elle existe
};

/** CV PDF de chaque langue, générés par Playwright au build (scripts/cv-pdf.mjs). */
export const cvFile: Record<Lang, string> = {
  en: '/cv-emmanuel-plougoulm.pdf',
  fr: '/cv-emmanuel-plougoulm-fr.pdf',
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

// ---- Contenu bilingue ----
// Chaque texte est un { en, fr } ; getProfile(lang) renvoie la version d'une langue.

export type Loc<X> = X extends string ? string | T : X extends (infer U)[] ? Loc<U>[] : X extends object ? { [K in keyof X]: Loc<X[K]> } : X;

export type StackItem = Tech & { note: string };
export type StackGroup = { name: string; key: string; items: StackItem[] };

const stackGroups: Loc<StackGroup>[] = [
  { name: { en: 'Testing', fr: 'Tests' }, key: 'test', items: [
    { label: 'Playwright', icon: 'playwright', note: { en: 'Daily driver, first suite in 2022', fr: 'Au quotidien, première suite en 2022' } },
    { label: 'Vitest', logo: 'Vitest', note: { en: 'Unit and browser tests', fr: 'Tests unitaires et dans le navigateur' } },
    { label: 'axe', icon: 'access', note: { en: 'Accessibility checks in CI', fr: "Contrôles d'accessibilité en CI" } },
    { label: { en: 'Visual regression', fr: 'Régression visuelle' }, icon: 'pixel', note: { en: 'Screenshots rendered in Docker', fr: 'Captures rendues dans Docker' } },
  ] },
  { name: 'Front-end', key: 'front', items: [
    { label: 'TypeScript', logo: 'Typescript', note: { en: 'Brought it into a legacy codebase', fr: "Introduit dans une base de code historique" } },
    { label: 'JavaScript', logo: 'Javascript', note: { en: 'Where the code chapter started', fr: 'Là où le chapitre code a commencé' } },
    { label: 'Vue.js', logo: 'Vuedotjs', note: { en: 'Led a Vue 2 to 3 migration', fr: 'Mené une migration de Vue 2 à 3' } },
    { label: 'React', logo: 'React', note: { en: 'HR app used by 3,000 people', fr: 'Application RH utilisée par 3 000 personnes' } },
    { label: 'Electron', logo: 'Electron', note: { en: 'Desktop client, Figma to release', fr: 'Client desktop, de Figma à la mise en production' } },
  ] },
  { name: 'Back-end', key: 'back', items: [
    { label: 'Node.js', logo: 'Nodedotjs', note: { en: 'APIs and tooling', fr: 'API et outillage' } },
    { label: 'NestJS', logo: 'Nestjs', note: { en: 'Split a monolith into services', fr: 'Découpé un monolithe en services' } },
  ] },
  { name: { en: 'CI & tooling', fr: 'CI et outillage' }, key: 'ci', items: [
    { label: 'Docker', logo: 'Docker', note: { en: 'Same pixels on every machine', fr: 'Les mêmes pixels sur chaque machine' } },
    { label: 'GitLab CI', logo: 'Gitlab', note: { en: 'Quality gates on every merge', fr: 'Contrôles qualité à chaque merge' } },
    { label: 'GitHub Actions', logo: 'Githubactions', note: { en: 'Tests, then deploy if green', fr: 'Les tests, puis le déploiement si tout est vert' } },
    { label: 'Git', logo: 'Git', note: { en: 'Everything versioned', fr: 'Tout est versionné' } },
    { label: 'Jira', logo: 'Jira', note: { en: 'Test plans and defects', fr: 'Plans de test et anomalies' } },
  ] },
  { name: 'Design', key: 'design', items: [
    { label: 'Figma', logo: 'Figma', note: { en: 'From mockups to production UI', fr: "De la maquette à l'interface en production" } },
    { label: 'Storybook', logo: 'Storybook', note: { en: 'Library of 30+ components', fr: 'Bibliothèque de plus de 30 composants' } },
    { label: 'Lighthouse', logo: 'Lighthouse', note: { en: 'Cut load time by 20%', fr: 'Temps de chargement réduit de 20 %' } },
  ] },
];

/** Pour le CV. */
const cvSummary: T = {
  en: 'SDET in Paris, working with Playwright and TypeScript. Former fullstack JS/TS developer and graphic designer, I test front-ends the way they were built and the way they are seen: functional flows, visual regression and accessibility.',
  fr: "SDET à Paris, avec Playwright et TypeScript. Ancien développeur fullstack JS/TS et graphiste, je teste les front-ends comme ils sont construits et comme ils sont vus : parcours fonctionnels, régression visuelle et accessibilité.",
};
const certifications: Loc<{ when: string; title: string }>[] = [
  { when: '2025', title: 'ISTQB® Certified Tester, Foundation Level (CTFL)' },
  { when: '2025', title: { en: 'Playwright: web automation testing (training certificate)', fr: "Playwright : automatisation de tests web (certificat de formation)" } },
  { when: { en: 'In progress', fr: 'En cours' }, title: 'ISTQB® CTAL Test Automation Engineering' },
];
const education: Loc<{ title: string; detail: string }>[] = [
  { title: 'Wild Code School', detail: { en: 'Web development', fr: 'Développement web' } },
];
const languages: T = { en: 'French · English', fr: 'Français · anglais' };

export type Role = { when: string; title: string; where: string; did: string };
export type Phase = {
  name: string;
  branch: string;
  current?: boolean;
  roles: Role[];
  /** Citation affichée sous la phase. Vide = rien n'est affiché. */
  quote?: string;
};

/** Rôle à exclure du CV (une transition, pas un poste). */
export const careerChange = 'career-change';

const phases: (Loc<Omit<Phase, 'roles'>> & { roles: (Loc<Role> & { id?: string })[] })[] = [
  {
    name: { en: 'Quality', fr: 'Qualité' },
    branch: { en: 'qa · 2025 → now', fr: "qa · 2025 → aujourd'hui" },
    current: true,
    roles: [
      {
        when: { en: '2025 — now', fr: "2025 — aujourd'hui" },
        title: { en: 'SDET / Functional QA', fr: 'SDET / QA fonctionnel' },
        where: 'QuickSign, Paris',
        did: {
          en: 'Owner of front-end quality: manual testing and Playwright automation, visual regression, test strategy.',
          fr: 'Responsable de la qualité front-end : tests manuels et automatisation Playwright, régression visuelle, stratégie de test.',
        },
      },
      {
        id: careerChange,
        when: '2025',
        title: { en: 'Career change', fr: 'Reconversion' },
        where: { en: 'Training', fr: 'Formation' },
        did: {
          en: 'Playwright automation training, then ISTQB® CTFL. Now preparing CTAL Test Automation Engineering.',
          fr: "Formation à l'automatisation avec Playwright, puis ISTQB® CTFL. Je prépare maintenant le CTAL Test Automation Engineering.",
        },
      },
    ],
    quote: {
      en: 'It felt like a natural step. Testing gives me the cross-cutting view I was looking for, and quality was already what I cared about most.',
      fr: "C'était une suite logique. Le test me donne la vue transverse que je cherchais, et la qualité était déjà ce qui comptait le plus pour moi.",
    },
  },
  {
    name: 'Code',
    branch: { en: 'dev · 2018 → 2025', fr: 'dev · 2018 → 2025' },
    roles: [
      {
        when: '2024 — 2025',
        title: { en: 'Software engineer & PO', fr: 'Ingénieur logiciel et PO' },
        where: 'TrustInSoft, Paris',
        did: {
          en: 'Desktop client in React and Electron, from Figma to first release.',
          fr: 'Client desktop en React et Electron, de Figma à la première version.',
        },
      },
      {
        when: '2022 — 2023',
        title: { en: 'Fullstack developer', fr: 'Développeur fullstack' },
        where: 'Lemonway, Paris',
        did: {
          en: 'First Playwright suite, Storybook library of 30+ components, Vue 2 → 3 migration.',
          fr: 'Première suite Playwright, bibliothèque Storybook de plus de 30 composants, migration de Vue 2 à 3.',
        },
      },
      {
        when: '2018 — 2022',
        title: { en: 'Fullstack developer', fr: 'Développeur fullstack' },
        where: 'onepoint, Paris',
        did: {
          en: 'React and TypeScript apps, SSO, Figma designs shipped to production.',
          fr: 'Applications React et TypeScript, SSO, maquettes Figma livrées en production.',
        },
      },
    ],
    quote: {
      en: 'I wanted to understand what happens under the hood, and to be able to build things myself, not just draw them.',
      fr: 'Je voulais comprendre ce qui se passe sous le capot, et pouvoir construire moi-même, pas seulement dessiner.',
    },
  },
  {
    name: 'Design',
    branch: 'design · 2010 → 2017',
    roles: [
      {
        when: '2014 — 2017',
        title: { en: 'Freelance graphic designer', fr: 'Graphiste freelance' },
        where: 'Bordeaux',
        did: {
          en: 'Visual identities, print and websites for 20+ clients.',
          fr: 'Identités visuelles, print et sites web pour plus de 20 clients.',
        },
      },
      {
        when: '2013',
        title: { en: 'Graphic designer', fr: 'Graphiste' },
        where: 'Baillat Cardell & fils, Montréal',
        did: {
          en: 'Festival identities: logos, guidelines, promotional videos.',
          fr: 'Identités de festivals : logos, chartes, vidéos promotionnelles.',
        },
      },
      {
        when: '2010',
        title: { en: 'Graphic designer', fr: 'Graphiste' },
        where: { en: 'Fabrica (Benetton), Treviso', fr: 'Fabrica (Benetton), Trévise' },
        did: {
          en: 'Editorial design for Colors magazine.',
          fr: 'Design éditorial pour le magazine Colors.',
        },
      },
    ],
  },
];

export type Project = {
  title: string;
  description: string;
  stack: string[];
  badge: [string, string];
  url?: string;
  linkLabel?: string;
  icon?: string;
};

const projects: (Loc<Omit<Project, 'badge'>> & { badge: [string, string] })[] = [
  {
    title: { en: 'Coverage Cockpit', fr: 'Coverage Cockpit' },
    description: {
      en: 'Desktop app that shows, journey by journey, which screens, e-mails and BPMN branches a test really verifies, and which it only passes through. Reads Playwright specs, BPMN and front code.',
      fr: 'Application de bureau qui montre, parcours par parcours, quels écrans, e-mails et branches BPMN un test vérifie vraiment, et lesquels il ne fait que traverser. Lit les specs Playwright, le BPMN et le front.',
    },
    stack: ['Tauri', 'Vue 3', 'TypeScript', 'ts-morph', 'Playwright'],
    badge: ['tests', 'passing'],
    url: 'https://github.com/emmanuelplougoulm/coverage-cockpit',
    linkLabel: { en: 'Repository', fr: 'Dépôt' },
    icon: 'check',
  },
  {
    title: { en: 'Component library', fr: 'Bibliothèque de composants' },
    description: {
      en: '20 Vue 3 components built from design challenges, each with stories and browser tests. Where design meets testing.',
      fr: '20 composants Vue 3 nés de défis de design, chacun avec ses stories et ses tests dans le navigateur. Là où le design rencontre le test.',
    },
    stack: ['Vue 3', 'Storybook 8', 'Vitest browser', 'Astro'],
    badge: ['storybook', 'live'],
    url: 'https://emmanuelplougoulm.github.io/components_library/storybook/',
    linkLabel: { en: 'Open Storybook', fr: 'Ouvrir le Storybook' },
    icon: 'layers',
  },
];

export type Post = { date: string; title: string; summary: string; tags: string[]; url: string };

/** Articles et posts. Vide = la section Writing et son lien de navigation sont masqués. */
const posts: Loc<Post>[] = [
  {
    date: { en: '17 Nov 2026', fr: '17 nov. 2026' },
    title: {
      en: 'Lighthouse gives my site 100 in accessibility. It does not check tab order.',
      fr: "Lighthouse donne 100 en accessibilité à mon site. Il ne vérifie pas l'ordre de tabulation.",
    },
    summary: {
      en: 'The European Accessibility Act now covers consumer banking, so I added an accessibility mode to this site: tab order, accessible names and target sizes drawn over the page. On LinkedIn, in French.',
      fr: "L'European Accessibility Act couvre désormais la banque de détail : j'ai donc ajouté un mode accessibilité à ce site, qui dessine l'ordre de tabulation, les noms accessibles et la taille des cibles par-dessus la page. Sur LinkedIn.",
    },
    tags: [{ en: 'accessibility', fr: 'accessibilité' }, 'wcag', 'lighthouse'],
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7528359239753314304/',
  },
  {
    date: { en: '10 Nov 2026', fr: '10 nov. 2026' },
    title: {
      en: 'Our visual tests cried wolf. The fix was the environment.',
      fr: "Nos tests visuels criaient au loup. La solution, c'était l'environnement.",
    },
    summary: {
      en: 'Why a flaky test is worse than no test, and why screenshots belong in Docker before you touch any tolerance threshold. On LinkedIn, in French.',
      fr: "Pourquoi un test instable est pire que pas de test, et pourquoi les captures doivent passer dans Docker avant de toucher au moindre seuil de tolérance. Sur LinkedIn.",
    },
    tags: [{ en: 'visual regression', fr: 'régression visuelle' }, 'docker', 'playwright'],
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7525822962764062720/',
  },
];

// ---- Résolution d'une langue ----

/** Remplace récursivement chaque { en, fr } par le texte de la langue demandée. */
export function pick<X>(value: X, lang: Lang): any {
  if (Array.isArray(value)) return value.map((v) => pick(v, lang));
  if (value && typeof value === 'object') {
    const o = value as Record<string, unknown>;
    const keys = Object.keys(o);
    if (keys.length === 2 && 'en' in o && 'fr' in o) return o[lang];
    return Object.fromEntries(keys.map((k) => [k, pick(o[k], lang)]));
  }
  return value;
}

export function getProfile(lang: Lang) {
  return {
    stackGroups: pick(stackGroups, lang) as StackGroup[],
    cvSummary: pick(cvSummary, lang) as string,
    certifications: pick(certifications, lang) as { when: string; title: string }[],
    education: pick(education, lang) as { title: string; detail: string }[],
    languages: pick(languages, lang) as string,
    phases: pick(phases, lang) as (Phase & { roles: (Role & { id?: string })[] })[],
    projects: pick(projects, lang) as Project[],
    posts: pick(posts, lang) as Post[],
    cv: cvFile[lang],
  };
}
