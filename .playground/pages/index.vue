<script lang="ts" setup>
const message = useMessage();
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
          <div class="flex items-center gap-2">
            <button class="bg-indigo-400 text-white text-sm border border-indigo-400 px-2.5 py-1 rounded-lg"
              @click="message.info('message info', 10000)">Info 10s</button>
            <button class="bg-indigo-400 text-white text-sm border border-indigo-400 px-2.5 py-1 rounded-lg"
              @click="message.success('message success')">Success</button>
            <button class="bg-indigo-400 text-white text-sm border border-indigo-400 px-2.5 py-1 rounded-lg"
              @click="message.warning('message warning')">Warning</button>
            <button class="bg-indigo-400 text-white text-sm border border-indigo-400 px-2.5 py-1 rounded-lg"
              @click="message.error('message error')">Error</button>
          </div>
        </div>
        <div class="p-4">
          <Shiki class="text-sm" lang="ts" :code="`const message = useMessage();\n
message.info('message info', 10000);
message.success('message success');
message.warning('message warning');
message.error('message error');`" />
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped></style>
