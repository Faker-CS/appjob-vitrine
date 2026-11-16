import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Pill, type PillTone } from "./pill";

export type ArticleCover = "blue" | "ink" | "mandarine" | "mint";

const COVERS: Record<ArticleCover, { cover: string; glyph: string; pill: PillTone }> = {
  blue: { cover: "bg-primary-tint", glyph: "bg-primary", pill: "blue" },
  ink: { cover: "bg-ink", glyph: "bg-mandarine", pill: "mandarine" },
  mandarine: { cover: "bg-mandarine-tint", glyph: "bg-mandarine", pill: "mandarine" },
  mint: { cover: "bg-success-tint", glyph: "bg-success", pill: "mint" },
};

type ArticleCardProps = {
  cover?: ArticleCover;
  /** Category shown in the pill on the cover. */
  category: string;
  title: ReactNode;
  children: ReactNode;
  date: string;
  readingTime: string;
  /** Article pages are not designed yet; pass `href` once they exist. */
  href?: string;
  as?: "h2" | "h3";
  className?: string;
};

/** "Article card": tinted cover with the brand circle, then title, excerpt and meta. */
export function ArticleCard({
  cover = "blue",
  category,
  title,
  children,
  date,
  readingTime,
  href,
  as: Heading = "h3",
  className,
}: ArticleCardProps) {
  const c = COVERS[cover];
  const classes = cn(
    "group/article flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface",
    "transition-[transform,box-shadow] duration-300 ease-out-soft",
    href && "hover:-translate-y-1 hover:shadow-md",
    className,
  );

  const body = (
    <>
      <div className={cn("relative h-59.25 shrink-0 overflow-hidden p-4", c.cover)}>
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-29.25 -right-10.5 size-45 rounded-full transition-transform duration-500 ease-out-soft group-hover/article:scale-110",
            c.glyph,
          )}
        />
        <Pill tone={c.pill} className="relative">
          {category}
        </Pill>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-6">
        <Heading className="font-display text-h5 text-ink">{title}</Heading>
        <p className="text-small text-fg-secondary">{children}</p>
        <p className="mt-auto flex items-center gap-2.5 text-caption text-fg-tertiary">
          <span>{date}</span>
          <span aria-hidden="true" className="size-[3px] rounded-full bg-line-strong" />
          <span>{readingTime}</span>
        </p>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {body}
      </Link>
    );
  }
  return <article className={classes}>{body}</article>;
}
