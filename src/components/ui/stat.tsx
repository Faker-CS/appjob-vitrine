import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type StatProps = {
  value: ReactNode;
  label: ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

/** "Stat" component: big figure under a 2 px rule. */
export function Stat({ value, label, tone = "light", className }: StatProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "flex flex-col gap-2 border-t-2 py-6",
        dark ? "border-white/30" : "border-ink",
        className,
      )}
    >
      <p className={cn("font-display text-stat", dark ? "text-white" : "text-ink")}>
        {value}
      </p>
      <p className={cn("text-small", dark ? "text-line-strong" : "text-fg-secondary")}>
        {label}
      </p>
    </div>
  );
}
