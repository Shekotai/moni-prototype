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
      colors: {
        /* Backgrounds — plain hex so Tailwind JIT generates them correctly */
        "bg-base":       "#0d0d0d",
        "bg-card":       "#1a1a1a",
        "bg-card-hover": "#222222",

        /* Borders */
        "border-default": "#2a2a2a",
        "border-light":   "#333333",

        /* Accent — hex lets Tailwind handle opacity modifiers automatically
           e.g. bg-accent/10 → rgb(124 92 245 / 0.1) */
        accent: {
          DEFAULT: "#7c5cf5",
          hover:   "#9370ff",
        },

        /* Status colors — hex for the same reason */
        "clr-green":  "#3bbe82",
        "clr-yellow": "#f0b428",
        "clr-red":    "#e05555",

        /* Text */
        "text-primary":   "#ffffff",
        "text-secondary": "#aaaaaa",
        "text-muted":     "#555555",
      },
    },
  },
  plugins: [],
};
export default config;
