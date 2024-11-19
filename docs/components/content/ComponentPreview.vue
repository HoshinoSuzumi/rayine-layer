<script lang="ts" setup>
import FileTypeVue from "../icon/VscodeIconsFileTypeVue.vue"
import FileTypeTypescript from "../icon/VscodeIconsFileTypeTypescriptOfficial.vue"
import FileTypeJavascript from "../icon/VscodeIconsFileTypeJsOfficial.vue"
import TablerTerminal from "../icon/TablerTerminal.vue";
import { camelCase, kebabCase, upperFirst } from "scule";

const route = useRoute();

const slots = defineSlots<{
  default?: () => VNode[];
}>();

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
const componentProps = reactive({ ...props.props })

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
  return code;
})

const { data: codeRender, error: codeRenderError } = await useAsyncData(`${componentName}-renderer-${JSON.stringify({ slots: slots, code: code.value })}`, async () => {
  let formatted = ''
  try {
    // @ts-ignore
    formatted = await $prettier.format(code.value, {
      trailingComma: 'none',
      semi: false,
      singleQuote: true
    })
  } catch {
    formatted = code.value
  }

  return parseMarkdown(formatted, {
  })
}, {
  watch: [code]
})
</script>

<template>
  <div class="border border-neutral-200 dark:border-neutral-700 rounded-lg not-prose my-2 overflow-hidden">
    <div v-if="filename" class="p-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
      <span class="flex items-center gap-1">
        <component v-if="lang" :is="IconComponents[lang]" class="inline" />
        <span class="text-sm text-neutral-500 dark:text-neutral-400">{{ filename }}</span>
      </span>
    </div>

    <div :class="['p-4 overflow-auto', !!codeRender ? 'border-b border-neutral-200 dark:border-neutral-700' : '']">
      <component :is="componentName" v-bind="componentProps">
        <slot></slot>
      </component>
    </div>

    <template v-if="codeRender || codeRenderError">
      <div class="overflow-auto">
        <ContentRenderer v-if="codeRender" :value="codeRender" class="p-4 bg-neutral-50 dark:bg-neutral-800/50" />
        <pre class="p-4" v-if="codeRenderError">{{ codeRenderError }}</pre>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
