import { useNuxt, createResolver, addTemplate, installModule } from '@nuxt/kit'
import type { ModuleOptions } from '@nuxt/schema'
import defu from 'defu'
import { join } from 'pathe'
import { setColors } from './runtime/utils/colors'

export const installTailwind = (
  moduleOptions: ModuleOptions,
  nuxt = useNuxt(),
  resolve = createResolver(import.meta.url).resolve,
) => {
  const runtimePath = resolve('./runtime')

  nuxt.hook('tailwindcss:config', (tailwindConfig) => {
    tailwindConfig.theme = tailwindConfig.theme || {}
    tailwindConfig.theme.extend = tailwindConfig.theme.extend || {}
    tailwindConfig.theme.extend.colors
      = tailwindConfig.theme.extend.colors || {}

    const colors = setColors(tailwindConfig.theme)

    nuxt.options.appConfig.rayui = {
      primary: 'indigo',
      gray: 'neutral',
      strategy: 'merge',
      colors,
    }
  })

  const configTemplate = addTemplate({
    filename: 'ray-tailwind.config.cjs',
    write: true,
    getContents: ({ nuxt }) => `
      const { defaultExtractor: createDefaultExtractor } = require('tailwindcss/lib/lib/defaultExtractor.js')
      const { customSafelistExtractor, generateSafelist } = require(${JSON.stringify(
        resolve(runtimePath, 'utils', 'colors'),
      )})

      const defaultExtractor = createDefaultExtractor({ tailwindConfig: { separator: ':' } })

      module.exports = {
        content: {
          files: [
            ${JSON.stringify(
              resolve(runtimePath, 'components/**/*.{vue,mjs,ts}'),
            )},
            ${JSON.stringify(
              resolve(runtimePath, 'ui.config/**/*.{mjs,js,ts}'),
            )}
          ],
        },
        transform: {
          vue: (content) => {
            return content.replaceAll(/(?:\\r\\n|\\r|\\n)/g, ' ')
          }
        },
        extract: {
          vue: (content) => {
            return [
              ...defaultExtractor(content),
              ...customSafelistExtractor(${JSON.stringify(
                  moduleOptions.prefix,
                )}, content, ${JSON.stringify(
                  nuxt.options.appConfig.rayui.colors,
                )}, ${JSON.stringify(moduleOptions.safeColors)})
            ]
          }
        },
        safelist: generateSafelist(${JSON.stringify(
          moduleOptions.safeColors || [],
        )}, ${JSON.stringify(nuxt.options.appConfig.rayui.colors)}),
      }
    `,
  })

  const { configPath: userTwConfigPath = [], ...twModuleConfig }
    = nuxt.options.tailwindcss ?? {}

  const twConfigPaths = [
    configTemplate.dst,
    join(nuxt.options.rootDir, 'tailwind.config'),
  ]

  if (typeof userTwConfigPath === 'string') {
    twConfigPaths.push(userTwConfigPath)
  }
  else {
    twConfigPaths.push(...userTwConfigPath)
  }

  return installModule(
    '@nuxtjs/tailwindcss',
    defu(
      {
        exposeConfig: true,
        config: {
          darkMode: 'class' as const,
        },
        configPath: twConfigPaths,
      },
      twModuleConfig,
    ),
  )
}
