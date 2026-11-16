import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { InfoEmblem } from "@/components/sections/info-emblem";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CtaBlock } from "@/components/ui/cta-block";
import type { IconName, IconTileTone } from "@/components/ui/icon";
import { SectionHead } from "@/components/ui/section-head";
import { Stat } from "@/components/ui/stat";
import { ROUTES } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "AppJob rapproche celles et ceux qui cherchent un emploi de celles et ceux qui recrutent : une application mobile sans publicité, sans notifications inutiles et sans candidature laissée sans réponse.",
};

const PRINCIPLES: {
  icon: IconName;
  iconTone: IconTileTone;
  title: string;
  text: string;
}[] = [
  {
    icon: "shield",
    iconTone: "primary",
    title: "Pas de publicité",
    text: "L'application est gratuite pour les candidats et ne vend pas leur attention. Les recruteurs financent le service.",
  },
  {
    icon: "bell",
    iconTone: "mandarine",
    title: "Pas de notifications inutiles",
    text: "Une notification doit correspondre à une action concrète : une offre pertinente, un message, un entretien.",
  },
  {
    icon: "chat",
    iconTone: "ink",
    title: "Pas de candidature sans réponse",
    text: "Chaque candidature est clôturée par une réponse, même négative. L'application y aide avec des messages prêts à l'emploi.",
  },
];

const STATS: { value: string; label: string }[] = [
  { value: "2", label: "parcours : candidat et recruteur" },
  { value: "iOS · Android", label: "disponibles à la sortie" },
  { value: "UE", label: "hébergement des données" },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "À propos" }]} />

      {/* Hero */}
      <Section spacing="hero" gap="none">
        <div className="flex flex-col gap-8 desk:flex-row desk:items-center desk:gap-16">
          <Reveal immediate className="min-w-0 flex-1">
            <SectionHead
              as="h1"
              size="h1"
              width="column"
              className="max-w-170"
              eyebrow="À propos"
              title="Rapprocher celles et ceux qui cherchent de celles et ceux qui recrutent"
              text="AppJob est née d'un constat simple : chercher un emploi ou recruter se fait de plus en plus sur un téléphone, avec des outils qui n'ont pas été pensés pour ça. Nous avons voulu une application qui tient dans la main et qui respecte le temps de chacun."
            />
          </Reveal>
          <Reveal immediate delay={0.15} className="flex justify-center">
            <InfoEmblem />
          </Reveal>
        </div>
      </Section>

      {/* Principes */}
      <Section tone="soft">
        <Reveal>
          <SectionHead
            eyebrow="Nos principes"
            title="Ce que nous avons décidé de ne pas faire"
          />
        </Reveal>
        <Stagger className="grid gap-4 md:grid-cols-2 md:gap-6 desk:grid-cols-3">
          {PRINCIPLES.map((principle) => (
            <StaggerItem key={principle.title}>
              <Card
                icon={principle.icon}
                iconTone={principle.iconTone}
                title={principle.title}
              >
                {principle.text}
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Chiffres */}
      <Section tone="soft" gap="none">
        <div className="flex flex-col gap-8 desk:flex-row desk:items-center desk:gap-16">
          <Reveal className="desk:w-130 desk:shrink-0">
            <SectionHead
              width="column"
              eyebrow="Le projet"
              title="Une application, un site pour la présenter"
              text="Ce site a un rôle précis : expliquer AppJob, orienter chaque public vers son parcours et conduire au téléchargement. Toutes les fonctionnalités vivent dans l'application mobile."
            />
          </Reveal>
          <Stagger className="grid min-w-0 flex-1 gap-4 md:grid-cols-3 md:items-start md:gap-6">
            {STATS.map((stat) => (
              <StaggerItem key={stat.label}>
                <Stat value={stat.value} label={stat.label} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* Citation */}
      <section className="gutter bg-ink py-10 md:py-20">
        <Reveal className="container-page flex flex-col items-start gap-6 desk:flex-row desk:items-center desk:gap-12">
          <blockquote className="min-w-0 flex-1 font-display text-h4 font-semibold text-white md:text-quote">
            <p>
              « Un bon outil de recrutement ne fait pas gagner du temps à une
              seule des deux parties. »
            </p>
          </blockquote>
          <Button
            href={ROUTES.contact}
            variant="white"
            size="md"
            arrow
            fullWidth="mobile"
          >
            Nous écrire
          </Button>
        </Reveal>
      </section>

      {/* Téléchargement */}
      <Section spacing="compact" gap="none">
        <Reveal>
          <CtaBlock />
        </Reveal>
      </Section>
    </>
  );
}
