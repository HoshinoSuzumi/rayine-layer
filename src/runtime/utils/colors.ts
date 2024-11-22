import type { Config as TwConfig } from 'tailwindcss'
import defaultColors from 'tailwindcss/colors.js'
import { camelCase, upperFirst } from 'scule'
import { omit } from './objectUtils'

const colorsToRegex = (colors: string[]): string => colors.join('|')

type ColorConfig = Exclude<NonNullable<TwConfig['theme']>['colors'], Function>

export const excludeColors = (
  colors: ColorConfig | typeof defaultColors,
): string[] => {
  const colorEntries = Object.entries(omit(colors as Record<string, any>, []))
  return colorEntries
    .filter(([, value]) => typeof value === 'object')
    .map(([key]) => key)
}

export const setColors = (theme: TwConfig['theme']) => {
  const _globalColors: ColorConfig = {
    ...(theme?.colors || defaultColors),
    ...theme?.extend?.colors,
  }

  // @ts-ignore
  _globalColors.primary = theme.extend.colors.primary = {
    50: 'rgb(var(--color-primary-50) / <alpha-value>)',
    100: 'rgb(var(--color-primary-100) / <alpha-value>)',
    200: 'rgb(var(--color-primary-200) / <alpha-value>)',
    300: 'rgb(var(--color-primary-300) / <alpha-value>)',
    400: 'rgb(var(--color-primary-400) / <alpha-value>)',
    500: 'rgb(var(--color-primary-500) / <alpha-value>)',
    600: 'rgb(var(--color-primary-600) / <alpha-value>)',
    700: 'rgb(var(--color-primary-700) / <alpha-value>)',
    800: 'rgb(var(--color-primary-800) / <alpha-value>)',
    900: 'rgb(var(--color-primary-900) / <alpha-value>)',
    950: 'rgb(var(--color-primary-950) / <alpha-value>)',
    DEFAULT: 'rgb(var(--color-primary-DEFAULT) / <alpha-value>)',
  }

  if (_globalColors.gray) {
    // @ts-ignore
    _globalColors.cool = theme.extend.colors.cool = defaultColors.gray
  }

  // @ts-ignore
  _globalColors.gray = theme.extend.colors.gray = {
    50: 'rgb(var(--color-gray-50) / <alpha-value>)',
    100: 'rgb(var(--color-gray-100) / <alpha-value>)',
    200: 'rgb(var(--color-gray-200) / <alpha-value>)',
    300: 'rgb(var(--color-gray-300) / <alpha-value>)',
    400: 'rgb(var(--color-gray-400) / <alpha-value>)',
    500: 'rgb(var(--color-gray-500) / <alpha-value>)',
    600: 'rgb(var(--color-gray-600) / <alpha-value>)',
    700: 'rgb(var(--color-gray-700) / <alpha-value>)',
    800: 'rgb(var(--color-gray-800) / <alpha-value>)',
    900: 'rgb(var(--color-gray-900) / <alpha-value>)',
    950: 'rgb(var(--color-gray-950) / <alpha-value>)',
  }

  return excludeColors(_globalColors)
}

const safelistForComponent: Record<
  string,
  (colors: string) => TwConfig['safelist']
