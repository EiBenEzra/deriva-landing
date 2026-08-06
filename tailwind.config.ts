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
        inm: {
          cream:        "#F5F0E6",
          "cream-warm": "#EDE3D2",
          graphite:     "#1A1A1A",
          navy:         "#0F1923",
          verde:        "#1A6B4A",
          dorado:       "#C8A84B",
          terracota:    "#C86B4A",
          stone:        "#D8D0C3",
        },
      },
      fontFamily: {
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        label:   ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
