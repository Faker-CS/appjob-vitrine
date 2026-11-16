import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./icon";

/** "Check item": mint tick aligned on the first line of a body text. */
export function CheckItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <li className={cn("flex gap-3 text-body text-fg-secondary", className)}>
      <span className="flex h-[1.6em] shrink-0 items-center">
        <span className="flex size-5.5 items-center justify-center rounded-full bg-success-tint text-success-strong">
          <Icon name="check" size={13} />
        </span>
      </span>
      <span>{children}</span>
    </li>
  );
}

export function CheckList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <ul className={cn("flex flex-col", className)}>{children}</ul>;
}
