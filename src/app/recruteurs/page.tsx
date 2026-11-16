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
  title: "Espace recruteurs",
  description:
    "Publiez une offre, recevez des profils qualifiés, échangez et planifiez vos entretiens depuis l'application AppJob. Conçue pour les TPE, PME, agences et indépendants qui recrutent sans service RH.",
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
    icon: "doc",
    iconTone: "mandarine",
    title: "Annonce guidée",
    text: "Un formulaire en cinq écrans avec suggestions de titre, de compétences et de fourchette de salaire. Publiée en quelques minutes.",
    mobileText: "Cinq écrans, suggestions de titre et de salaire.",
    link: {
      label: "Voir la publication",
      href: `${ROUTES.recruitersApp}#publication`,
    },
  },
  {
    icon: "users",
    iconTone: "ink",
    title: "Profils qualifiés",
    text: "Les candidatures arrivent triées par pertinence. Un pourcentage de correspondance et les compétences communes en un coup d'œil.",
    mobileText: "Candidatures triées par pertinence.",
    link: { label: "Voir le tri", href: `${ROUTES.recruitersApp}#tri` },
  },
  {
    icon: "calendar",
    iconTone: "mandarine",
    title: "Pipeline et entretiens",
    text: "Faites glisser un profil d'une colonne à l'autre, proposez trois créneaux, le candidat en choisit un.",
    mobileText: "Proposez trois créneaux, le candidat en choisit un.",
    link: {
      label: "Voir le pipeline",
      href: `${ROUTES.recruitersApp}#entretiens`,
    },
  },
  {
    icon: "chat",
    iconTone: "ink",
    title: "Messagerie",
    text: "Un fil par candidature, avec modèles de réponses et réponses groupées pour gagner du temps.",
  },
  {
    icon: "users",
    iconTone: "mandarine",
    title: "Équipe",
    text: "Invitez un·e collègue sur une offre pour partager les évaluations et les décisions.",
  },
  {
    icon: "shield",
    iconTone: "ink",
    title: "Conformité",
    text: "Durées de conservation, consentement des candidats et export : tout est prévu pour le RGPD.",
  },
];

const TAGS = [
  "TPE et commerces",
  "PME",
  "Agences d'intérim",
  "Restauration et hôtellerie",
  "Start-ups",
];

const STATS = [
  { value: "5 min", label: "pour publier une offre complète" },
  { value: "1 écran", label: "pour voir tout votre pipeline" },
  { value: "3 créneaux", label: "proposés, le candidat en choisit un" },
];

/** Section eyebrows are mandarine in the recruiter space. */
function Eyebrow({ children }: { children: string }) {
  return <span className="text-mandarine">{children}</span>;
}

export default function RecruitersPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Recruteurs" }]} />

      <PageHero
        tone="dark"
        panel
        hideNoteOnMobile
        eyebrow="Espace recruteurs"
        title={
          <>
            Recrutez vite.
            <br />
            Recrutez <span className="text-mandarine">juste.</span>
          </>
        }
        lead={
          <Swap mobile="Publiez une offre, recevez des profils qualifiés, planifiez vos entretiens depuis l'application.">
            Publiez une offre, recevez des profils qualifiés, échangez et
            planifiez vos entretiens depuis l&apos;application. Conçue pour les
            TPE, PME, agences et indépendants qui recrutent sans service RH.
          </Swap>
        }
        actions={
          <>
            <Button
              href={ROUTES.recruitersApp}
              variant="mandarine"
              size="lg"
              arrow
              fullWidth="mobile"
            >
              Découvrir l&apos;application
            </Button>
            <Button
              href={ROUTES.recruitersFaq}
              variant="outline-light"
              size="md"
              className="max-md:hidden"
            >
              Questions fréquentes
            </Button>
          </>
        }
        stores
        visual={<HeroVisual variant="single" tone="dark" />}
      />

      {/* Ce que fait l'application */}
      <Section>
        <Reveal>
          <SectionHead
            eyebrow={<Eyebrow>Ce que fait l&apos;application</Eyebrow>}
            title={
              <Swap mobile="Un recrutement complet">
                Un recrutement complet, dans votre poche
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
                linkTone="mandarine"
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

      {/* Pour qui ? — not part of the mobile frame */}
      <Section tone="soft" gap="none" className="max-md:hidden">
        <div className="flex flex-col gap-12 desk:flex-row desk:items-center desk:gap-16">
          <Reveal className="flex flex-col gap-6 desk:w-130 desk:shrink-0">
            <SectionHead
              width="column"
              eyebrow={<Eyebrow>Pour qui&nbsp;?</Eyebrow>}
              title="Pour celles et ceux qui recrutent en plus du reste"
              text="Gérant·e de commerce, responsable d'agence, chef·fe d'atelier, fondateur·rice de start-up : AppJob est faite pour recruter entre deux rendez-vous, sans logiciel RH."
            />
            <ul className="flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <li key={tag} className="flex">
                  <Pill tone="outline">{tag}</Pill>
                </li>
              ))}
            </ul>
          </Reveal>
          {/* As in Figma, "3 créneaux" is wider than its column and breaks inside the word. */}
          <Stagger className="grid min-w-0 flex-1 gap-6 md:grid-cols-3">
            {STATS.map((stat) => (
              <StaggerItem key={stat.value}>
                <Stat
                  value={stat.value}
                  label={stat.label}
                  className="break-words"
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* Aller plus loin — not part of the mobile frame */}
      <Section className="max-md:hidden">
        <Reveal>
          <SectionHead
            eyebrow={<Eyebrow>Aller plus loin</Eyebrow>}
            title="Dans l'espace recruteurs"
          />
        </Reveal>
        <Stagger className="grid gap-6 md:grid-cols-2 desk:grid-cols-3">
          <StaggerItem>
            <LinkCard
              tone="ink"
              pill="Application"
              title="L'application recrutement"
              linkLabel="Découvrir"
              href={ROUTES.recruitersApp}
            >
              Les écrans et le parcours détaillé, de la publication à
              l&apos;embauche.
            </LinkCard>
          </StaggerItem>
          <StaggerItem>
            <LinkCard
              pill="FAQ"
              pillTone="ink"
              title="Questions fréquentes"
              linkLabel="Lire la FAQ"
              href={ROUTES.recruitersFaq}
            >
              Tarifs, volumes, équipe, conformité : ce que les recruteurs nous
              demandent le plus.
            </LinkCard>
          </StaggerItem>
          <StaggerItem>
            <LinkCard
              pill="Conseils"
              pillTone="ink"
              title="Conseils recruteurs"
              linkLabel="Voir les conseils"
              href={ROUTES.adviceRecruiters}
            >
              Rédiger une annonce, mener un entretien, répondre à tous les
              candidats.
            </LinkCard>
          </StaggerItem>
        </Stagger>
      </Section>

      {/* Téléchargement */}
      <Section spacing="compact" gap="none">
        <Reveal>
          <CtaBlock
            tone="ink"
            title="Votre prochaine recrue est peut-être déjà sur AppJob."
          />
        </Reveal>
      </Section>
    </>
  );
}
