import DatenschutzClient from "./DatenschutzClient";

export const metadata = {
  title: "Datenschutz",
  description:
    "Datenschutzerklärung von ConsultingUZ — Erhebung, Verarbeitung und Schutz personenbezogener Daten.",
  alternates: { canonical: "/datenschutz" },
};

export default function DatenschutzPage() {
  return <DatenschutzClient />;
}
