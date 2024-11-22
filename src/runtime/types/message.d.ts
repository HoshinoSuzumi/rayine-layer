export type MessageType = 'success' | 'warning' | 'error' | 'info'

export interface Message {
  id: string
  content: string
  type: MessageType
  duration?: number
}

export type MessageOption = Omit<Message, 'id'>

export interface MessageApi {
  info: (content: string, duration?: number) => void
  success: (content: string, duration?: number) => void
  warning: (content: string, duration?: number) => void
  error: (content: string, duration?: number) => void
  destroyAll: () => void
}

export interface MessageProviderApi {
  destroy: (id: string) => void
}
