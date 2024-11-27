<script lang="ts">
import { computed, defineComponent, toRef, type PropType } from 'vue'
import { twJoin, twMerge } from 'tailwind-merge'
import { mark } from '../../ui.config'
import type { MarkColor, MarkPosition, MarkSize } from '../../types'
import { useRayUI } from '#build/imports'

const config = mark

export default defineComponent({
  inheritAttrs: false,
  props: {
    value: {
      type: [Number, String],
      default: null,
    },
    max: {
      type: Number,
      default: null,
    },
    size: {
      type: String as PropType<MarkSize>,
      default: config.default.size,
    },
    color: {
      type: String as PropType<MarkColor>,
      default: config.default.color,
    },
    position: {
      type: String as PropType<MarkPosition>,
      default: config.default.position,
    },
    ui: {
      type: Object as PropType<typeof config>,
      default: () => ({}),
    },
    class: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { ui, attrs } = useRayUI('mark', toRef(props, 'ui'), config)

    const markClass = computed(() => {
      return twMerge(twJoin(
        ui.value.base,
        ui.value.rounded,
        ui.value.ring,
        ui.value.position[props.position],
        ui.value.background.replaceAll('{color}', props.color),
        props.value ? ui.value.value.size[props.size] : ui.value.size[props.size],
        props.value ? ui.value.value.translate[props.position] : ui.value.translate[props.position],
      ), props.class)
    })

    const isOverMax = computed(() => {
      if (props.max === null) return false
      if (typeof props.value === 'string') return false
      return props.value > props.max
    })

    // consider string value
    const countValue = computed(() => {
      if (typeof props.value === 'string') return props.value
      return isOverMax.value ? `${props.max}+` : props.value
    })

    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      markClass,
      isOverMax,
      countValue,
    }
  },
})
</script>

<template>
  <div :class="ui.wrapper">
    <span :class="markClass">
      <Transition v-bind="ui.transition">
        <span v-if="value" :key="countValue" class="leading-none">{{ countValue }}</span>
      </Transition>
    </span>
    <slot />
  </div>
</template>
