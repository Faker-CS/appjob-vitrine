import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Button, type ButtonVariant } from "@/components/ui/button";
import { CtaBlock } from "@/components/ui/cta-block";
import type { PillTone } from "@/components/ui/pill";
import { SectionHead } from "@/components/ui/section-head";
import { getArticles, getCategories, type ArticleAudience } from "@/lib/articles";
import { ROUTES } from "@/lib/navigation";
import { AdviceFilter } from "./content-advice-filter";

type AudienceContent = {
  eyebrow: string;
  title: string;
  lead: string;
  /** Eyebrow colour: blue for candidates, mandarine for recruiters. */
  accent: string;
  selectedTone: PillTone;
  practiceText: string;
  space: { label: string; href: string; variant: ButtonVariant };
  ctaTone: "blue" | "ink";
};

const CONTENT: Record<ArticleAudience, AudienceContent> = {
  candidates: {
    eyebrow: "Conseils · candidats",
    title: "Conseils pour les candidats",
    lead: "Des articles courts pour mieux présenter votre profil, candidater sans stress et préparer vos entretiens.",
    accent: "text-primary",
    selectedTone: "blue",
    practiceText:
      "Postuler, suivre, échanger : l'application AppJob vous accompagne à chaque étape.",
    space: { label: "Espace candidats", href: ROUTES.candidates, variant: "primary" },
    ctaTone: "blue",
  },
  recruiters: {
    eyebrow: "Conseils · recruteurs",
    title: "Conseils pour les recruteurs",
    lead: "Des articles courts pour publier de meilleures annonces, trier plus vite et répondre à chaque candidat.",
    accent: "text-mandarine",
    selectedTone: "ink",
    practiceText:
      "Publier, trier, planifier : l'application AppJob regroupe tout votre recrutement.",
    space: { label: "Espace recruteurs", href: ROUTES.recruiters, variant: "ink" },
    ctaTone: "ink",
  },
};

/**
 * Shared layout of /conseils/candidats and /conseils/recruteurs: page head,
 * filterable article grid, "Mettre en pratique" band and download block.
 */
export function AdviceList({ audience }: { audience: ArticleAudience }) {
  const content = CONTENT[audience];
  const articles = getArticles(audience);

  return (
    <>
      <Section spacing="hero" gap="none" containerClassName="gap-4 md:gap-8">
        <Reveal immediate>
          <SectionHead
            as="h1"
            size="h1"
            eyebrow={<span className={content.accent}>{content.eyebrow}</span>}
            title={content.title}
            text={content.lead}
          />
        </Reveal>
        <AdviceFilter
          articles={articles}
          categories={getCategories(articles)}
          selectedTone={content.selectedTone}
        />
      </Section>

      {/* Mettre en pratique */}
      <Section tone="soft" spacing="compact" gap="none">
        <Reveal className="flex flex-col gap-6 desk:flex-row desk:items-center desk:gap-12">
          <div className="min-w-0 flex-1">
            <SectionHead
              width="column"
              className="max-w-155"
              eyebrow={<span className={content.accent}>Mettre en pratique</span>}
              title="Tout cela se fait dans l'application"
              text={content.practiceText}
            />
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
            <Button
              href={content.space.href}
              variant={content.space.variant}
              size="md"
              arrow
              fullWidth="mobile"
            >
              {content.space.label}
            </Button>
            <Button
              href={ROUTES.download}
              variant="secondary"
              size="md"
              fullWidth="mobile"
            >
              Télécharger AppJob
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* Téléchargement */}
      <Section spacing="compact" gap="none">
        <Reveal>
          <CtaBlock tone={content.ctaTone} />
        </Reveal>
      </Section>
    </>
  );
}
