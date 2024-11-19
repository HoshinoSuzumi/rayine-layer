<script lang="ts" setup>
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())

if (!page.value) {
  throw createError({
    statusCode: 404, statusMessage: 'Page not found', fatal: true
  })
}
</script>

<template>
  <div>
    <ContentRenderer v-if="page.body" :value="page" />
  </div>
</template>

<style>
.doc-body {
  @apply prose dark:prose-invert max-w-none;

  hr {
    @apply my-8 border-t border-neutral-200 dark:border-neutral-700;
  }

  h1 {
    @apply text-3xl text-primary font-bold my-4 first:mt-0;
  }
  
  & > p {
    @apply text-base text-neutral-900 dark:text-neutral-100;
  }
}
</style>
