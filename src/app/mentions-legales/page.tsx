import type { Metadata } from "next";
import {
  LegalPage,
  LegalParagraph,
  type LegalSection,
} from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Les informations d'identification de l'éditeur et de l'hébergeur du site AppJob, conformément à la loi pour la confiance dans l'économie numérique.",
};

const SECTIONS: LegalSection[] = [
  {
    id: "editeur",
    title: "Éditeur du site",
    content: (
      <>
        <LegalParagraph>
          AppJob, [forme juridique] au capital de [montant] €, immatriculée au
          RCS de [ville] sous le numéro [numéro].
        </LegalParagraph>
        <LegalParagraph>
          Siège social : 12 rue des Ateliers, 69003 Lyon. Directeur de la
          publication : [nom]. Contact : bonjour@appjob.fr.
        </LegalParagraph>
      </>
    ),
  },
  {
    id: "hebergement",
    title: "Hébergement",
    content: (
      <LegalParagraph>
        Le site est hébergé par [hébergeur], [adresse], dont les serveurs sont
        situés dans l&apos;Union européenne.
      </LegalParagraph>
    ),
  },
  {
    id: "propriete-intellectuelle",
    title: "Propriété intellectuelle",
    content: (
      <LegalParagraph>
        Le logo, la marque AppJob, les textes et les visuels de ce site sont
        protégés. Toute reproduction sans autorisation écrite est interdite.
      </LegalParagraph>
    ),
  },
  {
    id: "responsabilite",
    title: "Responsabilité",
    content: (
      <LegalParagraph>
        Ce site présente l&apos;application mobile AppJob. Les informations sont
        fournies à titre indicatif ; l&apos;éditeur s&apos;efforce de les tenir à
        jour sans garantie d&apos;exhaustivité.
      </LegalParagraph>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <LegalParagraph>
        Pour toute question relative au site : bonjour@appjob.fr ou via la page
        Contact.
      </LegalParagraph>
    ),
  },
];

export default function LegalNoticePage() {
  return (
    <LegalPage
      title="Mentions légales"
      lead="Les informations d'identification de l'éditeur et de l'hébergeur de ce site, conformément à la loi pour la confiance dans l'économie numérique."
      updatedAt="10 novembre 2026"
      sections={SECTIONS}
    />
  );
}
