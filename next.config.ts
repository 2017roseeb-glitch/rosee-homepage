import type { NextConfig } from "next";

const githubPagesBasePath = "/rosee-homepage";
const isGitHubPagesBuild = process.env.GITHUB_PAGES === "1";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGitHubPagesBuild ? githubPagesBasePath : undefined,
  assetPrefix: isGitHubPagesBuild ? githubPagesBasePath : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPagesBuild ? githubPagesBasePath : "",
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
