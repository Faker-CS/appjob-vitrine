import type { Metadata } from "next";
import { AdviceList } from "@/components/sections/content-advice-list";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ROUTES } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Conseils recruteurs",
  description:
    "Des articles courts pour publier de meilleures annonces, trier plus vite et répondre à chaque candidat.",
};

export default function RecruiterAdvicePage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Conseils", href: ROUTES.advice },
          { label: "Conseils recruteurs" },
        ]}
      />
      <AdviceList audience="recruiters" />
    </>
  );
}