> = {
  button: colorsToRegex => [
    {
      pattern: RegExp(`^bg-(${colorsToRegex})-50$`),
      variants: ['hover', 'disabled'],
    },
    {
      pattern: RegExp(`^bg-(${colorsToRegex})-100$`),
      variants: ['hover'],
    },
    {
      pattern: RegExp(`^bg-(${colorsToRegex})-400$`),
      variants: ['dark', 'dark:disabled'],
    },
    {
      pattern: RegExp(`^bg-(${colorsToRegex})-500$`),
      variants: ['disabled', 'dark:hover', 'dark:active'],
    },
    {
      pattern: RegExp(`^bg-(${colorsToRegex})-600$`),
      variants: ['hover'],
    },
    {
      pattern: RegExp(`^bg-(${colorsToRegex})-700$`),
      variants: ['active'],
    },
    {
      pattern: RegExp(`^bg-(${colorsToRegex})-900$`),
      variants: ['dark:hover'],
    },
    {
      pattern: RegExp(`^bg-(${colorsToRegex})-950$`),
      variants: ['dark', 'dark:hover', 'dark:disabled'],
    },
    {
      pattern: RegExp(`^text-(${colorsToRegex})-400$`),
      variants: ['dark', 'dark:hover', 'dark:disabled'],
    },
    {
      pattern: RegExp(`^text-(${colorsToRegex})-500$`),
      variants: ['dark:hover', 'disabled'],
    },
    {
      pattern: RegExp(`^text-(${colorsToRegex})-600$`),
      variants: ['hover'],
    },
    {
      pattern: RegExp(`^outline-(${colorsToRegex})-400$`),
      variants: ['dark:focus-visible'],
    },
    {
      pattern: RegExp(`^outline-(${colorsToRegex})-500$`),
      variants: ['focus-visible'],
    },
    {
      pattern: RegExp(`^ring-(${colorsToRegex})-300$`),
      variants: ['focus', 'dark:focus'],
    },
    {
      pattern: RegExp(`^ring-(${colorsToRegex})-400$`),
      variants: ['dark:focus-visible'],
    },
    {
      pattern: RegExp(`^ring-(${colorsToRegex})-500$`),
      variants: ['focus-visible'],
    },
  ],
  message: colorsToRegex => [
    {
      pattern: RegExp(`^bg-(${colorsToRegex})-50$`),
    },
    {
      pattern: RegExp(`^bg-(${colorsToRegex})-900$`),
      variants: ['dark'],
    },
    {
      pattern: RegExp(`^text-(${colorsToRegex})-500$`),
    },
    {
      pattern: RegExp(`^text-(${colorsToRegex})-300$`),
      variants: ['dark'],
    },
    {
      pattern: RegExp(`^border-(${colorsToRegex})-400$`),
    },
    {
      pattern: RegExp(`^border-(${colorsToRegex})-600$`),
      variants: ['dark'],
    },
    {
      pattern: RegExp(`^shadow-(${colorsToRegex})-100$`),
    },
    {
      pattern: RegExp(`^shadow-(${colorsToRegex})-900$`),
      variants: ['dark'],
    },
  ],
}

export const generateSafelist = (colors: string[], globalColors: string[]) => {
  const safelist = Object.keys(safelistForComponent).flatMap(component =>
    safelistForComponent[component](colorsToRegex(colors)),
  )

  return [...safelist]
}

type SafelistFn = Exclude<
  NonNullable<Extract<TwConfig['content'], { extract?: unknown }>['extract']>,
  Record<string, unknown>
>
export const customSafelistExtractor = (
  prefix: string,
  content: string,
  colors: string[],
  safelistColors: string[],
): ReturnType<SafelistFn> => {
  const classes: string[] = []

  const regex
    = /<([A-Za-z][A-Za-z0-9]*(?:-[A-Za-z][A-Za-z0-9]*)*)\s+(?![^>]*:color\b)[^>]*\bcolor=["']([^"']+)["'][^>]*>/g

  const matches = content.matchAll(regex)

  const components = Object.keys(safelistForComponent).map(
    component =>
      `${prefix}${component.charAt(0).toUpperCase() + component.slice(1)}`,
  )

  for (const match of matches) {
    const [, component, color] = match

    const camelComponent = upperFirst(camelCase(component))

    if (!colors.includes(color) || safelistColors.includes(color)) {
      continue
    }

    let name = camelComponent as string

    if (!components.includes(name)) {
      continue
    }

    name = name.replace(prefix, '').toLowerCase()

    const matchClasses = safelistForComponent[name](color)?.flatMap((group) => {
      return typeof group === 'string'
        ? ''
        : ['', ...(group.variants || [])].flatMap((variant) => {
            const matches = group.pattern.source.match(/\(([^)]+)\)/g)

            return (
              matches
                ?.map((match) => {
                  const colorOptions = match
                    .substring(1, match.length - 1)
                    .split('|')
                  return colorOptions.map((color) => {
                    const classesExtracted = group.pattern.source
                      .replace(match, color)
                      .replace('^', '')
                      .replace('$', '')
                    if (variant) {
                      return `${variant}:${classesExtracted}`
                    }
                    return classesExtracted
                  })
                })
                .flat() || []
            )
          })
    })

    classes.push(...(matchClasses as string[]))
  }

  return classes
}
