<script lang="ts">
import { ref, onMounted, defineComponent, type PropType, toRef, computed } from 'vue'
import { twJoin, twMerge } from 'tailwind-merge'
import type { Message, MessageType } from '../../types/message'
import { message } from '../../ui.config'
import type { DeepPartial, Strategy } from '../../types'
import { useMessage, useRayUI } from '#build/imports'

const config = message

export default defineComponent({
  props: {
    message: {
      type: Object as PropType<Message>,
      require: true,
    },
    class: {
      type: String,
      default: '',
    },
    ui: {
      type: Object as PropType<DeepPartial<typeof config> & { strategy?: Strategy }>,
      default: () => ({}),
    },
  },
  setup(props) {
    const { ui, attrs } = useRayUI('message', toRef(props, 'ui'), config)

    const resolvedColor = computed(() => {
      if (!props.message?.type) return props.message?.color || ui.value.default.color || 'primary'
      return ({
        info: 'blue',
        success: 'emerald',
        warning: 'orange',
        error: 'rose',
      } as Record<MessageType, string>)[props.message.type]
    })

    const containerClass = computed(() => {
      return twMerge(twJoin(
        ui.value.container,
        ui.value.rounded,
        ui.value.background.replaceAll('{color}', resolvedColor.value),
        ui.value.content.replaceAll('{color}', resolvedColor.value),
        ui.value.border.replaceAll('{color}', resolvedColor.value),
      ), props.class)
    })

    const message = useMessage()
    const messageBody = ref<Message>(props.message as Message)

    onMounted(() => {
      setTimeout(() => {
        message.remove(messageBody.value.id)
      }, messageBody.value?.duration || ui.value.default.duration)
    })

    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      messageBody,
      containerClass,
    }
  },
})
</script>

<template>
  <div :class="ui.wrapper" v-bind="attrs">
    <div :class="containerClass">
      <IconCircleSuccess v-if="messageBody.type === 'success'" class="text-xl" />
      <IconCircleWarning v-if="messageBody.type === 'warning'" class="text-xl" />
      <IconCircleError v-if="messageBody.type === 'error'" class="text-xl" />
      <IconCircleInfo v-if="messageBody.type === 'info'" class="text-xl" />
      <span>
        {{ messageBody.content }}
      </span>
    </div>
  </div>
</template>
