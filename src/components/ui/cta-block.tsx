import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ROUTES } from "@/lib/navigation";
import { Button } from "./button";
import { StoreBadges } from "./store-badge";

type CtaAction = { label: string; href: string };

type CtaBlockProps = {
  tone?: "blue" | "ink";
  eyebrow?: ReactNode;
  title?: ReactNode;
  text?: ReactNode;
  primary?: CtaAction;
  /** Outline button, shown from the tablet breakpoint up. */
  secondary?: CtaAction | null;
  as?: "h2" | "h3";
  className?: string;
};

/**
 * "CTA block": download call-to-action band with the store badges.
 * Defaults reproduce the main instance used across the site.
 */
export function CtaBlock({
  tone = "blue",
  eyebrow = "Télécharger AppJob",
  title = "Prêt·e à découvrir AppJob ?",
  text = "L'application arrive sur l'App Store et Google Play. Inscrivez-vous pour être prévenu·e dès sa sortie.",
  primary = { label: "Être prévenu·e", href: ROUTES.download },
  secondary = { label: "Voir comment ça marche", href: ROUTES.howItWorks },
  as: Heading = "h2",
  className,
}: CtaBlockProps) {
  const ink = tone === "ink";
  return (
    <div
      className={cn(
        "relative flex flex-col gap-4 overflow-hidden rounded-lg px-6 py-8 text-white",
        "md:rounded-xl md:p-16 desk:flex-row desk:items-center desk:gap-8",
        ink ? "bg-ink" : "bg-primary",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute -top-35 left-45 size-75 rounded-full",
          "md:-top-60 md:right-[-200px] md:left-auto md:size-140",
          ink ? "bg-mandarine/90" : "bg-white/10",
        )}
      />
      <div className="relative flex min-w-0 flex-1 flex-col items-start gap-4">
        {eyebrow && (
          <p className="font-display text-eyebrow uppercase">{eyebrow}</p>
        )}
        <Heading className="font-display text-h3 md:text-h2">{title}</Heading>
        {text && (
          <p
            className={cn(
              "text-body md:text-lead md:text-white/85",
              ink ? "max-md:text-line-strong" : "max-md:text-primary-200",
            )}
          >
            {text}
          </p>
        )}
        <div className="flex w-full flex-wrap gap-3">
          <Button
            href={primary.href}
            variant="white"
            size="md"
            arrow
            fullWidth="mobile"
          >
            {primary.label}
          </Button>
          {secondary && (
            <Button
              href={secondary.href}
              variant="outline-light"
              size="md"
              className="max-md:hidden"
            >
              {secondary.label}
            </Button>
          )}
        </div>
      </div>
      <StoreBadges layout="stack-mobile" className="relative shrink-0" />
    </div>
  );
}
