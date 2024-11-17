<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  accentTitle: {
    type: Boolean,
    default: false,
  },
  padTop: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div>
    <h1 v-if="title" class="font-medium" :class="{ 'mt-8': padTop, 'text-primary text-2xl font-medium': accentTitle, 'text-xl font-normal': !accentTitle }">{{ title }}</h1>
    <p v-if="description" class="text-sm text-justify">{{ description }}</p>
  </div>
</template>

<style scoped></style>
