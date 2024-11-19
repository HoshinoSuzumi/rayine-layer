import module from "../src/module";
import defaultTheme from "tailwindcss/defaultTheme";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  modules: ["@nuxt/content", "@nuxt/fonts", "@nuxtjs/color-mode", module],
  devtools: { enabled: true },
  rayui: {
    // @ts-ignore
    globalComponents: true,
    safeColors: ["amber", "emerald", "red", "sky", "violet", "cyan"],
  },
  routeRules: {
    "/components": { redirect: "/components/button" },
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
  colorMode: {
    preference: "system",
    classSuffix: "",
  },
  content: {
    highlight: {
      langs: ["postcss", "mdc", "html", "vue", "ts", "js"],
    },
  },
  mdc: {
    highlight: {
      theme: {
        light: "material-theme-lighter",
        dark: "material-theme",
      },
      themes: ["material-theme-lighter", "material-theme"],
    },
  },
  typescript: {
    includeWorkspace: true,
  },
});
