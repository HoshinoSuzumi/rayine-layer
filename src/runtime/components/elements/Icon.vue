<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    mode: {
      type: String as PropType<'svg' | 'css'>,
      required: false,
      default: null,
    },
    size: {
      type: [String, Number],
      required: false,
      default: null,
    },
    customize: {
      type: Function,
      required: false,
      default: null,
    },
  },
})
</script>

<template>
  <Icon v-bind="$props" />
</template>
