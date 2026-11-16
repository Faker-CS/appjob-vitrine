import { cn } from "@/lib/cn";

export type Store = "app-store" | "google-play";
export type StoreBadgeState = "soon" | "available" | "light";

const STORE_NAME: Record<Store, string> = {
  "app-store": "App Store",
  "google-play": "Google Play",
};

const CAPTION: Record<Store, Record<StoreBadgeState, string>> = {
  "app-store": {
    soon: "Bientôt sur",
    available: "Télécharger sur",
    light: "Télécharger sur",
  },
  "google-play": {
    soon: "Bientôt sur",
    available: "Disponible sur",
    light: "Disponible sur",
  },
};

const STATES: Record<StoreBadgeState, string> = {
  soon: "border-[1.5px] border-line bg-surface text-fg-tertiary",
  available: "bg-ink text-white",
  light: "bg-surface text-ink",
};

function AppStoreGlyph({ className }: { className?: string }) {
  return (
    <svg
      width={18}
      height={22}
      viewBox="0 0 18 22"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M14.7728 11.497C14.7728 8.77402 16.9915 7.56381 17.0924 7.46296C15.7813 5.64765 13.7643 5.44594 13.1592 5.34509C11.5456 5.14339 9.83113 6.3536 9.02432 6.3536C8.11666 6.3536 6.8056 5.34509 5.39369 5.44594C3.57837 5.44594 1.86391 6.5553 0.956253 8.16892C-1.06076 11.497 0.451999 16.5395 2.36816 19.2625C3.27582 20.5736 4.38518 22.0863 5.89794 21.9855C7.30985 21.9855 7.81411 21.0778 9.52857 21.0778C11.243 21.0778 11.6464 21.9855 13.0584 21.9855C14.5711 21.9855 15.5796 20.5736 16.4873 19.2625C17.4958 17.7497 17.8992 16.3378 18 16.237C17.8992 16.237 14.7728 15.0268 14.7728 11.497ZM12.0498 3.52978C12.8567 2.52127 13.3609 1.31106 13.1592 0C12.0498 0 10.6379 0.806807 9.93198 1.81531C9.12517 2.72297 8.62091 4.03403 8.72177 5.24424C10.0328 5.34509 11.3439 4.53829 12.0498 3.52978Z" />
    </svg>
  );
}

function GooglePlayGlyph({ className }: { className?: string }) {
  return (
    <svg
      width={19}
      height={20}
      viewBox="0 0 19 20"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M0 18.6016V1.36851C0 0.770421 0.363943 0.243291 0.899154 0L11.4428 9.98506L0.899154 19.9701C0.363943 19.7167 0 19.1997 0 18.6016ZM14.7825 13.1478L3.26478 19.4531L12.3527 10.8467L14.7825 13.1478ZM18.3684 8.77874C18.7324 9.05245 19 9.4782 19 9.98506C19 10.4919 18.7645 10.8974 18.3898 11.1812L15.9386 12.5193L13.2625 9.98506L15.9386 7.45078L18.3684 8.77874ZM3.26478 0.516993L14.7825 6.82228L12.3527 9.12341L3.26478 0.516993Z" />
    </svg>
  );
}

type StoreBadgeProps = {
  store: Store;
  state?: StoreBadgeState;
  /** Stretch to the container width (mobile call-to-action blocks). */
  fullWidth?: "always" | "mobile";
  className?: string;
};

/**
 * Store badge. In the "soon" state it is informative only (the app is not
 * published yet), so it renders as a non-interactive element.
 */
export function StoreBadge({
  store,
  state = "soon",
  fullWidth,
  className,
}: StoreBadgeProps) {
  const Glyph = store === "app-store" ? AppStoreGlyph : GooglePlayGlyph;
  return (
    <span
      className={cn(
        "inline-flex h-14 shrink-0 items-center gap-3 rounded-md pr-5 pl-4",
        STATES[state],
        fullWidth === "always" && "w-full",
        fullWidth === "mobile" && "max-md:w-full",
        className,
      )}
    >
      <Glyph className={state === "soon" ? "opacity-60" : undefined} />
      <span className="flex flex-col gap-px">
        <span className="font-sans text-micro font-medium opacity-80">
          {CAPTION[store][state]}
        </span>
        <span className="font-display text-label-lg">{STORE_NAME[store]}</span>
      </span>
    </span>
  );
}

/** The App Store + Google Play pair used across the site. */
export function StoreBadges({
  state = "soon",
  layout = "row",
  className,
}: {
  state?: StoreBadgeState;
  /** `stack-mobile`: full-width stacked badges below the tablet breakpoint. */
  layout?: "row" | "stack-mobile";
  className?: string;
}) {
  const fullWidth = layout === "stack-mobile" ? "mobile" : undefined;
  return (
    <div
      className={cn(
        "flex gap-3",
        layout === "stack-mobile" ? "max-md:w-full max-md:flex-col" : "flex-wrap",
        className,
      )}
    >
      <StoreBadge store="app-store" state={state} fullWidth={fullWidth} />
      <StoreBadge store="google-play" state={state} fullWidth={fullWidth} />
    </div>
  );
}
