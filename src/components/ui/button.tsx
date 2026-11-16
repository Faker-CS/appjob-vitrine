import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowGlyph } from "./icon";

export type ButtonVariant =
  | "primary"
  | "ink"
  | "mandarine"
  | "secondary"
  | "white"
  /** "Secondaire" placed on a blue or ink surface: 40 % white outline. */
  | "outline-light";

export type ButtonSize = "sm" | "md" | "lg";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white shadow-blue",
  ink: "bg-ink text-white",
  mandarine: "bg-mandarine text-white",
  secondary: "border-[1.5px] border-line-strong text-ink hover:border-ink",
  white: "bg-surface text-ink",
  "outline-light": "border-[1.5px] border-white/40 text-white hover:border-white",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-10 px-4.5 text-label-sm",
  md: "h-13 px-6 text-label",
  lg: "h-15 px-8 text-label",
};

type OwnProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Trailing arrow ("Flèche" property in Figma). */
  arrow?: boolean;
  /** `always` stretches the button; `mobile` only below the tablet breakpoint. */
  fullWidth?: "always" | "mobile";
  children: ReactNode;
  className?: string;
};

type ButtonAsLink = OwnProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    keyof OwnProps | "href"
  >;
type ButtonAsButton = OwnProps & { href?: undefined; decorative?: false } & Omit<
    ComponentProps<"button">,
    keyof OwnProps
  >;
/** Button look without behaviour, for cards that are themselves a link. */
type ButtonAsDecoration = OwnProps & { href?: undefined; decorative: true };

export type ButtonProps = ButtonAsLink | ButtonAsButton | ButtonAsDecoration;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    arrow = false,
    fullWidth,
    children,
    className,
    ...rest
  } = props;

  const classes = cn(
    "group/button inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-full font-display whitespace-nowrap",
    "transition-[transform,box-shadow,border-color,opacity] duration-200 ease-out-soft",
    "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-60",
    VARIANTS[variant],
    SIZES[size],
    fullWidth === "always" && "w-full",
    fullWidth === "mobile" && "max-md:w-full",
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowGlyph className="-m-px transition-transform duration-200 ease-out-soft group-hover/button:translate-x-1" />
      )}
    </>
  );

  if (rest.href !== undefined) {
    return (
      <Link {...(rest as Omit<ButtonAsLink, keyof OwnProps>)} className={classes}>
        {content}
      </Link>
    );
  }

  if ("decorative" in rest && rest.decorative) {
    return <span className={classes}>{content}</span>;
  }

  const {
    type = "button",
    decorative: _decorative,
    ...buttonRest
  } = rest as Omit<ButtonAsButton, keyof OwnProps>;
  void _decorative;
  return (
    <button type={type} {...buttonRest} className={classes}>
      {content}
    </button>
  );
}
