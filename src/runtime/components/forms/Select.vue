<script lang="ts">
import { computed, defineComponent, toRef, type ComputedRef, type PropType } from 'vue'
import { twJoin, twMerge } from 'tailwind-merge'
import { select } from '../../themes'
import type { DeepPartial, SelectColor, SelectSize, SelectVariant, Strategy } from '../../types'
import { getValueByPath } from '../../utils'
import { useRayUI } from '#build/imports'

const config = select

export default defineComponent({
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Object] as PropType<string | number | object | null>,
      default: '',
    },
    name: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<SelectSize>,
      default: () => config.default.size,
    },
    color: {
      type: String as PropType<SelectColor>,
      default: () => config.default.color,
    },
    variant: {
      type: String as PropType<SelectVariant>,
      default: () => config.default.variant,
    },
    options: {
      type: Array,
      default: () => [],
    },
    labelAttr: {
      type: String,
      default: 'label',
    },
    valueAttr: {
      type: String,
      default: 'value',
    },
    ui: {
      type: Object as PropType<DeepPartial<typeof config> & { strategy?: Strategy }>,
      default: () => ({}),
    },
    class: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const { ui, attrs } = useRayUI('select', toRef(props, 'ui'), config)

    const selectClass = computed(() => {
      return twMerge(twJoin(
        ui.value.base,
        ui.value.rounded,
        ui.value.size[props.size],
        ui.value.padding[props.size],
        ui.value.variant[props.variant].replaceAll('{color}', props.color),
      ), props.class)
    })

    const normalizeOption = (option: any) => {
      if (['string', 'number', 'boolean'].includes(typeof option)) {
        return {
          [props.labelAttr]: option,
          [props.valueAttr]: option,
        }
      }
      return {
        ...option,
        [props.labelAttr]: getValueByPath(option, props.labelAttr, ''),
        [props.valueAttr]: getValueByPath(option, props.valueAttr, ''),
      }
    }

    const normalizedOptions = computed(() => {
      return props.options.map(normalizeOption)
    })

    const normalizedPlaceholderOptions = computed(() => {
      if (props.placeholder) {
        return [
          {
            [props.labelAttr]: props.placeholder,
            [props.valueAttr]: '',
            disabled: true,
          },
          ...normalizedOptions.value,
        ]
      }

      return normalizedOptions.value
    })

    const normalizedValue = computed(() => {
      const modelValueNormalized = normalizeOption(props.modelValue)
      const matchedOption = normalizedPlaceholderOptions.value.find(option => option[props.valueAttr] === modelValueNormalized[props.valueAttr])
      if (!matchedOption) {
        return ''
      }
      return matchedOption[props.valueAttr]
    })

    const onInput = (event: Event) => {
      emit('update:modelValue', (event.target as HTMLInputElement).value)
    }

    const onChange = (event: Event) => {
      emit('change', (event.target as HTMLInputElement).value)
    }

    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      selectClass,
      normalizedOptions,
      normalizedPlaceholderOptions,
      normalizedValue,
      onInput,
      onChange,
    }
  },
})
</script>

<template>
  <div :class="ui.wrapper">
    <select :class="selectClass" v-bind="attrs" @input="onInput" @change="onChange">
      <option
        v-for="(option, k) in normalizedPlaceholderOptions"
        :key="k"
        :value="option[valueAttr]"
        :disabled="option.disabled"
        :selected="option[valueAttr] === normalizedValue"
      >
        {{ option[labelAttr] }}
      </option>
    </select>
  </div>
</template>
