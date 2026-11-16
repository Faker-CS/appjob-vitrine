import type { ArticleCover } from "@/components/ui/article-card";

export type ArticleAudience = "candidates" | "recruiters";

export type Article = {
  id: string;
  audience: ArticleAudience;
  /** Theme shown in the pill on the cover; also the filter key of the lists. */
  category: string;
  cover: ArticleCover;
  title: string;
  excerpt: string;
  /** Publication date as displayed. */
  date: string;
  readingTime: string;
};

/**
 * Advice articles, in the order of the Figma frames (most recent first within
 * each audience). Article pages are not designed yet: there is no body here.
 */
export const ARTICLES: Article[] = [
  // ---- Candidats ---------------------------------------------------------
  {
    id: "preparer-un-entretien",
    audience: "candidates",
    category: "Entretien",
    cover: "blue",
    title: "Préparer un entretien en 30 minutes",
    excerpt:
      "Les trois questions à préparer, les deux à poser, et ce qu'il faut vérifier la veille.",
    date: "4 nov. 2026",
    readingTime: "6 min de lecture",
  },
  {
    id: "profil-qui-retient-l-attention",
    audience: "candidates",
    category: "Profil",
    cover: "mandarine",
    title: "Un profil AppJob qui retient l'attention",
    excerpt:
      "Titre, résumé, compétences : ce que les recruteurs lisent en premier et comment le formuler.",
    date: "28 oct. 2026",
    readingTime: "5 min de lecture",
  },
  {
    id: "relancer-sans-insister",
    audience: "candidates",
    category: "Candidature",
    cover: "mint",
    title: "Relancer sans insister",
    excerpt:
      "Quand relancer, par quel canal, et le message de trois phrases qui fonctionne.",
    date: "21 oct. 2026",
    readingTime: "4 min de lecture",
  },
  {
    id: "changer-de-metier",
    audience: "candidates",
    category: "Reconversion",
    cover: "blue",
    title: "Changer de métier sans repartir de zéro",
    excerpt:
      "Identifier ses compétences transférables et les rendre lisibles dans une candidature.",
    date: "14 oct. 2026",
    readingTime: "7 min de lecture",
  },
  {
    id: "parler-salaire",
    audience: "candidates",
    category: "Salaire",
    cover: "mandarine",
    title: "Parler salaire sans se brader",
    excerpt:
      "Préparer une fourchette, répondre à la question « vos prétentions ? » et négocier une proposition.",
    date: "7 oct. 2026",
    readingTime: "6 min de lecture",
  },
  {
    id: "trouver-une-alternance",
    audience: "candidates",
    category: "Alternance",
    cover: "mint",
    title: "Trouver une alternance avant la rentrée",
    excerpt:
      "Le calendrier, les entreprises qui recrutent tôt et le profil qui rassure.",
    date: "30 sept. 2026",
    readingTime: "5 min de lecture",
  },

  // ---- Recruteurs --------------------------------------------------------
  {
    id: "rediger-une-annonce",
    audience: "recruiters",
    category: "Annonce",
    cover: "ink",
    title: "Rédiger une annonce qui attire les bons profils",
    excerpt:
      "Un titre précis, trois missions concrètes, une fourchette de salaire : ce qui fait la différence.",
    date: "5 nov. 2026",
    readingTime: "6 min de lecture",
  },
  {
    id: "mener-un-entretien",
    audience: "recruiters",
    category: "Entretien",
    cover: "ink",
    title: "Mener un entretien de 30 minutes qui dit tout",
    excerpt:
      "Une trame simple, des questions situationnelles et une grille pour comparer les candidats.",
    date: "29 oct. 2026",
    readingTime: "7 min de lecture",
  },
  {
    id: "repondre-a-tous-les-candidats",
    audience: "recruiters",
    category: "Réponse",
    cover: "mandarine",
    title: "Répondre à tous les candidats, même les non retenus",
    excerpt:
      "Pourquoi ça compte pour votre marque employeur et les modèles de messages d'AppJob.",
    date: "22 oct. 2026",
    readingTime: "4 min de lecture",
  },
  {
    id: "trier-50-candidatures",
    audience: "recruiters",
    category: "Tri",
    cover: "ink",
    title: "Trier 50 candidatures en une heure",
    excerpt:
      "Critères éliminatoires, pourcentage de correspondance et lecture en diagonale efficace.",
    date: "15 oct. 2026",
    readingTime: "5 min de lecture",
  },
  {
    id: "reussir-les-30-premiers-jours",
    audience: "recruiters",
    category: "Intégration",
    cover: "mandarine",
    title: "Réussir les 30 premiers jours d'une recrue",
    excerpt:
      "La première semaine, les points d'étape et le signal qui annonce un départ prématuré.",
    date: "8 oct. 2026",
    readingTime: "6 min de lecture",
  },
  {
    id: "ce-qu-une-annonce-peut-dire",
    audience: "recruiters",
    category: "Juridique",
    cover: "ink",
    title: "Ce qu'une annonce peut et ne peut pas dire",
    excerpt: "Les mentions obligatoires et les critères interdits, sans jargon.",
    date: "1 oct. 2026",
    readingTime: "5 min de lecture",
  },
];

/** Articles of one audience, in publication order (as in the list frames). */
export function getArticles(audience: ArticleAudience): Article[] {
  return ARTICLES.filter((article) => article.audience === audience);
}

/** Themes of an audience, in the order of the "Filtres" row. */
export function getCategories(articles: Article[]): string[] {
  return [...new Set(articles.map((article) => article.category))];
}

/** The three articles of the "Publiés récemment" grid on /conseils, as in the frame. */
const RECENT_IDS = [
  "rediger-une-annonce",
  "preparer-un-entretien",
  "profil-qui-retient-l-attention",
];

export const RECENT_ARTICLES: Article[] = RECENT_IDS.flatMap((id) =>
  ARTICLES.filter((article) => article.id === id),
);
