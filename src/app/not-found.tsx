import NotFoundContent from "./NotFoundContent";

export const metadata = {
  title: "404 — Seite nicht gefunden",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundContent />;
}
