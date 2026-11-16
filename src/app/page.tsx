import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { HeroVisual } from "@/components/sections/hero-visual";
import { PageHero } from "@/components/sections/page-hero";
import { AudienceCard } from "@/components/ui/audience-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckItem, CheckList } from "@/components/ui/check-item";
import { CtaBlock } from "@/components/ui/cta-block";
import type { IconName, IconTileTone } from "@/components/ui/icon";
import { Pill, type PillTone } from "@/components/ui/pill";
import { Swap } from "@/components/ui/responsive";
import { SectionHead } from "@/components/ui/section-head";
import { StepCard } from "@/components/ui/step-card";
import { cn } from "@/lib/cn";
import { ROUTES } from "@/lib/navigation";

type Step = { title: string; text: string; mobileText: string };

const STEPS: Step[] = [
  {
    title: "Téléchargez l'app",
    text: "Disponible prochainement sur l'App Store et Google Play. Installation en moins d'une minute.",
    mobileText: "Disponible prochainement sur l'App Store et Google Play.",
  },
  {
    title: "Choisissez votre profil",
    text: "Candidat ou recruteur : l'interface et les fonctionnalités s'adaptent à votre choix.",
    mobileText: "Candidat ou recruteur : l'interface s'adapte.",
  },
  {
    title: "Renseignez l'essentiel",
    text: "Un profil en quelques champs pour les candidats, une offre guidée pour les recruteurs.",
    mobileText: "Un profil ou une offre guidée.",
  },
  {
    title: "Échangez",
    text: "Candidatures, messages, entretiens : tout est centralisé et notifié en temps réel.",
    mobileText: "Candidatures, messages, entretiens centralisés.",
  },
];

type Benefit = {
  icon: IconName;
  iconTone: IconTileTone;
  title: string;
  text: string;
  /** Shorter copy of the mobile frame; benefits without it are desktop-only. */
  mobileText?: string;
};

const BENEFITS: Benefit[] = [
  {
    icon: "filter",
    iconTone: "primary",
    title: "Des offres filtrées pour vous",
    text: "Lieu, contrat, salaire, télétravail : des filtres simples et des suggestions qui apprennent de vos choix.",
    mobileText: "Lieu, contrat, salaire, télétravail : des filtres simples.",
  },
  {
    icon: "bolt",
    iconTone: "mandarine",
    title: "Candidature en deux gestes",
    text: "Votre profil fait office de CV. Postulez, puis suivez l'avancement de chaque candidature.",
    mobileText: "Votre profil fait office de CV.",
  },
  {
    icon: "chat",
    iconTone: "ink",
    title: "Échanges directs",
    text: "Un fil de discussion par candidature, avec propositions de créneaux d'entretien intégrées.",
  },
  {
    icon: "shield",
    iconTone: "primary",
    title: "Vous gardez la main",
    text: "Profil visible ou masqué, données exportables, suppression du compte en un geste.",
  },
];

const CHECKS: { text: string; mobile: boolean }[] = [
  { text: "Notifications utiles, jamais envahissantes", mobile: true },
  { text: "Messagerie intégrée entre candidats et recruteurs", mobile: false },
  { text: "Données hébergées en Europe et contrôlées par vous", mobile: false },
  { text: "Gratuit pour les candidats", mobile: true },
];

const ARTICLES: { audience: string; tone: PillTone; title: string; href: string }[] = [
  {
    audience: "Candidats",
    tone: "blue",
    title: "Préparer un entretien en 30 minutes",
    href: ROUTES.adviceCandidates,
  },
  {
    audience: "Recruteurs",
    tone: "mandarine",
    title: "Rédiger une annonce qui attire les bons profils",
    href: ROUTES.adviceRecruiters,
  },
  {
    audience: "Candidats",
    tone: "blue",
    title: "Relancer sans insister",
    href: ROUTES.adviceCandidates,
  },
];

