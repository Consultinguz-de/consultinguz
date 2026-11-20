import MissionContent from "./MissionContent";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Über uns",
  description:
    "ConsultingUZ ist spezialisiert auf die Rekrutierung und Integration von Fachkräften und Auszubildenden aus Usbekistan – Mission, Werte und Compliance.",
  path: "/about/mission",
});

export default function Page() {
  return <MissionContent />;
}
