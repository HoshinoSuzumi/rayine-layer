import type { config } from 'node:process'
import { createRequire } from 'node:module'
import {
  defineNuxtModule,
  createResolver,
  addPlugin,
  addComponentsDir,
  addImportsDir,
} from '@nuxt/kit'
import { name, version } from '../package.json'
import { installTailwind } from './tailwind'
import type { Strategy, DeepPartial } from './runtime/types/utils'
import { createTemplates } from './template'

const _require = createRequire(import.meta.url)
const defaultColors = _require('tailwindcss/colors.js')

delete defaultColors.lightBlue
delete defaultColors.warmGray
delete defaultColors.trueGray
delete defaultColors.coolGray
delete defaultColors.blueGray

type RayUI = {
  primary?: string
  gray?: string
  strategy?: Strategy
  colors?: string[]
  [key: string]: any
} & DeepPartial<typeof config, string | number | boolean>

declare module '@nuxt/schema' {
  interface AppConfigInput {
    rayui?: RayUI
  }
}

export interface ModuleOptions {
  prefix?: string
  safeColors?: string[]
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'rayui',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    prefix: 'Ray',
    safeColors: ['primary'],
  },
  async setup(_options, _nuxt) {
    const { resolve } = createResolver(import.meta.url)

    const runtimePath = resolve('./runtime')
    _nuxt.options.build.transpile.push(runtimePath)
    _nuxt.options.alias['#rayui'] = runtimePath

    createTemplates(_nuxt)

    // Modules
    await installTailwind(_options, _nuxt, resolve)

    // Plugins
    addPlugin({
      src: resolve(runtimePath, 'plugins', 'colors'),
    })

    // Components
    addComponentsDir({
      path: resolve(runtimePath, 'components', 'elements'),
      prefix: _options.prefix,
      global: false,
      watch: false,
    })
    addComponentsDir({
      path: resolve(runtimePath, 'components', 'forms'),
      prefix: _options.prefix,
      global: false,
      watch: false,
    })
    addComponentsDir({
      path: resolve(runtimePath, 'components', 'overlays'),
      prefix: _options.prefix,
      global: false,
      watch: false,
    })

    // Composables
    addImportsDir(resolve(runtimePath, 'composables'))
  },
})
