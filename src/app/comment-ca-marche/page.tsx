import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { InfoJourneys } from "@/components/sections/info-journeys";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, type CardTone } from "@/components/ui/card";
import { CheckItem, CheckList } from "@/components/ui/check-item";
import { CtaBlock } from "@/components/ui/cta-block";
import { PhoneMockup } from "@/components/ui/phone-mockup";
import { Pill, type PillTone } from "@/components/ui/pill";
import { SectionHead } from "@/components/ui/section-head";
import { StepCard } from "@/components/ui/step-card";
import { ROUTES } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Comment ça marche",
  description:
    "Deux parcours qui se rejoignent au même endroit : la candidature. Découvrez, côte à côte, ce que vivent un candidat et un recruteur dans l'application AppJob.",
};

type Step = { title: string; text: string };

const CANDIDATE_STEPS: Step[] = [
  {
    title: "Créer son profil",
    text: "Import d'un CV ou saisie guidée. Deux minutes suffisent pour un profil complet.",
  },
  {
    title: "Recevoir des offres adaptées",
    text: "Les offres correspondant aux critères et aux habitudes apparaissent dans la liste principale et en notification.",
  },
  {
    title: "Postuler en deux gestes",
    text: "Le profil est transmis au recruteur, avec un message facultatif.",
  },
  {
    title: "Échanger et planifier",
    text: "Messagerie, créneaux d'entretien, rappels : tout est dans le fil de la candidature.",
  },
  {
    title: "Recevoir une réponse",
    text: "Chaque candidature est clôturée par une réponse, positive ou non.",
  },
];

const RECRUITER_STEPS: Step[] = [
  {
    title: "Publier une offre",
    text: "Cinq écrans guidés, avec suggestions de compétences et de salaire. Aperçu avant publication.",
  },
  {
    title: "Recevoir des profils triés",
    text: "Les candidatures arrivent avec un pourcentage de correspondance et les compétences communes.",
  },
  {
    title: "Avancer le pipeline",
    text: "Un glissement pour passer un profil en entretien ; un appui long pour décliner avec un message.",
  },
  {
    title: "Proposer des créneaux",
    text: "Trois propositions, le candidat en choisit une ; l'entretien est ajouté aux agendas.",
  },
  {
    title: "Faire une proposition",
    text: "Envoyez l'offre d'embauche depuis l'app et clôturez les autres candidatures d'un geste.",
  },
];

const CHECKS = [
  "Statut mis à jour en temps réel des deux côtés",
  "Notifications uniquement pour les actions qui vous concernent",
  "Historique conservé pour chaque candidature",
];

const LINKS: {
  tone: CardTone;
  title: string;
  text: string;
  linkLabel: string;
  href: string;
}[] = [
  {
    tone: "blue",
    title: "L'application côté candidat",
    text: "Les écrans de recherche, candidature et suivi.",
    linkLabel: "Découvrir",
    href: ROUTES.candidatesApp,
  },
  {
    tone: "ink",
    title: "L'application côté recruteur",
    text: "Publication, pipeline et entretiens.",
    linkLabel: "Découvrir",
    href: ROUTES.recruitersApp,
  },
  {
    tone: "standard",
    title: "Télécharger AppJob",
    text: "Les liens officiels des stores, dès la sortie.",
    linkLabel: "Télécharger",
    href: ROUTES.download,
  },
];

/** One side of the "Parcours" section: heading pill and its five steps. */
function JourneyColumn({
  title,
  pillTone,
  stepTone,
  steps,
}: {
  title: string;
  pillTone: PillTone;
  stepTone: "blue" | "ink";
  steps: Step[];
}) {
  return (
    <div className="flex flex-col items-start gap-4">
      <h2 className="flex">
        <Pill tone={pillTone}>{title}</Pill>
      </h2>
      <Stagger as="ol" className="flex w-full flex-col gap-4">
        {steps.map((step, index) => (
          <StaggerItem as="li" key={step.title}>
            <StepCard number={index + 1} title={step.title} tone={stepTone}>
              {step.text}
            </StepCard>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Comment ça marche" }]} />

      {/* Hero */}
      <section className="gutter pt-8 md:pt-16">
        <div className="container-page flex flex-col desk:items-center">
          <Reveal immediate className="flex w-full desk:justify-center">
            <SectionHead
              as="h1"
              size="h1"
              align="center"
              eyebrow="Fonctionnement"
              title="Comment ça marche"
              text="Deux parcours qui se rejoignent au même endroit : la candidature. Voici, côte à côte, ce que vivent un candidat et un recruteur dans AppJob. Toutes ces actions se font dans l'application mobile."
            />
          </Reveal>
        </div>
      </section>

      {/* Segmenté + Parcours */}
      <InfoJourneys
        legend="Parcours affiché"
        allLabel="Les deux parcours"
        journeys={[
          {
            id: "candidate",
            label: "Candidat",
            content: (
              <JourneyColumn
                title="Côté candidat"
                pillTone="blue"
                stepTone="blue"
                steps={CANDIDATE_STEPS}
              />
            ),
          },
          {
            id: "recruiter",
            label: "Recruteur",
            content: (
              <JourneyColumn
                title="Côté recruteur"
                pillTone="mandarine"
                stepTone="ink"
                steps={RECRUITER_STEPS}
              />
            ),
          },
        ]}
      />

      {/* Point de rencontre */}
      <Section tone="ink" gap="none">
        <div className="flex flex-col gap-8 md:gap-12 desk:flex-row desk:items-center desk:gap-16">
          <Reveal className="flex min-w-0 flex-1 flex-col gap-6">
            <SectionHead
              tone="dark"
              width="column"
              className="max-w-140"
              eyebrow="Le point de rencontre"
              title="Une candidature, un fil de discussion"
              text="Dès qu'un candidat postule, un espace commun s'ouvre : statut, messages, créneaux, documents. Les deux parties voient la même chose, au même moment."
            />
            {/* On ink the frame sets the item text in primary-200; the shared
                "Check item" has no dark tone, so its text colour is re-pointed. */}
            <CheckList className="gap-6 [--color-fg-secondary:var(--color-primary-200)]">
              {CHECKS.map((check) => (
                <CheckItem key={check}>{check}</CheckItem>
              ))}
            </CheckList>
          </Reveal>
          <Reveal delay={0.1} className="flex min-w-0 flex-1 justify-center">
            <PhoneMockup className="[--phone-scale:0.85] desk:[--phone-scale:1]" />
          </Reveal>
        </div>
      </Section>

      {/* Liens */}
      <Section>
        <Reveal>
          <SectionHead
            eyebrow="Ce que le site ne fait pas"
            title="Tout se passe dans l'application"
          />
        </Reveal>
        <Stagger
          as="ul"
          className="grid gap-4 md:grid-cols-2 md:gap-6 desk:grid-cols-3"
        >
          {LINKS.map((link) => (
            <StaggerItem as="li" key={link.title}>
              <Card
                tone={link.tone}
                title={link.title}
                linkLabel={link.linkLabel}
                href={link.href}
              >
                {link.text}
              </Card>
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
