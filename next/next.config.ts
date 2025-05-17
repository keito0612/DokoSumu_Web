import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    disableStaticImages: true, // importした画像の型定義設定を無効にする
    remotePatterns: [{
      hostname: 'localhost',
      protocol: 'http',
      port: '',
    },]
  },
};

export default nextConfig;
