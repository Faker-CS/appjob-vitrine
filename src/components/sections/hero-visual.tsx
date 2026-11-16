"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { EASE } from "@/components/motion/reveal";
import { PhoneMockup } from "@/components/ui/phone-mockup";

type HeroVisualProps = {
  /**
   * - `single`: one phone in front of the magnifier (orb + handle)
   * - `duo`: home composition with a second, tilted phone behind
   */
  variant?: "single" | "duo";
  /** `dark` is used on ink heroes: translucent orb, no magnifier handle. */
  tone?: "blue" | "dark";
  className?: string;
};

const enter = (delay: number) => ({
  duration: 0.9,
  ease: EASE,
  delay,
});

/**
 * Hero illustration — "le cercle et la loupe": the brand circle, its
 * magnifier handle and the phone mockup(s). Mobile uses the compact
 * 358 × 540 composition, desktop the 520 × 600 one.
 */
export function HeroVisual({
  variant = "single",
  tone = "blue",
  className,
}: HeroVisualProps) {
  const duo = variant === "duo";
  const dark = tone === "dark";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative mx-auto h-135 w-full max-w-89.5 shrink-0 overflow-hidden",
        "desk:mx-0 desk:h-150 desk:w-130 desk:max-w-none desk:overflow-visible",
        className,
      )}
    >
      {/* Orb */}
      <motion.span
        className={cn(
          "absolute top-2.5 left-[19px] size-80 rounded-full desk:size-120",
          duo ? "desk:top-5 desk:left-15" : "desk:top-10 desk:left-5",
          dark ? "bg-white/8" : "bg-primary",
        )}
        initial={{ opacity: 0, scale: 0.86 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={enter(0.1)}
      />

      {/* Magnifier handle: 98 px rounded square turned 45° */}
      {!dark && (
        <motion.span
          className={cn(
            "absolute size-24.5 rounded-[23px] bg-primary max-desk:hidden",
            duo ? "top-[424.3px] left-[431.8px]" : "top-[434.7px] left-[391.8px]",
          )}
          initial={{ opacity: 0, scale: 0.6, rotate: 45 }}
          animate={{ opacity: 1, scale: 1, rotate: 45 }}
          transition={enter(0.35)}
        />
      )}

      {/* Back phone (home only) */}
      {duo && (
        <motion.div
          className="absolute top-[57.8px] left-[22.5px] max-desk:hidden"
          initial={{ opacity: 0, x: 48, rotate: 0 }}
          animate={{ opacity: 1, x: 0, rotate: -8 }}
          transition={enter(0.45)}
        >
          <PhoneMockup scale={0.78} />
        </motion.div>
      )}

      {/* Front phone */}
      <motion.div
        className={cn(
          "absolute top-[13px] left-[51.5px] desk:-top-5",
          duo ? "desk:left-40" : "desk:left-27.5",
        )}
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={enter(0.25)}
      >
        <PhoneMockup className="[--phone-scale:0.85] desk:[--phone-scale:1]" />
      </motion.div>
    </div>
  );
}
