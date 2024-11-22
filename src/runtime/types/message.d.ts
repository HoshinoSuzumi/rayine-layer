import type { AppConfig } from 'nuxt/schema'
import type { message } from '../ui.config'
import type colors from '#ray-colors'

export type MessageType = keyof typeof message.type
export type MessageColor = (typeof colors)[number]

export interface Message {
  id: string
  content: string
  type?: MessageType
  color?: MessageColor
  duration?: number
}

// export type MessageOption = Omit<Message, 'id'>
