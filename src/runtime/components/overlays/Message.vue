<script lang="ts">
import { onMounted, defineComponent, type PropType, toRef, computed } from 'vue'
import { twJoin, twMerge } from 'tailwind-merge'
import { message } from '../../themes'
import type { DeepPartial, Message, MessageColor, MessageType, Strategy } from '../../types/index'
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
    icon: {
      type: String,
      default: null,
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

    const iconName = computed(() => {
      return props.icon || ui.value.type[props.type]?.icon || null
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
      iconName,
    }
  },
})
</script>

<template>
  <div :class="ui.wrapper" v-bind="attrs">
    <div :class="containerClass">
      <RayIcon v-if="iconName" :name="iconName" class="text-xl" />
      <span>
        {{ messageBody.content }}
      </span>
    </div>
  </div>
</template>
