"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Cells, Marked, Section, pairs } from "@/components/blocks";
import { CtaBand, Founder, Stats } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/providers/translation-provider";

const HERO_IMAGES = [
  { src: "/images/registan-2.jpg", alt: "img_registan_alt", tag: "UZ" },
  { src: "/images/frankfurt.jpg", alt: "img_frankfurt_alt", tag: "DE" },
] as const;

const PATHS = [
  {
    href: "/services/employers",
    title: "nav_employers",
    desc: "path_emp_desc",
    points: ["path_emp_1", "path_emp_2", "path_emp_3"],
    link: "path_emp_link",
  },
  {
    href: "/services/jobseekers",
    title: "nav_jobseekers",
    desc: "path_job_desc",
    points: ["path_job_1", "path_job_2", "path_job_3"],
    link: "path_job_link",
  },
] as const;

const SECTORS = ["sector_1", "sector_2", "sector_3", "sector_4", "sector_5"] as const;

export default function HomeContent() {
  const { t } = useI18n();

  return (
    <>
      <section className="border-b">
        <div className="container-x">
          <p className="label flex flex-wrap justify-between gap-x-6 gap-y-1 border-b py-3">
            <span>{t("home_kicker")}</span>
            <span>{t("route_label")}</span>
          </p>
          <div className="grid lg:grid-cols-12">
            <div className="py-10 sm:py-14 lg:col-span-7 lg:py-20 lg:pr-10">
              <h1 className="text-[clamp(2.25rem,11.5vw,5.5rem)] lg:text-[clamp(4.5rem,7.2vw,7rem)]">
                <Marked text={t("home_title")} />
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">{t("home_lead")}</p>
              <div className="mt-8 flex flex-col sm:flex-row">
                <Button asChild size="lg" className="justify-between">
                  <Link href="/services/employers">
                    {t("hero_cta_employers")}
                    <ArrowRight aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="-mt-px justify-between sm:mt-0 sm:-ml-px"
                >
                  <Link href="/services/jobseekers">
                    {t("hero_cta_jobseekers")}
                    <ArrowRight aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="-mx-4 grid grid-cols-2 border-t sm:-mx-6 lg:col-span-5 lg:mx-0 lg:grid-cols-1 lg:border-t-0 lg:border-l">
              {HERO_IMAGES.map((image) => (
                <div
                  key={image.src}
                  className="relative aspect-square not-first:border-l sm:aspect-[3/2] lg:aspect-auto lg:min-h-56 lg:not-first:border-t lg:not-first:border-l-0"
                >
                  <Image
                    src={image.src}
                    alt={t(image.alt)}
                    fill
                    priority
                    sizes="(min-width: 1024px) 42vw, 50vw"
                    className="object-cover grayscale"
                  />
                  <span className="label absolute bottom-0 left-0 bg-accent px-3 py-2">
                    {image.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t">
          <div className="container-x">
            <Stats />
          </div>
        </div>
      </section>

      <Section index="01" label={t("paths_label")} title={t("paths_title")}>
        <div className="reveal grid gap-px border bg-foreground md:grid-cols-2">
          {PATHS.map((path) => (
            <Link
              key={path.href}
              href={path.href}
              className="group flex flex-col bg-background p-6 transition-colors duration-150 hover:bg-accent lg:p-10"
            >
              <h3 className="text-[clamp(2rem,5vw,3.75rem)]">{t(path.title)}</h3>
              <p className="mt-4 max-w-md text-lg">{t(path.desc)}</p>
              <ul className="mt-8 border-t">
                {path.points.map((point) => (
                  <li key={point} className="border-b py-3">
                    {t(point)}
                  </li>
                ))}
              </ul>
              <span className="label mt-8 flex items-center justify-between gap-4 pt-2">
                {t(path.link)}
                <ArrowRight
                  className="size-5 transition-transform duration-150 group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section
        index="02"
        label={t("modules_label")}
        title={t("modules_title")}
        intro={t("modules_intro")}
        tone="paper"
      >
        <Cells items={pairs(t, "module", 4)} columns={4} />
      </Section>

      <Founder />

      <Section index="03" label={t("sectors_label")} title={t("sectors_title")}>
        <ul className="border-t">
          {SECTORS.map((sector, i) => (
            <li
              key={sector}
              className="reveal flex items-baseline gap-4 border-b py-4 transition-[padding,background-color] duration-150 hover:bg-accent hover:px-4 lg:gap-8 lg:py-6"
            >
              <span className="label w-8 shrink-0">0{i + 1}</span>
              <span className="display text-[clamp(1.75rem,6.5vw,4.5rem)]">{t(sector)}</span>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}
