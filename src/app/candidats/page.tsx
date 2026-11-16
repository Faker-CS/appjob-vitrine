import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { HeroVisual } from "@/components/sections/hero-visual";
import { PageHero } from "@/components/sections/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CtaBlock } from "@/components/ui/cta-block";
import type { IconName, IconTileTone } from "@/components/ui/icon";
import { LinkCard } from "@/components/ui/link-card";
import { Pill } from "@/components/ui/pill";
import { Swap } from "@/components/ui/responsive";
import { SectionHead } from "@/components/ui/section-head";
import { Stat } from "@/components/ui/stat";
import { ROUTES } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Espace candidats",
  description:
    "AppJob rassemble des offres adaptées à votre profil et vous laisse postuler, échanger et suivre vos candidatures depuis votre téléphone. Gratuit, sans publicité.",
};

type Feature = {
  icon: IconName;
  iconTone: IconTileTone;
  title: string;
  text: string;
  /** Shorter copy of the mobile frame; features without it are desktop-only. */
  mobileText?: string;
  link?: { label: string; href: string };
};

const FEATURES: Feature[] = [
  {
    icon: "search",
    iconTone: "primary",
    title: "Recherche intelligente",
    text: "Métier, ville, type de contrat, salaire, télétravail. Les résultats tiennent compte de vos favoris et de vos candidatures passées.",
    mobileText: "Métier, ville, contrat, salaire, télétravail.",
    link: {
      label: "Voir la recherche",
      href: `${ROUTES.candidatesApp}#recherche`,
    },
  },
  {
    icon: "bolt",
    iconTone: "mandarine",
    title: "Candidature express",
    text: "Un profil rempli une fois sert pour toutes vos candidatures. Ajoutez un mot personnalisé si vous le souhaitez.",
    mobileText: "Un profil rempli une fois sert pour toutes vos candidatures.",
    link: {
      label: "Voir la candidature",
      href: `${ROUTES.candidatesApp}#candidature`,
    },
  },
  {
    icon: "chat",
    iconTone: "ink",
    title: "Suivi et messagerie",
    text: "Chaque candidature a un statut clair : envoyée, vue, entretien, réponse. Discutez directement avec le recruteur.",
    mobileText: "Un statut clair et une discussion directe avec le recruteur.",
    link: { label: "Voir le suivi", href: `${ROUTES.candidatesApp}#suivi` },
  },
  {
    icon: "bell",
    iconTone: "primary",
    title: "Alertes personnalisées",
    text: "Recevez une notification quand une offre correspond à vos critères, et seulement dans ce cas.",
  },
  {
    icon: "calendar",
    iconTone: "mandarine",
    title: "Entretiens planifiés",
    text: "Acceptez un créneau proposé par le recruteur ; il s'ajoute à votre agenda avec un rappel.",
  },
  {
    icon: "shield",
    iconTone: "ink",
    title: "Confidentialité",
    text: "Masquez votre profil à certaines entreprises, par exemple votre employeur actuel.",
  },
];

const TAGS = [
  "Étudiant·es et jeunes diplômé·es",
  "Salarié·es en veille",
  "Reconversion",
  "Intérim et saisonnier",
  "Alternance",
];

const STATS = [
  { value: "2 min", label: "pour créer un profil complet" },
  { value: "2 gestes", label: "pour envoyer une candidature" },
  { value: "0 €", label: "pour les candidats, toujours" },
];

