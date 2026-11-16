import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type StepCardProps = {
  number: number | string;
  title: ReactNode;
  children: ReactNode;
  tone?: "blue" | "ink";
  as?: "h2" | "h3";
  className?: string;
};

/** "Step" component: numbered badge, H5 title and small text. */
export function StepCard({
  number,
  title,
  children,
  tone = "blue",
  as: Heading = "h3",
  className,
}: StepCardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col gap-3 rounded-lg border border-line bg-surface px-6 pt-8 pb-6",
        className,
      )}
    >
      <span
        className={cn(
          "flex size-11 items-center justify-center rounded-full font-display text-label text-white",
          tone === "ink" ? "bg-ink" : "bg-primary",
        )}
      >
        {number}
      </span>
      <Heading className="font-display text-h5 text-ink">{title}</Heading>
      <p className="text-small text-fg-secondary">{children}</p>
    </div>
  );
}
