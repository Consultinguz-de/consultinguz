"use client";

import { ArrowUpRight } from "lucide-react";

import ContactForm from "@/components/ContactForm";
import { PageHero } from "@/components/blocks";
import { useI18n } from "@/components/providers/translation-provider";
import { COMPANY, COMPANY_ADDRESS, SOCIALS } from "@/data";

const valueClass = "text-lg font-medium underline-offset-4 hover:underline";

export default function ContactClient() {
  const { t } = useI18n();

  const rows = [
    {
      label: t("contact_phone"),
      value: (
        <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className={valueClass}>
          {COMPANY.phone}
        </a>
      ),
    },
    {
      label: t("contact_email"),
      value: (
        <a href={`mailto:${COMPANY.email}`} className={`${valueClass} break-all`}>
          {COMPANY.email}
        </a>
      ),
    },
    { label: t("contact_address"), value: <span className="text-lg">{COMPANY_ADDRESS}</span> },
    {
      label: t("contact_hours_label"),
      value: <span className="text-lg">{t("contact_hours_value")}</span>,
    },
  ];

  return (
    <>
      <PageHero kicker={t("contact_kicker")} title={t("contact_title")} lead={t("contact_lead")} />

      <section className="container-x grid lg:grid-cols-12">
        <div className="py-10 lg:col-span-5 lg:py-16 lg:pr-10">
          <dl className="border-t">
            {rows.map((row) => (
              <div key={row.label} className="grid gap-1 border-b py-5">
                <dt className="label text-muted-foreground">{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="label mt-10">{t("contact_follow")}</h2>
          <ul className="mt-4 grid grid-cols-2 gap-px border bg-foreground">
            {SOCIALS.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label flex items-center justify-between gap-2 bg-background p-4 transition-colors hover:bg-accent"
                >
                  {social.label}
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="-mx-4 border-t bg-paper px-4 py-10 sm:-mx-6 sm:px-6 lg:col-span-7 lg:mx-0 lg:border-t-0 lg:border-l lg:p-16">
          <h2 className="mb-8 text-3xl lg:text-4xl">{t("form_title")}</h2>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
