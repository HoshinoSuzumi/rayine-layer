<script lang="ts" setup>
import { camelCase, kebabCase, upperFirst } from 'scule'
import FileTypeVue from '../icon/VscodeIconsFileTypeVue.vue'
import FileTypeTypescript from '../icon/VscodeIconsFileTypeTypescriptOfficial.vue'
import FileTypeJavascript from '../icon/VscodeIconsFileTypeJsOfficial.vue'
import TablerTerminal from '../icon/TablerTerminal.vue'

const route = useRoute()
const appConfig = useAppConfig()

const IconComponents = {
  'vue': FileTypeVue,
  'vue-html': FileTypeVue,
  'sh': TablerTerminal,
  'ts': FileTypeTypescript,
  'js': FileTypeJavascript,
}

const props = defineProps({
  slug: {
    type: String,
    default: '',
  },
  props: {
    type: Object,
    default: () => ({}),
  },
  slots: {
    type: Object,
    default: () => ({}),
  },
  filename: {
    type: String,
    default: '',
  },
  lang: {
    type: String as PropType<keyof typeof IconComponents>,
    default: '',
  },
})


const componentName = props.slug || `Ray${upperFirst(camelCase(route.params.slug[route.params.slug.length - 1]))}`
const componentMeta = await fetchComponentMeta(componentName)

const componentProps = reactive({ ...props.props })

const customizableOptions = (key: string, schema: { kind: string, type: string, schema: [] }) => {
  let options: string[] = [];
  const invalidTypes = ['string', 'array', 'boolean', 'object', 'number', 'Function']
  const hasInvalidType = schema?.type?.split('|')?.map(item => item.trim()?.replaceAll('"', ''))?.some(type => invalidTypes.includes(type))
  const schemaOptions = Object.values(schema?.schema || {})

  if (key.toLowerCase().endsWith('color')) {
    options = [...appConfig.rayui.colors]
  }

  if (key.toLowerCase() === 'size' && schemaOptions?.length) {
    const baseSizeOrder = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 };
    schemaOptions.sort((a: string, b: string) => {
      const [aBase, aNum] = [(a.match(/[a-z]+/i)?.[0].toLowerCase() || 'xs') as keyof typeof baseSizeOrder, parseInt(a.match(/\d+/)?.[0] || '1')];
      const [bBase, bNum] = [(b.match(/[a-z]+/i)?.[0].toLowerCase() || 'xs') as keyof typeof baseSizeOrder, parseInt(b.match(/\d+/)?.[0] || '1')];
      return aBase === bBase
        ? (aBase === 'xs' ? bNum - aNum : aNum - bNum)
        : baseSizeOrder[aBase] - baseSizeOrder[bBase];
    });
  }

  if (schemaOptions?.length > 0 && schema?.kind === 'enum' && !hasInvalidType) {
    options = schemaOptions.filter(option => option !== 'undefined' && typeof option === 'string').map((option: string) => option.replaceAll('"', ''))
  }

  return options
}

const customizableProps = computed(() => Object.keys(componentProps).map(k => {
  const prop = componentMeta?.meta?.props?.find((prop: any) => prop.name === k)
  const schema = prop?.schema || {}
  const options = customizableOptions(k, schema)
  return {
    name: k,
    type: prop?.type,
    label: camelCase(k),
    options,
  }
}))

const code = computed(() => {
  let code = `\`\`\`html
<template>
  <${componentName}`

  for (const [k, v] of Object.entries(componentProps)) {
    code += ` ${typeof v === 'boolean' || typeof v === 'number' || typeof v === 'object' ? ':' : ''}${kebabCase(k)}="${typeof v === 'object' ? renderObject(v) : v}"`
  }

  code += `/>\n</template>
\`\`\`
  `
  return code
})

const { data: codeRender, error: codeRenderError } = await useAsyncData(`${componentName}-renderer-${JSON.stringify({ slots: props.slots, code: code.value })}`, async () => {
  let formatted = ''
  try {
    // @ts-ignore
    formatted = await $prettier.format(code.value, {
      trailingComma: 'none',
      semi: false,
      singleQuote: true,
    })
  }
  catch {
    formatted = code.value
  }

  return parseMarkdown(formatted, {
  })
}, {
  watch: [code],
})
</script>

<template>
  <div class="border border-neutral-200 dark:border-neutral-700 rounded-lg not-prose my-2 overflow-hidden">
    <div v-if="filename" class="p-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
      <span class="flex items-center gap-1">
        <component :is="IconComponents[lang]" v-if="lang" class="inline" />
        <span class="text-sm text-neutral-500 dark:text-neutral-400">{{ filename }}</span>
      </span>
    </div>

    <div :class="['p-4 overflow-auto', !!codeRender ? 'border-b border-neutral-200 dark:border-neutral-700' : '']">
      <component :is="componentName" v-bind="componentProps">
        <slot />
      </component>
    </div>

    <div v-if="customizableProps.length > 0" class="border-b border-neutral-200 dark:border-neutral-700 flex">
      <div v-for="prop in customizableProps" class="px-2 py-0.5 flex flex-col gap-0.5 border-r dark:border-neutral-700">
        <label :for="`${prop.name}-prop`" class="text-sm text-neutral-400">{{ prop.name }}</label>
        <input v-if="prop.type.startsWith('boolean')" type="checkbox" :id="`${prop.name}-prop`" class="mt-1 mb-2"
          v-model="componentProps[prop.name]" />
        <select v-else-if="prop.options.length > 0" :id="`${prop.name}-prop`" v-model="componentProps[prop.name]">
          <option v-for="option in prop.options" :key="option" :value="option">{{ option }}</option>
        </select>
        <input v-else type="text" :id="`${prop.name}-prop`" v-model="componentProps[prop.name]"
          placeholder="type something..." />
      </div>
    </div>

    <template v-if="codeRender || codeRenderError">
      <div class="overflow-auto bg-neutral-50 dark:bg-neutral-800/50">
        <ContentRenderer v-if="codeRender" :value="codeRender" class="p-4" />
        <pre v-if="codeRenderError" class="p-4">{{ codeRenderError }}</pre>
      </div>
    </template>
  </div>
</template>

<style scoped>
input,
select {
  @apply text-sm outline-none border-none bg-transparent;
}
</style>
