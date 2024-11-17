import defaultTheme from "tailwindcss/defaultTheme";

export default defineNuxtConfig({
  extends: [".."],
  vite: {
    build: {
      rollupOptions: {
        external: ["shiki/wasm"],
      },
    },
  },
  modules: ["@nuxt/eslint", "@nuxt/fonts", "nuxt-shiki"],
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
  shiki: {
    bundledLangs: [
      "js",
      "ts",
      "json",
      "html",
      "css",
      "yaml",
      "vue",
      "vue-html",
      "sh",
    ],
    bundledThemes: [
      "light-plus",
      "dark-plus",
      "material-theme",
      "material-theme-lighter",
    ],
    highlightOptions: {
      themes: {
        light: "material-theme-lighter",
        dark: "material-theme",
      },
    },
  },
});
