/** Every route of the site, as named in the Figma page frames. */
export const ROUTES = {
  home: "/",
  candidates: "/candidats",
  candidatesApp: "/candidats/application-emploi",
  candidatesFaq: "/candidats/faq",
  recruiters: "/recruteurs",
  recruitersApp: "/recruteurs/application-recrutement",
  recruitersFaq: "/recruteurs/faq",
  howItWorks: "/comment-ca-marche",
  advice: "/conseils",
  adviceCandidates: "/conseils/candidats",
  adviceRecruiters: "/conseils/recruteurs",
  about: "/a-propos",
  download: "/telecharger",
  contact: "/contact",
  legalNotice: "/mentions-legales",
  privacy: "/confidentialite",
  cookies: "/cookies",
  terms: "/conditions-utilisation",
} as const;

export type NavLink = {
  label: string;
  /** Shorter label used where the mobile frames shorten it. */
  shortLabel?: string;
  href: string;
};

export type NavItem = NavLink & {
  /** Sub-pages shown in the dropdown (desktop) or accordion (mobile). */
  children?: NavLink[];
};

const candidateLinks: NavLink[] = [
  { label: "Espace candidats", href: ROUTES.candidates },
  { label: "L'application emploi", href: ROUTES.candidatesApp },
  { label: "FAQ candidats", href: ROUTES.candidatesFaq },
  { label: "Conseils candidats", href: ROUTES.adviceCandidates },
];

const recruiterLinks: NavLink[] = [
  { label: "Espace recruteurs", href: ROUTES.recruiters },
  {
    label: "L'application recrutement",
    shortLabel: "L'app recrutement",
    href: ROUTES.recruitersApp,
  },
  { label: "FAQ recruteurs", href: ROUTES.recruitersFaq },
  { label: "Conseils recruteurs", href: ROUTES.adviceRecruiters },
];

/** Primary navigation (header). */
export const MAIN_NAV: NavItem[] = [
  { label: "Candidats", href: ROUTES.candidates, children: candidateLinks },
  { label: "Recruteurs", href: ROUTES.recruiters, children: recruiterLinks },
  { label: "Comment ça marche", href: ROUTES.howItWorks },
  {
    label: "Conseils",
    href: ROUTES.advice,
    children: [
      { label: "Tous les conseils", href: ROUTES.advice },
      { label: "Conseils candidats", href: ROUTES.adviceCandidates },
      { label: "Conseils recruteurs", href: ROUTES.adviceRecruiters },
    ],
  },
  { label: "À propos", href: ROUTES.about },
];

export type FooterColumn = { title: string; links: NavLink[] };

export const FOOTER_COLUMNS: FooterColumn[] = [
  { title: "Candidats", links: candidateLinks },
  { title: "Recruteurs", links: recruiterLinks },
  {
    title: "AppJob",
    links: [
      { label: "Comment ça marche", href: ROUTES.howItWorks },
      { label: "Conseils", href: ROUTES.advice },
      { label: "À propos", href: ROUTES.about },
      { label: "Télécharger", href: ROUTES.download },
      { label: "Contact", href: ROUTES.contact },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Mentions légales", href: ROUTES.legalNotice },
      { label: "Confidentialité", href: ROUTES.privacy },
      {
        label: "Gestion des cookies",
        shortLabel: "Cookies",
        href: ROUTES.cookies,
      },
      { label: "Conditions d'utilisation", href: ROUTES.terms },
    ],
  },
];
