import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { ROUTES } from "@/lib/navigation";

type LogoProps = {
  /** `light` = dark wordmark for light surfaces, `dark` = white wordmark. */
  tone?: "light" | "dark";
  className?: string;
};

/** AppJob wordmark (mark + "appjob"), linking to the home page. */
export function Logo({ tone = "light", className }: LogoProps) {
  return (
    <Link
      href={ROUTES.home}
      aria-label="AppJob — accueil"
      className={cn("inline-flex shrink-0 items-center gap-2.5", className)}
    >
      <Image
        src="/brand/logo-mark.svg"
        alt=""
        width={36}
        height={42}
        priority
        unoptimized
        className="h-[41.5px] w-9"
      />
      <span
        className={cn(
          "font-display text-wordmark",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        appjob
      </span>
    </Link>
  );
}
