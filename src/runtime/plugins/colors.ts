import { computed } from 'vue'
import { defineNuxtPlugin } from 'nuxt/app'
import { getValueByPath } from '../utils/objectUtils'
import { useAppConfig, useNuxtApp, useHead } from '#imports'
import colors from '#tailwind-config/theme/colors'

const rgbHexPattern = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i

function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, function (_, r, g, b) {
    return r + r + g + g + b + b
  })

  const result = rgbHexPattern.exec(hex)
  return result
    ? `${Number.parseInt(result[1], 16)} ${Number.parseInt(
      result[2],
      16,
    )} ${Number.parseInt(result[3], 16)}`
    : null
}

function parseConfigValue(value: string) {
  return rgbHexPattern.test(value) ? hexToRgb(value) : value
}

export default defineNuxtPlugin(() => {
  const appConfig = useAppConfig()
  const nuxtApp = useNuxtApp()

  const root = computed(() => {
    const primary: Record<string, string> | undefined = getValueByPath(
      colors,
      appConfig.rayui.primary,
    )
    const gray: Record<string, string> | undefined = getValueByPath(
      colors,
      appConfig.rayui.gray,
    )

    return `:root {
${Object.entries(primary || colors.indigo)
  .map(([key, value]) => `--color-primary-${key}: ${parseConfigValue(value)};`)
  .join('\n')}
--color-primary-DEFAULT: var(--color-primary-500);

${Object.entries(gray || colors.neutral)
  .map(([key, value]) => `--color-gray-${key}: ${parseConfigValue(value)};`)
  .join('\n')}
}

.dark {
  --color-primary-DEFAULT: var(--color-primary-400);
}
`
  })

  const headData: any = {
    style: [
      {
        innerHTML: () => root.value,
        tagPriority: -2,
        id: 'ray-colors',
      },
    ],
  }

  if (
    import.meta.client
      && nuxtApp.isHydrating
      && !nuxtApp.payload.serverRendered
  ) {
    const style = document.createElement('style')

    style.innerHTML = root.value
    style.setAttribute('data-ray-colors', '')
    document.head.appendChild(style)

    headData.script = [
      {
        innerHTML:
          'document.head.removeChild(document.querySelector(\'[data-ray-colors]\'))',
      },
    ]
  }

  useHead(headData)
})
