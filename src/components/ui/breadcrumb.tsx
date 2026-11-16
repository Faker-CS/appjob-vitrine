import Link from "next/link";
import { Fragment } from "react";
import { ROUTES } from "@/lib/navigation";
import { Icon } from "./icon";

export type Crumb = { label: string; href?: string };

/**
 * "Fil d'Ariane". `items` are the levels after "Accueil"; the last one is the
 * current page.
 */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ label: "Accueil", href: ROUTES.home }, ...items];
  return (
    <nav aria-label="Fil d'Ariane" className="gutter pt-6">
      <ol className="container-page flex flex-wrap items-center gap-2 text-small text-fg-secondary">
        {trail.map((crumb, index) => {
          const last = index === trail.length - 1;
          return (
            <Fragment key={crumb.label}>
              <li>
                {last || !crumb.href ? (
                  <span
                    aria-current={last ? "page" : undefined}
                    className={last ? "font-semibold text-ink" : undefined}
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="transition-colors duration-200 hover:text-ink"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
              {!last && (
                <li aria-hidden="true" className="flex text-fg-tertiary">
                  <Icon name="chevron" size={12} className="-rotate-90" />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
