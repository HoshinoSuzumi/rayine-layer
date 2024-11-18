import { useNuxt, createResolver, addTemplate, installModule } from "@nuxt/kit";
import type { ModuleOptions } from "@nuxt/schema";
import { setColors } from "./runtime/utils/colors";
import defu from "defu";
import { join } from "pathe";

export const installTailwind = (
  moduleOptions: ModuleOptions,
  nuxt = useNuxt(),
  resolve = createResolver(import.meta.url).resolve
) => {
  const runtimePath = resolve("./runtime");

  nuxt.hook("tailwindcss:config", (tailwindConfig) => {
    tailwindConfig.theme = tailwindConfig.theme || {};
    tailwindConfig.theme.extend = tailwindConfig.theme.extend || {};
    tailwindConfig.theme.extend.colors =
      tailwindConfig.theme.extend.colors || {};

    const colors = setColors(tailwindConfig.theme);

    nuxt.options.appConfig.rayui = {
      primary: "indigo",
      gray: "neutral",
      strategy: "merge",
      colors,
    };
  });

  const configTemplate = addTemplate({
    filename: "ray-tailwind.config.cjs",
    write: true,
    getContents: ({ nuxt }) => `
      const { generateSafelist } = require(${JSON.stringify(
        resolve(runtimePath, "utils", "colors")
      )})

      module.exports = {
        content: {
          files: [
            ${JSON.stringify(
              resolve(runtimePath, "components/**/*.{vue,mjs,ts}")
            )},
            ${JSON.stringify(
              resolve(runtimePath, "ui.config/**/*.{mjs,js,ts}")
            )}
          ],
        },
        safelist: generateSafelist(${JSON.stringify(
          moduleOptions.safeColors || []
        )}, ${JSON.stringify(nuxt.options.appConfig.rayui.colors)}),
      }
    `,
  });

  const { configPath: userTwConfigPath = [], ...twModuleConfig } =
    nuxt.options.tailwindcss ?? {};

  const twConfigPaths = [
    configTemplate.dst,
    join(nuxt.options.rootDir, "tailwind.config"),
  ];

  if (typeof userTwConfigPath === "string") {
    twConfigPaths.push(userTwConfigPath);
  } else {
    twConfigPaths.push(...userTwConfigPath);
  }

  return installModule(
    "@nuxtjs/tailwindcss",
    defu(
      {
        exposeConfig: true,
        config: {
          darkMode: "class" as const,
        },
        configPath: twConfigPaths,
      },
      twModuleConfig
    )
  );
};
