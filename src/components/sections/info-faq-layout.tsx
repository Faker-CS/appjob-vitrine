import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { CtaBlock } from "@/components/ui/cta-block";
import { FaqList, type FaqEntry } from "@/components/ui/faq";
import { Icon } from "@/components/ui/icon";
import { Pill } from "@/components/ui/pill";
import { SectionHead } from "@/components/ui/section-head";
import { cn } from "@/lib/cn";
import { ROUTES } from "@/lib/navigation";

export type InfoFaqTone = "blue" | "mandarine";

export type InfoFaqLink = {
  pill: string;
  title: string;
  text: string;
  linkLabel: string;
  href: string;
};

type InfoFaqLayoutProps = {
  /** `blue` = candidate pages, `mandarine` = recruiter pages. */
  tone?: InfoFaqTone;
  eyebrow: string;
  title: string;
  text: string;
  items: FaqEntry[];
  /** Index of the question open on load ("Ouvert=Oui" in the frame). */
  defaultOpen?: number | null;
  links: InfoFaqLink[];
};

/**
 * The recruiter frame recolours the shared "Section head" eyebrow and the
 * "FAQ item" accents in mandarine. Those components only know the primary
 * accent, so the accent tokens are re-pointed for this band instead of
 * duplicating them.
 */
const MANDARINE_ACCENT =
  "[--color-primary:var(--color-mandarine)] [--color-primary-tint:var(--color-mandarine-tint)] [--color-primary-200:var(--color-mandarine)]";

/** "Carte lien" as drawn on the FAQ frames: pill, H4 title, small text, link. */
function FaqLinkCard({ link, tone }: { link: InfoFaqLink; tone: InfoFaqTone }) {
  const mandarine = tone === "mandarine";
  return (
    <Link
      href={link.href}
      className={cn(
        "group/link-card flex h-full flex-col items-start gap-4 rounded-lg border border-line bg-surface p-8",
        "transition-[transform,box-shadow] duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-md",
      )}
    >
      <Pill tone={mandarine ? "ink" : "blue"}>{link.pill}</Pill>
      <h2 className="font-display text-h4 text-ink">{link.title}</h2>
      <p className="text-small text-fg-secondary">{link.text}</p>
      <span
        className={cn(
          "inline-flex items-center gap-1.5 font-display text-label-md",
          mandarine ? "text-mandarine" : "text-primary",
        )}
      >
        {link.linkLabel}
        <Icon
          name="arrow"
          size={16}
          className="transition-transform duration-200 ease-out-soft group-hover/link-card:translate-x-1"
        />
      </span>
    </Link>
  );
}

/**
 * Shared layout of the two FAQ pages: intro column (page head + contact
 * card) next to the accordion, then the cross-link cards and the download
 * block. Below the desktop breakpoint the contact card moves after the
 * questions.
 */
export function InfoFaqLayout({
  tone = "blue",
  eyebrow,
  title,
  text,
  items,
  defaultOpen = 0,
  links,
}: InfoFaqLayoutProps) {
  const mandarine = tone === "mandarine";
  return (
    <>
      <Section
        spacing="hero"
        gap="none"
        className={mandarine ? MANDARINE_ACCENT : undefined}
      >
        <div className="flex flex-col gap-6 desk:flex-row desk:items-start desk:gap-16">
          <div className="max-desk:contents desk:sticky desk:top-26 desk:flex desk:w-95 desk:shrink-0 desk:flex-col desk:gap-6">
            <Reveal immediate className="order-1">
              <SectionHead
                as="h1"
                size="h1"
                width="column"
                eyebrow={eyebrow}
                title={title}
                text={text}
              />
            </Reveal>
            <Reveal immediate delay={0.2} className="order-3">
              <div
                className={cn(
                  "flex flex-col items-start gap-3 rounded-lg p-8",
                  mandarine ? "bg-mandarine-tint" : "bg-soft",
                )}
              >
                <h2 className="font-display text-h4 text-ink">
                  Une autre question&nbsp;?
                </h2>
                <p className="text-small text-fg-secondary">
                  Écrivez-nous, nous répondons sous deux jours ouvrés.
                </p>
                <Button
                  href={ROUTES.contact}
                  variant={mandarine ? "ink" : "primary"}
                  size="sm"
                  arrow
                >
                  Nous contacter
                </Button>
              </div>
            </Reveal>
          </div>
          <Reveal immediate delay={0.1} className="order-2 min-w-0 flex-1">
            <FaqList items={items} defaultOpen={defaultOpen} as="h2" />
          </Reveal>
        </div>
      </Section>

      {/* Liens */}
      <section className="gutter py-6 md:py-12">
        <Stagger
          as="ul"
          className="container-page grid gap-4 md:grid-cols-2 md:gap-6 desk:grid-cols-3"
        >
          {links.map((link) => (
            <StaggerItem as="li" key={link.title}>
              <FaqLinkCard link={link} tone={tone} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Téléchargement */}
      <Section spacing="compact" gap="none">
        <Reveal>
          <CtaBlock tone={mandarine ? "ink" : "blue"} />
        </Reveal>
      </Section>
    </>
  );
}
