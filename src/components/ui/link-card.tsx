import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./icon";
import { Pill, type PillTone } from "./pill";

const TONES: Record<
  "standard" | "blue" | "ink",
  { box: string; title: string; text: string; link: string; pill: PillTone }
> = {
  standard: {
    box: "border border-line bg-surface",
    title: "text-ink",
    text: "text-fg-secondary",
    link: "text-primary",
    pill: "blue",
  },
  blue: {
    box: "bg-primary",
    title: "text-white",
    text: "text-primary-200",
    link: "text-white",
    pill: "on-dark",
  },
  ink: {
    box: "bg-ink",
    title: "text-white",
    text: "text-line-strong",
    link: "text-white",
    pill: "mandarine",
  },
};

type LinkCardProps = {
  /** `blue` / `ink` are the highlighted card of a row, `standard` the white ones. */
  tone?: "standard" | "blue" | "ink";
  /** Pill label; its tone follows the card unless `pillTone` is given. */
  pill?: string;
  pillTone?: PillTone;
  title: ReactNode;
  /** `h3` = Sora 28 (audience spaces), `h4` = Sora 22 (application pages). */
  titleSize?: "h3" | "h4";
  children: ReactNode;
  linkLabel: string;
  href: string;
  as?: "h2" | "h3";
  className?: string;
};

/** "Carte lien": cross-link card (pill, H3 title, small text, arrow link). */
export function LinkCard({
  tone = "standard",
  pill,
  pillTone,
  title,
  titleSize = "h3",
  children,
  linkLabel,
  href,
  as: Heading = "h3",
  className,
}: LinkCardProps) {
  const t = TONES[tone];
  return (
    <Link
      href={href}
      className={cn(
        "group/link-card flex h-full flex-col items-start gap-4 rounded-lg p-8",
        "transition-[transform,box-shadow] duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-md",
        t.box,
        className,
      )}
    >
      {pill && <Pill tone={pillTone ?? t.pill}>{pill}</Pill>}
      <Heading
        className={cn(
          "font-display",
          titleSize === "h4" ? "text-h4" : "text-h3",
          t.title,
        )}
      >
        {title}
      </Heading>
      <p className={cn("text-small", t.text)}>
        {children}
      </p>
      <span
        className={cn(
          "inline-flex items-center gap-1.5 font-display text-label-md",
          t.link,
        )}
      >
        {linkLabel}
        <Icon
          name="arrow"
          size={16}
          className="transition-transform duration-200 ease-out-soft group-hover/link-card:translate-x-1"
        />
      </span>
    </Link>
  );
}
