import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./icon";

/** Shared look of the "Input" component states (Vide, Rempli, Focus, Erreur). */
const CONTROL =
  "w-full rounded-control border-[1.5px] bg-surface px-4 text-field text-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-fg-tertiary";
const CONTROL_DEFAULT = "border-line-strong focus:border-primary focus:shadow-focus";
const CONTROL_ERROR = "border-error shadow-focus-error";

type FieldShellProps = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

function FieldShell({ id, label, error, children, className }: FieldShellProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="font-display text-label-sm leading-[1.2] text-ink">
        {label}
      </label>
      {children}
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

type CommonProps = { id: string; label: string; error?: string };

const describedBy = (id: string, error?: string) =>
  error ? `${id}-error` : undefined;

type TextFieldProps = CommonProps &
  Omit<ComponentProps<"input">, "id" | "className">;

export function TextField({ id, label, error, ...props }: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error)}
        className={cn(CONTROL, "h-13", error ? CONTROL_ERROR : CONTROL_DEFAULT)}
        {...props}
      />
    </FieldShell>
  );
}

type SelectFieldProps = CommonProps &
  Omit<ComponentProps<"select">, "id" | "className">;

export function SelectField({ id, label, error, children, ...props }: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error)}
          className={cn(
            CONTROL,
            "h-13 cursor-pointer appearance-none pr-11",
            error ? CONTROL_ERROR : CONTROL_DEFAULT,
          )}
          {...props}
        >
          {children}
        </select>
        <Icon
          name="chevron"
          size={16}
          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink"
        />
      </div>
    </FieldShell>
  );
}

type TextAreaFieldProps = CommonProps &
  Omit<ComponentProps<"textarea">, "id" | "className">;

export function TextAreaField({ id, label, error, ...props }: TextAreaFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error)}
        className={cn(
          CONTROL,
          "min-h-13 resize-y py-3",
          error ? CONTROL_ERROR : CONTROL_DEFAULT,
        )}
        {...props}
      />
    </FieldShell>
  );
}
