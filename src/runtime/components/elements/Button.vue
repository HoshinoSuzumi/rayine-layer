<script lang="ts" setup>
import { twJoin, twMerge } from 'tailwind-merge'
import { computed, toRef, type PropType } from 'vue'
import type { DeepPartial, Strategy } from '../../types/utils'
import type { ButtonColor, ButtonSize, ButtonVariant } from '../../types/button'
import { getNonUndefinedValuesFromObject } from '../../utils'
import { nuxtLinkProps } from '../../utils/link'
import { button } from '../../ui.config'
import { useRayUI } from '#build/imports'

const props = defineProps({
  ...nuxtLinkProps,
  class: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
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
  label: {
    type: String,
    default: '',
  },
  to: {
    type: String,
    default: '',
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
  loadingIcon: {
    type: String,
    default: () => button.default.loadingIcon,
  },
  ui: {
    type: Object as PropType<DeepPartial<typeof button> & { strategy?: Strategy }>,
    default: () => ({}),
  },
})

const extProps = computed(() => getNonUndefinedValuesFromObject(props, nuxtLinkProps))

const { ui, attrs } = useRayUI('button', toRef(props, 'ui'), button)

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
  <RayLink type="button" :disabled="disabled || loading" :class="buttonClass" v-bind="{ ...extProps, ...attrs }">
    <slot name="leading" :disabled="disabled" :loading="loading">
      <IconSpinner v-if="loading" class="mr-1" />
    </slot>
    <slot>
      <span v-if="label">{{ label }}</span>
    </slot>
  </RayLink>
</template>

<style scoped></style>
