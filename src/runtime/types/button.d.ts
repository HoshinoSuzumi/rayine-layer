import type { AppConfig } from 'nuxt/schema'
import type { button } from '../themes'
import type { ExtractDeepObject, NestedKeyOf, ExtractDeepKey } from './utils'
import type colors from '#ray-colors'

export type ButtonSize =
  | keyof typeof button.size
  | ExtractDeepKey<AppConfig, ['rayui', 'button', 'size']>
export type ButtonColor =
  | keyof typeof button.color
  | ExtractDeepKey<AppConfig, ['rayui', 'button', 'color']>
  | (typeof colors)[number]
export type ButtonVariant =
  | keyof typeof button.variant
  | ExtractDeepKey<AppConfig, ['rayui', 'button', 'variant']>
  | NestedKeyOf<typeof button.color>
  | NestedKeyOf<ExtractDeepObject<AppConfig, ['rayui', 'button', 'color']>>

export interface Button {
  size?: ButtonSize
  color?: ButtonColor
  variant?: ButtonVariant
}
