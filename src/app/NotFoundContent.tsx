"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageHero } from "@/components/blocks";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/providers/translation-provider";

export default function NotFoundContent() {
  const { t } = useI18n();
  return (
    <PageHero kicker="404" title={t("notfound_title")} lead={t("notfound_desc")}>
      <Button asChild size="lg">
        <Link href="/">
          {t("back_home")}
          <ArrowRight aria-hidden />
        </Link>
      </Button>
    </PageHero>
  );
}
