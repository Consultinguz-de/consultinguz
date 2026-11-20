"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { useCookieConsent } from "@/components/providers/cookie-consent-provider";
import { useI18n } from "@/components/providers/translation-provider";
import { COMPANY, SOCIALS } from "@/data";

const PAGES = [
  { href: "/services/employers", key: "nav_employers" },
  { href: "/services/jobseekers", key: "nav_jobseekers" },
  { href: "/about/mission", key: "nav_about" },
  { href: "/contact", key: "nav_contact" },
] as const;

const LEGAL = [
  { href: "/impressum", key: "nav_imprint" },
  { href: "/datenschutz", key: "nav_privacy" },
] as const;

const linkClass = "inline-block py-1.5 underline-offset-4 hover:text-accent hover:underline";

export default function Footer() {
  const { t } = useI18n();
  const { openModal } = useCookieConsent();

  return (
    <footer className="bg-foreground text-background">
      <div className="container-x">
        <p
          aria-hidden
          className="display py-10 text-[clamp(2.75rem,15vw,13rem)] normal-case lg:py-14"
        >
          consultinguz
        </p>

        <div className="grid gap-10 border-t border-background/30 py-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="max-w-sm text-background/80">{t("footer_tagline")}</p>
            <address className="mt-6 not-italic">
              {COMPANY.street}, {COMPANY.postalCode} {COMPANY.city}
              <br />
              <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className={linkClass}>
                {COMPANY.phone}
              </a>
              <br />
              <a href={`mailto:${COMPANY.email}`} className={`${linkClass} break-all`}>
                {COMPANY.email}
              </a>
            </address>
          </div>

          <nav aria-label={t("footer_pages")} className="lg:col-span-2">
            <h2 className="label text-accent">{t("footer_pages")}</h2>
            <ul className="mt-4">
              {PAGES.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("footer_legal")} className="lg:col-span-3">
            <h2 className="label text-accent">{t("footer_legal")}</h2>
            <ul className="mt-4">
              {LEGAL.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {t(link.key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/about/mission#compliance" className={linkClass}>
                  Compliance
                </Link>
              </li>
              <li>
                <button type="button" onClick={openModal} className={linkClass}>
                  {t("nav_cookie_settings")}
                </button>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="label text-accent">{t("footer_socials")}</h2>
            <ul className="mt-4">
              {SOCIALS.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkClass} inline-flex items-center gap-1`}
                  >
                    {social.label}
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="label flex flex-col gap-2 border-t border-background/30 py-6 text-background/70 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. {t("footer_rights")}
          </p>
          <p>{t("route_label")}</p>
        </div>
      </div>
    </footer>
  );
}
