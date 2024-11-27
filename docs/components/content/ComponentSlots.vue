<script lang="ts" setup>
import { camelCase, upperFirst } from 'scule'

const route = useRoute()

const props = defineProps({
  slug: {
    type: String,
    default: null,
  },
})

const slug = props.slug || route.params.slug[route.params.slug.length - 1]
const componentCamelName = camelCase(slug)
const componentName = `Ray${upperFirst(componentCamelName)}`

const meta = await fetchComponentMeta(componentName)
</script>

<template>
  <div class="flex flex-col not-prose font-mono divide-y divide-gray-100 dark:divide-gray-800">
    <div v-for="(slot, k) in meta?.meta?.slots" :key="k" class="py-2">
      <pre>{{ slot }}</pre>
    </div>
  </div>
</template>
