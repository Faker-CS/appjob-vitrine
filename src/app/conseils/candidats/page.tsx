import type { Metadata } from "next";
import { AdviceList } from "@/components/sections/content-advice-list";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ROUTES } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Conseils candidats",
  description:
    "Des articles courts pour mieux présenter votre profil, candidater sans stress et préparer vos entretiens.",
};

export default function CandidateAdvicePage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Conseils", href: ROUTES.advice },
          { label: "Conseils candidats" },
        ]}
      />
      <AdviceList audience="candidates" />
    </>
  );
}
