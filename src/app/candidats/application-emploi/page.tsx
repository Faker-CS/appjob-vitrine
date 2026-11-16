import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import {
  AudienceAppIntro,
  AudienceAppStep,
} from "@/components/sections/audience-app-step";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CtaBlock } from "@/components/ui/cta-block";
import type { PillTone } from "@/components/ui/pill";
import { LinkCard } from "@/components/ui/link-card";
import { ROUTES } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "L'application emploi",
  description:
    "Le parcours d'une candidature dans AppJob, écran par écran : profil, offres qui vous correspondent, candidature en deux gestes et suivi de chaque réponse.",
};

type Step = { id: string; title: string; text: string; checks: string[] };

/** The ids are the anchors targeted by the cards of the candidate space. */
const STEPS: Step[] = [
  {
    id: "profil",
    title: "Un profil, une fois pour toutes",
    text: "Expérience, formation, compétences, mobilité, prétentions. Vous pouvez importer un CV existant ou remplir les champs guidés. Le profil sert ensuite pour chaque candidature.",
    checks: [
      "Import de CV PDF avec remplissage automatique",
      "Indicateur de complétude et conseils pour l'améliorer",
      "Profil visible, masqué ou masqué pour certaines entreprises",
    ],
  },
  {
    id: "recherche",
    title: "Des offres qui vous correspondent",
    text: "La liste principale combine vos critères et vos habitudes. Les filtres sont des pastilles, pas des menus déroulants : un geste suffit.",
    checks: [
      "Filtres : contrat, lieu, distance, salaire, télétravail",
      "Favoris et alertes en un tap",
      "Pourcentage de correspondance avec votre profil",
    ],
  },
  {
    id: "candidature",
    title: "Postulez en deux gestes",
    text: "Ouvrez l'offre, appuyez sur « Postuler ». Votre profil est transmis. Un message d'accompagnement est optionnel, et l'app vous propose une trame si vous le souhaitez.",
    checks: [
      "Récapitulatif avant envoi",
      "Message personnalisé facultatif",
      "Confirmation immédiate et accusé de lecture",
    ],
  },
  {
    id: "suivi",
    title: "Suivez chaque réponse",
    text: "Un statut par candidature, une conversation par recruteur, des créneaux d'entretien à accepter en un tap. Plus besoin de relancer dans le vide.",
    checks: [
      "Statuts : envoyée, vue, entretien, proposition, clôturée",
      "Messagerie et créneaux intégrés",
      "Rappels avant chaque entretien",
    ],
  },
];

type CrossLink = {
  pill: string;
  pillTone: PillTone;
  title: string;
  text: string;
  linkLabel: string;
  href: string;
};

const LINKS: CrossLink[] = [
  {
    pill: "FAQ",
    pillTone: "blue",
    title: "Des questions sur l'application ?",
    text: "Gratuité, données, compatibilité : la FAQ candidats y répond.",
    linkLabel: "Lire la FAQ",
    href: ROUTES.candidatesFaq,
  },
  {
    pill: "Fonctionnement",
    pillTone: "ink",
    title: "Comment fonctionne AppJob",
    text: "La vue d'ensemble des deux parcours, candidat et recruteur.",
    linkLabel: "Voir le fonctionnement",
    href: ROUTES.howItWorks,
  },
  {
    pill: "Conseils",
    pillTone: "blue",
    title: "Préparer sa candidature",
    text: "Nos conseils pour un profil qui retient l'attention.",
    linkLabel: "Voir les conseils",
    href: ROUTES.adviceCandidates,
  },
];

export default function CandidatesAppPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Candidats", href: ROUTES.candidates },
          { label: "L'application emploi" },
        ]}
      />

      <AudienceAppIntro
        eyebrow="Application · Candidats"
        title="L'application emploi, écran par écran"
        text="Voici le parcours d'une candidature dans AppJob, de la recherche jusqu'à la réponse. Ces actions se réalisent dans l'application mobile, pas sur ce site."
        note="Les écrans présentés sont des illustrations du parcours. Les captures définitives seront ajoutées après validation."
      />

      {STEPS.map((step, index) => (
        <AudienceAppStep
          key={step.id}
          id={step.id}
          number={index + 1}
          title={step.title}
          text={step.text}
          checks={step.checks}
          alternate={index % 2 === 1}
        />
      ))}

      {/* Liens */}
      <Section>
        <Stagger className="grid gap-4 md:grid-cols-2 md:gap-6 desk:grid-cols-3">
          {LINKS.map((link) => (
            <StaggerItem key={link.title}>
              <LinkCard
                as="h2"
                titleSize="h4"
                pill={link.pill}
                pillTone={link.pillTone}
                title={link.title}
                linkLabel={link.linkLabel}
                href={link.href}
              >
                {link.text}
              </LinkCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Téléchargement */}
      <Section spacing="compact" gap="none">
        <Reveal>
          <CtaBlock />
        </Reveal>
      </Section>
    </>
  );
}
