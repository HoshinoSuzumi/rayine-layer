<script lang="ts">
import { computed, defineComponent, toRef, type PropType } from 'vue'
import { twJoin, twMerge } from 'tailwind-merge'
import { toggle } from '../../ui.config'
import type { DeepPartial, Strategy, ToggleColor, ToggleSize } from '../../types'
import { useRayUI } from '#build/imports'

const config = toggle

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean as PropType<boolean | null>,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<ToggleSize>,
      default: config.default.size,
    },
    color: {
      type: String as PropType<ToggleColor>,
      default: config.default.color,
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
  emits: [
    'update:modelValue',
    'change',
  ],
  setup(props, { emit }) {
    const { ui, attrs } = useRayUI('toggle', toRef(props, 'ui'), config)

    const checked = computed({
      get: () => props.modelValue,
      set: (value: boolean) => {
        emit('update:modelValue', value)
        emit('change', value)
      },
    })

    const toggleClass = computed(() => {
      return twMerge(twJoin(
        ui.value.base,
        props.rounded ? 'rounded-full' : ui.value.rounded,
        ui.value.size[props.size],
        ui.value.ring.replaceAll('{color}', props.color),
        checked.value ? ui.value.active.replaceAll('{color}', props.color) : ui.value.inactive,
      ), props.class)
    })

    const bulletClass = computed(() => {
      return twJoin(
        ui.value.bullet.base,
        props.rounded ? 'rounded-full' : ui.value.bullet.rounded,
        ui.value.bullet.shadow,
        ui.value.bullet.size[props.size],
        !props.disabled && ui.value.bullet.translate[props.size],
        checked.value ? ui.value.bullet.active[props.size] : ui.value.bullet.inactive,
      )
    })

    const handleClick = () => {
      if (!props.disabled) {
        checked.value = !checked.value
      }
    }

    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      checked,
      toggleClass,
      bulletClass,
      handleClick,
    }
  },
})
</script>

<template>
  <button :class="toggleClass" :disabled="disabled" v-bind="attrs" @click="handleClick">
    <span :class="bulletClass" />
  </button>
</template>
