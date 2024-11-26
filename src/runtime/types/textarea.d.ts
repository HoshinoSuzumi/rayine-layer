import type { AppConfig } from '@nuxt/schema'
import type { textarea } from '../ui.config'
import type { ExtractDeepKey } from './utils'
import type colors from '#ray-colors'

export type TextareaSize =
  | keyof typeof textarea.size
  | ExtractDeepKey<AppConfig, ['rayui', 'textarea', 'size']>
export type TextareaColor =
  | ExtractDeepKey<AppConfig, ['rayui', 'textarea', 'color']>
  | (typeof colors)[number]
export type TextareaVariant =
  | keyof typeof textarea.variant
  | ExtractDeepKey<AppConfig, ['rayui', 'textarea', 'variant']>
export type TextareaModelModifiers = {
  number?: boolean
  trim?: boolean
  lazy?: boolean
}
