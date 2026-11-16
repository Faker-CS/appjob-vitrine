import type { ReactNode } from "react";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Alert } from "@/components/ui/alert";
import { CheckItem, CheckList } from "@/components/ui/check-item";
import { PhoneMockup } from "@/components/ui/phone-mockup";
import { SectionHead } from "@/components/ui/section-head";
import { cn } from "@/lib/cn";

type Accent = "primary" | "mandarine";

type AudienceAppIntroProps = {
  eyebrow: string;
  title: ReactNode;
  text: ReactNode;
  /** Info note under the head. */
  note: ReactNode;
  /** Eyebrow colour: blue for candidates, mandarine for recruiters. */
  accent?: Accent;
};

/**
 * Hero of the two "application, écran par écran" pages: H1 section head and
 * an info alert, 64 → 32 px band (24 → 16 on mobile).
 */
export function AudienceAppIntro({
  eyebrow,
  title,
  text,
  note,
  accent = "primary",
}: AudienceAppIntroProps) {
  return (
    <section className="gutter pt-6 pb-4 md:pt-16 md:pb-8">
      <div className="container-page flex flex-col gap-4 md:gap-8">
        <Reveal immediate>
          <SectionHead
            as="h1"
            size="h1"
            eyebrow={
              accent === "mandarine" ? (
                <span className="text-mandarine">{eyebrow}</span>
              ) : (
                eyebrow
              )
            }
            title={title}
            text={text}
          />
        </Reveal>
        <Reveal immediate delay={0.1}>
          <Alert type="info">{note}</Alert>
        </Reveal>
      </div>
    </section>
  );
}

type AudienceAppStepProps = {
  number: number;
  title: ReactNode;
  text: ReactNode;
  checks: string[];
  /** Colour of the step dot. */
  accent?: Accent;
  /** Even steps: soft background and the phone on the left on desktop. */
  alternate?: boolean;
  /** Anchor target for deep links from the audience pages. */
  id?: string;
};

/**
 * "Étape" band: step label, H2, lead and check list (480 px column) next to
 * a phone mockup. Below the desktop breakpoint the phone always comes last.
 */
export function AudienceAppStep({
  number,
  title,
  text,
  checks,
  accent = "primary",
  alternate = false,
  id,
}: AudienceAppStepProps) {
  return (
    <Section
      id={id}
      tone={alternate ? "soft" : "page"}
      spacing="compact"
      gap="none"
      className="scroll-mt-17 desk:scroll-mt-20"
    >
      <div
        className={cn(
          "flex flex-col gap-6 md:gap-12 desk:items-center desk:gap-16",
          alternate ? "desk:flex-row-reverse" : "desk:flex-row",
        )}
      >
        <Reveal className="flex flex-col gap-4 md:gap-6 desk:w-120 desk:shrink-0">
          <p className="flex items-center gap-2.5 font-display text-small font-semibold text-fg-secondary">
            <span
              aria-hidden="true"
              className={cn(
                "size-2.5 shrink-0 rounded-full",
                accent === "mandarine" ? "bg-mandarine" : "bg-primary",
              )}
            />
            Étape {number}
          </p>
          <h2 className="font-display text-h2-sm text-ink md:text-h2">{title}</h2>
          <p className="text-body text-fg-secondary md:text-lead">{text}</p>
          <CheckList className="gap-4 md:gap-6">
            {checks.map((check) => (
              <CheckItem key={check}>{check}</CheckItem>
            ))}
          </CheckList>
        </Reveal>
        <Reveal delay={0.1} className="flex min-w-0 flex-1 justify-center">
          <PhoneMockup className="[--phone-scale:0.85] desk:[--phone-scale:1]" />
        </Reveal>
      </div>
    </Section>
  );
}
