import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalyticsGate from "@/components/AnalyticsGate";
import { SkipLink } from "@/components/shared";
import { COMPANY, SOCIALS } from "@/data";

// One variable family: the width axis gives the condensed headline face.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://consultinguz.vercel.app";
const DESCRIPTION =
  "Internationale Personalvermittlung: qualifizierte Fachkräfte und Auszubildende aus Usbekistan für Unternehmen in Deutschland – Auswahl, Sprachausbildung, Visum und Integration aus einer Hand.";
const OG_IMAGE = { url: "/consulting-logo.png", width: 500, height: 500, alt: COMPANY.name };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ConsultingUZ — Fachkräfte aus Usbekistan für Deutschland",
    template: "%s — ConsultingUZ",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.png", shortcut: "/favicon.png", apple: "/favicon.png" },
  openGraph: {
    title: COMPANY.name,
    description: DESCRIPTION,
    type: "website",
    url: "/",
    siteName: COMPANY.name,
    locale: "de_DE",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary",
    title: COMPANY.name,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "EmploymentAgency",
  name: COMPANY.name,
  url: SITE_URL,
  logo: `${SITE_URL}/consulting-logo.png`,
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
  sameAs: SOCIALS.map((social) => social.href),
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
