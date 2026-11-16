import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Alert } from "@/components/ui/alert";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHead } from "@/components/ui/section-head";
import { LegalToc } from "./legal-toc";

export type LegalSection = {
  /** Anchor id, also used by the table of contents. */
  id: string;
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  /** Breadcrumb label when it differs from the title. */
  breadcrumb?: string;
  title: string;
  lead: string;
  updatedAt: string;
  sections: LegalSection[];
};

/** Body paragraph of a legal section. */
export function LegalParagraph({ children }: { children: ReactNode }) {
  return <p className="text-body text-fg-secondary">{children}</p>;
}

/** Bulleted list rendered inline like the Figma text ("• item"). */
export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="text-body text-fg-secondary">
      {items.map((item, index) => (
        <li key={index}>
          <span aria-hidden="true">• </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * Layout shared by the four legal pages: H1 hero, sticky "Sommaire" card
 * (260 px) and a 720 px text column.
 */
export function LegalPage({
  breadcrumb,
  title,
  lead,
  updatedAt,
  sections,
}: LegalPageProps) {
  return (
    <>
      <Breadcrumb items={[{ label: breadcrumb ?? title }]} />

      <section className="gutter pt-8 pb-4 md:pt-16 md:pb-6">
        <Reveal immediate className="container-page flex flex-col gap-4">
          <SectionHead
            as="h1"
            size="h1"
            eyebrow="Informations légales"
            title={title}
            text={lead}
          />
          <p className="text-small text-fg-tertiary">
            Dernière mise à jour : {updatedAt}
          </p>
        </Reveal>
      </section>

      <section className="gutter pt-4 pb-12 md:pt-6 md:pb-24">
        <div className="container-page flex flex-col gap-6 desk:flex-row desk:items-start desk:gap-16">
          <LegalToc
            items={sections.map(({ id, title: label }) => ({ id, label }))}
          />
          <Reveal immediate delay={0.1} className="flex w-full max-w-180 flex-col gap-4">
            <Alert type="warning">
              Texte de structure : le contenu définitif sera fourni et validé par
              le propriétaire du site avant mise en ligne.
            </Alert>
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-titre`}
                className="flex scroll-mt-28 flex-col gap-4"
              >
                <h2
                  id={`${section.id}-titre`}
                  className="font-display text-h3 text-ink"
                >
                  {section.title}
                </h2>
                {section.content}
              </section>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
