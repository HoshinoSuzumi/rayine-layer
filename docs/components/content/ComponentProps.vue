<script lang="ts" setup>
import type { ComponentMeta } from 'vue-component-meta'
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
const metaProps: ComputedRef<ComponentMeta['props']> = computed(() => meta?.meta?.props || [])
</script>

<template>
  <ProseTable>
    <ProseThead>
      <ProseTr>
        <ProseTh>Prop</ProseTh>
        <ProseTh>Default</ProseTh>
        <ProseTh>Type</ProseTh>
      </ProseTr>
    </ProseThead>
    <ProseTbody>
      <ProseTr v-for="prop in metaProps" :key="prop.name">
        <ProseTd>
          {{ prop.name }}
        </ProseTd>
        <ProseTd>
          <ProseCodeInline v-if="prop.default">
            {{ prop.default }}
          </ProseCodeInline>
        </ProseTd>
        <ProseTd>
          <ProseCodeInline v-if="prop.type">
            {{ prop.type }}
          </ProseCodeInline>
          <MDC v-if="prop.description" :value="prop.description" class="text-gray-500 dark:text-gray-400" />
        </ProseTd>
      </ProseTr>
    </ProseTbody>
  </ProseTable>
</template>
