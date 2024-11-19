<script lang="ts" setup>
import type { NavItem } from '@nuxt/content';

const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())

if (!page.value) {
  throw createError({
    statusCode: 404, statusMessage: 'Page not found', fatal: true
  })
}

const nav = inject<Ref<NavItem[]>>('navigation')
const navigation = computed(() => nav?.value)

console.log(navigation.value);

const hasToc = computed(() => page.value?.body?.toc && page.value?.body?.toc?.links.length !== 0)
</script>

<template>
  <div class="grid grid-cols-12 gap-4 pb-10">
    <div class="col-span-12" :class="{ 'md:col-span-9': hasToc }">
      <div>
        <h1 class="text-3xl text-primary font-medium">{{ page?.title || 'untitled' }}</h1>
        <p v-if="page?.description" class="text-lg text-neutral-500 mt-2">{{ page.description }}</p>
      </div>
      <hr class="my-4 dark:border-neutral-700" />
      <div class="doc-body">
        <ContentRenderer v-if="page?.body" :value="page" />
      </div>
    </div>
    <div v-if="hasToc" class="hidden" :class="{ 'col-span-3 md:block': hasToc }">
      <div class="bg-neutral-50 dark:bg-neutral-800/50 rounded-lg px-4 py-3 overflow-hidden overflow-y-auto sticky top-[calc(64px+16px)]">
        <span class="text-xs text-neutral-600 dark:text-neutral-300 font-medium inline-block mb-2">
          Table of contents
        </span>
        <Toc :toc="page!.body!.toc!.links" />
      </div>
    </div>
  </div>
</template>

<style>
.doc-body {
  @apply prose prose-neutral dark:prose-invert max-w-none prose-headings:no-underline;

  hr {
    @apply my-8 border-t border-neutral-200 dark:border-neutral-700;
  }

  h1 {
    @apply text-3xl text-primary font-bold my-4 first:mt-0;
  }

  h2 a,
  h3 a,
  h4 a,
  h5 a,
  h6 a {
    text-decoration: none;
  }

  &>p {
    @apply text-base text-justify text-neutral-900 dark:text-neutral-100;
  }
}
</style>
