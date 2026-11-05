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
        marble: "#F7F3EA",
        travertine: "#EBE3D3",
        "stone-border": "#D8CDB8",
        charcoal: "#23221F",
        "warm-grey": "#6B665C",
        olive: "#3E4A2F",
        cypress: "#2A3321",
        brass: "#A8844B",
        terracotta: "#A9553A",
        sage: "#5E7A4A",
      },
      fontFamily: {
        serif: ["var(--font-bodoni)", "Bodoni Moda", "Georgia", "serif"],
        sans: ["var(--font-jost)", "Jost", "sans-serif"],
      },
      maxWidth: {
        container: "1280px",
      },
      letterSpacing: {
        eyebrow: "0.18em",
      },
      borderRadius: {
        sm: "2px",
        DEFAULT: "3px",
        md: "4px",
      },
    },
  },
  plugins: [],
};
export default config;
