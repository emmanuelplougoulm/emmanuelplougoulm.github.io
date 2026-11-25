// Expériences du labo (github.com/emmanuelplougoulm/sdet-playwright-framework), en anglais et en français.
// Chaque chiffre vient du README de l'expérience : ne jamais en écrire un qui n'y figure pas.
import type { Lang } from '../i18n';
import { pick, type Loc } from './profile';

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

const experiments: Loc<Experiment>[] = [
  {
    num: '01',
    slug: '01-god-object',
    date: { en: '22 Nov 2026', fr: '22 nov. 2026' },
    title: {
      en: 'One God object, or fixtures split by responsibility?',
      fr: 'Un God object, ou des fixtures découpées par responsabilité ?',
    },
    question: {
      en: 'For the same change, what does a God object cost compared with split fixtures?',
      fr: "Pour un même changement, qu'est-ce que coûte un God object par rapport à des fixtures découpées ?",
    },
    setup: {
      en: 'The same 8 tests on a demo shop, written twice: one App class that does everything, then one class and one fixture per domain. One change applied to both: the test id of the add-to-cart button.',
      fr: "Les mêmes 8 tests sur une boutique de démo, écrits deux fois : une classe App qui sait tout faire, puis une classe et une fixture par domaine. Un seul changement, appliqué aux deux : l'attribut de test du bouton « Ajouter au panier ».",
    },
    figures: [
      { value: { en: '12 vs 38', fr: '12 vs 38' }, label: { en: 'lines to read before editing', fr: 'lignes à lire avant de modifier' } },
      { value: '2 vs 8', label: { en: 'tests re-run out of 8 (--only-changed)', fr: 'tests relancés sur 8 (--only-changed)' } },
      { value: { en: '+40%', fr: '+40 %' }, label: { en: 'lines of code for the split version', fr: 'lignes de code pour la version découpée' } },
    ],
    takeaway: {
      en: 'The edit itself costs the same: one line in one file. The difference is coupling: with the God object, any change re-runs the whole suite.',
      fr: "La modification coûte pareil : une ligne dans un fichier. La différence est dans le couplage : avec le God object, chaque changement relance toute la suite.",
    },
    limit: {
      en: 'A small suite (8 tests). Run time is not a measurable gain here: both versions do the same work.',
      fr: "Une petite suite (8 tests). La durée n'est pas un gain mesurable ici : les deux versions font le même travail.",
    },
  },
  {
    num: '02',
    slug: '02-storage-state',
    date: { en: '22 Nov 2026', fr: '22 nov. 2026' },
    title: {
      en: 'Log in in every test, or share a session?',
      fr: 'Se connecter dans chaque test, ou partager une session ?',
    },
    question: {
      en: 'Which login strategy holds when the suite grows, runs in parallel and outlives a session?',
      fr: "Quelle stratégie de connexion tient quand la suite grandit, tourne en parallèle et vit plus longtemps qu'une session ?",
    },
    setup: {
      en: 'Four strategies on the same read-only suite: through the login screen in every test, by request in every test, one global session, one session per worker. Two apps: Firefly III and the demo shop.',
      fr: "Quatre stratégies sur la même suite en lecture seule : par l'écran de connexion dans chaque test, par requête dans chaque test, une session globale, une session par worker. Deux applications : Firefly III et la boutique de démo.",
    },
    figures: [
      {
        value: { en: '62 s vs 31 s', fr: '62 s vs 31 s' },
        label: { en: '200 tests: login screen vs session per worker', fr: "200 tests : écran de connexion vs session par worker" },
      },
      {
        value: '40 / 40',
        label: {
          en: 'tests failed after one logout, one global session, 1 worker',
          fr: 'tests en échec après une déconnexion, session globale, 1 worker',
        },
      },
      {
        value: '8 / 8',
        label: {
          en: 'tests broken by a broken login screen, when every test uses it',
          fr: "tests cassés par un écran de connexion cassé, quand chaque test y passe",
        },
      },
    ],
    takeaway: {
      en: 'A session per worker is the fastest and keeps incidents local. The login screen then needs tests of its own, or its regressions go unnoticed.',
      fr: "La session par worker est la plus rapide et contient les incidents. L'écran de connexion a alors besoin de ses propres tests, sinon ses régressions passent inaperçues.",
    },
    limit: {
      en: 'Below 40 tests the gaps get lost in the noise. Durations are medians of 3 runs.',
      fr: 'Sous 40 tests, les écarts se perdent dans le bruit. Les durées sont des médianes de 3 runs.',
    },
  },
  {
    num: '03',
    slug: '03-donnees-de-test',
    date: { en: '23 Nov 2026', fr: '23 nov. 2026' },
    title: {
      en: 'Shared test data, or data each test creates?',
      fr: 'Données de test partagées, ou créées par chaque test ?',
    },
    question: {
      en: 'Where should the data of a suite that writes come from, when it runs in parallel, fails halfway or gets cancelled?',
      fr: "D'où doivent venir les données d'une suite qui écrit, quand elle tourne en parallèle, échoue en cours de route ou s'interrompt ?",
    },
    setup: {
      en: 'Three strategies on a suite that writes to Firefly III: one shared seeded data set, a factory per test, a factory per worker. Then cancelled runs, killed runners and a test that fails before cleaning up.',
      fr: "Trois stratégies sur une suite qui écrit dans Firefly III : un jeu de données partagé, une factory par test, une factory par worker. Puis des runs annulés, des runners tués et un test qui échoue avant de nettoyer.",
    },
    figures: [
      { value: '10 / 40', label: { en: 'tests failed with shared data on 4 workers', fr: 'tests en échec avec un jeu partagé sur 4 workers' } },
      { value: { en: '25 s vs 45 s', fr: '25 s vs 45 s' }, label: { en: '200 tests: factory per worker vs per test', fr: '200 tests : factory par worker vs par test' } },
      { value: '+25', label: { en: 'transactions left on the shared account per run', fr: 'transactions laissées sur le compte partagé à chaque run' } },
    ],
    takeaway: {
      en: 'Shared data rules out parallelism, and its failures look like application bugs: a wrong balance, a missing transaction. A factory per worker was the fastest and the most isolated strategy measured.',
      fr: "Un jeu partagé interdit le parallélisme, et ses échecs ressemblent à des bugs de l'application : un solde faux, une transaction manquante. La factory par worker est la plus rapide et la plus isolée des stratégies mesurées.",
    },
    limit: {
      en: 'Tests in the same worker share their data: one that leaves a trace without failing passes it on.',
      fr: 'Les tests d\'un même worker partagent leurs données : un test qui laisse une trace sans échouer la transmet aux suivants.',
    },
  },
  {
    num: '04',
    slug: '04-mocks-reseau',
    date: { en: '23 Nov 2026', fr: '23 nov. 2026' },
    title: {
      en: 'Mock the network, or test against the real backend?',
      fr: 'Mocker le réseau, ou tester contre le vrai backend ?',
    },
    question: {
      en: 'A UI suite that mocks the API runs faster. Which bugs does it let through, and what do contract tests catch?',
      fr: "Une suite d'interface qui mocke l'API est plus rapide. Quels bugs laisse-t-elle passer, et que rattrapent des tests de contrat ?",
    },
    setup: {
      en: 'The same 6 UI tests on the demo shop, served four ways: the real backend, hand-written mocks, a recorded HAR, contract tests on the API. 10 plausible bugs injected one at a time.',
      fr: "Les mêmes 6 tests d'interface sur la boutique de démo, servis de quatre façons : le vrai backend, des mocks écrits à la main, un HAR enregistré, des tests de contrat sur l'API. 10 bugs plausibles injectés un par un.",
    },
    figures: [
      { value: '10 / 10', label: { en: 'bugs caught against the real backend', fr: 'bugs détectés contre le vrai backend' } },
      { value: '1 / 10', label: { en: 'with hand-written mocks', fr: 'avec des mocks écrits à la main' } },
      { value: '4 / 10', label: { en: 'with mocks and contract tests together', fr: 'avec mocks et tests de contrat ensemble' } },
    ],
    takeaway: {
      en: 'A mocked suite tests the UI alone: 2.5 times faster, blind to what happens behind the mock. Contract tests keep mocks honest, not the app correct: the 6 bugs they missed are the ones users see.',
      fr: "Une suite mockée ne teste que l'interface : 2,5 fois plus rapide, aveugle à ce qui se passe derrière le mock. Les tests de contrat gardent les mocks honnêtes, pas l'application correcte : les 6 bugs manqués sont ceux que voient les utilisateurs.",
    },
    limit: {
      en: 'The 10 bugs were picked by hand: the mix of shape and behaviour bugs drives the contract score.',
      fr: 'Les 10 bugs sont choisis à la main : la proportion de bugs de forme et de comportement influence le score des tests de contrat.',
    },
  },
  {
    num: '05',
    slug: '05-locators',
    date: { en: '24 Nov 2026', fr: '24 nov. 2026' },
    title: {
      en: 'CSS, text, role or data-test: which locators survive UI changes?',
      fr: 'CSS, texte, rôle ou data-test : quels locators résistent aux changements ?',
    },
    question: {
      en: 'When the UI changes, which locators break for nothing, and which break when users are affected?',
      fr: "Quand l'interface change, quels locators cassent pour rien, et lesquels cassent quand l'utilisateur est touché ?",
    },
    setup: {
      en: 'The same 5 UI tests on the demo shop, written with four sets of locators: CSS, visible text, role, data-test. 10 UI changes applied one at a time: 2 invisible refactors, 5 intended visible changes, 3 accessibility regressions.',
      fr: "Les mêmes 5 tests d'interface sur la boutique de démo, écrits avec quatre jeux de locators : CSS, texte visible, rôle, data-test. 10 changements de l'interface appliqués un par un : 2 refactors invisibles, 5 changements visibles voulus, 3 régressions d'accessibilité.",
    },
    figures: [
      { value: '3 / 5', label: { en: 'tests broken by an <h5> to <h3> refactor, CSS locators', fr: 'tests cassés par un refactor de <h5> en <h3>, locators CSS' } },
      { value: '0 / 3', label: { en: 'accessibility regressions caught by data-test locators', fr: "régressions d'accessibilité rattrapées par les locators data-test" } },
      { value: '2 / 3', label: { en: 'caught by role locators, with no false alarm on refactors', fr: 'rattrapées par les locators de rôle, sans fausse alerte sur les refactors' } },
    ],
    takeaway: {
      en: 'Each strategy breaks on a different kind of change. Role locators encode a user contract: they ignored the refactors and caught the button turned into a div and the unnamed checkboxes. data-test only broke when its own attributes were renamed.',
      fr: 'Chaque stratégie casse sur une famille de changements différente. Les locators de rôle encodent un contrat utilisateur : ils ignorent les refactors et rattrapent le bouton devenu une div et les cases sans nom. Le data-test n\'a cassé que quand ses propres attributs ont été renommés.',
    },
    limit: {
      en: 'No strategy caught the search field losing its label: the placeholder still gives it an accessible name.',
      fr: "Aucune stratégie n'a vu le champ de recherche perdre son label : le placeholder lui donne encore un nom accessible.",
    },
  },
  {
    num: '06',
    slug: '06-captures-visuelles',
    date: { en: '25 Nov 2026', fr: '25 nov. 2026' },
    title: {
      en: 'Screenshot comparison: which visual defects does it catch, and at what cost?',
      fr: 'Comparer des captures : quels défauts visuels rattrape-t-on, et à quel prix ?',
    },
    question: {
      en: 'Does a screenshot suite catch what users see, without failing on what changes nothing for them? And what does it cost when the UI changes on purpose?',
      fr: "Une suite de captures rattrape-t-elle ce que voit l'utilisateur, sans échouer sur ce qui ne change rien pour lui ? Et combien coûte-t-elle quand l'interface change volontairement ?",
    },
    setup: {
      en: 'The demo shop captured three ways (full page, masked, per component) at two sizes, plus tolerance thresholds. 7 visual defects and 3 intended changes injected in the code, 5 noise sources with no code change: repeated runs, another machine, a changed price, a slow API, a hovered card.',
      fr: "La boutique de démo capturée de trois façons (pleine page, masquée, par composant) à deux tailles, plus des seuils de tolérance. 7 défauts visuels et 3 changements voulus injectés dans le code, 5 sources de bruit sans changer le code : runs répétés, autre machine, prix modifié, API lente, carte survolée.",
    },
    figures: [
      { value: '6 / 6', label: { en: 'defects visible at rest caught by a strict capture, which also failed on 3 noise sources out of 4', fr: 'défauts visibles au repos rattrapés en strict, qui échoue aussi sur 3 bruits sur 4' } },
      { value: { en: '0.036%', fr: '0,036 %' }, label: { en: 'of pixels changed by illegible prices: a 0.1% threshold already misses them', fr: 'des pixels touchés par des prix illisibles : un seuil de 0,1 % les perd déjà' } },
      { value: '20 / 21', label: { en: 'captures failed by running on another machine, no code change', fr: 'captures en échec sur une autre machine, sans changer le code' } },
    ],
    takeaway: {
      en: 'Pixel share does not measure severity: the defect that hurts users most was the smallest. Fix the rendering machine first, mask only what is truly dynamic and test that zone another way, and capture focus states on purpose.',
      fr: "La part de pixels ne mesure pas la gravité : le défaut le plus gênant était le plus petit. D'abord fixer la machine de rendu, ne masquer que le vraiment dynamique et tester cette zone autrement, et capturer exprès les états de focus.",
    },
    limit: {
      en: 'No strategy saw the focus outline removed: a screenshot taken at rest shows no focus.',
      fr: "Aucune stratégie n'a vu le contour de focus supprimé : une capture prise au repos ne montre aucun focus.",
    },
  },
];

export function getExperiments(lang: Lang): Experiment[] {
  return pick(experiments, lang);
}