export default function HomePage() {
  return (
    <>
      <PageHero
        badge={
          <Pill tone="mandarine">
            <Swap mobile="Bientôt sur iOS et Android">
              Bientôt disponible sur iOS et Android
            </Swap>
          </Pill>
        }
        titleStyle="display"
        title={
          <>
            L&apos;emploi, à portée <br className="max-md:hidden" />
            de <span className="text-primary">pouce.</span>
          </>
        }
        lead={
          <>
            AppJob est une application mobile pensée pour deux publics : les
            personnes qui cherchent un emploi et celles qui recrutent.
            <span className="max-md:hidden">
              {" "}
              Un même outil, deux parcours, zéro friction.
            </span>
          </>
        }
        actions={
          <>
            <Button
              href={ROUTES.candidates}
              variant="primary"
              size="lg"
              arrow
              fullWidth="mobile"
            >
              Je cherche un emploi
            </Button>
            <Button
              href={ROUTES.recruiters}
              variant="ink"
              size="lg"
              arrow
              fullWidth="mobile"
            >
              Je recrute
            </Button>
          </>
        }
        stores
        visual={<HeroVisual variant="duo" />}
      />

      {/* Publics */}
      <Section>
        <Reveal>
          <SectionHead
            eyebrow={
              <Swap mobile="Deux entrées">Deux entrées, une application</Swap>
            }
            title="Vous êtes plutôt… ?"
            text="AppJob s'adapte à votre rôle dès l'ouverture. Choisissez votre parcours pour découvrir ce que l'application fait pour vous."
            hideTextOnMobile
          />
        </Reveal>
        <Stagger className="grid gap-4 md:grid-cols-2 md:gap-6" stagger={0.12}>
          <StaggerItem>
            <AudienceCard
              audience="candidates"
              number="Parcours 01"
              title="Trouvez le poste qui vous ressemble"
              cta="Découvrir le parcours candidat"
              href={ROUTES.candidates}
            >
              Des offres triées selon votre profil, des candidatures en deux
              gestes et un suivi clair de chaque réponse.
            </AudienceCard>
          </StaggerItem>
          <StaggerItem>
            <AudienceCard
              audience="recruiters"
              number="Parcours 02"
              title="Recrutez sans quitter votre téléphone"
              cta="Découvrir le parcours recruteur"
              href={ROUTES.recruiters}
            >
              Publiez une offre en quelques minutes, recevez des profils
              qualifiés et pilotez vos entretiens depuis l&apos;app.
            </AudienceCard>
          </StaggerItem>
        </Stagger>
      </Section>

      {/* Comment ça marche */}
      <Section tone="soft" containerClassName="desk:items-center">
        <Reveal className="flex w-full desk:justify-center">
          <SectionHead
            align="center"
            eyebrow="Comment ça marche"
            title="Quatre étapes, un seul écran"
            text="Tout se passe dans l'application mobile. Le site vous présente le fonctionnement ; l'app fait le reste."
            hideTextOnMobile
          />
        </Reveal>
        <Stagger
          as="ol"
          className="grid w-full gap-4 md:grid-cols-2 md:gap-6 desk:grid-cols-4"
        >
          {STEPS.map((step, index) => (
            <StaggerItem as="li" key={step.title}>
              <StepCard number={index + 1} title={step.title}>
                <Swap mobile={step.mobileText}>{step.text}</Swap>
              </StepCard>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="max-md:hidden">
          <Button href={ROUTES.howItWorks} variant="secondary" size="md" arrow>
            Voir le fonctionnement en détail
          </Button>
        </Reveal>
      </Section>

      {/* Pourquoi AppJob */}
      <Section gap="none">
        <div className="flex flex-col gap-4 desk:flex-row desk:items-center desk:gap-16">
          <div className="max-desk:contents desk:flex desk:w-115 desk:shrink-0 desk:flex-col desk:gap-6">
            <Reveal className="order-1">
              <SectionHead
                width="column"
                eyebrow="Pourquoi AppJob"
                title={
                  <Swap mobile="Conçue pour le mobile">
                    Une application conçue pour le mobile, pas un site adapté
                  </Swap>
                }
                text={
                  <>
                    Chaque écran a été dessiné pour une main et un pouce.
                    <span className="max-md:hidden">
                      {" "}
                      Pas de formulaire interminable, pas de menus cachés :
                      l&apos;essentiel, au bon moment.
                    </span>
                  </>
                }
              />
            </Reveal>
            <Reveal className="order-3" delay={0.1}>
              <CheckList className="gap-4 md:gap-6">
                {CHECKS.map((check) => (
                  <CheckItem
                    key={check.text}
                    className={check.mobile ? undefined : "max-md:hidden"}
                  >
                    {check.text}
                  </CheckItem>
                ))}
              </CheckList>
            </Reveal>
          </div>
          <Stagger className="order-2 grid min-w-0 flex-1 gap-4 md:grid-cols-2">
            {BENEFITS.map((benefit) => (
              <StaggerItem
                key={benefit.title}
                className={benefit.mobileText ? undefined : "max-md:hidden"}
              >
                <Card
                  icon={benefit.icon}
                  iconTone={benefit.iconTone}
                  title={benefit.title}
                >
                  {benefit.mobileText ? (
                    <Swap mobile={benefit.mobileText}>{benefit.text}</Swap>
                  ) : (
                    benefit.text
                  )}
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* Conseils — not part of the mobile home frame */}
      <Section tone="ink" gap="none" className="max-md:hidden">
        <div className="flex flex-col gap-12 desk:flex-row desk:items-center desk:gap-16">
          <Reveal className="flex min-w-0 flex-1 flex-col items-start gap-8">
            <SectionHead
              tone="dark"
              width="column"
              className="max-w-155"
              eyebrow="Conseils"
              title="Des conseils utiles, publiés au fil de l'eau"
              text="Lettres, entretiens, annonces, tri des candidatures : nos articles sont organisés par public et reliés à chaque parcours."
            />
            <div className="flex flex-wrap gap-3">
              <Button href={ROUTES.adviceCandidates} variant="white" size="md" arrow>
                Conseils candidats
              </Button>
              <Button
                href={ROUTES.adviceRecruiters}
                variant="outline-light"
                size="md"
                arrow
              >
                Conseils recruteurs
              </Button>
            </div>
          </Reveal>
          <Stagger as="ul" className="flex flex-col gap-3 desk:w-120 desk:shrink-0">
            {ARTICLES.map((article) => (
              <StaggerItem as="li" key={article.title}>
                <Link
                  href={article.href}
                  className={cn(
                    "flex items-center gap-4 rounded-lg bg-ink-700 p-6",
                    "transition-transform duration-300 ease-out-soft hover:translate-x-1",
                  )}
                >
                  <Pill tone={article.tone}>{article.audience}</Pill>
                  <span className="font-display text-body font-semibold text-white">
                    {article.title}
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
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
