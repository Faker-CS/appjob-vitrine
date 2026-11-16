import type { Metadata } from "next";
import {
  InfoFaqLayout,
  type InfoFaqLink,
} from "@/components/sections/info-faq-layout";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import type { FaqEntry } from "@/components/ui/faq";
import { ROUTES } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "FAQ recruteurs",
  description:
    "Tarifs, volumes, équipe, conformité : les réponses aux questions que les recruteurs nous posent le plus sur l'application AppJob.",
};

/*
 * The Figma frame only carries the answer of the first (open) question.
 * The other answers are written from facts stated elsewhere in the design
 * and must be validated before going live.
 */
const QUESTIONS: FaqEntry[] = [
  {
    question: "Combien coûte AppJob pour les recruteurs ?",
    answer:
      "Les conditions tarifaires seront communiquées à la sortie de l'application. Elles seront précisées ici et dans l'application avant toute souscription.",
  },
  {
    question: "Puis-je publier une offre depuis ce site ?",
    answer:
      "Non. Ce site présente l'application et conduit à son téléchargement. La publication se fait dans l'application mobile : cinq écrans guidés, puis un aperçu avant publication.",
  },
  {
    question: "Combien d'offres puis-je publier ?",
    answer:
      "Les volumes dépendront des conditions communiquées à la sortie de l'application. Ils seront précisés ici en même temps que les tarifs.",
  },
  {
    question: "Puis-je recruter à plusieurs ?",
    answer:
      "Oui. Vous pouvez inviter un·e collègue sur une offre pour partager les notes, les évaluations et les décisions.",
  },
  {
    question: "Les candidats peuvent-ils me contacter directement ?",
    answer:
      "Les échanges commencent avec une candidature : dès qu'un candidat postule à l'une de vos offres, un fil de discussion commun s'ouvre dans l'application, avec les messages et les créneaux d'entretien.",
  },
  {
    question: "Que se passe-t-il avec les données des candidats ?",
    answer:
      "Elles sont hébergées dans l'Union européenne et restent sous le contrôle des candidats. Durées de conservation, consentement et export : tout est prévu pour le RGPD.",
  },
  {
    question: "L'application est-elle adaptée aux petites structures ?",
    answer:
      "Oui. Tout se pilote depuis un téléphone : publier une offre, trier les candidatures, proposer des créneaux d'entretien, sans outil supplémentaire.",
  },
];

const LINKS: InfoFaqLink[] = [
  {
    pill: "Recruteurs",
    title: "Retour à l'espace recruteurs",
    text: "La présentation complète du parcours.",
    linkLabel: "Voir la page",
    href: ROUTES.recruiters,
  },
  {
    pill: "Application",
    title: "L'application en détail",
    text: "Les écrans et les étapes du parcours.",
    linkLabel: "Découvrir",
    href: ROUTES.recruitersApp,
  },
  {
    pill: "Télécharger",
    title: "Être prévenu·e de la sortie",
    text: "Laissez votre e-mail, on vous écrit le jour J.",
    linkLabel: "Télécharger",
    href: ROUTES.download,
  },
];

export default function RecruitersFaqPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Recruteurs", href: ROUTES.recruiters },
          { label: "FAQ recruteurs" },
        ]}
      />
      <InfoFaqLayout
        tone="mandarine"
        eyebrow="Questions fréquentes"
        title="FAQ recruteurs"
        text="Ce que l'on nous demande le plus sur l'application, son fonctionnement et son téléchargement. Nous n'annonçons ici que ce qui est confirmé."
        items={QUESTIONS}
        defaultOpen={0}
        links={LINKS}
      />
    </>
  );
}
