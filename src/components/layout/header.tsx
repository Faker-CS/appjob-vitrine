import { ROUTES } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { DesktopNav } from "./desktop-nav";
import { MobileMenu } from "./mobile-menu";

/** Site header: 80 px on desktop, 68 px with a burger below 1 280 px. */
export function Header() {
  return (
    <header className="gutter sticky top-0 z-40 h-17 border-b border-line bg-page desk:h-20">
      <div className="container-page flex h-full items-center justify-between">
        <Logo />
        <DesktopNav />
        <div className="flex items-center gap-3 max-desk:hidden">
          <Button href={ROUTES.contact} variant="secondary" size="sm">
            Contact
          </Button>
          <Button href={ROUTES.download} variant="primary" size="sm" arrow>
            Télécharger l&apos;app
          </Button>
        </div>
        <MobileMenu />
      </div>
    </header>
  );
}
