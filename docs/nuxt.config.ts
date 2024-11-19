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
  components: [
    {
      path: "~/components",
      global: true,
    },
  ],
  content: {
    highlight: {
      langs: ["postcss", "mdc", "html", "vue", "ts", "js"],
    },
  },
  mdc: {
    highlight: {
      themes: ["material-theme-lighter", "material-theme", "light-plus", "dark-plus"],
    },
  },
  typescript: {
    includeWorkspace: true,
  },
});
