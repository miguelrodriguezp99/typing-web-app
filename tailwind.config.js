/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        "secondary-hover": "var(--color-secondary-hover)",
        tertiary: "var(--color-tertiary)",
        text: "var(--color-text)",
        iconstext: "var(--color-iconstext)",
        "iconstext-hover": "var(--color-iconstext-hover)",
        logo: "var(--color-logo)",
        selected: "var(--color-selected)",
        error: "var(--color-error)",
        randomwords: "var(--color-randomwords)",
      },
      screens: {
        mmd: "1050px",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
