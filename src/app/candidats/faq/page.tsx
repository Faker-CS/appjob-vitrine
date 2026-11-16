import type { Metadata } from "next";
import {
  InfoFaqLayout,
  type InfoFaqLink,
} from "@/components/sections/info-faq-layout";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import type { FaqEntry } from "@/components/ui/faq";
import { ROUTES } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "FAQ candidats",
  description:
    "Gratuité, compatibilité, données personnelles, disponibilité : les réponses aux questions que les candidats nous posent le plus sur l'application AppJob.",
};

/*
 * The Figma frame only carries the answer of the first (open) question.
 * The other answers are written from facts stated elsewhere in the design
 * and must be validated before going live.
 */
const QUESTIONS: FaqEntry[] = [
  {
    question: "AppJob est-elle gratuite pour les candidats ?",
    answer:
      "Oui. La recherche d'offres, la candidature, la messagerie et le suivi sont gratuits pour les candidats, sans publicité et sans option payante.",
  },
  {
    question: "Sur quels téléphones l'application fonctionne-t-elle ?",
    answer:
      "AppJob sera disponible sur iPhone, depuis l'App Store, et sur les téléphones Android, depuis Google Play. Les versions prises en charge seront précisées à la sortie.",
  },
  {
    question: "Puis-je postuler depuis ce site ?",
    answer:
      "Non. Ce site présente l'application et conduit à son téléchargement. La recherche d'offres, la candidature et les échanges avec les recruteurs se font dans l'application mobile.",
  },
  {
    question: "Qui peut voir mon profil ?",
    answer:
      "Vous gardez la main : votre profil peut être visible, masqué ou masqué pour certaines entreprises. Lorsque vous postulez, il est transmis au recruteur de l'offre concernée.",
  },
  {
    question: "Dois-je créer un CV ?",
    answer:
      "Non. Votre profil fait office de CV : vous pouvez importer un CV existant ou vous laisser guider par la saisie. Deux minutes suffisent pour un profil complet.",
  },
  {
    question: "Comment sont choisies les offres qui me sont proposées ?",
    answer:
      "Selon vos critères (lieu, contrat, salaire, télétravail) et vos habitudes dans l'application. Les offres correspondantes apparaissent dans la liste principale et en notification.",
  },
  {
    question: "Que deviennent mes données si je supprime mon compte ?",
    answer:
      "Vos données sont hébergées en Europe et restent sous votre contrôle : vous pouvez les exporter, puis supprimer votre compte en un geste depuis l'application. Le détail du traitement est présenté dans l'application lors de la création du compte.",
  },
  {
    question: "Quand l'application sera-t-elle disponible ?",
    answer:
      "L'application arrive très bientôt sur l'App Store et Google Play. Laissez votre e-mail sur la page Télécharger : nous vous écrivons le jour de la sortie.",
  },
];

const LINKS: InfoFaqLink[] = [
  {
    pill: "Candidats",
    title: "Retour à l'espace candidats",
    text: "La présentation complète du parcours.",
    linkLabel: "Voir la page",
    href: ROUTES.candidates,
  },
  {
    pill: "Application",
    title: "L'application en détail",
    text: "Les écrans et les étapes du parcours.",
    linkLabel: "Découvrir",
    href: ROUTES.candidatesApp,
  },
  {
    pill: "Télécharger",
    title: "Être prévenu·e de la sortie",
    text: "Laissez votre e-mail, on vous écrit le jour J.",
    linkLabel: "Télécharger",
    href: ROUTES.download,
  },
];

export default function CandidatesFaqPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Candidats", href: ROUTES.candidates },
          { label: "FAQ candidats" },
        ]}
      />
      <InfoFaqLayout
        tone="blue"
        eyebrow="Questions fréquentes"
        title="FAQ candidats"
        text="Ce que l'on nous demande le plus sur l'application, son fonctionnement et son téléchargement. Nous n'annonçons ici que ce qui est confirmé."
        items={QUESTIONS}
        defaultOpen={0}
        links={LINKS}
      />
    </>
  );
}
