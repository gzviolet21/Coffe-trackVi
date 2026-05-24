import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: "#FDF8F0", dark: "#F0E6D3" },
        espresso: { DEFAULT: "#2C1810", light: "#4A2C1A" },
        terracotta: { DEFAULT: "#C4622D", light: "#D4835A", dark: "#A0501F" },
        sage: { DEFAULT: "#6B7F5E", light: "#8B9E7C" },
        honey: { DEFAULT: "#D4A853", light: "#E8C278" },
        muted: "#9B8576",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        accent: ["var(--font-caveat)", "cursive"],
      },
      boxShadow: {
        warm: "0 2px 16px rgba(44, 24, 16, 0.08)",
        "warm-md": "0 4px 24px rgba(44, 24, 16, 0.12)",
        "warm-lg": "0 8px 40px rgba(44, 24, 16, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
