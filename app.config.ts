import type { DeepPartial, Strategy } from "./types/utils";
import type * as config from "./ui.config";

export default defineAppConfig({
  rayui: {
    primary: "indigo",
    gray: "neutral",
    strategy: "merge",
  },
});

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
