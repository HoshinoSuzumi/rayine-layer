<script lang="ts" setup>
import { twJoin, twMerge } from 'tailwind-merge'
import type { PropType } from 'vue'
import { button } from '../../ui.config'
import type { DeepPartial, Strategy } from '../../types/utils'
import type { ButtonColor, ButtonSize, ButtonVariant } from '../../types/button'

const config = button

const props = defineProps({
  class: {
    type: String,
    default: '',
  },
  padded: {
    type: Boolean,
    default: true,
  },
  square: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: () => button.default.size,
  },
  color: {
    type: String as PropType<ButtonColor>,
    default: () => button.default.color,
  },
  variant: {
    type: String as PropType<ButtonVariant>,
    default: () => button.default.variant,
  },
  ui: {
    type: Object as PropType<DeepPartial<typeof config> & { strategy?: Strategy }>,
    default: () => ({}),
  },
})

const { ui, attrs } = useUI('button', toRef(props, 'ui'), config)

const buttonClass = computed(() => {
  // @ts-ignore
  const variant = ui.value.color?.[props.color as string]?.[props.variant as string] || ui.value.variant[props.variant]
  return twMerge(twJoin(
    ui.value.base,
    ui.value.font,
    ui.value.rounded,
    ui.value.size[props.size],
    props.padded && ui.value.padding[props.size],
    variant?.replaceAll('{color}', props.color),
    props.block ? ui.value.block : ui.value.inline,
  ), props.class)
})
</script>

<template>
  <button
    :class="buttonClass"
    v-bind="{ ...attrs }"
  >
    <slot />
  </button>
</template>

<style scoped></style>