export default function CandidatesPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Candidats" }]} />

      <PageHero
        afterBreadcrumb
        hideNoteOnMobile
        eyebrow="Espace candidats"
        title={
          <>
            Cherchez moins.
            <br />
            Trouvez <span className="text-primary">mieux.</span>
          </>
        }
        lead={
          <Swap mobile="Des offres adaptées à votre profil, des candidatures en deux gestes, un suivi clair. Gratuit, sans publicité.">
            AppJob rassemble des offres adaptées à votre profil et vous laisse
            postuler, échanger et suivre vos candidatures depuis votre
            téléphone. Gratuit, sans publicité.
          </Swap>
        }
        actions={
          <>
            <Button
              href={ROUTES.candidatesApp}
              variant="primary"
              size="lg"
              arrow
              fullWidth="mobile"
            >
              Découvrir l&apos;application
            </Button>
            <Button
              href={ROUTES.candidatesFaq}
              variant="secondary"
              size="lg"
              className="max-md:hidden"
            >
              Questions fréquentes
            </Button>
          </>
        }
        stores
        visual={<HeroVisual variant="single" />}
      />

      {/* Ce que fait l'application */}
      <Section>
        <Reveal>
          <SectionHead
            eyebrow="Ce que fait l'application"
            title={
              <Swap mobile="Tout le parcours">
                Tout le parcours, du premier coup d&apos;œil à la signature
              </Swap>
            }
          />
        </Reveal>
        <Stagger className="grid gap-4 md:grid-cols-2 md:gap-6 desk:grid-cols-3">
          {FEATURES.map((feature) => (
            <StaggerItem
              key={feature.title}
              className={feature.mobileText ? undefined : "max-md:hidden"}
            >
              <Card hideLinkOnMobile
                icon={feature.icon}
                iconTone={feature.iconTone}
                title={feature.title}
                linkLabel={feature.link?.label}
                href={feature.link?.href}
              >
                {feature.mobileText ? (
                  <Swap mobile={feature.mobileText}>{feature.text}</Swap>
                ) : (
                  feature.text
                )}
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Pour qui ? — the mobile frame keeps the figures only */}
      <Section tone="soft" gap="none">
        <div className="flex flex-col gap-12 desk:flex-row desk:items-center desk:gap-16">
          <Reveal className="flex flex-col gap-6 max-md:hidden desk:w-130 desk:shrink-0">
            {/* The head is 560 px wide in Figma, 40 px wider than its column. */}
            <SectionHead
              width="column"
              className="desk:w-140"
              eyebrow="Pour qui ?"
              title="Pensée pour toutes les recherches"
              text="Premier emploi, reconversion, alternance, intérim ou CDI : AppJob s'adresse à toute personne qui cherche un poste et préfère le faire depuis son mobile."
            />
            <ul className="flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <li key={tag} className="flex">
                  <Pill tone="outline">{tag}</Pill>
                </li>
              ))}
            </ul>
          </Reveal>
          <Stagger className="grid min-w-0 flex-1 gap-2 md:grid-cols-3 md:gap-6">
            {STATS.map((stat) => (
              <StaggerItem key={stat.value}>
                <Stat value={stat.value} label={stat.label} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* Aller plus loin — not part of the mobile frame */}
      <Section className="max-md:hidden">
        <Reveal>
          <SectionHead
            eyebrow="Aller plus loin"
            title="Dans l'espace candidats"
          />
        </Reveal>
        <Stagger className="grid gap-6 md:grid-cols-2 desk:grid-cols-3">
          <StaggerItem>
            <LinkCard
              tone="blue"
              pill="Application"
              title="L'application emploi"
              linkLabel="Découvrir"
              href={ROUTES.candidatesApp}
            >
              Les écrans, les parcours et les fonctionnalités détaillées de
              l&apos;app côté candidat.
            </LinkCard>
          </StaggerItem>
          <StaggerItem>
            <LinkCard
              pill="FAQ"
              title="Questions fréquentes"
              linkLabel="Lire la FAQ"
              href={ROUTES.candidatesFaq}
            >
              Gratuité, données personnelles, disponibilité, compatibilité : les
              réponses aux questions que vous nous posez.
            </LinkCard>
          </StaggerItem>
          <StaggerItem>
            <LinkCard
              pill="Conseils"
              title="Conseils candidats"
              linkLabel="Voir les conseils"
              href={ROUTES.adviceCandidates}
            >
              CV, lettre, entretien, négociation : des articles courts et
              concrets, publiés régulièrement.
            </LinkCard>
          </StaggerItem>
        </Stagger>
      </Section>

      {/* Téléchargement */}
      <Section spacing="compact" gap="none">
        <Reveal>
          <CtaBlock title="Votre prochaine opportunité tient dans la poche." />
        </Reveal>
      </Section>
    </>
  );
}
