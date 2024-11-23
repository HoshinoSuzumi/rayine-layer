<template>
  <div class="bg-neutral-50 dark:bg-neutral-800/50 not-prose text-sm" data-prose-code>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: null
  },
  filename: {
    type: String,
    default: null
  },
  highlights: {
    type: Array as () => number[],
    default: () => []
  },
  meta: {
    type: String,
    default: null
  }
})
</script>

<style>
pre {
  @apply p-0 py-2;
}

pre code .line {
  @apply block min-h-4 px-4;
}

pre code .line.highlight {
  @apply !bg-gray-200/50 dark:!bg-gray-800;
}


</style>
