"use client";

import { Cells, PageHero, Rows, Section, pairs } from "@/components/blocks";
import { ConsultButton, CtaBand } from "@/components/shared";
import { useI18n } from "@/components/providers/translation-provider";

export default function JobseekersContent() {
  const { t } = useI18n();

  return (
    <>
      <PageHero
        kicker={t("job_kicker")}
        title={t("job_title")}
        lead={t("job_lead")}
        image={{ src: "/images/frankfurt.jpg", alt: t("img_frankfurt_alt") }}
      >
        <ConsultButton />
      </PageHero>

      <Section index="01" label={t("offer_label")} title={t("offer_title")}>
        <Cells items={pairs(t, "offer", 3)} columns={3} />
      </Section>

      <Section index="02" label={t("process_label")} title={t("job_process_title")} tone="paper">
        <Rows items={pairs(t, "job_step", 6)} />
      </Section>

      <CtaBand />
    </>
  );
}
