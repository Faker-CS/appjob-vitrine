"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { MAIN_NAV, type NavItem } from "@/lib/navigation";
import { EASE } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";

export function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavEntry({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false);
  const active = isActivePath(pathname, item.href);
  const hasMenu = Boolean(item.children?.length);

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <Link
        href={item.href}
        aria-current={pathname === item.href ? "page" : undefined}
        aria-haspopup={hasMenu ? "true" : undefined}
        aria-expanded={hasMenu ? open : undefined}
        onClick={() => setOpen(false)}
        className={cn(
          "flex h-10 items-center gap-1.5 rounded-full px-3.5 text-small leading-none font-semibold whitespace-nowrap",
          "transition-colors duration-200",
          active
            ? "bg-primary-tint text-primary-strong"
            : "text-fg-secondary hover:bg-surface-2 hover:text-ink",
        )}
      >
        {item.label}
        {hasMenu && (
          <Icon
            name="chevron"
            size={14}
            className={cn(
              "transition-transform duration-200 ease-out-soft",
              active ? "text-primary-strong" : "text-fg-tertiary",
              open && "rotate-180",
            )}
          />
        )}
      </Link>

      <AnimatePresence>
        {hasMenu && open && (
          <motion.div
            className="absolute top-full left-0 z-10 pt-2"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            <ul className="flex min-w-60 flex-col rounded-md border border-line bg-surface p-2 shadow-md">
              {item.children?.map((child) => (
                <li key={child.href + child.label}>
                  <Link
                    href={child.href}
                    aria-current={pathname === child.href ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex h-10 items-center rounded-sm px-3 text-small leading-none font-semibold whitespace-nowrap transition-colors duration-200",
                      pathname === child.href
                        ? "text-primary-strong"
                        : "text-fg-secondary hover:bg-surface-2 hover:text-ink",
                    )}
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/** Primary navigation of the desktop header, with sub-page dropdowns. */
export function DesktopNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Navigation principale" className="max-desk:hidden">
      <ul className="flex gap-1">
        {MAIN_NAV.map((item) => (
          <NavEntry key={item.href} item={item} pathname={pathname} />
        ))}
      </ul>
    </nav>
  );
}
