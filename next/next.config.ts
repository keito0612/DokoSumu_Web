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
    if (modularizeImports?.["@headlessui/react"])
      delete modularizeImports["@headlessui/react"];
    return config;
  },
};

export default nextConfig;
