<script lang="ts" setup>
import { withoutTrailingSlash } from 'ufo'

const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())

if (!page.value) {
  throw createError({
    statusCode: 404, statusMessage: 'Page not found', fatal: true,
  })
}

const hasToc = computed(() => page.value?.body?.toc && page.value?.body?.toc?.links.length !== 0)

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryContent()
    .where({
      _extension: 'md',
      navigation: {
        $ne: false,
      },
    })
    .only(['title', 'description', '_path'])
    .findSurround(withoutTrailingSlash(route.path))
})
</script>

<template>
  <div class="grid grid-cols-12 gap-4 pb-10">
    <div class="hidden col-span-2 md:block">
      <nav class="ml-1">
        <ContentNavigation v-slot="{ navigation }">
          <ul class="space-y-2">
            <li v-for="link of navigation" :key="link._path">
              <NuxtLink :to="link._path" class="text-sm text-neutral-600 dark:text-neutral-300 font-medium">
                {{ link.title }}
              </NuxtLink>
              <ul v-if="link.children" class="pl-4 pt-2 space-y-1">
                <li v-for="child in link.children" :key="child._path">
                  <NuxtLink
                    :to="child._path"
                    class="text-sm text-neutral-500 dark:text-neutral-400"
                    active-class="text-primary font-medium"
                  >
                    {{ child.title }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </ContentNavigation>
      </nav>
    </div>

    <div class="col-span-12" :class="[hasToc ? 'md:col-span-8' : 'md:col-span-10']">
      <div>
        <h1 class="text-3xl text-primary font-medium">
          {{ page?.title || 'untitled' }}
        </h1>
        <p v-if="page?.description" class="text-lg text-neutral-500 dark:text-neutral-400 mt-2">
          {{ page.description }}
        </p>
      </div>
      <hr class="my-4 dark:border-neutral-700">
      <div class="doc-body">
        <ContentRenderer v-if="page?.body" :value="page" />
      </div>

      <div
        class="w-full flex justify-between gap-4 mt-12 pt-12 border-t border-t-neutral-200 dark:border-t-neutral-700"
      >
        <div class="flex-1">
          <NuxtLink v-if="surround?.[0]" :to="surround[0]._path" class="surround-btn">
            <div>
              <span class="tip">Previous</span>
              <span class="title">{{ surround[0].title }}</span>
              <span v-if="surround[0].description" class="description">{{ surround[0].description }}</span>
            </div>
          </NuxtLink>
        </div>
        <div class="flex-1">
          <NuxtLink v-if="surround?.[1]" :to="surround[1]._path" class="surround-btn next">
            <div>
              <span class="tip">Next</span>
              <span class="title">{{ surround[1].title }}</span>
              <span v-if="surround[1].description" class="description">{{ surround[1].description }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-if="hasToc" class="hidden" :class="{ 'col-span-2 md:block': hasToc }">
      <div
        class="bg-neutral-50 dark:bg-neutral-800/50 rounded-lg px-4 py-3 overflow-hidden overflow-y-auto sticky top-[calc(64px+16px)]"
      >
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
  @apply prose prose-neutral dark:prose-invert max-w-none prose-headings:no-underline prose-p:text-justify;

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
}

.surround-btn {
  @apply font-medium;

  div {
    @apply bg-neutral-100 dark:bg-neutral-800 rounded-lg px-8 py-6 w-full flex flex-col gap-0 border border-transparent;

    &:hover {
      @apply border-primary;
    }
  }

  &.next div {
    @apply items-end text-right;
  }

  .tip {
    @apply text-xs text-primary;
  }

  .title {
    @apply text-base;
  }

  .description {
    @apply pt-2 text-sm font-normal text-neutral-500 dark:text-neutral-400;
  }
}
</style>
