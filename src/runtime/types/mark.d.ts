import type { AppConfig } from '@nuxt/schema'
import type { mark } from '../ui.config'
import type { ExtractDeepKey } from './utils'
import type colors from '#ray-colors'

export type MarkSize =
  | keyof typeof mark.size
  | ExtractDeepKey<AppConfig, ['rayui', 'mark', 'size']>
export type MarkColor =
  | ExtractDeepKey<AppConfig, ['rayui', 'mark', 'color']>
  | (typeof colors)[number]
export type MarkPosition =
  | keyof typeof mark.position
  | ExtractDeepKey<AppConfig, ['rayui', 'mark', 'position']>
