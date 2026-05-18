import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [
      [
        "rehype-pretty-code",
        {
          defaultLang: {
            block: "tsx",
            inline: "plaintext",
          },
          keepBackground: false,
          theme: {
            dark: "github-dark",
            light: "github-light",
          },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
