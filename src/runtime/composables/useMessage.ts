import type { Message, MessageType } from '../types/message'
import { useState } from '#imports'

export const useMessage = () => {
  const messages = useState<Message[]>('messages', () => [])

  const add = (message: Partial<Message>) => {
    const msg = {
      id: (Date.now() + Math.random() * 100).toString(32).toUpperCase(),
      duration: 3000,
      ...message,
    }

    if (messages.value.some(m => m.id === msg.id)) {
      return
    }

    messages.value.push(msg as Message)
    return msg
  }

  const update = (id: string, message: Partial<Message>) => {
    const msg = messages.value.find(msg => msg.id === id)

    if (!msg) {
      return
    }

    Object.assign(msg, message)
  }

  const remove = (id: string) => {
    messages.value = messages.value.filter(msg => msg.id !== id)
  }

  const clear = () => {
    messages.value = []
  }

  return {
    add,
    update,
    remove,
    clear,
  }
}
