import defaultTheme from 'tailwindcss/defaultTheme'
import module from '../src/module'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: ['@nuxt/content', '@nuxt/fonts', '@nuxtjs/color-mode', module],
  devtools: { enabled: true },
  colorMode: {
    preference: 'system',
    classSuffix: '',
  },
  content: {
    highlight: {
      langs: ['postcss', 'mdc', 'html', 'vue', 'ts', 'js', 'bash'],
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
  routeRules: {
    '/components': { redirect: '/components/button' },
  }, compatibilityDate: '2024-04-03',
  typescript: {
    includeWorkspace: true,
  },
  rayui: {
    // @ts-ignore
    globalComponents: true,
    safeColors: ['amber', 'emerald', 'red', 'sky', 'violet', 'cyan'],
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
