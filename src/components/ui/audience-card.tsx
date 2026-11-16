import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Button } from "./button";
import { Icon, type IconName } from "./icon";

type Audience = "candidates" | "recruiters";

const AUDIENCES: Record<
  Audience,
  { box: string; orb: string; icon: IconName; label: string }
> = {
  candidates: {
    box: "bg-primary",
    orb: "left-67 -top-65 bg-white/12",
    icon: "user",
    label: "Candidats",
  },
  recruiters: {
    box: "bg-ink",
    orb: "left-82 -top-75 bg-mandarine/95",
    icon: "briefcase",
    label: "Recruteurs",
  },
};

type AudienceCardProps = {
  audience: Audience;
  /** Small numbered label in the top-left corner (desktop only). */
  number?: string;
  title: ReactNode;
  children: ReactNode;
  cta: string;
  href: string;
  as?: "h2" | "h3";
  className?: string;
};

/**
 * "Audience card": large coloured card that is one link to an audience space.
 * Content is anchored to the bottom, with the 520 px orb in the corner.
 */
export function AudienceCard({
  audience,
  number,
  title,
  children,
  cta,
  href,
  as: Heading = "h3",
  className,
}: AudienceCardProps) {
  const a = AUDIENCES[audience];
  return (
    <Link
      href={href}
      className={cn(
        "group/audience relative flex min-h-90 flex-col items-start justify-end gap-4 overflow-hidden rounded-xl px-6 py-8 text-white md:min-h-105 md:p-12",
        "transition-[transform,box-shadow] duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-lg",
        a.box,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute size-130 rounded-full transition-transform duration-700 ease-out-soft group-hover/audience:scale-105",
          a.orb,
        )}
      />
      {number && (
        <span className="absolute top-8 left-12 font-display text-eyebrow uppercase opacity-80 max-md:hidden">
          {number}
        </span>
      )}
      <span className="relative inline-flex h-8.5 items-center gap-2 rounded-full bg-white/14 px-3.5 font-display text-label-xs">
        <Icon name={a.icon} size={16} />
        {a.label}
      </span>
      <Heading className="relative font-display text-h3 md:text-h3-lg">
        {title}
      </Heading>
      <p className="relative text-body opacity-82">{children}</p>
      {/* The mobile frame lets this label overflow the card; tighter padding keeps it inside. */}
      <Button
        decorative
        variant="white"
        size="md"
        arrow
        className="relative max-md:px-4"
      >
        {cta}
      </Button>
    </Link>
  );
}
