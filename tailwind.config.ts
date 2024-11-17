import { type Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{vue,js,ts,jsx,tsx}",
    "./ui.config/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [],
};

export default config;
