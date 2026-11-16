type ClassValue = string | false | null | undefined;

/**
 * Joins class names, skipping falsy values.
 * It does not resolve conflicting Tailwind utilities — components expose
 * variants instead of relying on overrides.
 */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
