import Link from "next/link";
import { FOOTER_COLUMNS } from "@/lib/navigation";
import { Logo } from "@/components/ui/logo";
import { Swap } from "@/components/ui/responsive";
import { StoreBadges } from "@/components/ui/store-badge";

/** Site footer on ink, with the brand orb rising from the bottom-right corner. */
export function Footer() {
  return (
    <footer className="gutter relative overflow-hidden bg-ink pt-12 pb-8 md:pt-16">
      <span
        aria-hidden="true"
        className="absolute -bottom-50 left-50 size-95 rounded-full bg-primary/90 desk:-bottom-105 desk:left-[calc(50%+360px)] desk:size-155 desk:bg-primary"
      />
      <div className="container-page relative flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col gap-8 desk:flex-row">
          <div className="flex flex-col items-start gap-8 desk:flex-1 desk:gap-4">
            <Logo tone="dark" />
            <p className="text-small text-line-strong desk:max-w-75">
              L&apos;application mobile qui rapproche les candidats et les
              recruteurs. Simple, rapide, dans votre poche.
            </p>
            <StoreBadges />
          </div>
          <nav
            aria-label="Pied de page"
            className="grid grid-cols-2 gap-6 md:grid-cols-4 desk:flex desk:gap-8"
          >
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title} className="flex flex-col gap-2.5 desk:w-42.5">
                <p className="font-display text-eyebrow text-line-strong uppercase md:text-overline">
                  {column.title}
                </p>
                <ul className="flex flex-col gap-2.5 text-small">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="whitespace-nowrap text-white underline-offset-4 hover:underline"
                      >
                        {link.shortLabel ? (
                          <Swap mobile={link.shortLabel}>{link.label}</Swap>
                        ) : (
                          link.label
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="flex flex-col justify-between gap-x-4 gap-y-2 border-t border-white/14 pt-5 text-caption text-line-strong md:flex-row md:pt-6">
          <p>© 2026 AppJob. Tous droits réservés.</p>
          <p className="max-md:hidden">
            Site vitrine — les fonctionnalités sont disponibles dans
            l&apos;application mobile.
          </p>
        </div>
      </div>
    </footer>
  );
}
