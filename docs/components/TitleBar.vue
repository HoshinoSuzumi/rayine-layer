<script lang="ts" setup>
// const appConfig = useAppConfig();
// appConfig.rayui.primary = 'red';
const route = useRoute()
const runtimeConfig = useRuntimeConfig().public
</script>

<template>
  <header
    class="w-full flex justify-between items-center py-2 h-16 z-50 border-b sticky top-0 bg-white dark:bg-neutral-900 transition-colors"
    :class="[route.path !== '/' ? 'border-b-neutral-200 dark:border-b-neutral-700' : 'border-b-transparent dark:border-b-transparent']"
  >
    <NuxtLink to="/" class="text-neutral-900 dark:text-neutral-100">
      <h1 class="font-medium text-xl">
        RayineUI<sup class="text-xs">&nbsp;<span class="text-primary font-medium">{{ runtimeConfig.version }}</span></sup>
      </h1>
      <h2 class="font-normal text-xs">
        RayineSoft Components Lib
      </h2>
    </NuxtLink>
    <div class="flex items-center gap-4">
      <NuxtLink
        to="https://github.com/HoshinoSuzumi/rayine-ui"
        target="_blank"
        class="text-neutral-400 dark:text-neutral-500"
      >GitHub</NuxtLink>
    </div>
  </header>
</template>

<style scoped></style>
