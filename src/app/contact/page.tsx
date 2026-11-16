import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { INLINE_LINK } from "@/components/sections/content-consent-checkbox";
import { ContactForm } from "@/components/sections/content-contact-form";
import { Alert } from "@/components/ui/alert";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { FeatureRow } from "@/components/ui/feature-row";
import { Swap } from "@/components/ui/responsive";
import { SectionHead } from "@/components/ui/section-head";
import { ROUTES } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Une question, une remarque ? Écrivez à l'équipe AppJob : nous lisons chaque message et répondons sous deux jours ouvrés.",
};

/* The "Feature row" instances of the frame keep a 208 px text column
   (44 px tile + 16 px gap + 208 px = 268 px). */
const ROW_WIDTH = "max-w-67";

export default function ContactPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Contact" }]} />

      {/* 64 / 96 px band on desktop, 24 / 48 px in the mobile frame */}
      <section className="gutter pt-6 pb-12 md:pt-16 md:pb-24">
        <div className="container-page flex flex-col gap-5 md:gap-8 desk:flex-row desk:gap-24">
          {/* Infos: on mobile and tablet its two parts sit around the form */}
          <div className="max-desk:contents desk:flex desk:w-115 desk:shrink-0 desk:flex-col desk:gap-6">
            <Reveal immediate className="order-1">
              <SectionHead
                as="h1"
                size="h1"
                width="column"
                eyebrow="Contact"
                title="Une question, une remarque ?"
                text={
                  <Swap mobile="Nous répondons sous deux jours ouvrés.">
                    Écrivez-nous. Nous lisons chaque message et répondons sous
                    deux jours ouvrés.
                  </Swap>
                }
              />
            </Reveal>
            <Stagger immediate className="order-3 flex flex-col gap-5 md:gap-6">
              <StaggerItem>
                <FeatureRow icon="mail" title="Par e-mail" className={ROW_WIDTH}>
                  <a href="mailto:bonjour@appjob.fr" className={INLINE_LINK}>
                    bonjour@appjob.fr
                  </a>
                </FeatureRow>
              </StaggerItem>
              <StaggerItem>
                <FeatureRow icon="pin" title="Par courrier" className={ROW_WIDTH}>
                  <Swap mobile="12 rue des Ateliers, 69003 Lyon">
                    AppJob — 12 rue des Ateliers, 69003 Lyon
                  </Swap>
                </FeatureRow>
              </StaggerItem>
              <StaggerItem className="max-md:hidden">
                <FeatureRow icon="info" title="Avant d'écrire" className={ROW_WIDTH}>
                  La réponse est peut-être déjà dans la{" "}
                  <Link href={ROUTES.candidatesFaq} className={INLINE_LINK}>
                    FAQ candidats
                  </Link>{" "}
                  ou la{" "}
                  <Link href={ROUTES.recruitersFaq} className={INLINE_LINK}>
                    FAQ recruteurs
                  </Link>
                  .
                </FeatureRow>
              </StaggerItem>
              <StaggerItem className="max-md:hidden">
                <Alert type="info">
                  Ce formulaire ne permet pas de postuler à une offre ni de
                  publier une annonce. Ces actions se font dans
                  l&apos;application.
                </Alert>
              </StaggerItem>
            </Stagger>
          </div>

          <Reveal immediate delay={0.1} className="order-2 min-w-0 desk:flex-1">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
