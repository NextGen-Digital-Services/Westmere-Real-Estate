import type { Metadata } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/config/site";
import { ToastProvider } from "@/components/ui/Toast";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { BackToTop } from "@/components/layout/BackToTop";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-bodoni",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "Netherlands Real Estate",
    "Amsterdam Canal Mansions",
    "Rotterdam Penthouses",
    "The Hague Diplomatic Estates",
    "Dutch Property Valuation",
    "Rijksmonument Conservation",
    "Overdrachtsbelasting Advisory",
  ],
  authors: [{ name: SITE_CONFIG.legalName }],
  creator: SITE_CONFIG.legalName,
  openGraph: {
    type: "website",
    locale: "en_NL",
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} — Prime Netherlands Real Estate`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodoni.variable} ${jost.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-marble text-charcoal">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-olive text-marble px-4 py-2 text-xs uppercase font-sans tracking-eyebrow rounded-sm border border-stone-border"
        >
          Skip to main content
        </a>
        <ToastProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieBanner />
          <WhatsAppButton />
          <BackToTop />
        </ToastProvider>
      </body>
    </html>
  );
}
