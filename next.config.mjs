const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.GITHUB_PAGES === "true" ? "/dqweb" : "",
  assetPrefix: process.env.GITHUB_PAGES === "true" ? "/dqweb" : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.GITHUB_PAGES === "true" ? "/dqweb" : "",
  },
};

export default nextConfig;
