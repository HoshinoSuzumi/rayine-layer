import module from "../src/module";
import defaultTheme from "tailwindcss/defaultTheme";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  modules: ["@nuxt/fonts", module],
  devtools: { enabled: true },
  rayui: {
    safeColors: ["amber", "emerald", "red", "sky", "violet", "cyan"],
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            sans: ["Rubik", '"Noto Sans SC"', ...defaultTheme.fontFamily.sans],
          },
        },
      },
    },
  },
});
