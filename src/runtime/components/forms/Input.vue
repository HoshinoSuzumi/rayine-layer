<script lang="ts">
import { computed, defineComponent, toRef, type PropType } from 'vue'
import { twJoin, twMerge } from 'tailwind-merge'
import defu from 'defu'
import { input } from '../../ui.config'
import type { DeepPartial, InputColor, InputModelModifiers, InputSize, InputType, InputVariant, Strategy } from '../../types/index'
import { onMounted, ref, useRayUI } from '#build/imports'

const config = input

export default defineComponent({
  props: {
    modelValue: {
      type: [String, Number] as PropType<string | number | null>,
      default: '',
    },
    type: {
      type: String as PropType<InputType>,
      default: 'text',
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    autofocusDelay: {
      type: Number,
      default: 100,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: null,
    },
    padded: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String as PropType<InputSize>,
      default: () => config.default.size,
    },
    color: {
      type: String as PropType<InputColor>,
      default: () => config.default.color,
    },
    variant: {
      type: String as PropType<InputVariant>,
      default: () => config.default.variant,
    },
    class: {
      type: String,
      default: '',
    },
    ui: {
      type: Object as PropType<DeepPartial<typeof config> & { strategy?: Strategy }>,
      default: () => ({}),
    },
    modelModifiers: {
      type: Object as PropType<InputModelModifiers>,
      default: () => ({}),
    },
  },
  emits: ['update:modelValue', 'change', 'blur'],
  setup(props, { emit }) {
    const { ui, attrs } = useRayUI('input', toRef(props, 'ui'), config)
    const modelModifiers = ref(defu({}, props.modelModifiers, { lazy: false, number: false, trim: false }))

    const input = ref<HTMLInputElement | null>(null)

    const baseClass = computed(() => {
      return twMerge(twJoin(
        ui.value.base,
        ui.value.rounded,
        ui.value.placeholder,
        ui.value.size[props.size],
        props.padded && ui.value.padding[props.size],
        ui.value.variant[props.variant].replaceAll('{color}', props.color),
      ), props.class)
    })

    const updateValue = (value: string) => {
      if (modelModifiers.value.trim) {
        value = value.trim()
      }

      if (modelModifiers.value.number || props.type === 'number') {
        const n = Number.parseFloat(value)
        value = (Number.isNaN(n) ? value : n) as any
      }

      emit('update:modelValue', value)
    }

    const onInput = (e: Event) => {
      if (modelModifiers.value.lazy) return
      updateValue((e.target as HTMLInputElement).value)
    }

    const onChange = (e: Event) => {
      if (props.type === 'file') {
        emit('change', (e.target as HTMLInputElement).files)
        return
      }
      const value = (e.target as HTMLInputElement).value
      emit('change', value)
      if (modelModifiers.value.lazy) {
        updateValue(value)
      }
      if (modelModifiers.value.trim) {
        (e.target as HTMLInputElement).value = value.trim()
      }
    }

    const onBlur = (e: Event) => {
      emit('blur', e)
    }

    onMounted(() => {
      if (props.autofocus) {
        setTimeout(() => {
          input.value?.focus()
        }, props.autofocusDelay)
      }
    })

    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      baseClass,
      input,
      onInput,
      onChange,
      onBlur,
    }
  },
})
</script>

<template>
  <div :class="type === 'hidden' ? 'hidden' : ui.wrapper">
    <input
      ref="input"
      :type="type"
      :class="baseClass"
      :disabled="disabled"
      :placeholder="placeholder"
      :required="required"
      v-bind="type === 'file' ? attrs : { ...attrs, value: modelValue }"
      @input="onInput"
      @change="onChange"
      @blur="onBlur"
    >
  </div>
</template>

<style scoped></style>
