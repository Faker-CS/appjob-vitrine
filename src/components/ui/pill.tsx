import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./icon";

export type PillTone =
  | "blue"
  | "ink"
  | "mandarine"
  | "mint"
  | "outline"
  | "on-dark";

const TONES: Record<PillTone, string> = {
  blue: "bg-primary-tint text-primary-strong",
  ink: "bg-ink-tint text-ink",
  mandarine: "bg-mandarine-tint text-mandarine-strong",
  mint: "bg-success-tint text-success-strong",
  outline: "border-[1.5px] border-line-strong text-fg-secondary",
  "on-dark": "bg-white/14 text-white",
};

type PillProps = {
  tone?: PillTone;
  icon?: IconName;
  children: ReactNode;
  className?: string;
};

export function Pill({ tone = "blue", icon, children, className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex h-8.5 shrink-0 items-center gap-2 rounded-full px-3.5 font-display text-label-xs whitespace-nowrap",
        TONES[tone],
        className,
      )}
    >
      {icon && <Icon name={icon} size={16} />}
      {children}
    </span>
  );
}
