"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type LanguageCode = "uz" | "de";

// `de` is the source of truth for the key set. `uz` is typed against it, so a
// missing or misspelled Uzbek key is a compile error instead of untranslated
// text in production. Wrap a phrase in *asterisks* to highlight it in a headline.
const de = {
  // Shell
  skip_link: "Zum Inhalt springen",
  nav_home_aria: "ConsultingUZ Startseite",
  nav_employers: "Arbeitgeber",
  nav_jobseekers: "Arbeitssuchende",
  nav_about: "Über uns",
  nav_contact: "Kontakt",
  nav_privacy: "Datenschutz",
  nav_imprint: "Impressum",
  nav_cookie_settings: "Cookie-Einstellungen",
  nav_cta: "Beratung",
  nav_menu: "Menü",
  nav_close: "Schließen",
  lang_switch: "Sprache",
  route_label: "Usbekistan → Deutschland",
  footer_tagline:
    "Internationale Personalvermittlung: Fachkräfte und Auszubildende aus Usbekistan für Unternehmen in Deutschland.",
  footer_pages: "Seiten",
  footer_legal: "Rechtliches",
  footer_socials: "Soziale Netzwerke",
  footer_rights: "Alle Rechte vorbehalten.",

  // Cookie consent modal
  cookie_modal_title: "Privatsphäre-Einstellungen",
  cookie_modal_subtitle:
    "Dieses Tool hilft Ihnen, verschiedene Tags / Tracker / Analyse-Tools auf dieser Webseite auszuwählen und zu deaktivieren.",
  cookie_essential_label: "Essenziell",
  cookie_essential_desc:
    "Diese Technologien sind erforderlich, um die Kernfunktionalität der Website zu aktivieren.",
  cookie_functional_label: "Funktionell",
  cookie_functional_desc:
    "Diese Technologien ermöglichen es uns, die Nutzung der Website zu analysieren, um die Leistung zu messen und zu verbessern.",
  cookie_marketing_label: "Marketing",
  cookie_marketing_desc:
    "Diese Technologien werden von Werbetreibenden verwendet, um Anzeigen zu schalten, die für Ihre Interessen relevant sind.",
  cookie_accept_all: "Alles akzeptieren",
  cookie_save_settings: "Einstellungen speichern",

  // Stats
  stat_years: "Jahre Erfahrung",
  stat_partners: "Partner",
  stat_placed: "vermittelte Fachkräfte",
  stat_satisfaction: "Zufriedenheit",

  // Images
  img_registan_alt: "Registan-Platz in Samarkand, Usbekistan",
  img_frankfurt_alt: "Skyline von Frankfurt am Main",
  img_welder_alt: "Schweißer bei der Arbeit in einer Werkstatt",

  // Home
  home_kicker: "Internationale Personalvermittlung",
  home_title: "Fachkräfte, die *bleiben.*",
  home_lead:
    "Wir gewinnen qualifizierte Fachkräfte und Auszubildende aus Usbekistan für Ihr Unternehmen – Auswahl, Sprachausbildung, Visum und Integration aus einer Hand.",
  hero_cta_employers: "Ich suche Mitarbeiter",
  hero_cta_jobseekers: "Ich suche einen Job",

  paths_label: "Zwei Wege",
  paths_title: "Für wen wir arbeiten",
  path_emp_desc:
    "Sie nennen den Bedarf. Wir liefern vorbereitete Fachkräfte – sprachlich, fachlich und formal.",
  path_emp_1: "Auswahl nach Ihren Kriterien",
  path_emp_2: "Sprachniveau B1+ bei der Einreise",
  path_emp_3: "Betreuung nach der Ankunft",
  path_emp_link: "Leistungen für Arbeitgeber",
  path_job_desc:
    "Sie bringen Beruf und Motivation mit. Wir begleiten Sie bis zum ersten Arbeitstag in Deutschland.",
  path_job_1: "Geprüfte Stellen bei deutschen Arbeitgebern",
  path_job_2: "Deutschkurs und Vorbereitung",
  path_job_3: "Hilfe bei Visum, Reise und Ankunft",
  path_job_link: "Ihr Weg nach Deutschland",

  modules_label: "Alles aus einer Hand",
  modules_title: "Ein Modell, vier Module",
  modules_intro:
    "Unser modulares Modell gibt Ihnen Flexibilität und Planbarkeit. Sie legen zum Beispiel fest, mit welchem Sprachniveau Ihre Mitarbeiter einreisen.",
  module_1_title: "Bedarf verstehen",
  module_1_desc:
    "Wir definieren gemeinsam Rollenprofile, Kompetenzen und gewünschte Sprachniveaus.",
  module_2_title: "Sprach- und Fachtraining",
  module_2_desc: "Intensivkurse bereiten Kandidaten auf B1+ und die Fachsprache ihrer Branche vor.",
  module_3_title: "Visum und Anerkennung",
  module_3_desc: "Wir koordinieren Termine mit Botschaften, Behörden und Anerkennungsstellen.",
  module_4_title: "Ankommen und Integration",
  module_4_desc: "Von Wohnungssuche bis Bankkonto – wir machen den Start in Deutschland leicht.",

  founder_label: "Gründer",
  founder_quote:
    "Wir bieten Unternehmen ein Rundum-sorglos-Paket – von der sprachlichen und fachlichen Vorbereitung bis zur nachhaltigen Integration nach der Ankunft in Deutschland.",
  founder_role: "Gründer und Geschäftsführer",
  founder_alt: "Porträt von Orif Akhmadaliev, Gründer und Geschäftsführer",

  sectors_label: "Branchen",
  sectors_title: "Wo unsere Fachkräfte arbeiten",
  sector_1: "Gesundheitswesen",
  sector_2: "Sozialwesen",
  sector_3: "Tourismus",
  sector_4: "Transport und Logistik",
  sector_5: "Industrie und Handwerk",

  cta_title: "Sprechen wir über Ihren *Bedarf.*",
  cta_desc: "Unverbindlich und konkret. Wir melden uns innerhalb von 2–3 Werktagen.",
  cta_button: "Kostenlos beraten lassen",
  cta_contact: "Zur Kontaktseite",

  // Employers
  emp_kicker: "Für Arbeitgeber",
  emp_title: "Wir entlasten Ihre *Personal\u00ADabteilung.*",
  emp_lead:
    "Die richtige Rekrutierung ist nur der erste Schritt. Wir übernehmen alle Schritte vor und nach der Einreise – damit aus neuen Mitarbeitern langfristige Teammitglieder werden.",
  services_label: "Leistungen",
  services_title: "Was Sie konkret erwarten dürfen",
  service_1_title: "Auswahl und Erstgespräche",
  service_1_desc:
    "Mehrstufiges Assessment und Profiling. Die endgültige Auswahl treffen Sie nach Ihren Kriterien.",
  service_2_title: "Sprachausbildung",
  service_2_desc:
    "Fundierter Deutschkurs mit dem Ziel, dass Kandidaten mit B1+ in Deutschland ankommen.",
  service_3_title: "Unterlagen für die Bundesagentur für Arbeit",
  service_3_desc: "Wir bereiten alle Dokumente für die Genehmigung vollständig vor.",
  service_4_title: "Botschaftstermine",
  service_4_desc: "Wir organisieren die Termine bei der Deutschen Botschaft in Usbekistan.",
  service_5_title: "Reise- und Krankenversicherung",
  service_5_desc: "Über unseren Versicherungspartner reisen alle Kandidaten abgesichert ein.",
  service_6_title: "Einreise und Visum",
  service_6_desc: "Wir organisieren den gesamten Visa- und Einreiseprozess.",
  service_7_title: "Integration vor Ort",
  service_7_desc: "Bankkonto, Wohnungssuche und laufende Betreuung nach der Ankunft.",
  process_label: "Prozess",
  emp_process_title: "In fünf Schritten zur Fachkraft",
  emp_step_1_title: "Analyse Ihres Personalbedarfs",
  emp_step_1_desc:
    "Im ersten Gespräch bestimmen wir Ihren Personalbedarf und die passende Zeitachse.",
  emp_step_2_title: "Anforderungsprofile",
  emp_step_2_desc:
    "Wir legen gemeinsam fest, welche Arbeitserfahrung und Sprachkenntnisse Ihre zukünftigen Mitarbeiter mitbringen müssen.",
  emp_step_3_title: "Gespräche, Sprachausbildung, Anerkennung",
  emp_step_3_desc:
    "Wir stellen Ihnen die ersten Kandidaten vor, starten den fachspezifischen Sprachkurs und leiten die berufliche Anerkennung in Deutschland ein.",
  emp_step_4_title: "Visum und Einreise",
  emp_step_4_desc:
    "Wir organisieren Botschaftstermine und Einreise und unterstützen alle Beteiligten bei bürokratischen Prozessen.",
  emp_step_5_title: "Betreuung und Integration",
  emp_step_5_desc:
    "Wir unterstützen Sie und Ihre neuen Fachkräfte beim Onboarding und bei der Integration vor Ort.",
  why_label: "Zusammenarbeit",
  why_title: "Worauf Sie sich verlassen können",
  why_1_title: "Weniger Verwaltung",
  why_1_desc:
    "Von den Unterlagen für Anerkennungsstellen und Botschaften bis zu Aufenthaltsstatus und Arbeitserlaubnis – wir übernehmen den formellen Prozess.",
  why_2_title: "Passende Kandidaten",
  why_2_desc:
    "Jede Bewerbung durchläuft unser mehrstufiges Assessment. Sie entscheiden auf Basis Ihrer eigenen Kriterien.",
  why_3_title: "Partnerschaft auf Augenhöhe",
  why_3_desc:
    "Internationale Rekrutierung bringt Fragen mit sich. Wir erarbeiten Lösungen gemeinsam – und langfristig.",

  // Jobseekers
  job_kicker: "Für Arbeitssuchende",
  job_title: "Ihr Weg zur Arbeit in *Deutschland.*",
  job_lead:
    "Wir vermitteln Fachkräfte und Auszubildende aus Usbekistan an geprüfte deutsche Arbeitgeber – und begleiten Sie von der Bewerbung bis zum ersten Arbeitstag.",
  offer_label: "Ihr Vorteil",
  offer_title: "Was Sie von uns bekommen",
  offer_1_title: "Geprüfte Stellen",
  offer_1_desc: "Stellenangebote von Arbeitgebern, die wir kennen und geprüft haben.",
  offer_2_title: "Sprache und Vorbereitung",
  offer_2_desc: "Deutschkurs mit dem Ziel B1+ und Vorbereitung auf Beruf und Alltag.",
  offer_3_title: "Begleitung bis zur Ankunft",
  offer_3_desc: "Hilfe bei Dokumenten, Visum, Versicherung, Bankkonto und Wohnung.",
  job_process_title: "Sechs Schritte bis zum Arbeitsbeginn",
  job_step_1_title: "Bewerbung einreichen",
  job_step_1_desc: "Sie senden uns Lebenslauf und Basisdaten.",
  job_step_2_title: "Internes Gespräch",
  job_step_2_desc: "Erstes Gespräch mit unseren Spezialisten.",
  job_step_3_title: "Gespräch mit dem Arbeitgeber",
  job_step_3_desc: "Fachliches Interview mit Ihrem zukünftigen Arbeitgeber.",
  job_step_4_title: "Unterlagen vorbereiten",
  job_step_4_desc: "Vertrag, Genehmigungen und weitere Dokumente.",
  job_step_5_title: "Visum und Reise",
  job_step_5_desc: "Visum, Flug und Umzugsplanung.",
  job_step_6_title: "Arbeitsaufnahme",
  job_step_6_desc: "Ankommen und Unterstützung bei der Einarbeitung.",

  // About
  about_kicker: "Über uns",
  about_title: "Menschen verbinden, *Zukunft gestalten.*",
  about_lead:
    "Wir sind ein internationales Unternehmen, spezialisiert auf die Rekrutierung und Integration ausländischer Fachkräfte und Auszubildender.",
  story_label: "Mission",
  story_title: "Warum es uns gibt",
  story_p1:
    "Der Fachkräftemangel ist eine der größten Herausforderungen für Unternehmen – für Aufträge, Wachstum und eine stabile Zukunftsplanung.",
  story_p2:
    "Unser Team hat mehrjährige Erfahrung in der internationalen Personalgewinnung. Wir wissen, wie Sie dauerhaft Personal gewinnen und alle Beteiligten zu Gewinnern machen.",
  values_label: "Werte",
  values_title: "Was uns antreibt",
  value_1_title: "Ganzheitliche Begleitung",
  value_1_desc:
    "Wir analysieren Ihren Bedarf, wählen Kandidaten gezielt aus und bereiten sie sprachlich wie fachlich vor.",
  value_2_title: "Verlässliche Prozesse",
  value_2_desc:
    "Von Behördenwegen bis zu Visa-Terminen – wir managen Formalitäten transparent und termingerecht.",
  value_3_title: "Partnerschaften auf Augenhöhe",
  value_3_desc:
    "Wir schaffen langfristige Bindungen – für Unternehmen wie für internationale Fachkräfte.",
  compliance_label: "Compliance",
  compliance_title: "Regeln, an die wir uns halten",
  compliance_1_title: "Arbeitsrecht",
  compliance_1_desc:
    "Wir halten die geltenden Arbeitsnormen ein: legale Anstellung, faire Verträge und transparente Bedingungen.",
  compliance_2_title: "Visabestimmungen",
  compliance_2_desc:
    "Unterlagen bereiten wir nach den Vorgaben von Botschaft und Konsulat vor: Genehmigungen, Visa und Reisedokumente.",
  compliance_3_title: "Datenschutz",
  compliance_3_desc:
    "Personenbezogene Daten verarbeiten wir verantwortungsvoll, gesichert und nur so lange wie nötig.",
  compliance_4_title: "Chancengleichheit",
  compliance_4_desc:
    "Gleiche Chancen ohne Benachteiligung nach Geschlecht, Alter, Herkunft, Religion oder Behinderung.",
  compliance_5_title: "Ethik",
  compliance_5_desc: "Transparenz, Korruptionsbekämpfung und Achtung der Menschenrechte.",

  // Contact
  contact_kicker: "Kontakt",
  contact_title: "Lassen Sie uns *sprechen.*",
  contact_lead:
    "Ob Fragen, Anregungen oder Kooperation – wir sind für Sie da. Wir antworten innerhalb von 2–3 Werktagen.",
  contact_phone: "Telefon",
  contact_email: "E-Mail",
  contact_address: "Adresse",
  contact_hours_label: "Geschäftszeiten",
  contact_hours_value: "Montag–Freitag, 09:00–18:00 (CET)",
  contact_follow: "Folgen Sie uns",
  form_title: "Nachricht senden",
  form_role_label: "Anliegen als",
  form_role_select: "— Auswählen —",
  form_role_employer: "Arbeitgeber",
  form_role_jobseeker: "Arbeitssuchende/r",
  form_name: "Name",
  form_email: "E-Mail",
  form_phone: "Telefon",
  form_optional: "optional",
  form_message: "Nachricht",
  form_submit: "Senden",
  form_sending: "Wird gesendet…",
  form_success: "Ihre Nachricht wurde gesendet. Wir melden uns innerhalb von 2–3 Werktagen.",
  form_error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
  error_name: "Bitte geben Sie Ihren Namen ein.",
  error_email: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
  error_phone: "Bitte geben Sie eine gültige Telefonnummer ein.",
  error_message: "Die Nachricht muss mindestens 10 Zeichen lang sein.",
  modal_title: "Kostenlose Beratung",
  modal_desc: "Hinterlassen Sie Ihre Nummer – wir rufen Sie innerhalb von 2–3 Werktagen zurück.",

  // 404
  notfound_title: "Seite nicht *gefunden.*",
  notfound_desc: "Die angeforderte Seite existiert nicht oder wurde verschoben.",
  back_home: "Zur Startseite",
} as const;

