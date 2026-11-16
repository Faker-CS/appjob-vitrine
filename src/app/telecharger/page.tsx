import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { DownloadHero } from "@/components/sections/content-download-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CtaBlock } from "@/components/ui/cta-block";
import { Pill } from "@/components/ui/pill";
import { SectionHead } from "@/components/ui/section-head";
import { StepCard } from "@/components/ui/step-card";
import { StoreBadge, type Store } from "@/components/ui/store-badge";
import { ROUTES } from "@/lib/navigation";
import { NOTIFY_FORM_ID } from "@/lib/notify";

export const metadata: Metadata = {
  title: "Télécharger AppJob",
  description:
    "AppJob arrive sur l'App Store et Google Play. Laissez votre adresse e-mail pour être prévenu·e le jour de la sortie.",
};

const PLATFORMS: { store: Store; version: string; text: string }[] = [
  {
    store: "app-store",
    version: "iPhone, version précisée à la sortie",
    text: "Depuis l'App Store. L'application s'adapte à toutes les tailles d'iPhone et prend en charge le mode sombre.",
  },
  {
    store: "google-play",
    version: "Android, version précisée à la sortie",
    text: "Depuis Google Play. Aucune installation en dehors du store ne sera proposée.",
  },
];

const STEPS: { title: string; text: string }[] = [
  {
    title: "Choisissez votre rôle",
    text: "Candidat ou recruteur. Vous pourrez changer plus tard.",
  },
  {
    title: "Créez votre compte",
    text: "E-mail ou identifiant Apple / Google. Aucune carte bancaire demandée.",
  },
  {
    title: "Complétez l'essentiel",
    text: "Un profil ou une première offre, guidé pas à pas.",
  },
];

export default function DownloadPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Télécharger AppJob" }]} />

      <DownloadHero />

      {/* Compatibilité */}
      <Section tone="soft">
        <Reveal>
          <SectionHead eyebrow="Compatibilité" title="Sur quels téléphones ?" />
        </Reveal>
        <Stagger as="ul" className="grid gap-4 md:grid-cols-2 md:gap-6">
          {PLATFORMS.map((platform) => (
            <StaggerItem as="li" key={platform.store}>
              <div className="flex h-full flex-col gap-4 rounded-lg bg-surface p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <StoreBadge store={platform.store} />
                  <Pill tone="outline">{platform.version}</Pill>
                </div>
                <p className="text-small text-fg-secondary">{platform.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Premières minutes */}
      <Section>
        <Reveal>
          <SectionHead
            eyebrow="Après l'installation"
            title="Vos trois premières minutes"
          />
        </Reveal>
        <Stagger
          as="ol"
          className="grid gap-4 md:grid-cols-2 md:gap-6 desk:grid-cols-3"
        >
          {STEPS.map((step, index) => (
            <StaggerItem as="li" key={step.title}>
              <StepCard number={index + 1} title={step.title}>
                {step.text}
              </StepCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Téléchargement — the frame keeps the default buttons of the block */}
      <Section spacing="compact" gap="none">
        <Reveal>
          <CtaBlock
            title="Une question avant de télécharger ?"
            text="Consultez les FAQ ou écrivez-nous, nous répondons sous deux jours ouvrés."
            primary={{ label: "Être prévenu·e", href: `#${NOTIFY_FORM_ID}` }}
            secondary={{
              label: "Voir comment ça marche",
              href: ROUTES.howItWorks,
            }}
          />
        </Reveal>
      </Section>
    </>
  );
}
