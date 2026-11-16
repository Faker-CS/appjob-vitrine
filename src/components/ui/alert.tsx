import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./icon";

export type AlertType = "info" | "success" | "warning";

const TYPES: Record<AlertType, { box: string; icon: IconName }> = {
  info: { box: "bg-primary-tint text-primary-strong", icon: "info" },
  success: { box: "bg-success-tint text-success-strong", icon: "check" },
  warning: { box: "bg-mandarine-tint text-mandarine-strong", icon: "warn" },
};

type AlertProps = {
  type?: AlertType;
  children: ReactNode;
  /** `status` announces politely, `alert` immediately; omit for static notes. */
  role?: "status" | "alert";
  className?: string;
};

/** "Alert" component: tinted note with an icon aligned on the first line. */
export function Alert({ type = "info", children, role, className }: AlertProps) {
  const t = TYPES[type];
  return (
    <div
      role={role}
      className={cn(
        "flex gap-3 rounded-control px-4.5 py-4 text-small",
        t.box,
        className,
      )}
    >
      <span className="flex h-[1.6em] shrink-0 items-center">
        <Icon name={t.icon} size={20} />
      </span>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
