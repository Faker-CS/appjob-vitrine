"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/cn";
import { MAIN_NAV, ROUTES } from "@/lib/navigation";
import { EASE } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { isActivePath } from "./desktop-nav";

/**
 * Burger button and navigation panel shown below the desktop breakpoint.
 * The panel has no Figma frame: it reuses the header, button and text tokens.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 80rem)");
    const onDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  return (
    <div className="desk:hidden">
      <button
        type="button"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex size-11 cursor-pointer items-center justify-center rounded-xs border-[1.5px] border-line-strong text-ink transition-colors duration-200 hover:border-ink"
      >
        <Icon
          name={open ? "plus" : "menu"}
          size={22}
          className={cn(
            "transition-transform duration-300 ease-out-soft",
            open && "rotate-45",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            className="gutter fixed inset-x-0 top-17 bottom-0 z-40 overflow-y-auto border-t border-line bg-page pt-6 pb-8"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("a")) setOpen(false);
            }}
          >
            <nav
              aria-label="Navigation principale"
              className="container-page flex flex-col gap-8"
            >
              <ul className="flex flex-col">
                {MAIN_NAV.map((item) => (
                  <li
                    key={item.href}
                    className="border-b border-line py-4 first:pt-0"
                  >
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={cn(
                        "block font-display text-h5",
                        isActivePath(pathname, item.href)
                          ? "text-primary"
                          : "text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <ul className="mt-3 flex flex-col gap-2.5">
                        {item.children
                          .filter((child) => child.href !== item.href)
                          .map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                aria-current={
                                  pathname === child.href ? "page" : undefined
                                }
                                className="block text-small text-fg-secondary"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3">
                <Button
                  href={ROUTES.download}
                  variant="primary"
                  size="lg"
                  arrow
                  fullWidth="always"
                >
                  Télécharger l&apos;app
                </Button>
                <Button
                  href={ROUTES.contact}
                  variant="secondary"
                  size="lg"
                  fullWidth="always"
                >
                  Contact
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
