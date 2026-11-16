"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { useCookieConsent, type CookieConsent } from "@/lib/cookie-consent";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";

const OPTIONS: { value: CookieConsent; label: string }[] = [
  { value: "refused", label: "Refuser" },
  { value: "accepted", label: "Accepter" },
];

/**
 * "Vos choix" card of the cookie page. Reads and writes the same consent as
 * the cookie banner, so both always agree.
 */
export function CookiePreferences() {
  const { consent, setConsent } = useCookieConsent();
  // `draft` is the visitor's pending selection; until they touch the control
  // it mirrors the stored consent (refused by default, as the least intrusive).
  const [draft, setDraft] = useState<CookieConsent | null>(null);
  const [saved, setSaved] = useState(false);
  const stored: CookieConsent = consent === "accepted" ? "accepted" : "refused";
  const selected = draft ?? stored;

  const save = (value: CookieConsent) => {
    setConsent(value);
    setDraft(null);
    setSaved(true);
  };

  return (
    <div className="flex flex-col gap-3.5 rounded-lg border border-line bg-surface p-6">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="flex flex-col gap-0.5">
          <p className="font-display text-body font-semibold text-ink">
            Cookies essentiels
          </p>
          <p className="text-small text-fg-secondary">
            Nécessaires au fonctionnement du site.
          </p>
        </div>
        <Pill tone="mint">Toujours actifs</Pill>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="flex flex-col gap-0.5">
          <p
            id="cookies-audience-label"
            className="font-display text-body font-semibold text-ink"
          >
            Mesure d&apos;audience
          </p>
          <p className="text-small text-fg-secondary">
            Nous aide à comprendre quelles pages sont utiles.
          </p>
        </div>
        <div
          role="radiogroup"
          aria-labelledby="cookies-audience-label"
          className="flex gap-1 rounded-full bg-surface-2 p-1"
        >
          {OPTIONS.map((option) => {
            const checked = selected === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={checked}
                onClick={() => {
                  setDraft(option.value);
                  setSaved(false);
                }}
                className={cn(
                  "h-10 cursor-pointer rounded-full px-4.5 font-display text-label-sm transition-[background-color,color,box-shadow] duration-200 ease-out-soft",
                  checked
                    ? "bg-surface text-ink shadow-sm"
                    : "text-fg-secondary hover:text-ink",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="primary" size="sm" onClick={() => save(selected)}>
          Enregistrer mes choix
        </Button>
        <Button variant="secondary" size="sm" onClick={() => save("refused")}>
          Tout refuser
        </Button>
      </div>

      {saved && (
        <Alert type="success" role="status">
          Vos choix sont enregistrés.
        </Alert>
      )}
    </div>
  );
}
