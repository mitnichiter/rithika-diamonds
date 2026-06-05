import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brandNavy: "#020b16",
        brandHeader: "#021024",
        brandBlue: "#021637", // Elegant cobalt/sapphire blue replacing gold
        brandWhite: "#ffffff",
      },
    },
  },
  plugins: [],
};
export default config;
