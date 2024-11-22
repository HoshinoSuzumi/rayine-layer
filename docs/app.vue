<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())

provide('navigation', navigation)
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <RayMessages />
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>
