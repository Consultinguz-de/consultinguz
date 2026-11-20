"use client";

import LegalPage from "@/components/LegalPage";
import { useI18n } from "@/components/providers/translation-provider";
import { COMPANY } from "@/data";

// TODO: Daten werden vom Auftraggeber noch geliefert.
//   - Registereintrag (Handelsregister): Registergericht + Registernummer
//   - Umsatzsteuer-ID nach §27a UStG
//   - Aufsichtsbehörde

export default function ImpressumClient() {
  const { lang } = useI18n();
  const c = lang === "de" ? DE : UZ;

  return (
    <LegalPage
      kicker={c.pill_legal}
      title={c.title}
      lead={c.subtitle}
      cardTitle={c.address_title}
      cardIntro={c.address_intro}
      labels={c}
      disclaimer={c.disclaimer}
      topics={[
        {
          title: c.vertreten_title,
          body: (
            <>
              <p>{c.vertreten_label}</p>
              <p className="mt-1 font-semibold text-foreground">{COMPANY.owner}</p>
            </>
          ),
        },
      ]}
    />
  );
}

const DE = {
  title: "Impressum",
  subtitle: "Angaben gemäß § 5 TMG",
  pill_legal: "Rechtliche Hinweise",
  address_title: "Anschrift",
  address_intro: "Anbieter dieser Website ist:",
  label_company: "Unternehmen",
  label_address: "Adresse",
  label_email: "E-Mail",
  label_phone: "Telefon",
  vertreten_title: "Vertreten durch",
  vertreten_label: "Vertretungsberechtigter Geschäftsführer:",
  disclaimer:
    "Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.",
};

const UZ = {
  title: "Kompaniya ma'lumotlari",
  subtitle: "§ 5 TMG (Germaniya qonunchiligi) bo'yicha ma'lumotlar",
  pill_legal: "Huquqiy ma'lumotlar",
  address_title: "Manzil",
  address_intro: "Ushbu saytning egasi:",
  label_company: "Kompaniya",
  label_address: "Manzil",
  label_email: "Email",
  label_phone: "Telefon",
  vertreten_title: "Vakil shaxs",
  vertreten_label: "Vakolatli direktor:",
  disclaimer:
    "Tashqi havolalar mazmuni biz tomonidan diqqat bilan tekshirilgan bo'lsa-da, ularning keyingi o'zgarishi uchun javobgarlik faqat tegishli sayt egalariga yuklanadi.",
};