export type MessageKey = keyof typeof de;

const uz: Record<MessageKey, string> = {
  // Shell
  skip_link: "Asosiy kontentga o'tish",
  nav_home_aria: "ConsultingUZ bosh sahifa",
  nav_employers: "Ish beruvchilar",
  nav_jobseekers: "Ish izlovchilar",
  nav_about: "Biz haqimizda",
  nav_contact: "Aloqa",
  nav_privacy: "Maxfiylik siyosati",
  nav_imprint: "Kompaniya ma'lumotlari",
  nav_cookie_settings: "Cookie sozlamalari",
  nav_cta: "Maslahat",
  nav_menu: "Menyu",
  nav_close: "Yopish",
  lang_switch: "Til",
  route_label: "O'zbekiston → Germaniya",
  footer_tagline:
    "Xalqaro kadrlar agentligi: O'zbekistondan Germaniya kompaniyalari uchun mutaxassislar va shogirdlar.",
  footer_pages: "Sahifalar",
  footer_legal: "Huquqiy ma'lumot",
  footer_socials: "Ijtimoiy tarmoqlar",
  footer_rights: "Barcha huquqlar himoyalangan.",

  // Cookie consent modal
  cookie_modal_title: "Maxfiylik sozlamalari",
  cookie_modal_subtitle:
    "Bu vosita saytdagi turli teglar / trekerlar / tahlil vositalarini tanlash va o'chirishga yordam beradi.",
  cookie_essential_label: "Zaruriy",
  cookie_essential_desc: "Saytning asosiy funksiyalari ishlashi uchun zarur texnologiyalar.",
  cookie_functional_label: "Funksional",
  cookie_functional_desc:
    "Sayt foydalanilishini tahlil qilib, samaradorlikni o'lchash va yaxshilash uchun ishlatiladi.",
  cookie_marketing_label: "Marketing",
  cookie_marketing_desc:
    "Sizning qiziqishlaringizga mos reklamalarni ko'rsatish uchun reklama beruvchilar tomonidan ishlatiladi.",
  cookie_accept_all: "Hammasini qabul qilish",
  cookie_save_settings: "Sozlamalarni saqlash",

  // Stats
  stat_years: "yillik tajriba",
  stat_partners: "hamkor",
  stat_placed: "joylashgan mutaxassis",
  stat_satisfaction: "qoniqish darajasi",

  // Images
  img_registan_alt: "Samarqanddagi Registon maydoni, O'zbekiston",
  img_frankfurt_alt: "Frankfurt-Mayn shahri manzarasi",
  img_welder_alt: "Ustaxonada ishlayotgan payvandchi",

  // Home
  home_kicker: "Xalqaro kadrlar tanlovi",
  home_title: "Kelib, *qoladigan* mutaxassis\u00ADlar.",
  home_lead:
    "Kompaniyangiz uchun O'zbekistondan malakali mutaxassis va shogirdlarni topamiz — tanlov, til o'qitish, viza va integratsiya bir qo'ldan.",
  hero_cta_employers: "Menga xodimlar kerak",
  hero_cta_jobseekers: "Men ish izlayman",

  paths_label: "Ikki yo'l",
  paths_title: "Kimlar uchun ishlaymiz",
  path_emp_desc:
    "Siz ehtiyojni aytasiz. Biz til, kasb va hujjat jihatdan tayyor mutaxassislarni yetkazamiz.",
  path_emp_1: "Sizning mezonlaringiz bo'yicha tanlov",
  path_emp_2: "Kelganda B1+ til darajasi",
  path_emp_3: "Kelgandan keyin ham hamrohlik",
  path_emp_link: "Ish beruvchilar uchun xizmatlar",
  path_job_desc:
    "Sizda kasb va ishtiyoq bor. Biz Germaniyadagi birinchi ish kuningizgacha hamrohlik qilamiz.",
  path_job_1: "Germaniya ish beruvchilaridan tekshirilgan ish o'rinlari",
  path_job_2: "Nemis tili kursi va tayyorgarlik",
  path_job_3: "Viza, safar va joylashishda yordam",
  path_job_link: "Germaniyaga yo'lingiz",

  modules_label: "Hammasi bir qo'ldan",
  modules_title: "Bitta model, to'rtta modul",
  modules_intro:
    "Modulli modelimiz sizga moslashuvchanlik va rejalashtirish imkonini beradi. Masalan, xodimlaringiz qaysi til darajasi bilan kelishini o'zingiz belgilaysiz.",
  module_1_title: "Ehtiyojni aniqlash",
  module_1_desc: "Birgalikda rollar, zarur ko'nikmalar va til darajalarini aniqlab olamiz.",
  module_2_title: "Til va kasbiy tayyorgarlik",
  module_2_desc: "Intensiv kurslar nomzodlarni B1+ darajasiga va soha terminlariga tayyorlaydi.",
  module_3_title: "Viza va malakani tan olish",
  module_3_desc:
    "Elchixona, idoralar va tan olish tashkilotlari bilan uchrashuvlarni muvofiqlashtiramiz.",
  module_4_title: "Kelish va moslashish",
  module_4_desc:
    "Uy-joy topishdan bank hisobi ochishgacha — Germaniyadagi dastlabki qadamlarni yengillashtiramiz.",

  founder_label: "Asoschi",
  founder_quote:
    "Biz kompaniyalarga to'liq «xavotirsiz» paketni taklif qilamiz — til va kasbiy tayyorgarlikdan tortib Germaniyaga kelgandan keyingi barqaror integratsiyagacha.",
  founder_role: "Asoschi va bosh direktor",
  founder_alt: "Asoschi va bosh direktor Orif Akhmadaliev portreti",

  sectors_label: "Sohalar",
  sectors_title: "Mutaxassislarimiz qayerda ishlaydi",
  sector_1: "Sog'liqni saqlash",
  sector_2: "Ijtimoiy soha",
  sector_3: "Turizm",
  sector_4: "Transport va logistika",
  sector_5: "Sanoat va hunarmandchilik",

  cta_title: "Ehtiyojingiz haqida *gaplashaylik.*",
  cta_desc: "Majburiyatsiz va aniq. 2–3 ish kuni ichida siz bilan bog'lanamiz.",
  cta_button: "Bepul maslahat olish",
  cta_contact: "Aloqa sahifasiga",

  // Employers
  emp_kicker: "Ish beruvchilar uchun",
  emp_title: "Kadrlar bo'limingiz yukini *yengil\u00ADlashtiramiz.*",
  emp_lead:
    "To'g'ri tanlov — faqat birinchi qadam. Kelishdan oldingi va keyingi barcha bosqichlarni o'z zimmamizga olamiz — yangi xodimlar jamoangizning uzoq muddatli a'zosiga aylanishi uchun.",
  services_label: "Xizmatlar",
  services_title: "Bizdan aniq nima kutish mumkin",
  service_1_title: "Tanlov va dastlabki suhbatlar",
  service_1_desc:
    "Ko'p bosqichli baholash va profil tuzish. Yakuniy tanlovni o'z mezonlaringiz bo'yicha siz qilasiz.",
  service_2_title: "Til o'qitish",
  service_2_desc: "Nomzodlar Germaniyaga B1+ daraja bilan kelishi uchun puxta nemis tili kursi.",
  service_3_title: "Germaniya Mehnat agentligi uchun hujjatlar",
  service_3_desc: "Ruxsat olish uchun barcha hujjatlarni to'liq tayyorlaymiz.",
  service_4_title: "Elchixona uchrashuvlari",
  service_4_desc: "Germaniyaning O'zbekistondagi elchixonasida uchrashuvlarni tashkil qilamiz.",
  service_5_title: "Safar va tibbiy sug'urta",
  service_5_desc: "Sug'urta hamkorimiz orqali barcha nomzodlar sug'urta bilan keladi.",
  service_6_title: "Kirib kelish va viza",
  service_6_desc: "Viza va kirib kelish jarayonini to'liq tashkil qilamiz.",
  service_7_title: "Joyida integratsiya",
  service_7_desc: "Bank hisobi, uy-joy izlash va kelgandan keyingi doimiy ko'mak.",
  process_label: "Jarayon",
  emp_process_title: "Mutaxassisgacha besh qadam",
  emp_step_1_title: "Kadrlar ehtiyojini tahlil qilish",
  emp_step_1_desc: "Birinchi suhbatda kadrlar ehtiyojingiz va mos vaqt jadvalini aniqlaymiz.",
  emp_step_2_title: "Talab profillari",
  emp_step_2_desc:
    "Bo'lajak xodimlaringiz qanday ish tajribasi va til ko'nikmalariga ega bo'lishi kerakligini birgalikda belgilaymiz.",
  emp_step_3_title: "Suhbatlar, til o'qitish, malakani tan olish",
  emp_step_3_desc:
    "Dastlabki nomzodlarni tanishtiramiz, soha bo'yicha til kursini boshlaymiz va Germaniyada kasbiy malakani tan olish jarayonini yo'lga qo'yamiz.",
  emp_step_4_title: "Viza va kirib kelish",
  emp_step_4_desc:
    "Elchixona uchrashuvlari va safarni tashkil qilamiz, byurokratik jarayonlarda barcha tomonlarga yordam beramiz.",
  emp_step_5_title: "Qo'llab-quvvatlash va integratsiya",
  emp_step_5_desc:
    "Onboarding hamda joyida moslashuvda sizni va yangi mutaxassislaringizni qo'llab-quvvatlaymiz.",
  why_label: "Hamkorlik",
  why_title: "Nimaga ishonishingiz mumkin",
  why_1_title: "Kamroq qog'ozbozlik",
  why_1_desc:
    "Tan olish idoralari va elchixonalar uchun hujjatlardan tortib yashash va ishlash ruxsatnomasigacha — rasmiy jarayonni biz olib boramiz.",
  why_2_title: "Mos nomzodlar",
  why_2_desc:
    "Har bir ariza ko'p bosqichli baholashdan o'tadi. Qarorni o'z mezonlaringiz asosida siz qabul qilasiz.",
  why_3_title: "Teng huquqli hamkorlik",
  why_3_desc:
    "Xalqaro yollashda savollar tug'iladi. Yechimlarni birgalikda va uzoq muddatga ishlab chiqamiz.",

  // Jobseekers
  job_kicker: "Ish izlovchilar uchun",
  job_title: "*Germaniyada* ishlash yo'lingiz.",
  job_lead:
    "O'zbekistonlik mutaxassis va shogirdlarni tekshirilgan nemis ish beruvchilariga joylashtiramiz — arizadan birinchi ish kunigacha hamrohlik qilamiz.",
  offer_label: "Sizga foyda",
  offer_title: "Bizdan nima olasiz",
  offer_1_title: "Tekshirilgan ish o'rinlari",
  offer_1_desc: "Biz taniydigan va tekshirgan ish beruvchilarning ish o'rinlari.",
  offer_2_title: "Til va tayyorgarlik",
  offer_2_desc: "B1+ darajani ko'zlagan nemis tili kursi, kasb va kundalik hayotga tayyorgarlik.",
  offer_3_title: "Yetib borguncha hamrohlik",
  offer_3_desc: "Hujjatlar, viza, sug'urta, bank hisobi va uy-joy bo'yicha yordam.",
  job_process_title: "Ish boshlashgacha olti qadam",
  job_step_1_title: "Ariza topshirish",
  job_step_1_desc: "CV va asosiy ma'lumotlaringizni yuborasiz.",
  job_step_2_title: "Ichki suhbat",
  job_step_2_desc: "Mutaxassislarimiz bilan dastlabki suhbat.",
  job_step_3_title: "Ish beruvchi bilan suhbat",
  job_step_3_desc: "Bo'lajak ish beruvchingiz bilan kasbiy suhbat.",
  job_step_4_title: "Hujjatlarni tayyorlash",
  job_step_4_desc: "Shartnoma, ruxsatnoma va boshqa hujjatlar.",
  job_step_5_title: "Viza va safar",
  job_step_5_desc: "Viza olish, parvoz va ko'chish rejalari.",
  job_step_6_title: "Ishga joylashuv",
  job_step_6_desc: "Yetib borish va ishga moslashishda ko'mak.",

  // About
  about_kicker: "Biz haqimizda",
  about_title: "Insonlarni bog'laymiz, *kelajakni quramiz.*",
  about_lead:
    "Biz xorijlik mutaxassis va shogirdlarni yollash hamda integratsiya qilishga ixtisoslashgan xalqaro kompaniyamiz.",
  story_label: "Missiya",
  story_title: "Nega biz bormiz",
  story_p1:
    "Malakali kadrlar yetishmasligi — kompaniyalar uchun eng katta muammolardan biri: buyurtmalar, o'sish va barqaror rejalashtirish shunga bog'liq.",
  story_p2:
    "Jamoamiz xalqaro kadrlar yollashda ko'p yillik tajribaga ega. Kadrlarni uzoq muddatga qanday jalb qilishni va barcha tomonlar yutishini bilamiz.",
  values_label: "Qadriyatlar",
  values_title: "Bizni nima harakatlantiradi",
  value_1_title: "To'liq hamrohlik",
  value_1_desc:
    "Kadr ehtiyojingizni o'rganib, mos nomzodlarni tanlaymiz va ularni til hamda kasbiy jihatdan tayyorlaymiz.",
  value_2_title: "Ishonchli jarayonlar",
  value_2_desc:
    "Idoralar bilan yozishmalardan viza uchrashuvlarigacha — rasmiy jarayonlarni shaffof va o'z vaqtida olib boramiz.",
  value_3_title: "Teng huquqli hamkorlik",
  value_3_desc:
    "Kompaniyalar uchun ham, xalqaro mutaxassislar uchun ham uzoq muddatli aloqalar o'rnatamiz.",
  compliance_label: "Muvofiqlik",
  compliance_title: "Biz amal qiladigan qoidalar",
  compliance_1_title: "Mehnat qonunchiligi",
  compliance_1_desc:
    "Amaldagi mehnat me'yorlariga rioya qilamiz: qonuniy yollash, adolatli shartnomalar va shaffof shartlar.",
  compliance_2_title: "Viza qoidalari",
  compliance_2_desc:
    "Hujjatlar elchixona va konsullik talablari asosida tayyorlanadi: ruxsatnomalar, vizalar va safar hujjatlari.",
  compliance_3_title: "Ma'lumotlar himoyasi",
  compliance_3_desc:
    "Shaxsiy ma'lumotlar mas'uliyat bilan, xavfsiz va faqat zarur muddat davomida qayta ishlanadi.",
  compliance_4_title: "Teng imkoniyatlar",
  compliance_4_desc:
    "Jins, yosh, millat, din yoki nogironlik bo'yicha kamsitishsiz teng imkoniyatlar.",
  compliance_5_title: "Etika",
  compliance_5_desc: "Shaffoflik, korrupsiyaga qarshi kurash va inson huquqlariga hurmat.",

  // Contact
  contact_kicker: "Aloqa",
  contact_title: "Keling, *gaplashamiz.*",
  contact_lead:
    "Savol, taklif yoki hamkorlik bo'yicha — biz doim tayyormiz. 2–3 ish kuni ichida javob beramiz.",
  contact_phone: "Telefon",
  contact_email: "Email",
  contact_address: "Manzil",
  contact_hours_label: "Ish vaqti",
  contact_hours_value: "Dushanba–Juma, 09:00–18:00 (CET)",
  contact_follow: "Bizni kuzating",
  form_title: "Xabar yuborish",
  form_role_label: "Murojaat sifati",
  form_role_select: "— Tanlang —",
  form_role_employer: "Ish beruvchi",
  form_role_jobseeker: "Ish izlovchi",
  form_name: "Ism",
  form_email: "Email",
  form_phone: "Telefon",
  form_optional: "ixtiyoriy",
  form_message: "Xabar",
  form_submit: "Yuborish",
  form_sending: "Yuborilmoqda…",
  form_success: "Xabaringiz yuborildi. 2–3 ish kuni ichida siz bilan bog'lanamiz.",
  form_error: "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
  error_name: "Iltimos, ismingizni kiriting.",
  error_email: "Iltimos, to'g'ri email kiriting.",
  error_phone: "Iltimos, to'g'ri telefon raqam kiriting.",
  error_message: "Xabar kamida 10 ta belgidan iborat bo'lishi kerak.",
  modal_title: "Bepul maslahat",
  modal_desc: "Raqamingizni qoldiring — 2–3 ish kuni ichida sizga qo'ng'iroq qilamiz.",

  // 404
  notfound_title: "Sahifa *topilmadi.*",
  notfound_desc: "So'ralgan sahifa mavjud emas yoki ko'chirilgan.",
  back_home: "Bosh sahifaga",
};

const MESSAGES: Record<LanguageCode, Record<MessageKey, string>> = { de, uz };

interface I18nContextValue {
  lang: LanguageCode;
  t: (key: MessageKey) => string;
  setLang: (lang: LanguageCode) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>("de");

  useEffect(() => {
    const stored = window.localStorage.getItem("lang");
    if (stored === "uz" || stored === "de") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      t: (key) => MESSAGES[lang][key],
      setLang: (next) => {
        setLangState(next);
        window.localStorage.setItem("lang", next);
      },
    }),
    [lang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within TranslationProvider");
  return ctx;
}
