// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2024-11-15",
  modules: ["@nuxtjs/tailwindcss"],
  components: [
    {
      path: "./components",
      prefix: "Ray",
      pathPrefix: false,
    },
    {
      path: "./components/icons",
      prefix: "Icon",
      pathPrefix: false,
    },
  ],
});
