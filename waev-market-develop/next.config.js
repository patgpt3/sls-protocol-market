/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.w3.org"],
  },
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
