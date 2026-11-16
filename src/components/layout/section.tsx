import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  children: ReactNode;
  /** Background: page (default), soft blue or ink. */
  tone?: "page" | "soft" | "ink";
  /**
   * Vertical rhythm, from the Figma frames:
   * - `default`: 96 px desktop / 48 px mobile
   * - `hero`: 64 → 96 px desktop / 32 → 48 px mobile
   * - `compact`: 64 px desktop / 32 px mobile (call-to-action bands)
   */
  spacing?: "default" | "hero" | "compact";
  /** Gap between the direct children of the container. */
  gap?: "default" | "none";
  id?: string;
  labelledBy?: string;
  className?: string;
  containerClassName?: string;
};

const TONES = {
  page: "",
  soft: "bg-soft",
  ink: "bg-ink",
} as const;

const SPACING = {
  default: "py-12 md:py-24",
  hero: "pt-8 pb-12 md:pt-16 md:pb-24",
  compact: "py-8 md:py-16",
} as const;

/** Full-width band with the page gutters and the 1 200 px container. */
export function Section({
  children,
  tone = "page",
  spacing = "default",
  gap = "default",
  id,
  labelledBy,
  className,
  containerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("gutter", TONES[tone], SPACING[spacing], className)}
    >
      <div
        className={cn(
          "container-page flex flex-col",
          gap === "default" && "gap-4 md:gap-12",
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
