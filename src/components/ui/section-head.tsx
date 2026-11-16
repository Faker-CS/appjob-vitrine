import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  text?: ReactNode;
  /** Heading level (semantics only; the look is set by `size`). */
  as?: "h1" | "h2";
  /** `h2` = Sora 44 in a 720 px block (sections); `h1` = Sora 64 in 760 px (page heroes). */
  size?: "h2" | "h1";
  align?: "start" | "center";
  tone?: "light" | "dark";
  /** `column` lets the parent column set the width instead of the 720 px default. */
  width?: "default" | "column";
  /** The mobile frames drop the paragraph under some section titles. */
  hideTextOnMobile?: boolean;
  className?: string;
};

/** "Section head" component: eyebrow, H2 title and lead paragraph. */
export function SectionHead({
  eyebrow,
  title,
  text,
  as: Heading = "h2",
  size = "h2",
  align = "start",
  tone = "light",
  width = "default",
  hideTextOnMobile = false,
  className,
}: SectionHeadProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-4",
        width === "default" && (size === "h1" ? "max-w-190" : "max-w-180"),
        align === "center" && "desk:items-center desk:text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "font-display text-eyebrow uppercase",
            dark ? "text-mandarine" : "text-primary",
          )}
        >
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          "font-display",
          size === "h1" ? "text-h1-sm md:text-h1" : "text-h2-sm md:text-h2",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Heading>
      {text && (
        <p
          className={cn(
            "text-body md:text-lead",
            dark ? "text-line-strong" : "text-fg-secondary",
            hideTextOnMobile && "max-md:hidden",
          )}
        >
          {text}
        </p>
      )}
    </div>
  );
}
