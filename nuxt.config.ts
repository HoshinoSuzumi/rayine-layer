import { addTemplate, useNuxt } from "@nuxt/kit";
import { setColors } from "./utils/colors";
import { generateSafelist } from "./utils/colors";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2024-11-15",
  modules: ["@nuxtjs/tailwindcss"],
  hooks: {
    "tailwindcss:config": (tailwindConfig) => {
      const nuxt = useNuxt();

      tailwindConfig.theme = tailwindConfig.theme || {};
      tailwindConfig.theme.extend = tailwindConfig.theme.extend || {};
      tailwindConfig.theme.extend.colors =
        tailwindConfig.theme.extend.colors || {};

      const colors = setColors(tailwindConfig.theme);

      // generate safelist and inject it into tailwindConfig
      const safelist = generateSafelist(
        ["primary", "amber", "violet", "red", "emerald", "cyan"],
        colors
      );
      tailwindConfig.safelist = safelist;

      // inject colors into appConfig
      nuxt.options.appConfig.rayui = nuxt.options.appConfig.rayui || {};
      nuxt.options.appConfig.rayui.colors = colors;

      const template = addTemplate({
        filename: "ray.colors.mjs",
        getContents: () =>
          `export default ${JSON.stringify(
            nuxt.options.appConfig.rayui.colors
          )};`,
        write: true,
      });
      const typesTemplate = addTemplate({
        filename: "ray.colors.d.ts",
        getContents: () =>
          `declare module '#ray-colors' { const defaultExport: ${JSON.stringify(
            nuxt.options.appConfig.rayui.colors
          )}; export default defaultExport; }`,
        write: true,
      });

      nuxt.options.alias["#ray-colors"] = template.dst;

      nuxt.hook("prepare:types", (opts) => {
        opts.references.push({ path: typesTemplate.dst });
      });
    },
  },
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
