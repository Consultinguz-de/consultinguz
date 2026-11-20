import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Routes removed in the redesign. Permanent, so search engines move the ranking.
  async redirects() {
    return [
      { source: "/services/process", destination: "/services/employers#prozess", permanent: true },
      { source: "/compliance", destination: "/about/mission#compliance", permanent: true },
      { source: "/about/team", destination: "/about/mission", permanent: true },
      { source: "/services/partners", destination: "/services/employers", permanent: true },
    ];
  },
};

export default nextConfig;
