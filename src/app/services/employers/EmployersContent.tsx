"use client";

import { ArrowLink, Cells, List, PageHero, Rows, Section, pairs } from "@/components/blocks";
import { ConsultButton, CtaBand } from "@/components/shared";
import { useI18n } from "@/components/providers/translation-provider";

export default function EmployersContent() {
  const { t } = useI18n();

  return (
    <>
      <PageHero
        kicker={t("emp_kicker")}
        title={t("emp_title")}
        lead={t("emp_lead")}
        image={{ src: "/images/welder.jpg", alt: t("img_welder_alt") }}
      >
        <ConsultButton />
        <ArrowLink href="#prozess">{t("emp_process_title")}</ArrowLink>
      </PageHero>

      <Section index="01" label={t("services_label")} title={t("services_title")}>
        <List items={pairs(t, "service", 7)} />
      </Section>

      <Section
        id="prozess"
        index="02"
        label={t("process_label")}
        title={t("emp_process_title")}
        tone="paper"
      >
        <Rows items={pairs(t, "emp_step", 5)} />
      </Section>

      <Section index="03" label={t("why_label")} title={t("why_title")}>
        <Cells items={pairs(t, "why", 3)} columns={3} />
      </Section>

      <CtaBand />
    </>
  );
}
