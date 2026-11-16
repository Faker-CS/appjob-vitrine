import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * "Emblème" of the "À propos" hero: the brand circle with its glow, the
 * AppJob mark and the magnifier handle. Drawn on the 420 × 360 Figma canvas
 * and scaled to 80 % below the desktop breakpoint.
 */
export function InfoEmblem({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative h-72 w-84 shrink-0 desk:h-90 desk:w-105", className)}
    >
      <div className="absolute top-0 left-0 h-90 w-105 origin-top-left scale-80 desk:scale-100">
        <span className="absolute top-5 left-17.5 size-70 rounded-full bg-primary shadow-blue" />
        {/* Handle: 78 px rounded square turned 45° */}
        <span className="absolute top-[262.7px] left-[302.3px] size-19.5 rotate-45 rounded-[18px] bg-primary" />
        <Image
          src="/brand/logo-mark.svg"
          alt=""
          width={206}
          height={240}
          unoptimized
          className="absolute top-[66.5px] left-29 h-auto w-[206px] max-w-none"
        />
      </div>
    </div>
  );
}
