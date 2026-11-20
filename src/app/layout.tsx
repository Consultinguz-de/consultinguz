import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalyticsGate from "@/components/AnalyticsGate";
import { SkipLink } from "@/components/shared";
import { COMPANY, SITE_URL, SOCIALS } from "@/data";
import { pageMeta } from "@/lib/seo";

// One variable family: the width axis gives the condensed headline face.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
});

const DESCRIPTION =
  "Internationale Personalvermittlung: qualifizierte Fachkräfte und Auszubildende aus Usbekistan für Unternehmen in Deutschland – Auswahl, Sprachausbildung, Visum und Integration aus einer Hand.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: COMPANY.name,
  ...pageMeta({
    title: "ConsultingUZ — Fachkräfte aus Usbekistan für Deutschland",
    description: DESCRIPTION,
    path: "/",
  }),
  title: {
    default: "ConsultingUZ — Fachkräfte aus Usbekistan für Deutschland",
    template: "%s — ConsultingUZ",
  },
  icons: { icon: "/favicon.png", shortcut: "/favicon.png", apple: "/favicon.png" },
  robots: {
    index: true,
    follow: true,
    googleBot: { "max-image-preview": "large", "max-snippet": -1 },
  },
};

const ORGANIZATION_ID = `${SITE_URL}/#organization`;

// WebSite tells Google the site name shown in results (and the spellings people
// search for); EmploymentAgency feeds the business details and knowledge panel.
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: COMPANY.name,
      alternateName: ["Consulting UZ", "consultinguz", "consultinguz.de"],
      inLanguage: ["de", "uz"],
      publisher: { "@id": ORGANIZATION_ID },
    },
    {
      "@type": "EmploymentAgency",
      "@id": ORGANIZATION_ID,
      name: COMPANY.name,
      alternateName: "Consulting UZ",
      url: SITE_URL,
      logo: `${SITE_URL}/consulting-logo.png`,
      image: `${SITE_URL}/og-image.png`,
      description: DESCRIPTION,
      founder: { "@type": "Person", name: COMPANY.owner },
      address: {
        "@type": "PostalAddress",
        streetAddress: COMPANY.street,
        addressLocality: COMPANY.city,
        postalCode: COMPANY.postalCode,
        addressCountry: "DE",
      },
      telephone: COMPANY.phone,
      email: COMPANY.email,
      areaServed: ["DE", "UZ"],
      openingHours: "Mo-Fr 09:00-18:00",
      sameAs: SOCIALS.map((social) => social.href),
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className={`${archivo.variable} flex min-h-screen flex-col`}>
        <Providers>
          <SkipLink />
          <Navbar />
          <main id="main" role="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <AnalyticsGate />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </body>
    </html>
  );
}
