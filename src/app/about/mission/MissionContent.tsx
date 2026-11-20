"use client";

import { Cells, List, PageHero, Section, pairs } from "@/components/blocks";
import { CtaBand, Founder, Stats } from "@/components/shared";
import { useI18n } from "@/components/providers/translation-provider";

export default function MissionContent() {
  const { t } = useI18n();

  return (
    <>
      <PageHero
        kicker={t("about_kicker")}
        title={t("about_title")}
        lead={t("about_lead")}
        image={{ src: "/images/registan.jpg", alt: t("img_registan_alt") }}
      />

      <Section index="01" label={t("story_label")} title={t("story_title")}>
        <div className="reveal grid gap-6 lg:grid-cols-12">
          <p className="text-xl lg:col-span-6 lg:col-start-4 lg:text-2xl">{t("story_p1")}</p>
          <p className="text-lg text-muted-foreground lg:col-span-6 lg:col-start-4">
            {t("story_p2")}
          </p>
        </div>
        <div className="mt-12 border-y lg:mt-16">
          <Stats />
        </div>
      </Section>

      <Section index="02" label={t("values_label")} title={t("values_title")} tone="paper">
        <Cells items={pairs(t, "value", 3)} columns={3} />
      </Section>

      <Founder />

      <Section
        id="compliance"
        index="03"
        label={t("compliance_label")}
        title={t("compliance_title")}
      >
        <List items={pairs(t, "compliance", 5)} />
      </Section>

      <CtaBand />
    </>
  );
}
