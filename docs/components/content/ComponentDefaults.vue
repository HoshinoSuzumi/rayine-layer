<script lang="ts" setup>
import { camelCase, upperFirst } from 'scule'
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

const { data: defaultsRender } = await useAsyncData(`${componentName}-defaults`, () => parseMarkdown(`
\`\`\`json
${JSON.stringify(defaults, null, 2)}
\`\`\`
`, {}))
</script>

<template>
  <ContentRenderer v-if="defaultsRender?.body" :value="defaultsRender" />
</template>

<style scoped>

</style>
