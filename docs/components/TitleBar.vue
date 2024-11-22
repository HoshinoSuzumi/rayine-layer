<script lang="ts" setup>
// const appConfig = useAppConfig();
// appConfig.rayui.primary = 'red';
const route = useRoute()
</script>

<template>
  <header
    class="w-full flex justify-between items-center py-2 h-16 z-50 border-b sticky top-0 bg-white dark:bg-neutral-900 transition-colors"
    :class="[route.path !== '/' ? 'border-b-neutral-200 dark:border-b-neutral-700' : 'border-b-transparent dark:border-b-transparent']"
  >
    <NuxtLink to="/" class="text-neutral-900 dark:text-neutral-100">
      <h1 class="font-medium text-xl">
        RayineSoft<sup class="text-sm"> &copy;</sup>
      </h1>
      <h2 class="font-normal text-xs">
        Common Components
      </h2>
    </NuxtLink>
    <div class="flex items-center gap-4">
      <NuxtLink
        to="/getting-started"
        class="text-neutral-400 dark:text-neutral-500"
        active-class="!text-neutral-700 dark:!text-neutral-300"
      >Docs</NuxtLink>
    </div>
  </header>
</template>

<style scoped></style>
