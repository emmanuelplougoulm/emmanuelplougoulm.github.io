// Deux langues : l'anglais à la racine (/, /lab/, /cv/), le français sous /fr/.
// Les textes de l'interface sont ici ; le contenu (parcours, expériences) vit dans src/data, en EN et FR côte à côte.

export const langs = ['en', 'fr'] as const;
export type Lang = (typeof langs)[number];

/** Un texte dans les deux langues. */
export type T = { en: string; fr: string };

/** Langue de la page en cours, d'après l'URL (Astro.currentLocale). */
export function getLang(locale: string | undefined): Lang {
  return locale === 'fr' ? 'fr' : 'en';
}

/** Chemin d'une page dans une langue : localePath('fr', '/lab/') === '/fr/lab/'. */
export function localePath(lang: Lang, path: string): string {
  return lang === 'en' ? path : `/fr${path === '/' ? '/' : path}`;
}

/** Le même chemin sans préfixe de langue : '/fr/lab/' → '/lab/'. */
export function basePath(pathname: string): string {
  const p = pathname.replace(/^\/fr(?=\/|$)/, '');
  return p === '' ? '/' : p;
}

export const ui = {
  en: {
    meta: {
      homeTitle: 'Emmanuel Plougoulm · SDET',
      homeDescription:
        'SDET in Paris. Playwright and TypeScript automation, visual regression, accessibility. Former developer and graphic designer.',
      labTitle: 'Lab · Emmanuel Plougoulm · SDET',
      labDescription:
        'Experiments on test-code architecture: the same Playwright tests organised two or more ways, and what each choice costs, measured.',
      cvTitle: 'CV · Emmanuel Plougoulm · SDET',
    },
    skip: 'Skip to content',
    nav: { label: 'Sections', path: 'Path', practice: 'Practice', work: 'Work', lab: 'Lab', writing: 'Writing', contact: 'Contact' },
    header: {
      cvLabel: 'Download CV (PDF)',
      a11yLabel: 'A11y: show the accessibility layer',
      themeLabel: 'Toggle colour theme',
      theme: 'Light / Dark',
      switchTo: 'FR',
      switchLabel: 'Version française',
    },
    hero: {
      kicker: 'QA ENGINEER / SDET · PARIS',
      h1: ['Testing like a ', 'developer', '.', 'Seeing like a ', 'designer', '.'],
      intro: [
        'I build ',
        'Playwright test automation',
        ' that catches what users actually notice: broken flows, visual regressions, accessibility gaps. Seven years in design, five in code, now in quality.',
      ],
      seeWork: 'See the work ↓',
      downloadCv: 'Download CV',
      coreStack: 'Core stack',
    },
    run: {
      aria: (date: string) => `Output of this website's own Playwright test suite on ${date}`,
      bar: (date: string) => `this site · ci run ${date}`,
      empty: 'No published run yet. CI writes the real results here on every push.',
      deployed: 'deployed only if green',
      replay: 'Replay the last run',
      break: 'Break this page',
    },
    path: {
      intro: 'Three careers that turned out to be one: making interfaces people can trust.',
      title: ['Design, then code, then ', 'quality', '.'],
      current: 'Current position',
    },
    practice: {
      intro: 'Each background gives me a different way to look at the same screen.',
      title: ['How I ', 'test', '.'],
      cols: [
        {
          tag: 'Design',
          h3: 'Seeing what users see.',
          lead: 'A 4px shift is a bug.',
          items: ['Visual regression in Docker', 'Design system consistency', 'Accessibility with axe'],
        },
        {
          tag: 'Code',
          h3: 'Reading the code I test.',
          lead: 'Tests are software too.',
          items: ['Fixtures and Page Objects', 'API tests and contracts', 'CI quality gates'],
        },
        {
          tag: 'Quality',
          h3: 'Knowing what to test, and why.',
          lead: 'Coverage follows risk.',
          items: ['Risk-based test design', 'Regression strategy', 'ISTQB® foundations'],
        },
      ],
      diffTab: 'hero.png — visual diff',
      diffAria: 'Illustration of a visual regression: the button moved compared with the baseline',
      baseline: 'Baseline',
      actual: 'Actual',
      diffNote: '✗ 1.8% pixels differ · button.cta offset +8px',
      codeAria: 'Example Playwright test: checkout.spec.ts',
      gherkinAria: 'Example Gherkin feature: trust.feature',
    },
    stack: {
      title: 'The stack',
      intro: (n: number, g: number) => `${n} tools, ${g} families. Hover a tile for where it served, or a family to isolate it.`,
      families: 'Families',
    },
    work: {
      intro: 'Work I do for employers stays with them. Everything here is my own, and it runs in CI.',
      title: ['Public, running, ', 'checkable', '.'],
      labBadge: (n: number) => `${n} experiments`,
      labTitle: 'Test code, measured',
      labText:
        'A public lab on test-code architecture. Each experiment runs the same Playwright tests organised two or more ways, and measures what the choice costs: lines to read, tests re-run, seconds, bugs caught.',
      labMore: 'See the experiments',
      labStats: ['tests re-run: fixtures vs God object', 'tests down after one logout', 'bugs caught: real backend vs mocks'],
      labPolicy: 'Every figure comes from a run in the repository, with its protocol and its limits.',
    },
    writing: {
      intro: 'Longer versions of what I share on LinkedIn.',
      title: ['Notes from the ', 'test suite', '.'],
      read: 'Read',
    },
    contact: {
      title: ["Let's catch it", 'before', ' users do.'],
      text: 'Testing, front-end quality, design systems, or a good idea. I usually reply within a couple of days.',
      cvNote: 'PDF · generated by Playwright',
    },
    socials: { label: 'Profiles and CV', linkedin: 'LinkedIn profile', github: 'GitHub profile', email: 'Email' },
    footer: { tests: (p: number, t: number) => `${p}/${t} tests green`, source: 'source', home: 'Home' },
    lab: {
      h1: ['Test code, ', 'measured', '.'],
      intro:
        'Tests are software too. Each experiment takes one architecture question, runs the same Playwright tests organised two or more ways, and measures what the choice costs: lines to read, tests re-run, seconds, bugs caught.',
      source: ['The protocols, raw results and limits live in the ', 'repository', ', in French. Every figure on this page comes from there.'],
      list: 'Experiments',
      limit: 'Limit',
      link: 'Protocol and results',
      linkNote: 'in French',
    },
    cv: {
      role: 'SDET · QA Engineer · Paris',
      tagline: ['Testing like a ', 'developer', '. Seeing like a ', 'designer', '.'],
      experience: 'Experience',
      stack: 'Stack',
      certifications: 'Certifications',
      education: 'Education',
      languages: 'Languages',
      generated: 'Generated with Playwright from the website',
    },
    // Textes des scripts du navigateur (calque a11y, interactions de l'accroche).
    js: {
      running: 'Running…',
      replay: 'Replay the last run',
      breakPage: 'Break this page',
      restore: 'Restore baseline',
      deployed: 'deployed only if green',
      blocked: 'deploy blocked',
      movedMeta: '(chromium) button.cta moved 8px, heading spacing changed',
      backMeta: '(chromium) back to baseline',
      stops: 'tab stops, in DOM order',
      targetsFail: 'fail · {tight} of {small} small targets too close',
      targetsSmall: 'pass · {small} under 24 px, spacing OK',
      targetsAll: 'pass · all ≥ 24 px',
      tooClose: '2.5.8 too close',
      spacingOk: '2.5.8 spacing OK',
      noName: 'no accessible name',
    },
    a11y: {
      panel: 'Accessibility layer',
      head: 'A11y layer',
      focusOrder: '2.4.3 Focus order',
      targetSize: '2.5.8 Target size',
      focusVisible: '2.4.7 Focus visible',
      pressTab: 'Press Tab to walk the path',
      lhRun: (date: string, form: string) => `CI run ${date} · ${form}`,
      lhLast: 'last CI run',
      lhEmpty: 'No published audit yet. CI writes it on every push.',
      scores: { performance: 'Performance', accessibility: 'Accessibility', bestPractices: 'Best practices', seo: 'SEO' },
      outOf: 'out of 100',
      exit: 'Esc to exit',
    },
  },
  fr: {
    meta: {
      homeTitle: 'Emmanuel Plougoulm · SDET',
      homeDescription:
        'SDET à Paris. Automatisation Playwright et TypeScript, régression visuelle, accessibilité. Ancien développeur et graphiste.',
      labTitle: 'Labo · Emmanuel Plougoulm · SDET',
      labDescription:
        "Expériences sur l'architecture du code de test : les mêmes tests Playwright organisés de plusieurs façons, et ce que coûte chaque choix, mesuré.",
      cvTitle: 'CV · Emmanuel Plougoulm · SDET',
    },
    skip: 'Aller au contenu',
    nav: { label: 'Sections', path: 'Parcours', practice: 'Pratique', work: 'Projets', lab: 'Labo', writing: 'Articles', contact: 'Contact' },
    header: {
      cvLabel: 'Télécharger le CV (PDF)',
      a11yLabel: "A11y : afficher le calque d'accessibilité",
      themeLabel: 'Changer de thème',
      theme: 'Clair / Sombre',
      switchTo: 'EN',
      switchLabel: 'English version',
    },
    hero: {
      kicker: 'QA ENGINEER / SDET · PARIS',
      h1: ['Tester comme un ', 'développeur', '.', 'Voir comme un ', 'designer', '.'],
      intro: [
        'Je construis une ',
        'automatisation de tests Playwright',
        " qui attrape ce que les utilisateurs remarquent vraiment : parcours cassés, régressions visuelles, défauts d'accessibilité. Sept ans de design, cinq de code, et maintenant la qualité.",
      ],
      seeWork: 'Voir les projets ↓',
      downloadCv: 'Télécharger le CV',
      coreStack: 'Stack principale',
    },
    run: {
      aria: (date: string) => `Sortie de la suite de tests Playwright de ce site, le ${date}`,
      bar: (date: string) => `ce site · run ci ${date}`,
      empty: 'Aucun run publié pour l\'instant. La CI écrit ici les vrais résultats à chaque push.',
      deployed: 'déployé seulement si tout est vert',
      replay: 'Rejouer le dernier run',
      break: 'Casser cette page',
    },
    path: {
      intro: 'Trois métiers qui n\'en font qu\'un : construire des interfaces dignes de confiance.',
      title: ['Le design, puis le code, puis la ', 'qualité', '.'],
      current: 'Poste actuel',
    },
    practice: {
      intro: 'Chaque parcours me donne une façon différente de regarder le même écran.',
      title: ['Comment je ', 'teste', '.'],
      cols: [
        {
          tag: 'Design',
          h3: 'Voir ce que voient les utilisateurs.',
          lead: 'Un décalage de 4 px est un bug.',
          items: ['Régression visuelle dans Docker', 'Cohérence du design system', 'Accessibilité avec axe'],
        },
        {
          tag: 'Code',
          h3: 'Lire le code que je teste.',
          lead: 'Les tests sont du logiciel, eux aussi.',
          items: ['Fixtures et Page Objects', "Tests d'API et contrats", 'Contrôles qualité en CI'],
        },
        {
          tag: 'Qualité',
          h3: 'Savoir quoi tester, et pourquoi.',
          lead: 'La couverture suit le risque.',
          items: ['Conception de tests basée sur les risques', 'Stratégie de non-régression', 'Fondamentaux ISTQB®'],
        },
      ],
      diffTab: 'hero.png — diff visuel',
      diffAria: 'Illustration d\'une régression visuelle : le bouton a bougé par rapport à la référence',
      baseline: 'Référence',
      actual: 'Actuel',
      diffNote: '✗ 1,8 % des pixels diffèrent · button.cta décalé de 8 px',
      codeAria: 'Exemple de test Playwright : checkout.spec.ts',
      gherkinAria: 'Exemple de fonctionnalité Gherkin : trust.feature',
    },
    stack: {
      title: 'La stack',
      intro: (n: number, g: number) =>
        `${n} outils, ${g} familles. Survolez une tuile pour voir où elle a servi, ou une famille pour l\'isoler.`,
      families: 'Familles',
    },
    work: {
      intro: 'Ce que je fais pour mes employeurs leur appartient. Tout ce qui est ici est à moi, et tourne en CI.',
      title: ['Public, en service, ', 'vérifiable', '.'],
      labBadge: (n: number) => `${n} expériences`,
      labTitle: 'Le code de test, mesuré',
      labText:
        "Un labo public sur l'architecture du code de test. Chaque expérience organise les mêmes tests Playwright de plusieurs façons, et mesure ce que coûte le choix : lignes à lire, tests relancés, secondes, bugs détectés.",
      labMore: 'Voir les expériences',
      labStats: ['tests relancés : fixtures vs God object', 'tests en échec après une déconnexion', 'bugs détectés : vrai backend vs mocks'],
      labPolicy: 'Chaque chiffre vient d\'un run du dépôt, avec son protocole et ses limites.',
    },
    writing: {
      intro: 'Les versions longues de ce que je partage sur LinkedIn.',
      title: ['Notes de la ', 'suite de tests', '.'],
      read: 'Lire',
    },
    contact: {
      title: ['Attrapons-le', 'avant', ' les utilisateurs.'],
      text: 'Tests, qualité front-end, design systems, ou une bonne idée. Je réponds en général sous deux ou trois jours.',
      cvNote: 'PDF · généré par Playwright',
    },
    socials: { label: 'Profils et CV', linkedin: 'Profil LinkedIn', github: 'Profil GitHub', email: 'E-mail' },
    footer: { tests: (p: number, t: number) => `${p}/${t} tests au vert`, source: 'source', home: 'Accueil' },
    lab: {
      h1: ['Le code de test, ', 'mesuré', '.'],
      intro:
        "Les tests sont du logiciel, eux aussi. Chaque expérience part d'une question d'architecture, organise les mêmes tests Playwright de plusieurs façons, et mesure ce que coûte le choix : lignes à lire, tests relancés, secondes, bugs détectés.",
      source: ['Les protocoles, les résultats bruts et les limites sont dans le ', 'dépôt', '. Chaque chiffre de cette page en vient.'],
      list: 'Expériences',
      limit: 'Limite',
      link: 'Protocole et résultats',
      linkNote: '',
    },
    cv: {
      role: 'SDET · QA Engineer · Paris',
      tagline: ['Tester comme un ', 'développeur', '. Voir comme un ', 'designer', '.'],
      experience: 'Expérience',
      stack: 'Stack',
      certifications: 'Certifications',
      education: 'Formation',
      languages: 'Langues',
      generated: 'Généré avec Playwright depuis le site',
    },
    js: {
      running: 'En cours…',
      replay: 'Rejouer le dernier run',
      breakPage: 'Casser cette page',
      restore: 'Restaurer la référence',
      deployed: 'déployé seulement si tout est vert',
      blocked: 'déploiement bloqué',
      movedMeta: '(chromium) button.cta décalé de 8 px, espacement du titre modifié',
      backMeta: '(chromium) retour à la référence',
      stops: "arrêts de tabulation, dans l'ordre du DOM",
      targetsFail: 'échec · {tight} petites cibles sur {small} trop proches',
      targetsSmall: 'conforme · {small} sous 24 px, espacement OK',
      targetsAll: 'conforme · toutes ≥ 24 px',
      tooClose: '2.5.8 trop proche',
      spacingOk: '2.5.8 espacement OK',
      noName: 'sans nom accessible',
    },
    a11y: {
      panel: "Calque d'accessibilité",
      head: 'Calque a11y',
      focusOrder: '2.4.3 Ordre du focus',
      targetSize: '2.5.8 Taille des cibles',
      focusVisible: '2.4.7 Focus visible',
      pressTab: 'Appuyez sur Tab pour suivre le parcours',
      lhRun: (date: string, form: string) => `run CI ${date} · ${form}`,
      lhLast: 'dernier run CI',
      lhEmpty: 'Aucun audit publié pour l\'instant. La CI l\'écrit à chaque push.',
      scores: { performance: 'Performance', accessibility: 'Accessibilité', bestPractices: 'Bonnes pratiques', seo: 'SEO' },
      outOf: 'sur 100',
      exit: 'Échap pour quitter',
    },
  },
} satisfies Record<Lang, unknown>;

export type UI = (typeof ui)['en'];
