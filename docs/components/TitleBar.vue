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
    <NuxtLink to="/" class="flex items-center gap-2 text-neutral-900 dark:text-neutral-100 group">
      <Logo class="-mt-0.5" />
      <h1 class="flex flex-col">
        <span class="block font-medium text-xl leading-none">
          RayineUI
          <sup class="text-xs"><span class="text-primary font-medium">{{ runtimeConfig.version }}</span></sup>
        </span>
        <span class="block font-normal text-xs leading-none">
          RayineSoft Components Lib
        </span>
      </h1>
    </NuxtLink>
    <div class="flex items-center gap-4">
      <RayButton to="https://github.com/HoshinoSuzumi/rayine-ui" target="_blank" icon="tabler:brand-github" variant="ghost">
        GitHub
      </RayButton>
    </div>
  </header>
</template>

<style scoped>
#rayine .cls-1 {
  @apply !bg-white dark:bg-neutral-900;
}
</style>
