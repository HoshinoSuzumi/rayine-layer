import { createResolver } from '@nuxt/kit'
import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'
import module from '../src/module'
import { excludeColors } from '../src/runtime/utils/colors'
import pkg from '../package.json'

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxtjs/color-mode',
    module,
    'nuxt-component-meta',
  ],
  devtools: { enabled: true },
  colorMode: {
    preference: 'system',
    classSuffix: '',
  },
  content: {
    highlight: {
      langs: ['postcss', 'mdc', 'html', 'vue', 'ts', 'js', 'bash', 'yml'],
    },
  },
  mdc: {
    highlight: {
      theme: {
        light: 'material-theme-lighter',
        dark: 'material-theme',
      },
      themes: ['material-theme-lighter', 'material-theme'],
    },
  },
  runtimeConfig: {
    public: {
      version: pkg.version,
    },
  },
  routeRules: {
    '/components': { redirect: '/components/button', prerender: false },
  },
  compatibilityDate: '2024-04-03',
  typescript: {
    includeWorkspace: true,
  },
  componentMeta: {
    exclude: [
      '@nuxt/content',
      '@nuxt/icon',
      '@nuxtjs/color-mode',
      '@nuxtjs/mdc',
      'nuxt/dist',
      resolve('./components'),
    ],
    metaFields: {
      type: false,
      props: true,
      slots: true,
      events: false,
      exposed: false,
    },
  },
  icon: {
    clientBundle: {
      scan: true,
    },
  },
  rayui: {
    globalComponents: true,
    safeColors: [...excludeColors(colors)],
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Rubik', '"Noto Sans SC"', ...defaultTheme.fontFamily.sans],
          },
        },
      },
    },
  },
})
