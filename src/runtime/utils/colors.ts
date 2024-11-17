import type { Config as TwConfig } from "tailwindcss";
import defaultColors from "tailwindcss/colors";
import type { SafelistConfig } from "tailwindcss/types/config";

// @ts-ignore
delete defaultColors.lightBlue;
// @ts-ignore
delete defaultColors.warmGray;
// @ts-ignore
delete defaultColors.trueGray;
// @ts-ignore
delete defaultColors.coolGray;
// @ts-ignore
delete defaultColors.blueGray;

const colorsToRegex = (colors: string[]): string => colors.join("|");

type ColorConfig = Exclude<NonNullable<TwConfig["theme"]>["colors"], Function>;

export const setColors = (theme: TwConfig["theme"]) => {
  const globalColors: ColorConfig = {
    ...(theme?.colors || defaultColors),
    ...theme?.extend?.colors,
  };

  // @ts-ignore
  globalColors.primary = theme.extend.colors.primary = {
    50: "rgb(var(--color-primary-50) / <alpha-value>)",
    100: "rgb(var(--color-primary-100) / <alpha-value>)",
    200: "rgb(var(--color-primary-200) / <alpha-value>)",
    300: "rgb(var(--color-primary-300) / <alpha-value>)",
    400: "rgb(var(--color-primary-400) / <alpha-value>)",
    500: "rgb(var(--color-primary-500) / <alpha-value>)",
    600: "rgb(var(--color-primary-600) / <alpha-value>)",
    700: "rgb(var(--color-primary-700) / <alpha-value>)",
    800: "rgb(var(--color-primary-800) / <alpha-value>)",
    900: "rgb(var(--color-primary-900) / <alpha-value>)",
    950: "rgb(var(--color-primary-950) / <alpha-value>)",
    DEFAULT: "rgb(var(--color-primary-DEFAULT) / <alpha-value>)",
  };

  if (globalColors.gray) {
    // @ts-ignore
    globalColors.cool = theme.extend.colors.cool = defaultColors.gray;
  }

  // @ts-ignore
  globalColors.gray = theme.extend.colors.gray = {
    50: "rgb(var(--color-gray-50) / <alpha-value>)",
    100: "rgb(var(--color-gray-100) / <alpha-value>)",
    200: "rgb(var(--color-gray-200) / <alpha-value>)",
    300: "rgb(var(--color-gray-300) / <alpha-value>)",
    400: "rgb(var(--color-gray-400) / <alpha-value>)",
    500: "rgb(var(--color-gray-500) / <alpha-value>)",
    600: "rgb(var(--color-gray-600) / <alpha-value>)",
    700: "rgb(var(--color-gray-700) / <alpha-value>)",
    800: "rgb(var(--color-gray-800) / <alpha-value>)",
    900: "rgb(var(--color-gray-900) / <alpha-value>)",
    950: "rgb(var(--color-gray-950) / <alpha-value>)",
  };

  return Object.entries(globalColors)
    .filter(([, value]) => typeof value === "object")
    .map(([key]) => key);
};

const safelistForComponent: Record<
  string,
  (colors: string) => TwConfig["safelist"]
> = {
  button: (colorsToRegex) => [
    {
      pattern: RegExp(`^bg-(${colorsToRegex})-50$`),
      variants: ["hover", "disabled"],
    },
    {
      pattern: RegExp(`^bg-(${colorsToRegex})-100$`),
      variants: ["hover"],
    },
    {
      pattern: RegExp(`^bg-(${colorsToRegex})-400$`),
      variants: ["dark", "dark:disabled"],
    },
    {
      pattern: RegExp(`^bg-(${colorsToRegex})-500$`),
      variants: ["disabled", "dark:hover", "dark:active"],
    },
    {
      pattern: RegExp(`^bg-(${colorsToRegex})-600$`),
      variants: ["hover"],
    },
    {
      pattern: RegExp(`^bg-(${colorsToRegex})-700$`),
      variants: ["active"],
    },
    {
      pattern: RegExp(`^bg-(${colorsToRegex})-900$`),
      variants: ["dark:hover"],
    },
    {
      pattern: RegExp(`^bg-(${colorsToRegex})-950$`),
      variants: ["dark", "dark:hover", "dark:disabled"],
    },
    {
      pattern: RegExp(`^text-(${colorsToRegex})-400$`),
      variants: ["dark", "dark:hover", "dark:disabled"],
    },
    {
      pattern: RegExp(`^text-(${colorsToRegex})-500$`),
      variants: ["dark:hover", "disabled"],
    },
    {
      pattern: RegExp(`^text-(${colorsToRegex})-600$`),
      variants: ["hover"],
    },
    {
      pattern: RegExp(`^outline-(${colorsToRegex})-400$`),
      variants: ["dark:focus-visible"],
    },
    {
      pattern: RegExp(`^outline-(${colorsToRegex})-500$`),
      variants: ["focus-visible"],
    },
    {
      pattern: RegExp(`^ring-(${colorsToRegex})-300$`),
      variants: ["focus", "dark:focus"],
    },
    {
      pattern: RegExp(`^ring-(${colorsToRegex})-400$`),
      variants: ["dark:focus-visible"],
    },
    {
      pattern: RegExp(`^ring-(${colorsToRegex})-500$`),
      variants: ["focus-visible"],
    },
  ],
};

export const generateSafelist = (
  colors: string[],
  globalColors: string[]
): string[] => {
  const safelist = Object.keys(safelistForComponent)
    .flatMap((component) =>
      safelistForComponent[component](colorsToRegex(colors))
    )
    .filter(
      (item): item is Exclude<SafelistConfig, string> => item !== undefined
    );

  const extractColorsFromPattern = (pattern: RegExp): string[] => {
    const matches = pattern.source.match(/\(([^)]+)\)/);
    if (!matches) return [];
    return matches[1].split("|").map((color) =>
      pattern.source.replace(matches[0], color).replace(/[\^\$]/g, "")
    );
  };

  return safelist.flatMap((item) => {
    const replacedStrings = extractColorsFromPattern(item.pattern);
    return replacedStrings.concat(
      item.variants?.flatMap((variant) =>
        replacedStrings.map((str) => `${variant}:${str}`)
      ) || []
    );
  });
};
