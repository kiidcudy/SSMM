import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/blog/how-to-choose-the-cheapest-smm-panel",
        destination: "/blog/how-to-place-your-first-smm-panel-order",
        permanent: true,
      },
      {
        source: "/:locale/blog/how-to-choose-the-cheapest-smm-panel",
        destination: "/:locale/blog/how-to-place-your-first-smm-panel-order",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
