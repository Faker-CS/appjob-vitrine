import type { Metadata, Viewport } from "next";
import { Manrope, Sora } from "next/font/google";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MotionProvider } from "@/components/motion/reveal";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AppJob — L'emploi, à portée de pouce",
    template: "%s — AppJob",
  },
  description:
    "AppJob est une application mobile pensée pour deux publics : les personnes qui cherchent un emploi et celles qui recrutent. Un même outil, deux parcours, zéro friction.",
};

export const viewport: Viewport = {
  themeColor: "#f7f8fc",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${sora.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#contenu"
          className="sr-only z-50 rounded-full bg-ink px-4.5 py-3 font-display text-label-sm text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Aller au contenu
        </a>
        <MotionProvider>
          <Header />
          <main id="contenu" className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieBanner />
        </MotionProvider>
      </body>
    </html>
  );
}
