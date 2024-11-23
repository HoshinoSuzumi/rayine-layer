<script lang="ts" setup>
import { camelCase, upperFirst } from 'scule'
import json5 from 'json5'
import * as config from '#rayui/ui.config'

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

const defaults = config[componentCamelName as keyof typeof config]

const { data: defaultsRender } = await useAsyncData(`${componentName}-defaults`, () => {
  return parseMarkdown(`
\`\`\`yaml
${json5.stringify(defaults, null, 2).replace(/,(\s+[}\]|])/g, '$1')}
\`\`\`
`)
})
</script>

<template>
  <ContentRenderer :value="defaultsRender!" />
</template>

<style>
pre.shiki > code > span {
  @apply text-wrap break-words;
}
</style>
