import { addTemplate, useNuxt } from "@nuxt/kit";

export const createTemplates = (nuxt = useNuxt()) => {
  const template = addTemplate({
    filename: "ray.colors.mjs",
    getContents: () =>
      `export default ${JSON.stringify(nuxt.options.appConfig.rayui.colors)};`,
    write: true,
  });
  const typesTemplate = addTemplate({
    filename: "ray.colors.d.ts",
    getContents: () =>
      `declare module '#ui-colors' { const defaultExport: ${JSON.stringify(
        nuxt.options.appConfig.rayui.colors
      )}; export default defaultExport; }`,
    write: true,
  });

  nuxt.options.alias["#ray-colors"] = template.dst;

  nuxt.hook("prepare:types", (opts) => {
    opts.references.push({ path: typesTemplate.dst });
  });
};
