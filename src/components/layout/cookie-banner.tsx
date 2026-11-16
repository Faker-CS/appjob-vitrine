"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { ROUTES } from "@/lib/navigation";
import { useCookieConsent } from "@/lib/cookie-consent";
import { EASE } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { IconTile } from "@/components/ui/icon";

/**
 * "Cookie banner": floats at the bottom of the viewport until the visitor
 * accepts or refuses the audience-measurement tracker.
 */
export function CookieBanner() {
  const { consent, setConsent } = useCookieConsent();

  return (
    <AnimatePresence>
      {consent === "unset" && (
        <motion.div
          role="region"
          aria-label="Gestion des cookies"
          className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-180 flex-col gap-4 rounded-lg border border-line bg-surface p-6 shadow-lg md:bottom-6 md:flex-row md:items-center md:gap-6"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.6 }}
        >
          <IconTile name="cookie" size="md" />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="font-display text-title-sm text-ink">
              Des cookies, mais pas trop
            </p>
            <p className="text-small text-fg-secondary">
              Nous utilisons un traceur de mesure d&apos;audience anonymisé pour
              améliorer ce site. Vous choisissez.{" "}
              <Link
                href={ROUTES.cookies}
                className="underline underline-offset-2 transition-colors duration-200 hover:text-ink"
              >
                En savoir plus
              </Link>
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setConsent("refused")}
            >
              Refuser
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setConsent("accepted")}
            >
              Accepter
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
