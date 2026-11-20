import ContactClient from "./ContactClient";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Kontakt",
  description:
    "Kontakt zu ConsultingUZ – per Formular, Telefon oder E-Mail. Wir antworten innerhalb von 2–3 Werktagen.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactClient />;
}
