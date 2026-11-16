"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type TocItem = { id: string; label: string };

/**
 * "Sommaire" card of the legal pages. Sticky on desktop; the entry of the
 * section currently being read is highlighted.
 */
export function LegalToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);
    if (sections.length === 0) return;

    // A section becomes active when its top crosses the upper third of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Sommaire"
      className="flex w-full shrink-0 flex-col gap-1.5 rounded-md border border-line bg-surface p-6 desk:sticky desk:top-28 desk:w-65"
    >
      <p className="font-display text-eyebrow text-fg-tertiary uppercase">
        Sommaire
      </p>
      <ul className="flex flex-col gap-1.5">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "location" : undefined}
                onClick={() => setActiveId(item.id)}
                className={cn(
                  "block rounded-2xs px-2.5 py-1.5 text-note transition-colors duration-200",
                  active
                    ? "bg-primary-tint text-primary-strong"
                    : "text-fg-secondary hover:bg-surface-2 hover:text-ink",
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
