import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { MessageKey } from "@/components/providers/translation-provider";

// Presentational building blocks of the grid design system. They take already
// translated strings, so they work in both server and client components.

export type Item = { title: string; desc: string };

const pad = (n: number) => String(n).padStart(2, "0");

/** Collects `${prefix}_1_title` / `${prefix}_1_desc` … `${prefix}_${count}_*` from the dictionary. */
export function pairs(t: (key: MessageKey) => string, prefix: string, count: number): Item[] {
  return Array.from({ length: count }, (_, i) => ({
    title: t(`${prefix}_${i + 1}_title` as MessageKey),
    desc: t(`${prefix}_${i + 1}_desc` as MessageKey),
  }));
}

/** Renders "plain *highlighted* plain" with the starred part marked in gold. */
export function Marked({ text }: { text: string }) {
  return (
    <>
      {text.split("*").map((part, i) =>
        i % 2 ? (
          <span key={i} className="mark">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

export function PageHero({
  kicker,
  title,
  lead,
  image,
  children,
}: {
  kicker: string;
  title: string;
  lead: string;
  image?: { src: string; alt: string };
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b">
      <div className="container-x grid lg:grid-cols-12">
        <div
          className={cn(
            "py-10 sm:py-14 lg:py-20",
            image ? "lg:col-span-7 lg:pr-10" : "lg:col-span-10"
          )}
        >
          <p className="label">{kicker}</p>
          <h1 className="mt-5 text-[clamp(2rem,9.5vw,5rem)] lg:text-[clamp(3.5rem,6vw,5.5rem)]">
            <Marked text={title} />
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">{lead}</p>
          {children && (
            <div className="mt-8 flex flex-col gap-x-6 gap-y-4 sm:flex-row sm:items-center">
              {children}
            </div>
          )}
        </div>
        {image && (
          <div className="relative -mx-4 aspect-[3/2] border-t sm:-mx-6 lg:col-span-5 lg:mx-0 lg:aspect-auto lg:border-t-0 lg:border-l">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover grayscale"
            />
          </div>
        )}
      </div>
    </section>
  );
}

export function Section({
  index,
  label,
  title,
  intro,
  tone = "white",
  id,
  children,
}: {
  index: string;
  label: string;
  title: string;
  intro?: string;
  tone?: "white" | "paper";
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("border-b", tone === "paper" && "bg-paper")}>
      <div className="container-x py-14 sm:py-20 lg:py-24">
        <header className="reveal grid gap-4 lg:grid-cols-12">
          <p className="label flex gap-3 lg:col-span-3">
            <span>{index}</span>
            <span>{label}</span>
          </p>
          <div className="lg:col-span-9">
            <h2 className="text-[clamp(2rem,6vw,4rem)]">{title}</h2>
            {intro && <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
          </div>
        </header>
        <div className="mt-10 lg:mt-14">{children}</div>
      </div>
    </section>
  );
}

const CELL_COLUMNS = {
  3: "md:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

/** Bordered cells. Item count must fill the last row, or the grid lines show a black gap. */
export function Cells({ items, columns }: { items: Item[]; columns: keyof typeof CELL_COLUMNS }) {
  return (
    <ol className={cn("reveal grid gap-px border bg-foreground", CELL_COLUMNS[columns])}>
      {items.map((item, i) => (
        <li key={item.title} className="flex flex-col gap-8 bg-background p-6 lg:gap-14 lg:p-8">
          <span className="label">{pad(i + 1)}</span>
          <div>
            <h3 className="text-2xl lg:text-[1.75rem]">{item.title}</h3>
            <p className="mt-3 text-muted-foreground">{item.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Full-width numbered rows — for sequential steps. */
export function Rows({ items }: { items: Item[] }) {
  return (
    <ol className="border-t">
      {items.map((item, i) => (
        <li
          key={item.title}
          className="reveal grid grid-cols-[3.25rem_1fr] items-baseline gap-x-4 gap-y-2 border-b py-6 lg:grid-cols-12 lg:gap-x-6 lg:py-8"
        >
          <span className="display row-span-2 text-4xl lg:col-span-2 lg:row-span-1 lg:text-6xl">
            {pad(i + 1)}
          </span>
          <h3 className="text-2xl lg:col-span-4 lg:text-3xl">{item.title}</h3>
          <p className="col-start-2 text-muted-foreground lg:col-span-6 lg:col-start-auto">
            {item.desc}
          </p>
        </li>
      ))}
    </ol>
  );
}

/** Two-column list — for unordered sets of any length. */
export function List({ items }: { items: Item[] }) {
  return (
    <ul className="grid gap-x-10 md:grid-cols-2">
      {items.map((item, i) => (
        <li key={item.title} className="reveal flex gap-4 border-t py-5">
          <span className="label w-8 shrink-0 pt-1.5">{pad(i + 1)}</span>
          <div>
            <h3 className="text-xl lg:text-2xl">{item.title}</h3>
            <p className="mt-2 text-muted-foreground">{item.desc}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function ArrowLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "label inline-flex items-center gap-2 self-start border-b border-current pb-1 transition-[gap] duration-150 hover:gap-4",
        className
      )}
    >
      {children}
      <ArrowRight className="size-4" aria-hidden />
    </Link>
  );
}
