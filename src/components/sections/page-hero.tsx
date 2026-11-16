import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { StoreBadges } from "@/components/ui/store-badge";

type PageHeroProps = {
  /** Element above the title: a `Pill` (home) or nothing. */
  badge?: ReactNode;
  /** Blue uppercase label above the title (inner pages). */
  eyebrow?: ReactNode;
  title: ReactNode;
  /** `display` = Sora ExtraBold 72 (home), `h1` = Sora Bold 64. */
  titleStyle?: "display" | "h1";
  lead: ReactNode;
  /** Buttons. They stack full-width on mobile. */
  actions?: ReactNode;
  /** Store badges and the "arrive très bientôt" note. */
  stores?: boolean;
  visual?: ReactNode;
  tone?: "light" | "dark";
  /** The hero follows a breadcrumb: 24 px of top padding on mobile instead of 32. */
  afterBreadcrumb?: boolean;
  /** The mobile frames of the audience pages keep the badges but drop the note. */
  hideNoteOnMobile?: boolean;
  /**
   * Panel look of the recruiter hero: a spacer above (16 / 24 px), rounded
   * top corners (24 / 32 px) and the mandarine orb in the top-right corner.
   */
  panel?: boolean;
};

/** Note under the store badges: mandarine dot + availability message. */
export function ComingSoonNote({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 text-small",
        tone === "dark" ? "text-primary-200" : "text-fg-secondary",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="size-2 shrink-0 rounded-full bg-mandarine md:ring-4 md:ring-mandarine-tint"
      />
      L&apos;application arrive très bientôt sur les stores.
    </p>
  );
}

/**
 * Two-column hero: text on the left (632 px), illustration on the right
 * (520 × 600). Stacks on mobile and tablet with the illustration last.
 */
export function PageHero({
  badge,
  eyebrow,
  title,
  titleStyle = "h1",
  lead,
  actions,
  stores = false,
  visual,
  tone = "light",
  afterBreadcrumb = false,
  hideNoteOnMobile = false,
  panel = false,
}: PageHeroProps) {
  const dark = tone === "dark";
  return (
    <section
      className={cn(
        "gutter pb-12 md:pt-16 md:pb-24",
        panel ? "pt-10" : afterBreadcrumb ? "pt-6" : "pt-8",
        dark && "bg-ink",
        panel && "relative mt-4 rounded-t-lg md:mt-6 md:rounded-t-xl",
      )}
    >
      {panel && (
        /* "Orbe déco": 360 px in the corner on mobile, 700 px placed on the
           1 200 px grid (880 px from its left edge) on desktop. */
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-[inherit]"
        >
          <div className="container-page relative h-full">
            <span className="absolute -top-57.5 -right-55 size-90 rounded-full bg-mandarine/95 desk:-top-80 desk:right-auto desk:left-220 desk:size-175" />
          </div>
        </div>
      )}
      <div
        className={cn(
          "container-page flex flex-col gap-6 desk:flex-row desk:items-center desk:gap-12",
          panel && "relative",
        )}
      >
        <Stagger
          immediate
          className="flex min-w-0 flex-1 flex-col items-start gap-6 md:gap-8"
        >
          {badge && <StaggerItem>{badge}</StaggerItem>}
          {eyebrow && (
            <StaggerItem>
              <p
                className={cn(
                  "font-display text-eyebrow uppercase",
                  dark ? "text-mandarine" : "text-primary",
                )}
              >
                {eyebrow}
              </p>
            </StaggerItem>
          )}
          <StaggerItem>
            <h1
              className={cn(
                "font-display text-h1-sm",
                titleStyle === "display" ? "md:text-display" : "md:text-h1",
                dark ? "text-white" : "text-ink",
              )}
            >
              {title}
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p
              className={cn(
                "max-w-150 text-body md:text-lead",
                dark ? "text-line-strong" : "text-fg-secondary",
              )}
            >
              {lead}
            </p>
          </StaggerItem>
          {actions && (
            <StaggerItem className="flex w-full flex-col gap-3 md:flex-row md:flex-wrap">
              {actions}
            </StaggerItem>
          )}
          {stores && (
            <StaggerItem className="flex flex-col gap-2.5">
              <StoreBadges />
              <ComingSoonNote
                tone={tone}
                className={hideNoteOnMobile ? "max-md:hidden" : undefined}
              />
            </StaggerItem>
          )}
        </Stagger>
        {visual}
      </div>
    </section>
  );
}
