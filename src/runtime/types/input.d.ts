import type { AppConfig } from 'nuxt/schema'
import type { input } from '../ui.config'
import type { ExtractDeepKey } from './utils'
import type colors from '#ray-colors'

export type InputSize =
  | keyof typeof input.size
  | ExtractDeepKey<AppConfig, ['rayui', 'input', 'size']>
export type InputColor =
  | ExtractDeepKey<AppConfig, ['rayui', 'input', 'color']>
  | (typeof colors)[number]
export type InputVariant =
  | keyof typeof input.variant
  | ExtractDeepKey<AppConfig, ['rayui', 'input', 'variant']>
export type InputType = 'text' | 'password' | 'number' | 'url' | 'email' | 'search' | 'file' | 'hidden'
export type InputModelModifiers = {
  number?: boolean
  trim?: boolean
  lazy?: boolean
}
