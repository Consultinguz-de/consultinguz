import ImpressumClient from "./ImpressumClient";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Impressum",
  description:
    "Impressum von ConsultingUZ — Angaben gemäß § 5 TMG: Anschrift, Vertretung und Verantwortliche.",
  path: "/impressum",
});

export default function ImpressumPage() {
  return <ImpressumClient />;
}
