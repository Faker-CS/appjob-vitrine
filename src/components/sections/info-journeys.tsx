"use client";

import { motion } from "motion/react";
import { useId, useState, type ReactNode } from "react";
import { EASE } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

export type Journey = {
  id: string;
  /** Label of its segment in the control ("Candidat", "Recruteur"). */
  label: string;
  /** The column: heading pill and steps. */
  content: ReactNode;
};

type InfoJourneysProps = {
  /** Accessible name of the control. */
  legend: string;
  /** Label of the first segment, which shows every journey. */
  allLabel: string;
  journeys: Journey[];
};

const ALL = "all";

/**
 * "Segmenté" control + "Parcours" columns of the "Comment ça marche" page.
 *
 * The control is a view filter with three options (both journeys, candidate,
 * recruiter), so it is a group of radio buttons rather than tabs. The two
 * columns stay side by side from the tablet breakpoint up: picking one
 * journey keeps the layout of the frame and dims the other column. On
 * mobile, where the columns stack, only the picked journey is displayed.
 */
export function InfoJourneys({ legend, allLabel, journeys }: InfoJourneysProps) {
  const name = useId();
  const [view, setView] = useState<string>(ALL);
  const options = [{ id: ALL, label: allLabel }, ...journeys];

  return (
    <>
      <div className="gutter pt-4 pb-4 md:pt-12 md:pb-8">
        <div className="container-page flex desk:justify-center">
          <div
            role="radiogroup"
            aria-label={legend}
            className="flex gap-1 rounded-full bg-surface-2 p-1 max-md:w-full"
          >
            {options.map((option) => {
              const checked = view === option.id;
              return (
                <label
                  key={option.id}
                  className={cn(
                    "relative flex h-10 flex-auto cursor-pointer items-center justify-center rounded-full px-2.5 font-display text-label-xs whitespace-nowrap md:px-4.5 md:text-label-sm",
                    "transition-colors duration-300 ease-out-soft",
                    "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary",
                    checked ? "text-ink" : "text-fg-secondary hover:text-ink",
                  )}
                >
                  <input
                    type="radio"
                    name={name}
                    value={option.id}
                    checked={checked}
                    onChange={() => setView(option.id)}
                    className="sr-only"
                  />
                  {checked && (
                    <motion.span
                      layoutId={`${name}-thumb`}
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-surface shadow-sm"
                      transition={{ duration: 0.35, ease: EASE }}
                    />
                  )}
                  <span className="relative">{option.label}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      <div className="gutter py-6 md:py-12">
        <div className="container-page grid gap-8 md:grid-cols-2 md:gap-6 desk:gap-8">
          {journeys.map((journey) => {
            const muted = view !== ALL && view !== journey.id;
            return (
              <motion.div
                key={journey.id}
                className={cn("min-w-0", muted && "max-md:hidden")}
                initial={false}
                animate={{ opacity: muted ? 0.35 : 1 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {journey.content}
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}
