import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ArticleCard } from "@/components/ui/article-card";
import { AudienceCard } from "@/components/ui/audience-card";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CtaBlock } from "@/components/ui/cta-block";
import { SectionHead } from "@/components/ui/section-head";
import { RECENT_ARTICLES } from "@/lib/articles";
import { ROUTES } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Conseils",
  description:
    "Des conseils courts et utiles, rédigés par l'équipe AppJob et classés par public : candidats et recruteurs.",
};

/*
 * The frame sets these two cards to 323 px instead of the 420 px of the
 * component: the content keeps its bottom anchor and rises into the top
 * padding. The 1 200 px container makes them 588 px wide on desktop, so the
 * fixed height is safe there; below it the cards take their natural height.
 */
const AUDIENCE_CARD_SIZE = "md:min-h-0! desk:h-80.75";

export default function AdvicePage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Conseils" }]} />

      {/* Hero: 64 / 48 px band */}
      <section className="gutter pt-8 pb-6 md:pt-16 md:pb-12">
        <div className="container-page flex flex-col gap-4 md:gap-12">
          <Reveal immediate>
            <SectionHead
              as="h1"
              size="h1"
              eyebrow="Conseils"
              title="Des conseils courts, utiles, par public"
              text="Nos articles sont rédigés par l'équipe AppJob et publiés progressivement. Chacun est relié au parcours concerné : candidat ou recruteur."
            />
          </Reveal>
          <Stagger
            immediate
            className="grid gap-4 md:grid-cols-2 md:gap-6"
            stagger={0.12}
          >
            <StaggerItem>
              <AudienceCard
                as="h2"
                audience="candidates"
                title="Conseils pour les candidats"
                cta="Voir les 6 articles"
                href={ROUTES.adviceCandidates}
                className={AUDIENCE_CARD_SIZE}
              >
                Profil, candidature, entretien, salaire, reconversion.
              </AudienceCard>
            </StaggerItem>
            <StaggerItem>
              <AudienceCard
                as="h2"
                audience="recruiters"
                title="Conseils pour les recruteurs"
                cta="Voir les 6 articles"
                href={ROUTES.adviceRecruiters}
                className={AUDIENCE_CARD_SIZE}
              >
                Annonce, tri, entretien, réponse aux candidats, intégration.
              </AudienceCard>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* Récents: 48 / 48 px band */}
      <section className="gutter py-6 md:py-12">
        <div className="container-page flex flex-col gap-4 md:gap-12">
          <Reveal>
            <SectionHead eyebrow="Derniers articles" title="Publiés récemment" />
          </Reveal>
          <Stagger
            as="ul"
            className="grid gap-4 md:grid-cols-2 md:gap-6 desk:grid-cols-3"
          >
            {RECENT_ARTICLES.map((article) => (
              <StaggerItem as="li" key={article.id}>
                <ArticleCard
                  cover={article.cover}
                  category={article.category}
                  title={article.title}
                  date={article.date}
                  readingTime={article.readingTime}
                >
                  {article.excerpt}
                </ArticleCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
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
