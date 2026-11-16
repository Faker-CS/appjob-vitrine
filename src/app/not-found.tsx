import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { SectionHead } from "@/components/ui/section-head";
import { ROUTES } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Page introuvable",
};

/**
 * 404 page. There is no Figma frame for it: it only reuses the page-hero
 * building blocks so that a wrong URL stays on brand.
 */
export default function NotFound() {
  return (
    <Section spacing="hero" containerClassName="items-start md:gap-8">
      <SectionHead
        as="h1"
        size="h1"
        eyebrow="Erreur 404"
        title="Cette page est introuvable"
        text="Le lien est peut-être incomplet, ou la page a été déplacée."
      />
      <div className="flex w-full flex-col gap-3 md:flex-row">
        <Button href={ROUTES.home} variant="primary" size="lg" arrow fullWidth="mobile">
          Retour à l&apos;accueil
        </Button>
        <Button href={ROUTES.contact} variant="secondary" size="lg" fullWidth="mobile">
          Nous contacter
        </Button>
      </div>
    </Section>
  );
}
