"use client";

import { motion } from "motion/react";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { EASE } from "@/components/motion/reveal";
import { Icon } from "./icon";

type FaqItemProps = {
  question: string;
  children: ReactNode;
  open: boolean;
  onToggle: () => void;
  as?: "h2" | "h3";
};

/** "FAQ item": question row with a plus that turns into a cross when open. */
export function FaqItem({
  question,
  children,
  open,
  onToggle,
  as: Heading = "h3",
}: FaqItemProps) {
  const id = useId();
  const buttonId = `${id}-question`;
  const panelId = `${id}-answer`;

  return (
    <div
      className={cn(
        "rounded-md border bg-surface px-6 transition-[border-color,box-shadow] duration-300 ease-out-soft",
        open ? "border-primary-200 shadow-sm" : "border-line",
      )}
    >
      <Heading>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
        >
          <span className="font-display text-question text-ink">{question}</span>
          <span
            aria-hidden="true"
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-full transition-[background-color,color,rotate] duration-300 ease-out-soft",
              open ? "rotate-45 bg-primary text-white" : "bg-primary-tint text-primary",
            )}
          >
            <Icon name="plus" size={16} />
          </span>
        </button>
      </Heading>
      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={!open}
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="overflow-hidden"
      >
        <div className="max-w-160 pb-6 text-body text-fg-secondary">{children}</div>
      </motion.div>
    </div>
  );
}

export type FaqEntry = { question: string; answer: ReactNode };

type FaqListProps = {
  items: FaqEntry[];
  /** Index of the entry open on load; `null` keeps them all closed. */
  defaultOpen?: number | null;
  as?: "h2" | "h3";
  className?: string;
};

/** Accordion of FAQ items; one entry is open at a time. */
export function FaqList({
  items,
  defaultOpen = 0,
  as = "h3",
  className,
}: FaqListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item, index) => (
        <FaqItem
          key={item.question}
          question={item.question}
          open={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          as={as}
        >
          {item.answer}
        </FaqItem>
      ))}
    </div>
  );
}
