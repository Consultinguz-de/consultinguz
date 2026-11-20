import EmployersContent from "./EmployersContent";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Für Arbeitgeber",
  description:
    "Fachkräfte und Auszubildende aus Usbekistan: Auswahl, Sprachausbildung B1+, Visum, Einreise und Integration – in fünf klaren Schritten.",
  path: "/services/employers",
});

export default function Page() {
  return <EmployersContent />;
}
