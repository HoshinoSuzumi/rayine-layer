import module from "../src/module";
import defaultTheme from "tailwindcss/defaultTheme";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  modules: ["@nuxt/content", "@nuxt/fonts", module],
  devtools: { enabled: true },
  rayui: {
    globalComponents: true,
    safeColors: ["amber", "emerald", "red", "sky", "violet", "cyan"],
  },
  tailwindcss: {
    config: {
      darkMode: "media",
      theme: {
        extend: {
          fontFamily: {
            sans: ["Rubik", '"Noto Sans SC"', ...defaultTheme.fontFamily.sans],
          },
        },
      },
    },
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
  typescript: {
    includeWorkspace: true,
  },
});
