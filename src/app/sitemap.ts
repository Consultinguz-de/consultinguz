import type { MetadataRoute } from "next";

import { SITE_URL } from "@/data";

const ROUTES = [
  { path: "", priority: 1 },
  { path: "/services/employers", priority: 0.9 },
  { path: "/services/jobseekers", priority: 0.9 },
  { path: "/about/mission", priority: 0.7 },
  { path: "/contact", priority: 0.7 },
  { path: "/impressum", priority: 0.2 },
  { path: "/datenschutz", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
