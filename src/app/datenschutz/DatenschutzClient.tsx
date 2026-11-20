"use client";

import LegalPage from "@/components/LegalPage";
import { useCookieConsent } from "@/components/providers/cookie-consent-provider";
import { useI18n } from "@/components/providers/translation-provider";

export default function DatenschutzClient() {
  const { lang } = useI18n();
  const { openModal } = useCookieConsent();
  const c = lang === "de" ? DE : UZ;

  return (
    <LegalPage
      kicker={`${c.eyebrow} · ${c.updated}`}
      title={c.title}
      lead={c.subtitle}
      cardTitle={c.responsible_title}
      cardIntro={c.responsible_intro}
      labels={c}
      disclaimer={c.disclaimer}
      topics={[
        { title: c.intro_title, body: c.intro_body },
        { title: c.collection_title, body: c.collection_body },
        { title: c.contact_form_title, body: c.contact_form_body },
        { title: c.rights_title, body: c.rights_body },
        {
          title: c.cookies_title,
          body: (
            <>
              <p>{c.cookies_body}</p>
              <button
                type="button"
                onClick={openModal}
                className="label mt-4 border-b border-current pb-1 text-foreground"
              >
                {c.cookies_adjust}
              </button>
            </>
          ),
        },
      ]}
    />
  );
}

// Long-form legal copy stays local to the page instead of the central dictionary.
const DE = {
  eyebrow: "Datenschutz",
  title: "Datenschutz\u00ADerklärung",
  subtitle:
    "Wir nehmen den Schutz Ihrer personenbezogenen Daten sehr ernst. Nachfolgend informieren wir Sie über die Erhebung und Verwendung personenbezogener Daten bei der Nutzung unserer Website.",
  updated: "Stand: April 2026",
  responsible_title: "Verantwortliche Stelle",
  responsible_intro: "Verantwortlich für die Datenverarbeitung auf dieser Website ist:",
  label_company: "Unternehmen",
  label_address: "Adresse",
  label_email: "E-Mail",
  label_phone: "Telefon",
  intro_title: "Allgemeines",
  intro_body:
    "Wir nehmen den Schutz Ihrer personenbezogenen Daten sehr ernst und behandeln Ihre Daten vertraulich sowie entsprechend den gesetzlichen Datenschutzvorschriften und dieser Datenschutzerklärung.",
  collection_title: "Erhebung und Speicherung personenbezogener Daten",
  collection_body:
    "Beim Besuch unserer Website werden automatisch Informationen an unseren Server übermittelt und temporär in einer Logdatei gespeichert: IP-Adresse, Datum und Uhrzeit des Zugriffs, Name und URL der abgerufenen Datei, Referrer-URL, verwendeter Browser sowie Ihr Betriebssystem.",
  contact_form_title: "Kontaktformular",
  contact_form_body:
    "Wenn Sie uns über das Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Formular inklusive Kontaktdaten zwecks Bearbeitung der Anfrage und für Anschlussfragen gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.",
  rights_title: "Ihre Rechte",
  rights_body:
    "Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger sowie den Zweck der Verarbeitung. Außerdem haben Sie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.",
  cookies_title: "Cookies",
  cookies_body:
    "Unsere Website verwendet Cookies — kleine Textdateien, die Ihr Browser auf Ihrem Endgerät speichert. Sie helfen uns, unser Angebot nutzerfreundlicher und effektiver zu gestalten. Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden.",
  cookies_adjust: "Cookie-Einstellungen anpassen",
  disclaimer:
    "Diese Informationen dienen lediglich der allgemeinen Orientierung und ersetzen keine rechtliche Beratung.",
};

const UZ = {
  eyebrow: "Maxfiylik",
  title: "Maxfiylik siyosati",
  subtitle:
    "Shaxsiy ma'lumotlaringiz himoyasiga juda jiddiy yondashamiz. Quyida saytimizdan foydalanish chog'ida shaxsiy ma'lumotlarni yig'ish va undan foydalanish haqida ma'lumot beramiz.",
  updated: "Yangilangan: Aprel 2026",
  responsible_title: "Mas'ul shaxs",
  responsible_intro: "Ushbu saytda ma'lumotlarni qayta ishlash uchun mas'ul shaxs:",
  label_company: "Kompaniya",
  label_address: "Manzil",
  label_email: "Email",
  label_phone: "Telefon",
  intro_title: "Umumiy qoidalar",
  intro_body:
    "Shaxsiy ma'lumotlaringiz himoyasiga juda jiddiy yondashamiz. Ma'lumotlaringiz qonun talablariga muvofiq, maxfiy tarzda va ushbu siyosatga asosan qayta ishlanadi.",
  collection_title: "Shaxsiy ma'lumotlarni yig'ish va saqlash",
  collection_body:
    "Saytimizga tashrif buyurganingizda ba'zi ma'lumotlar avtomatik tarzda serverimizga yuboriladi va vaqtinchalik log faylda saqlanadi: IP-manzil, kirish sanasi va vaqti, olingan fayl nomi va URL, referrer URL, foydalanilgan brauzer va operatsion tizim.",
  contact_form_title: "Aloqa formasi",
  contact_form_body:
    "Aloqa formasi orqali murojaat yuborganingizda, formada ko'rsatgan ma'lumotlaringiz, jumladan kontakt ma'lumotlari, murojaatni ko'rib chiqish va keyingi savollar uchun saqlanadi. Ularni roziligingizsiz uchinchi shaxslarga bermaymiz.",
  rights_title: "Sizning huquqlaringiz",
  rights_body:
    "Siz istalgan vaqtda saqlangan shaxsiy ma'lumotlaringiz, ularning manbai va qabul qiluvchilari hamda qayta ishlash maqsadi to'g'risida bepul ma'lumot olish, shuningdek, ushbu ma'lumotlarni tuzatish, bloklash yoki o'chirish huquqiga egasiz.",
  cookies_title: "Cookie fayllari",
  cookies_body:
    "Saytimizda cookie fayllaridan foydalaniladi — bular brauzeringiz qurilmangizda saqlaydigan kichik matn fayllaridir. Cookie fayllar xizmatimizni qulayroq va samaraliroq qilishga yordam beradi. Brauzeringizni cookie o'rnatilganidan xabar beradigan tarzda sozlashingiz mumkin.",
  cookies_adjust: "Cookie sozlamalarini o'zgartirish",
  disclaimer:
    "Ushbu ma'lumotlar faqat tanishish maqsadida taqdim etilgan va huquqiy maslahat o'rnini bosmaydi.",
};
