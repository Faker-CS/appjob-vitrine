import type { Metadata } from "next";
import { CookiePreferences } from "@/components/sections/legal-cookie-preferences";
import {
  LegalPage,
  LegalParagraph,
  type LegalSection,
} from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "Gestion des cookies",
  description:
    "Les traceurs utilisés par le site AppJob et la gestion de vos choix, modifiables à tout moment.",
};

const TRACKERS = [
  {
    name: "appjob_consent",
    purpose: "Mémoriser vos choix de cookies",
    duration: "6 mois",
    consent: "Non requis (essentiel)",
  },
  {
    name: "_audience",
    purpose: "Mesure d'audience anonymisée",
    duration: "13 mois",
    consent: "Requis",
  },
];

const COLUMNS = ["Nom", "Finalité", "Durée", "Consentement"];

function TrackersTable() {
  return (
    <div className="overflow-x-auto rounded-md border border-line bg-surface">
      <table className="w-full min-w-150 table-fixed border-collapse text-left">
        <thead>
          <tr className="border-b border-line bg-surface-2">
            {COLUMNS.map((column) => (
              <th
                key={column}
                scope="col"
                className="px-2 py-3.5 font-display text-table-head text-fg-tertiary uppercase first:pl-4.5 last:pr-4.5"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-small text-fg-secondary">
          {TRACKERS.map((tracker) => (
            <tr
              key={tracker.name}
              className="border-b border-line align-top last:border-b-0"
            >
              <th
                scope="row"
                className="py-3.5 pr-2 pl-4.5 font-normal break-words"
              >
                {tracker.name}
              </th>
              <td className="px-2 py-3.5">{tracker.purpose}</td>
              <td className="px-2 py-3.5">{tracker.duration}</td>
              <td className="py-3.5 pr-4.5 pl-2">{tracker.consent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const SECTIONS: LegalSection[] = [
  {
    id: "traceurs",
    title: "Traceurs utilisés",
    content: (
      <>
        <TrackersTable />
        <LegalParagraph>
          Cette liste sera adaptée aux traceurs réellement déployés à la mise en
          ligne.
        </LegalParagraph>
      </>
    ),
  },
  {
    id: "vos-choix",
    title: "Vos choix",
    content: <CookiePreferences />,
  },
  {
    id: "navigateur",
    title: "Paramétrer votre navigateur",
    content: (
      <LegalParagraph>
        Vous pouvez également bloquer les cookies depuis les réglages de votre
        navigateur. Certaines fonctions du site peuvent alors ne plus
        fonctionner.
      </LegalParagraph>
    ),
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      title="Gestion des cookies"
      lead="Ce site utilise un nombre limité de traceurs. Vous pouvez modifier vos choix à tout moment depuis cette page."
      updatedAt="10 novembre 2026"
      sections={SECTIONS}
    />
  );
}
