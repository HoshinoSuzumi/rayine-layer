import type { AppConfig } from '@nuxt/schema'
import type { toggle } from '../themes'
import type { ExtractDeepKey } from './utils'
import type colors from '#ray-colors'

export type ToggleSize =
  | keyof typeof toggle.size
  | ExtractDeepKey<AppConfig, ['rayui', 'toggle', 'size']>
export type ToggleColor = (typeof colors)[number]
