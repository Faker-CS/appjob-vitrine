"use client";

import { motion, MotionConfig, type Variants } from "motion/react";
import type { ReactNode } from "react";

/** Shared easing (matches --ease-out-soft). */
export const EASE = [0.22, 1, 0.36, 1] as const;

const VIEWPORT = { once: true, margin: "0px 0px -72px 0px" } as const;

/** Honours the visitor's "reduce motion" setting for every Motion animation. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

type RevealProps = {
  children: ReactNode;
  /** Delay in seconds. */
  delay?: number;
  /** Vertical offset the element rises from, in px. */
  offset?: number;
  /** Animate on mount instead of when scrolled into view (above the fold). */
  immediate?: boolean;
  className?: string;
};

/** Fades and lifts a block into place once, when it enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  offset = 24,
  immediate = false,
  className,
}: RevealProps) {
  const target = { opacity: 1, y: 0 };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: offset }}
      {...(immediate
        ? { animate: target }
        : { whileInView: target, viewport: VIEWPORT })}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

type StaggerProps = {
  children: ReactNode;
  /** Seconds between two children. */
  stagger?: number;
  immediate?: boolean;
  as?: "div" | "ul" | "ol";
  className?: string;
};

/** Reveals its `StaggerItem` children one after the other. */
export function Stagger({
  children,
  stagger = 0.08,
  immediate = false,
  as = "div",
  className,
}: StaggerProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      variants={containerVariants}
      custom={stagger}
      initial="hidden"
      {...(immediate
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: VIEWPORT })}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  as = "div",
  className,
}: {
  children: ReactNode;
  as?: "div" | "li";
  className?: string;
}) {
  const Component = motion[as];
  return (
    <Component className={className} variants={itemVariants}>
      {children}
    </Component>
  );
}
