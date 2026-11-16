import type { ReactNode } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

type ConsentCheckboxProps = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  /** Label text; may contain a link. */
  children: ReactNode;
};

/**
 * Consent row of the forms: 22 px rounded box (radius 7) with the check icon,
 * next to a small text. A real checkbox, unticked by default.
 */
export function ConsentCheckbox({
  id,
  checked,
  onChange,
  error,
  children,
}: ConsentCheckboxProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-3">
        <span className="relative flex size-5.5 shrink-0">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(event) => onChange(event.target.checked)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            className={cn(
              "peer size-5.5 cursor-pointer appearance-none rounded-[7px] border-[1.5px] bg-surface",
              "transition-[background-color,border-color,box-shadow] duration-200",
              "checked:border-primary checked:bg-primary",
              error ? "border-error shadow-focus-error" : "border-line-strong",
            )}
          />
          <Icon
            name="check"
            size={14}
            className="pointer-events-none absolute inset-0 m-auto text-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
          />
        </span>
        <label htmlFor={id} className="cursor-pointer text-small text-fg-secondary">
          {children}
        </label>
      </div>
      {error && (
        <p
          id={`${id}-error`}
          className="flex gap-1.5 text-caption font-semibold text-error"
        >
          <span className="flex h-[1.5em] shrink-0 items-center">
            <Icon name="warn" size={14} />
          </span>
          {error}
        </p>
      )}
    </div>
  );
}

/** Inline link inside a consent label or a small text. */
export const INLINE_LINK =
  "underline underline-offset-2 transition-colors duration-200 hover:text-ink";
