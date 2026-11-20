import MissionContent from "./MissionContent";

export const metadata = {
  title: "Über uns",
  description:
    "ConsultingUZ ist spezialisiert auf die Rekrutierung und Integration von Fachkräften und Auszubildenden aus Usbekistan – Mission, Werte und Compliance.",
  alternates: { canonical: "/about/mission" },
};

export default function Page() {
  return <MissionContent />;
}
