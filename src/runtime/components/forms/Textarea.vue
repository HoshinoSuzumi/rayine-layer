<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRef, watch, type PropType } from 'vue'
import { twMerge, twJoin } from 'tailwind-merge'
import defu from 'defu'
import { textarea } from '../../ui.config'
import type { DeepPartial, Strategy, TextareaColor, TextareaModelModifiers, TextareaSize, TextareaVariant } from '../../types'
import { useRayUI } from '#build/imports'

const config = textarea

export default defineComponent({
  props: {
    modelValue: {
      type: [String, Number] as PropType<string | number | null>,
      default: '',
    },
    size: {
      type: String as PropType<TextareaSize>,
      default: config.default.size,
    },
    variant: {
      type: String as PropType<TextareaVariant>,
      default: config.default.variant,
    },
    color: {
      type: String as PropType<TextareaColor>,
      default: config.default.color,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    autofocusDelay: {
      type: Number,
      default: 100,
    },
    placeholder: {
      type: String,
      default: null,
    },
    rows: {
      type: Number,
      default: 3,
    },
    autosize: {
      type: Boolean,
      default: false,
    },
    maxrows: {
      type: Number,
      default: 0,
    },
    padded: {
      type: Boolean,
      default: true,
    },
    resize: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
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
      type: Object as PropType<TextareaModelModifiers>,
      default: () => ({}),
    },
  },
  emits: [
    'update:modelValue',
    'blur',
    'change',
  ],
  setup(props, { emit }) {
    const { ui, attrs } = useRayUI('textarea', toRef(props, 'ui'), config)
    const modelModifiers = ref(defu({}, props.modelModifiers, { lazy: false, number: false, trim: false }))

    const textarea = ref<HTMLTextAreaElement | null>(null)

    const baseClass = computed(() => {
      return twMerge(twJoin(
        ui.value.base,
        ui.value.rounded,
        ui.value.placeholder,
        ui.value.size[props.size],
        props.padded && ui.value.padding[props.size],
        ui.value.variant[props.variant].replaceAll('{color}', props.color),
        !props.resize && 'resize-none',
      ), props.class)
    })

    const autoResize = () => {
      if (!props.autosize) return
      if (!textarea.value) return
      textarea.value.rows = props.rows
      const overflowBefore = textarea.value.style.overflow
      textarea.value.style.overflow = 'hidden'

      const style = window.getComputedStyle(textarea.value)
      const padding = Number.parseInt(style.paddingTop) + Number.parseInt(style.paddingBottom)
      const lineHeight = Number.parseInt(style.lineHeight)
      const { scrollHeight, clientHeight } = textarea.value
      const computedRows = Math.floor((scrollHeight - padding) / lineHeight)
      if (computedRows > props.rows) {
        textarea.value.rows = props.maxrows ? Math.min(computedRows, props.maxrows) : computedRows
      }
      textarea.value.style.overflow = overflowBefore
    }

    const updateValue = (value: string) => {
      if (modelModifiers.value.trim) {
        value = value.trim()
      }

      if (modelModifiers.value.number) {
        const n = Number.parseFloat(value)
        value = (Number.isNaN(n) ? value : n) as any
      }

      emit('update:modelValue', value)
    }

    const onInput = (e: Event) => {
      autoResize()
      if (modelModifiers.value.lazy) return
      updateValue((e.target as HTMLInputElement).value)
    }

    const onChange = (e: Event) => {
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

    watch(() => props.modelValue, () => {
      autoResize()
    })

    onMounted(() => {
      if (props.autofocus) {
        setTimeout(() => {
          textarea.value?.focus()
        }, props.autofocusDelay)
      }
      autoResize()
    })

    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      textarea,
      baseClass,
      onInput,
      onChange,
      onBlur,
    }
  },
})
</script>

<template>
  <div :class="ui.wrapper">
    <textarea
      ref="textarea"
      :class="baseClass"
      :rows="rows"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="modelValue"
      v-bind="attrs"
      @input="onInput"
      @change="onChange"
      @blur="onBlur"
    />
  </div>
</template>
