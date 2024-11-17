<script lang="ts" setup>
// const appConfig = useAppConfig();
// appConfig.rayui.primary = 'red';
</script>

<template>
  <header class="w-full flex justify-between items-center py-2 border-b border-b-neutral-100 dark:border-b-neutral-800">
    <div class="text-neutral-900 dark:text-neutral-100">
      <h1 class="font-medium text-xl">RayineSoft<sup class="text-sm"> &copy;</sup></h1>
      <h2 class="font-normal text-xs">Common Components</h2>
    </div>
    <div class="flex items-center gap-4">
      <NuxtLink to="/" class="text-neutral-400 dark:text-neutral-500"
        active-class="!text-neutral-700 dark:!text-neutral-300">Docs</NuxtLink>
      <NuxtLink to="/installation" class="text-neutral-400 dark:text-neutral-500"
        active-class="!text-neutral-700 dark:!text-neutral-300">Installation</NuxtLink>
    </div>
  </header>
</template>

<style scoped></style>
