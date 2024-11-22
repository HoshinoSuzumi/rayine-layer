<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())

provide('navigation', navigation)
</script>

<template>
  <RayMessages>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </RayMessages>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>
