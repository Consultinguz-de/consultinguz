import ContactClient from "./ContactClient";

export const metadata = {
  title: "Kontakt",
  description:
    "Kontakt zu ConsultingUZ – per Formular, Telefon oder E-Mail. Wir antworten innerhalb von 2–3 Werktagen.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactClient />;
}
