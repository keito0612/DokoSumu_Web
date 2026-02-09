import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  webpack: (config) => {
    let modularizeImports = null;
    config.module.rules.some((rule: { oneOf: any[]; }) =>
      rule.oneOf?.some((oneOf: { use: { options: { nextConfig: { modularizeImports: any; }; }; }; }) => {
        modularizeImports =
          oneOf?.use?.options?.nextConfig?.modularizeImports;
        return modularizeImports;
      }),
    );
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: false, // 圧縮無効
          },
        },
      ],
    });
    if (modularizeImports?.["@headlessui/react"]) {
      delete modularizeImports["@headlessui/react"];
    }
    return config;
  },
  images: {
    disableStaticImages: true,
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30日間キャッシュ
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '**',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
