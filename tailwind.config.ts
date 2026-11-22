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
        navy: {
          900: "#0b132b",
          800: "#0f172a",
          700: "#1e293b",
          600: "#334155",
        },
        brand: {
          orange: "#ea580c",
          "orange-light": "#f97316",
          "orange-dark": "#c2410c",
          red: "#dc2626",
          "red-light": "#ef4444",
          "red-dark": "#b91c1c",
        },
      },
    },
  },
  plugins: [],
};
export default config;
