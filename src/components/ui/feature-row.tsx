import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { IconTile, type IconName, type IconTileTone } from "./icon";

type FeatureRowProps = {
  icon: IconName;
  iconTone?: IconTileTone;
  title: ReactNode;
  children: ReactNode;
  className?: string;
};

/** "Feature row": 44 px icon tile next to an H6 title and a small text. */
export function FeatureRow({
  icon,
  iconTone = "primary",
  title,
  children,
  className,
}: FeatureRowProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <IconTile name={icon} tone={iconTone} size="sm" />
      <div className="flex min-w-0 flex-col gap-1">
        <p className="font-display text-h6 text-ink">{title}</p>
        <p className="text-small text-fg-secondary">{children}</p>
      </div>
    </div>
  );
}
