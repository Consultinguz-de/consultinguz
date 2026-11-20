"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Marked } from "@/components/blocks";
import { Button } from "@/components/ui/button";
import { useConsultation } from "@/components/providers/consultation-provider";
import { useI18n } from "@/components/providers/translation-provider";
import { COMPANY, STATS } from "@/data";

// Translated sections that appear on more than one page.

export function SkipLink() {
  const { t } = useI18n();
  return (
    <a
      href="#main"
      className="label sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-accent focus:px-4 focus:py-3"
    >
      {t("skip_link")}
    </a>
  );
}

export function ConsultButton({
  variant,
  className,
}: {
  variant?: React.ComponentProps<typeof Button>["variant"];
  className?: string;
}) {
  const { t } = useI18n();
  const { open } = useConsultation();
  return (
    <Button size="lg" variant={variant} onClick={open} className={className}>
      {t("cta_button")}
      <ArrowRight aria-hidden />
    </Button>
  );
}

export function Stats() {
  const { t } = useI18n();
  return (
    <dl className="grid grid-cols-2 lg:grid-cols-4">
      {STATS.map((stat) => (
        <div
          key={stat.key}
          className="flex flex-col-reverse gap-2 py-6 even:border-l even:pl-4 nth-[n+3]:border-t sm:even:pl-6 lg:py-8 lg:not-first:border-l lg:not-first:pl-6 lg:nth-[n+3]:border-t-0"
        >
          <dt className="label text-muted-foreground">{t(stat.key)}</dt>
          <dd className="display text-5xl sm:text-6xl lg:text-7xl">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Founder() {
  const { t } = useI18n();
  return (
    <section className="border-b bg-foreground text-background">
      <div className="container-x grid lg:grid-cols-12">
        <div className="relative -mx-4 aspect-[4/3] sm:-mx-6 lg:col-span-4 lg:mx-0 lg:aspect-auto lg:min-h-[32rem]">
          <Image
            src="/herr-orif.jpg"
            alt={t("founder_alt")}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover object-top grayscale"
          />
        </div>
        <figure className="reveal flex flex-col justify-between gap-10 py-12 lg:col-span-8 lg:py-20 lg:pl-12">
          <figcaption className="label text-accent">{t("founder_label")}</figcaption>
          <blockquote className="text-[clamp(1.5rem,3.4vw,2.75rem)] leading-[1.15] font-semibold [font-stretch:75%]">
            „{t("founder_quote")}“
          </blockquote>
          <p>
            <span className="display block text-2xl">{COMPANY.owner}</span>
            <span className="label mt-2 block text-background/70">{t("founder_role")}</span>
          </p>
        </figure>
      </div>
    </section>
  );
}

export function CtaBand() {
  const { t } = useI18n();
  return (
    <section className="bg-accent">
      <div className="container-x grid gap-8 py-14 sm:py-20 lg:grid-cols-12 lg:items-end lg:py-24">
        <div className="reveal lg:col-span-8">
          <h2 className="text-[clamp(2.25rem,8vw,5.5rem)] [&_.mark]:bg-foreground [&_.mark]:text-background">
            <Marked text={t("cta_title")} />
          </h2>
          <p className="mt-6 max-w-xl text-lg">{t("cta_desc")}</p>
        </div>
        <div className="flex flex-col gap-3 lg:col-span-4">
          <ConsultButton className="justify-between" />
          <Button asChild size="lg" variant="outline" className="justify-between bg-transparent">
            <Link href="/contact">
              {t("cta_contact")}
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
