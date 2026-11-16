"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { EASE } from "@/components/motion/reveal";
import { ArticleCard } from "@/components/ui/article-card";
import { Pill, type PillTone } from "@/components/ui/pill";
import type { Article } from "@/lib/articles";
import { cn } from "@/lib/cn";

type AdviceFilterProps = {
  articles: Article[];
  /** Themes, in the order of the "Filtres" row. */
  categories: string[];
  /** Pill tone of the selected filter: blue (candidates) or ink (recruiters). */
  selectedTone: PillTone;
};

/**
 * "Filtres" row + article grid of the audience advice pages. The pills are
 * toggle buttons: one theme at a time, "Tous" (or a second press) clears it.
 */
export function AdviceFilter({ articles, categories, selectedTone }: AdviceFilterProps) {
  const [category, setCategory] = useState<string | null>(null);
  // The first paint staggers the cards in; later changes animate at once.
  const [filtered, setFiltered] = useState(false);

  const visible = category
    ? articles.filter((article) => article.category === category)
    : articles;

  const select = (value: string | null) => {
    setFiltered(true);
    setCategory((current) => (current === value ? null : value));
  };

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div
        role="group"
        aria-label="Filtrer les articles par thème"
        className="flex flex-wrap gap-2"
      >
        {[null, ...categories].map((value) => {
          const pressed = value === category;
          return (
            <button
              key={value ?? "all"}
              type="button"
              aria-pressed={pressed}
              onClick={() => select(value)}
              className="cursor-pointer rounded-full"
            >
              <Pill
                tone={pressed ? selectedTone : "outline"}
                className={cn(
                  "transition-colors duration-200 ease-out-soft",
                  !pressed && "hover:border-ink hover:text-ink",
                )}
              >
                {value ?? "Tous"}
              </Pill>
            </button>
          );
        })}
      </div>

      <p role="status" className="sr-only">
        {visible.length > 1
          ? `${visible.length} articles affichés`
          : `${visible.length} article affiché`}
        {category ? `, thème ${category}` : ""}
      </p>

      <ul className="relative grid gap-4 md:grid-cols-2 md:gap-6 desk:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((article, index) => (
            <motion.li
              key={article.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{
                duration: 0.45,
                ease: EASE,
                delay: filtered ? 0 : 0.05 + index * 0.08,
              }}
            >
              <ArticleCard
                as="h2"
                cover={article.cover}
                category={article.category}
                title={article.title}
                date={article.date}
                readingTime={article.readingTime}
              >
                {article.excerpt}
              </ArticleCard>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
