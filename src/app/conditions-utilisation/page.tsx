import type { Metadata } from "next";
import {
  LegalPage,
  LegalParagraph,
  type LegalSection,
} from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  description:
    "Les conditions qui régissent l'utilisation du site vitrine AppJob.",
};

const SECTIONS: LegalSection[] = [
  {
    id: "objet",
    title: "Objet",
    content: (
      <LegalParagraph>
        Le site présente l&apos;application mobile AppJob et oriente les
        visiteurs vers son téléchargement. Il ne permet ni la création de compte,
        ni la consultation d&apos;offres, ni la candidature.
      </LegalParagraph>
    ),
  },
  {
    id: "acces",
    title: "Accès au site",
    content: (
      <LegalParagraph>
        Le site est accessible gratuitement. L&apos;éditeur peut en suspendre
        l&apos;accès pour maintenance sans préavis.
      </LegalParagraph>
    ),
  },
  {
    id: "contenus",
    title: "Contenus",
    content: (
      <LegalParagraph>
        Les contenus, dont les articles de la rubrique Conseils, sont fournis à
        titre informatif et ne constituent pas un conseil juridique ou
        professionnel.
      </LegalParagraph>
    ),
  },
  {
    id: "liens-stores",
    title: "Liens vers les stores",
    content: (
      <LegalParagraph>
        Les liens de téléchargement renvoient exclusivement vers les pages
        officielles de l&apos;App Store et de Google Play. Les conditions de ces
        plateformes s&apos;appliquent.
      </LegalParagraph>
    ),
  },
  {
    id: "droit-applicable",
    title: "Droit applicable",
    content: (
      <LegalParagraph>
        Les présentes conditions sont soumises au droit français. En cas de
        litige, les tribunaux compétents sont ceux du ressort du siège de
        l&apos;éditeur.
      </LegalParagraph>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Conditions d'utilisation"
      lead="Ces conditions régissent l'utilisation du site vitrine. L'utilisation de l'application mobile est encadrée par des conditions distinctes, acceptées dans l'application."
      updatedAt="10 novembre 2026"
      sections={SECTIONS}
    />
  );
}
