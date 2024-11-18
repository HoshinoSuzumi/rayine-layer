import type { MessageApi } from '../types/message'

export const useMessage = () => {
  const message = inject<MessageApi>('ray-message')
  if (!message) {
    throw new Error('No outer message-provider found!')
  }
  return message
}
