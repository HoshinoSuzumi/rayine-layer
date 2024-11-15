<script lang="ts" setup>
const message = useMessage();

const count = ref(1)

const info = () => {
  message.info(`message ${count.value++}`);
}
</script>

<template>
  <div class="flex flex-col items-start gap-12">

    <div class="w-full flex flex-col gap-4">
      <div>
        <h1 class="font-medium text-xl text-indigo-400">Message</h1>
        <p class="text-sm">Message component like a toast</p>
      </div>

      <div class="border border-neutral-200 dark:border-neutral-700 rounded-lg">
        <div class="p-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
          <span class="flex items-center gap-1">
            <IconVscodeIconsFileTypeVue class="inline" />
            <span class="text-sm text-neutral-500 dark:text-neutral-400">app.vue</span>
          </span>
        </div>
        <div class="p-4">
          <Shiki class="text-sm" lang="vue-html" :code="`<template>
  <RayMessageProvider>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </RayMessageProvider>
</template>`" />
        </div>
      </div>
      <div class="border border-neutral-200 dark:border-neutral-700 rounded-lg">
        <div class="p-4 border-b border-neutral-200 dark:border-neutral-700">
          <button class="bg-indigo-400 text-white border border-indigo-400 px-2 py-0.5 rounded-lg"
            @click="info">info</button>
        </div>
        <div class="p-4">
          <Shiki class="text-sm" lang="ts" :code="`const message = useMessage();\n\nmessage.info('Hello Rayine');`" />
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped></style>
