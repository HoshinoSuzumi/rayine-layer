<script lang="ts">
import { ref, onMounted, defineComponent, type PropType, toRef, computed } from 'vue'
import { twJoin, twMerge } from 'tailwind-merge'
import type { Message, MessageColor, MessageType } from '../../types/message'
import { message } from '../../ui.config'
import type { DeepPartial, Strategy } from '../../types'
import { useMessage, useRayUI } from '#build/imports'

const config = message

export default defineComponent({
  props: {
    type: {
      type: String as PropType<MessageType>,
      default: config.default.type,
    },
    color: {
      type: String as PropType<MessageColor>,
      default: undefined,
    },
    duration: {
      type: Number,
      default: config.default.duration,
    },
    content: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: undefined,
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

    const containerClass = computed(() => {
      const color = props.color ? props.color : (ui.value.type[props.type]?.color || ui.value.default.color)
      return twMerge(twJoin(
        ui.value.container,
        ui.value.rounded,
        ui.value.shadow.replaceAll('{color}', color),
        ui.value.background.replaceAll('{color}', color),
        ui.value.content.replaceAll('{color}', color),
        ui.value.border.replaceAll('{color}', color),
      ), props.class)
    })

    const message = useMessage()
    const messageBody = computed<Message>(() => {
      return {
        id: props.id || message.generateId(),
        content: props.content,
        duration: props.duration,
        type: props.type,
      }
    })

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
      <IconCircleSuccess v-if="messageBody?.type === 'success'" class="text-xl" />
      <IconCircleWarning v-if="messageBody?.type === 'warning'" class="text-xl" />
      <IconCircleError v-if="messageBody?.type === 'error'" class="text-xl" />
      <IconCircleInfo v-if="messageBody?.type === 'info'" class="text-xl" />
      <span>
        {{ messageBody.content }}
      </span>
    </div>
  </div>
</template>
