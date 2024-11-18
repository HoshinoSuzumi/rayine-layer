import { defu, createDefu } from "defu";
import { extendTailwindMerge } from "tailwind-merge";
import type { Strategy } from "../types/utils";

const custonTwMerge = extendTailwindMerge<string, string>({});

export const twMergeDefu = createDefu((obj, key, val, namespace) => {
  if (namespace === "default" || namespace.startsWith("default.")) {
    return false;
  }
  if (
    typeof obj[key] === "string" &&
    typeof val === "string" &&
    obj[key] &&
    val
  ) {
    // @ts-ignore
    obj[key] = custonTwMerge<string, string>(obj[key], val);
    return true;
  }
});

export const mergeUiConfig = <T>(strategy: Strategy, ...configs: any): T => {
  if (strategy === "merge") {
    return twMergeDefu({}, ...configs) as T;
  }
  return defu({}, ...configs) as T;
};

export * from './objectUtils'
