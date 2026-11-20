import { PageHero } from "@/components/blocks";
import { COMPANY, COMPANY_ADDRESS } from "@/data";

type Labels = {
  label_company: string;
  label_address: string;
  label_email: string;
  label_phone: string;
};

/** Shared layout of the legal pages: company card on the left, numbered topics on the right. */
export default function LegalPage({
  kicker,
  title,
  lead,
  cardTitle,
  cardIntro,
  labels,
  topics,
  disclaimer,
}: {
  kicker: string;
  title: string;
  lead: string;
  cardTitle: string;
  cardIntro: string;
  labels: Labels;
  topics: Array<{ title: string; body: React.ReactNode }>;
  disclaimer: string;
}) {
  const rows = [
    { label: labels.label_company, value: COMPANY.name },
    { label: labels.label_address, value: COMPANY_ADDRESS },
    {
      label: labels.label_email,
      value: (
        <a href={`mailto:${COMPANY.email}`} className="break-all underline underline-offset-4">
          {COMPANY.email}
        </a>
      ),
    },
    {
      label: labels.label_phone,
      value: (
        <a
          href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
          className="underline underline-offset-4"
        >
          {COMPANY.phone}
        </a>
      ),
    },
  ];

  return (
    <>
      <PageHero kicker={kicker} title={title} lead={lead} />

      <section className="container-x grid gap-10 py-10 lg:grid-cols-12 lg:py-16">
        <aside className="lg:col-span-4">
          <div className="border bg-paper p-6 lg:sticky lg:top-24">
            <h2 className="text-2xl">{cardTitle}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{cardIntro}</p>
            <dl className="mt-5 border-t">
              {rows.map((row) => (
                <div key={row.label} className="grid gap-1 border-b py-3">
                  <dt className="label text-muted-foreground">{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>

        <div className="lg:col-span-8">
          <ol className="border-t">
            {topics.map((topic, i) => (
              <li key={topic.title} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b py-6">
                <span className="label pt-1.5">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="text-2xl">{topic.title}</h2>
                  <div className="mt-3 max-w-2xl text-muted-foreground">{topic.body}</div>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-muted-foreground">{disclaimer}</p>
        </div>
      </section>
    </>
  );
}
