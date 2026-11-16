import { ICON_PATHS, type IconName } from "./icon-paths";

export type { IconName };

type IconProps = {
  name: IconName;
  /** Rendered box size in px. The stroke stays 2.2 px at every size, as in Figma. */
  size?: number;
  className?: string;
};

/** Icon from the AppJob set. Inherits its colour from `currentColor`. */
export function Icon({ name, size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d={ICON_PATHS[name]}
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** 12 × 10 arrow used inside buttons (2 px stroke). */
export function ArrowGlyph({ className }: { className?: string }) {
  return (
    <svg
      width={14}
      height={12}
      viewBox="0 0 14 12"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M1 6H13M8 11L13 6L8 1"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Round or square tile holding an icon (cards, feature rows, banners). */
export type IconTileTone =
  | "primary"
  | "mandarine"
  | "success"
  | "ink"
  | "on-primary"
  | "on-ink";

const TILE_TONES: Record<IconTileTone, string> = {
  primary: "bg-primary-tint text-primary",
  mandarine: "bg-mandarine-tint text-mandarine",
  success: "bg-success-tint text-success",
  ink: "bg-ink text-white",
  "on-primary": "bg-white/16 text-white",
  "on-ink": "bg-mandarine text-white",
};

const TILE_SIZES = {
  /** 44 px tile, 22 px icon — feature rows */
  sm: { box: "size-11 rounded-control", icon: 22 },
  /** 48 px tile, 24 px icon — banners */
  md: { box: "size-12 rounded-control", icon: 24 },
  /** 52 px tile, 26 px icon — cards */
  lg: { box: "size-13 rounded-md", icon: 26 },
} as const;

type IconTileProps = {
  name: IconName;
  tone?: IconTileTone;
  size?: keyof typeof TILE_SIZES;
};

export function IconTile({ name, tone = "primary", size = "lg" }: IconTileProps) {
  const { box, icon } = TILE_SIZES[size];
  return (
    <span
      className={`flex shrink-0 items-center justify-center ${box} ${TILE_TONES[tone]}`}
    >
      <Icon name={name} size={icon} />
    </span>
  );
}
