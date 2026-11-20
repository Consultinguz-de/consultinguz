import type { Metadata } from "next";

import { COMPANY } from "@/data";

// Shown when a link is shared (Telegram, WhatsApp, LinkedIn, Facebook, X). 1200×630.
const SHARE_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "ConsultingUZ — Fachkräfte, die bleiben. Internationale Personalvermittlung, Usbekistan → Deutschland.",
};

/**
 * Per-route metadata. Next.js replaces `openGraph` and `twitter` wholesale
 * instead of merging them with the root layout, so every page has to restate
 * them — otherwise a shared link to a subpage shows the home page's title and URL.
 */
export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  // The home page already carries the brand in its title.
  const fullTitle = path === "/" ? title : `${title} — ${COMPANY.name}`;
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: COMPANY.name,
      locale: "de_DE",
      alternateLocale: "uz_UZ",
      type: "website",
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [SHARE_IMAGE],
    },
  };
}
