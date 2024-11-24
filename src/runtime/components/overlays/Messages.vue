<script lang="ts">
import { computed, defineComponent, toRef, type PropType } from 'vue'
import { twJoin, twMerge } from 'tailwind-merge'
import { messages } from '../../ui.config'
import { useState } from '#imports'
import { useRayUI } from '#build/imports'
import type { DeepPartial, Message, Strategy } from '../../types/index'

const config = messages

export default defineComponent({
  props: {
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
    const { ui, attrs } = useRayUI('messages', toRef(props, 'ui'), config)

    const messages = useState<Message[]>('messages', () => [])

    const wrapperClass = computed(() => {
      return twMerge(twJoin(
        ui.value.wrapper,
        ui.value.position,
      ), props.class)
    })

    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      messages,
      wrapperClass,
    }
  },
})
</script>

<template>
  <teleport to="body">
    <div :class="wrapperClass" v-bind="attrs">
      <div :class="ui.container">
        <TransitionGroup v-bind="ui.transition" appear>
          <RayMessage v-for="message of messages" :key="message.id" :message="message" />
        </TransitionGroup>
      </div>
    </div>
  </teleport>
</template>
