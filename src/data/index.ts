// Single source of truth for company facts. Used by the JSON-LD block, the
// contact page, the footer and the legal pages — change them here only.
export const COMPANY = {
  name: "ConsultingUZ",
  owner: "Orif Akhmadaliev",
  phone: "+49 176 238 97 113",
  email: "orif.ahmadaliyev@consultinguz.de",
  street: "Alemannenweg 6",
  postalCode: "72488",
  city: "Sigmaringen",
  country: "Deutschland",
} as const;

export const COMPANY_ADDRESS = `${COMPANY.street}, ${COMPANY.postalCode} ${COMPANY.city}, ${COMPANY.country}`;

export const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/consulting-uz-39b908297/" },
  { label: "Telegram", href: "https://t.me/Consulting_UZB" },
  { label: "Instagram", href: "https://www.instagram.com/consulting__uz/" },
  { label: "YouTube", href: "https://www.youtube.com/@consultingUz1" },
] as const;

export const STATS = [
  { value: "5+", key: "stat_years" },
  { value: "30+", key: "stat_partners" },
  { value: "800+", key: "stat_placed" },
  { value: "96%", key: "stat_satisfaction" },
] as const;
