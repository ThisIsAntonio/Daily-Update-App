import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#000000",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide")
  ],
};

export default config;
