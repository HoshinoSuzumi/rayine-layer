<script lang="ts" setup>
import type { MessageProviderApi, Message } from '../../types/message'

const providerApi = inject<MessageProviderApi>('ray-message-provider')

const props = defineProps({
  message: {
    require: true,
    type: Object,
  },
})

const message = ref<Message>(props.message as Message)

onMounted(() => {
  setTimeout(() => {
    providerApi?.destroy(message.value.id)
  }, message.value?.duration || 3000)
})
</script>

<template>
  <div
    class="message"
    :class="{
      [message.type]: message.type,
    }"
  >
    <IconCircleSuccess
      v-if="message.type === 'success'"
      class="text-xl"
    />
    <IconCircleWarning
      v-if="message.type === 'warning'"
      class="text-xl"
    />
    <IconCircleError
      v-if="message.type === 'error'"
      class="text-xl"
    />
    <IconCircleInfo
      v-if="message.type === 'info'"
      class="text-xl"
    />
    <span>
      {{ message.content }}
    </span>
  </div>
</template>

<style scoped>
.message {
  min-width: 80px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, .2);
  @apply h-fit px-2 py-1.5 border bg-white border-gray-300 rounded-md text-gray-500 text-xs font-sans flex items-center gap-1.5 first-of-type:mt-2.5 mt-2.5 font-bold pointer-events-auto;
}

.message.info {
  box-shadow: 0 4px 12px rgba(59, 130, 246, .2);
  @apply !text-blue-500 !border-blue-400 !bg-blue-50 dark:!text-blue-300 dark:!border-blue-600 dark:!bg-blue-900;
}

.message.success {
  box-shadow: 0 4px 12px rgba(16, 185, 129, .2);
  @apply !text-emerald-500 !border-emerald-400 !bg-emerald-50 dark:!text-emerald-300 dark:!border-emerald-600 dark:!bg-emerald-900;
}

.message.warning {
  box-shadow: 0 4px 12px rgba(249, 115, 22, .2);
  @apply !text-orange-500 !border-orange-400 !bg-orange-50 dark:!text-orange-300 dark:!border-orange-600 dark:!bg-orange-900;
}

.message.error {
  box-shadow: 0 4px 12px rgba(244, 63, 94, .2);
  @apply !text-rose-500 !border-rose-400 !bg-rose-50 dark:!text-rose-300 dark:!border-rose-600 dark:!bg-rose-900;
}
</style>
