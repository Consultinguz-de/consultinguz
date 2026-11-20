import JobseekersContent from "./JobseekersContent";

export const metadata = {
  title: "Für Arbeitssuchende",
  description:
    "Arbeiten in Deutschland: geprüfte Stellen, Deutschkurs und Begleitung bei Visum, Reise und Ankunft – in sechs Schritten bis zum Arbeitsbeginn.",
  alternates: { canonical: "/services/jobseekers" },
};

export default function Page() {
  return <JobseekersContent />;
}
