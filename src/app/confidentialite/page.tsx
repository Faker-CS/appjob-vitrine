import type { Metadata } from "next";
import {
  LegalList,
  LegalPage,
  LegalParagraph,
  type LegalSection,
} from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Quelles données le site AppJob collecte, pourquoi, pendant combien de temps, et comment exercer vos droits.",
};

const SECTIONS: LegalSection[] = [
  {
    id: "donnees-collectees",
    title: "Données collectées",
    content: (
      <LegalList
        items={[
          "Formulaire de contact : nom, adresse e-mail, profil déclaré, message.",
          "Alerte de sortie : adresse e-mail et profil déclaré.",
          "Mesure d'audience : pages consultées, appareil, origine de la visite, sans identification personnelle.",
        ]}
      />
    ),
  },
  {
    id: "finalites",
    title: "Finalités et bases légales",
    content: (
      <LegalParagraph>
        Répondre à vos demandes (intérêt légitime), vous prévenir de la sortie de
        l&apos;application (consentement), améliorer le site (consentement pour
        les traceurs non essentiels).
      </LegalParagraph>
    ),
  },
  {
    id: "conservation",
    title: "Durée de conservation",
    content: (
      <LegalParagraph>
        Messages de contact : 12 mois après la dernière réponse. Adresses pour
        l&apos;alerte de sortie : jusqu&apos;à l&apos;envoi de l&apos;alerte puis
        3 mois. Mesures d&apos;audience : 13 mois.
      </LegalParagraph>
    ),
  },
  {
    id: "destinataires",
    title: "Destinataires",
    content: (
      <LegalParagraph>
        L&apos;équipe AppJob et ses prestataires techniques (hébergement, envoi
        d&apos;e-mails), tous situés dans l&apos;Union européenne.
      </LegalParagraph>
    ),
  },
  {
    id: "vos-droits",
    title: "Vos droits",
    content: (
      <LegalParagraph>
        Accès, rectification, effacement, opposition, limitation et portabilité.
        Écrivez à bonjour@appjob.fr. Vous pouvez aussi saisir la CNIL.
      </LegalParagraph>
    ),
  },
  {
    id: "donnees-application",
    title: "Données dans l'application",
    content: (
      <LegalParagraph>
        Le traitement des données dans l&apos;application mobile AppJob (profils,
        offres, candidatures) fait l&apos;objet d&apos;une politique dédiée,
        présentée dans l&apos;application lors de la création du compte.
      </LegalParagraph>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      lead="Ce site collecte peu de données : celles que vous saisissez dans le formulaire de contact ou pour être prévenu·e de la sortie, et des mesures d'audience anonymisées. Voici ce que nous en faisons."
      updatedAt="10 novembre 2026"
      sections={SECTIONS}
    />
  );
}
