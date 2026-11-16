import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type PhoneMockupProps = {
  /**
   * Uniform scale of the 300 × 620 reference phone. Leave it unset to drive
   * the scale responsively with the `--phone-scale` CSS variable instead
   * (e.g. `className="[--phone-scale:0.85] desk:[--phone-scale:1]"`).
   */
  scale?: number;
  /** Optional app screen. The Figma frames currently show an empty screen. */
  children?: ReactNode;
  className?: string;
};

/**
 * "Phone mockup" component: ink shell (radius 44), white screen (radius 34)
 * and notch. Sizes follow the Figma component and scale uniformly.
 */
export function PhoneMockup({ scale, children, className }: PhoneMockupProps) {
  const style =
    scale === undefined
      ? undefined
      : ({ "--phone-scale": scale } as CSSProperties);
  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-[calc(620px*var(--phone-scale,1))] w-[calc(300px*var(--phone-scale,1))] shrink-0",
        className,
      )}
      style={style}
    >
      <div className="relative h-155 w-75 origin-top-left scale-[var(--phone-scale,1)] rounded-phone bg-ink shadow-lg">
        <div className="absolute inset-3 overflow-hidden rounded-screen bg-surface">
          {children}
          <span className="absolute top-2.5 left-1/2 h-6.5 w-24 -translate-x-1/2 rounded-full bg-ink" />
        </div>
      </div>
    </div>
  );
}
