import JobseekersContent from "./JobseekersContent";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Für Arbeitssuchende",
  description:
    "Arbeiten in Deutschland: geprüfte Stellen, Deutschkurs und Begleitung bei Visum, Reise und Ankunft – in sechs Schritten bis zum Arbeitsbeginn.",
  path: "/services/jobseekers",
});

export default function Page() {
  return <JobseekersContent />;
}
