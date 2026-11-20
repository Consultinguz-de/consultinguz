import DatenschutzClient from "./DatenschutzClient";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Datenschutz",
  description:
    "Datenschutzerklärung von ConsultingUZ — Erhebung, Verarbeitung und Schutz personenbezogener Daten.",
  path: "/datenschutz",
});

export default function DatenschutzPage() {
  return <DatenschutzClient />;
}
