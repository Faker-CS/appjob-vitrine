import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import {
  AudienceAppIntro,
  AudienceAppStep,
} from "@/components/sections/audience-app-step";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CtaBlock } from "@/components/ui/cta-block";
import { LinkCard } from "@/components/ui/link-card";
import { ROUTES } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "L'application recrutement",
  description:
    "Le parcours d'un recruteur dans AppJob, écran par écran : publication d'une offre guidée, tri des candidatures et proposition d'entretiens.",
};

type Step = { id: string; title: string; text: string; checks: string[] };

/** The ids are the anchors targeted by the cards of the recruiter space. */
const STEPS: Step[] = [
  {
    id: "publication",
    title: "Publiez une offre guidée",
    text: "Cinq écrans courts : poste, conditions, compétences, entreprise, diffusion. L'app propose un titre clair et une fourchette de salaire cohérente avec le marché.",
    checks: [
      "Suggestions de compétences selon le métier",
      "Aperçu de l'annonce telle que les candidats la verront",
      "Brouillons et duplication d'une offre existante",
    ],
  },
  {
    id: "tri",
    title: "Triez les candidatures d'un geste",
    text: "Les profils arrivent dans un pipeline en colonnes. Un glissement les fait avancer, un appui long les écarte avec un message automatique mais poli.",
    checks: [
      "Pourcentage de correspondance et compétences communes",
      "Colonnes personnalisables",
      "Notes et évaluations partagées avec l'équipe",
    ],
  },
  {
    id: "entretiens",
    title: "Proposez des entretiens en un message",
    text: "Choisissez trois créneaux, le candidat en accepte un. L'entretien s'ajoute aux deux agendas, avec un rappel une heure avant.",
    checks: [
      "Visio, téléphone ou sur place",
      "Modèles de messages modifiables",
      "Réponses groupées aux candidatures non retenues",
    ],
  },
];

type CrossLink = {
  pill: string;
  title: string;
  text: string;
  linkLabel: string;
  href: string;
};

const LINKS: CrossLink[] = [
  {
    pill: "FAQ",
    title: "Tarifs, volumes, équipe",
    text: "Les questions fréquentes des recruteurs.",
    linkLabel: "Lire la FAQ",
    href: ROUTES.recruitersFaq,
  },
  {
    pill: "Fonctionnement",
    title: "Comment fonctionne AppJob",
    text: "La vue d'ensemble des deux parcours.",
    linkLabel: "Voir le fonctionnement",
    href: ROUTES.howItWorks,
  },
  {
    pill: "Conseils",
    title: "Mieux recruter",
    text: "Annonce, entretien, réponse aux candidats.",
    linkLabel: "Voir les conseils",
    href: ROUTES.adviceRecruiters,
  },
];

export default function RecruitersAppPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Recruteurs", href: ROUTES.recruiters },
          { label: "L'application recrutement" },
        ]}
      />

      <AudienceAppIntro
        accent="mandarine"
        eyebrow="Application · Recruteurs"
        title="L'application recrutement, écran par écran"
        text="De la publication d'une offre à la proposition d'embauche, voici le parcours d'un recruteur dans AppJob. Ces actions se réalisent dans l'application mobile."
        note="Les écrans présentés sont des illustrations du parcours. Les captures définitives seront ajoutées après validation."
      />

      {STEPS.map((step, index) => (
        <AudienceAppStep
          key={step.id}
          id={step.id}
          accent="mandarine"
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
                pillTone="ink"
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
          <CtaBlock
            tone="ink"
            title="Recrutez votre prochaine recrue depuis votre téléphone."
          />
        </Reveal>
      </Section>
    </>
  );
}
