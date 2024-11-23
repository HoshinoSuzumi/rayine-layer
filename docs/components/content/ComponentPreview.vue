<script lang="ts" setup>
import { camelCase, kebabCase, upperFirst } from 'scule'

const route = useRoute()
const appConfig = useAppConfig()
const { $prettier } = useNuxtApp()

const props = defineProps({
  slug: {
    type: String,
    default: '',
  },
  props: {
    type: Object,
    default: () => ({}),
  },
  privateProps: {
    type: Object,
    default: () => ({}),
  },
  excludedProps: {
    type: Array,
    default: () => [],
  },
  slots: {
    type: Object,
    default: () => ({}),
  },
  options: {
    type: Array as PropType<{ name: string, values: string[], restriction: 'expected' | 'included' | 'excluded' | 'only' }[]>,
    default: () => [],
  },
})

const componentName = props.slug || `Ray${upperFirst(camelCase(route.params.slug[route.params.slug.length - 1]))}`
const componentMeta = await fetchComponentMeta(componentName)

const privateProps = reactive({ ...props.privateProps })
const componentProps = reactive({ ...props.props })

const componentFullProps = computed(() => ({ ...componentProps, ...privateProps }))
const componentVModel = computed({
  get: () => privateProps.modelValue,
  set: (value) => {
    privateProps.modelValue = value
  },
})

const customizableOptions = (key: string, schema: { kind: string, type: string, schema: [] }) => {
  let options: string[] = []
  const optionItem = props?.options?.find(item => item?.name === key) || null
  const types = schema?.type?.split('|')?.map(item => item.trim()?.replaceAll('"', '')) || []
  const invalidTypes = ['string', 'number', 'boolean', 'array', 'object', 'Function', 'undefined']
  const hasInvalidType = types?.every(type => invalidTypes.includes(type))

  if (key.toLowerCase().endsWith('color')) {
    options = [...appConfig.rayui.colors]
  }

  const schemaOptions = Object.values(schema?.schema || {})

  if (key.toLowerCase() === 'size' && schemaOptions?.length) {
    const baseSizeOrder = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }
    schemaOptions.sort((a: string, b: string) => {
      const [aBase, aNum] = [(a.match(/[a-z]+/i)?.[0].toLowerCase() || 'xs') as keyof typeof baseSizeOrder, Number.parseInt(a.match(/\d+/)?.[0] || '1')]
      const [bBase, bNum] = [(b.match(/[a-z]+/i)?.[0].toLowerCase() || 'xs') as keyof typeof baseSizeOrder, Number.parseInt(b.match(/\d+/)?.[0] || '1')]
      return aBase === bBase
        ? (aBase === 'xs' ? bNum - aNum : aNum - bNum)
        : baseSizeOrder[aBase] - baseSizeOrder[bBase]
    })
  }

  if (schemaOptions?.length > 0 && schema?.kind === 'enum' && !hasInvalidType && optionItem?.restriction !== 'only') {
    options = schemaOptions.filter(option => typeof option === 'string' && option !== 'undefined').map((option: string) => option.replaceAll('"', ''))
  }

  if (optionItem?.restriction === 'only') {
    options = optionItem.values
  }

  if (optionItem?.restriction === 'expected') {
    options = options.filter(item => optionItem.values.includes(item))
  }

  if (optionItem?.restriction === 'included') {
    options = [...options, ...optionItem.values]
  }

  if (optionItem?.restriction === 'excluded') {
    options = options.filter(item => !optionItem.values.includes(item))
  }

  return options
}

const customizableProps = computed(() => Object.keys(componentProps).map((k) => {
  if (props.excludedProps.includes(k)) return null
  const prop = componentMeta?.meta?.props?.find((prop: any) => prop.name === k)
  const schema = prop?.schema || {}
  const options = customizableOptions(k, schema)
  return {
    name: k,
    type: prop?.type || 'string',
    label: k === 'modelValue' ? 'value' : camelCase(k),
    options,
  }
}).filter(prop => prop !== null))

const code = computed(() => {
  let code = `\`\`\`html
<template>
  <${componentName}`

  for (const [k, v] of Object.entries(componentFullProps.value)) {
    if (v === 'undefined' || v === null) {
      continue
    }

    code += ` ${(typeof v === 'boolean' && (k === 'modelValue' || v !== true)) || typeof v === 'number' || typeof v === 'object' ? ':' : ''}${k === 'modelValue' ? 'model-value' : kebabCase(k)}${k !== 'modelValue' && typeof v === 'boolean' && !!v ? '' : `="${typeof v === 'object' ? renderObject(v) : v}"`}`
  }

  code += `/>\n</template>
\`\`\`
  `
  return code
})

const { data: codeRender } = await useAsyncData(`${componentName}-code-renderer-${JSON.stringify({ props: componentProps, slots: props.slots, code: code.value })}`, async () => {
  let fortmattedCode = ''
  try {
    fortmattedCode = await $prettier.format(code.value, {
      semi: false,
      singleQuote: true,
    })
  }
  catch (e) {
    fortmattedCode = code.value
  }
  return parseMarkdown(fortmattedCode)
}, {
  watch: [code],
})
</script>

<template>
  <div class="border border-neutral-200 dark:border-neutral-700 rounded-lg not-prose my-2 overflow-hidden">
    <div :class="['p-4 overflow-auto flex', !!codeRender ? 'border-b border-neutral-200 dark:border-neutral-700' : '']">
      <component :is="componentName" v-model="componentVModel" v-bind="componentFullProps">
        <ContentSlot v-if="$slots.default" :use="$slots.default" />
        <template v-for="slot in Object.keys(slots || {})" :key="slot" #[slot]>
          <ContentSlot :name="slot" unwrap="p" />
        </template>
      </component>
    </div>

    <div v-if="customizableProps.length > 0" class="border-b border-neutral-200 dark:border-neutral-700 flex">
      <div
        v-for="(prop, k) in customizableProps"
        :key="k"
        class="px-2 py-0.5 flex flex-col gap-0.5 border-r dark:border-neutral-700"
      >
        <label :for="`${prop.name}-prop`" class="text-sm text-neutral-400">{{ prop.name }}</label>
        <input
          v-if="prop.type.startsWith('boolean')"
          :id="`${prop.name}-prop`"
          v-model="componentProps[prop.name]"
          type="checkbox"
          class="mt-1 mb-2"
        >
        <select v-else-if="prop.options.length" :id="`${prop.name}-prop`" v-model="componentProps[prop.name]">
          <option v-for="option in prop.options" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <RayInput
          v-else
          :id="`${prop.name}-prop`"
          :model-value="componentProps[prop.name]"
          :type="prop.type === 'number' ? 'number' : 'text'"
          variant="plain"
          :padded="false"
          placeholder="type something..."
          @update:model-value="val => componentProps[prop.name] = prop.type === 'number' ? Number(val) : val"
        />
      </div>
    </div>

    <ContentRenderer v-if="codeRender" :value="codeRender" class="[&_.pre]:rounded-none [&_.pre]:border-none" />
  </div>
</template>

<style scoped>
input,
select {
  @apply text-sm outline-none border-none bg-transparent;
}
</style>
