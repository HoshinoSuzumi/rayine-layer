import { defineNuxtModule, addPlugin, createResolver } from "@nuxt/kit";
import type { config } from "process";
import type { Strategy, DeepPartial } from "./runtime/types/utils";

export type RayUI = {
  primary?: string;
  gray?: string;
  strategy?: Strategy;
  colors?: string[];
  [key: string]: any;
} & DeepPartial<typeof config>;

declare module "@nuxt/schema" {
  interface AppConfigInput {
    rayui?: RayUI;
  }
}

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "rayine/ui",
    configKey: "rayui",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url);

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve("./runtime/plugin"));
  },
});
