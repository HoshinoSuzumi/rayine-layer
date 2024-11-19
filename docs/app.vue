<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())

provide('navigation', navigation)
</script>

<template>
  <RayMessageProvider>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </RayMessageProvider>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>
