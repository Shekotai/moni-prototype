import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        "bg-base":       "#0a0a0a",
        "bg-card":       "#111111",
        "bg-card-hover": "#181818",

        "border-default": "#222222",
        "border-light":   "#2e2e2e",

        accent: {
          DEFAULT: "#7c5cf5",
          hover:   "#9370ff",
        },

        "clr-green":  "#3bbe82",
        "clr-yellow": "#f0b428",
        "clr-red":    "#e05555",

        "text-primary":   "#f0f0f0",
        "text-secondary": "#888888",
        "text-muted":     "#444444",
      },

    },
  },
  plugins: [],
};
export default config;
