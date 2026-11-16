import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, IconTile, type IconName, type IconTileTone } from "./icon";

export type CardTone = "standard" | "blue" | "ink" | "soft";

const TONES: Record<
  CardTone,
  { box: string; title: string; text: string; link: string; tile: IconTileTone }
> = {
  standard: {
    box: "border border-line bg-surface",
    title: "text-ink",
    text: "text-fg-secondary",
    link: "text-primary",
    tile: "primary",
  },
  blue: {
    box: "bg-primary",
    title: "text-white",
    text: "text-primary-200",
    link: "text-white",
    tile: "on-primary",
  },
  ink: {
    box: "bg-ink",
    title: "text-white",
    text: "text-line-strong",
    link: "text-white",
    tile: "on-ink",
  },
  soft: {
    box: "bg-soft",
    title: "text-ink",
    text: "text-fg-secondary",
    link: "text-primary",
    tile: "primary",
  },
};

type CardProps = {
  tone?: CardTone;
  icon?: IconName;
  /** Overrides the icon tile colours given by the card tone. */
  iconTone?: IconTileTone;
  title: ReactNode;
  children?: ReactNode;
  /** Link label ("Lien" property). Requires `href`. */
  linkLabel?: string;
  /** Link colour on light cards: blue (candidates) or mandarine (recruiters). */
  linkTone?: "primary" | "mandarine";
  /** The mobile frames show feature cards without their link label. */
  hideLinkOnMobile?: boolean;
  href?: string;
  as?: "h2" | "h3";
  className?: string;
};

/** "Card" component: icon tile, H4 title, small text and optional link. */
export function Card({
  tone = "standard",
  icon,
  iconTone,
  title,
  children,
  linkLabel,
  linkTone = "primary",
  hideLinkOnMobile = false,
  href,
  as: Heading = "h3",
  className,
}: CardProps) {
  const t = TONES[tone];
  const classes = cn(
    "group/card flex h-full flex-col gap-4 rounded-lg p-8",
    "transition-[transform,box-shadow] duration-300 ease-out-soft",
    href && "hover:-translate-y-1 hover:shadow-md",
    t.box,
    className,
  );

  const body = (
    <>
      {icon && <IconTile name={icon} tone={iconTone ?? t.tile} />}
      <Heading className={cn("font-display text-h4", t.title)}>{title}</Heading>
      {children && <p className={cn("text-small", t.text)}>{children}</p>}
      {href && linkLabel && (
        <span
          className={cn(
            "items-center gap-1.5 font-display text-label-md",
            hideLinkOnMobile ? "hidden md:inline-flex" : "inline-flex",
            linkTone === "mandarine" && t.link === "text-primary"
              ? "text-mandarine"
              : t.link,
          )}
        >
          {linkLabel}
          <Icon
            name="arrow"
            size={16}
            className="transition-transform duration-200 ease-out-soft group-hover/card:translate-x-1"
          />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {body}
      </Link>
    );
  }
  return <div className={classes}>{body}</div>;
}
