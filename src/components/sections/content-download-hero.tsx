import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Alert } from "@/components/ui/alert";
import { StoreBadges } from "@/components/ui/store-badge";
import { NotifyForm } from "./content-notify-form";
import { HeroVisual } from "./hero-visual";

/**
 * Hero of /telecharger. Same two-column composition as `PageHero`, with a
 * longer text column: store badges, a warning and the notification form.
 */
export function DownloadHero() {
  return (
    <section className="gutter pt-8 pb-12 md:pt-16 md:pb-24">
      <div className="container-page flex flex-col gap-6 desk:flex-row desk:items-center desk:gap-12">
        <Stagger
          immediate
          className="flex min-w-0 flex-1 flex-col items-start gap-6 md:gap-8"
        >
          <StaggerItem>
            <p className="font-display text-eyebrow text-primary uppercase">
              Télécharger
            </p>
          </StaggerItem>
          <StaggerItem>
            <h1 className="font-display text-h1-sm text-ink md:text-h1">
              AppJob arrive sur votre téléphone
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="max-w-150 text-body text-fg-secondary md:text-lead">
              L&apos;application sera publiée sur l&apos;App Store et Google
              Play. Les liens officiels apparaîtront ici le jour de la sortie.
              En attendant, laissez votre adresse e-mail et nous vous
              préviendrons.
            </p>
          </StaggerItem>
          <StaggerItem>
            <StoreBadges />
          </StaggerItem>
          <StaggerItem className="w-full">
            <Alert type="warning">
              L&apos;application n&apos;est pas encore disponible. Seuls les
              liens officiels des stores seront publiés sur cette page.
              Méfiez-vous de toute autre source de téléchargement.
            </Alert>
          </StaggerItem>
          <StaggerItem className="w-full">
            <NotifyForm />
          </StaggerItem>
        </Stagger>
        <HeroVisual variant="single" />
      </div>
    </section>
  );
}
