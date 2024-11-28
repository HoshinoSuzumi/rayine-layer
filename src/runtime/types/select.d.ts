import type { AppConfig } from 'nuxt/schema'
import type { select } from '../themes'
import type { ExtractDeepKey } from './utils'
import type colors from '#ray-colors'

export type SelectColor = (typeof colors)[number]
export type SelectSize = keyof typeof select.size | ExtractDeepKey<AppConfig, ['rayui', 'select', 'size']>
export type SelectVariant = keyof typeof select.variant | ExtractDeepKey<AppConfig, ['rayui', 'select', 'variant']>
