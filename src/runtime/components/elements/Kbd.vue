<script lang="ts">
import { computed, defineComponent, toRef, type PropType } from 'vue'
import { twJoin, twMerge } from 'tailwind-merge'
import { kbd } from '../../themes'
import type { DeepPartial, KbdSize, Strategy } from '../../types'
import { useRayUI } from '#build/imports'

const config = kbd

export default defineComponent({
  props: {
    label: {
      type: String,
      default: null,
    },
    size: {
      type: String as PropType<KbdSize>,
      default: config.default.size,
    },
    shadow: {
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
  },
  setup(props) {
    const { ui, attrs } = useRayUI('kbd', toRef(props, 'ui'), config)

    const kbdClass = computed(() => {
      return twMerge(twJoin(
        ui.value.base,
        ui.value.background,
        ui.value.rounded,
        ui.value.font,
        ui.value.padding,
        ui.value.ring,
        props.shadow && ui.value.shadow,
        ui.value.size[props.size],
      ), props.class)
    })

    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      kbdClass,
    }
  },
})
</script>

<template>
  <kbd :class="kbdClass" v-bind="attrs">
    <slot>{{ label }}</slot>
  </kbd>
</template>
