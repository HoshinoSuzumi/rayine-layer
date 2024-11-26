<script setup lang="ts">
const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
  style: {
    type: [String, Object],
    default: null,
  },
})

const iconNameLangMapping: Record<string, string> = {
  'default': 'tabler:file',
  'vue': 'vscode-icons:file-type-vue',
  'vue-html': 'vscode-icons:file-type-vue',
  'bash': 'tabler:terminal',
  'sh': 'tabler:terminal',
  'ts': 'vscode-icons:file-type-typescript-official',
  'js': 'vscode-icons:file-type-js-official',
  'json': 'vscode-icons:file-type-json',
}

const iconNameFilenameMapping: Record<string, string> = {
  'nuxt.config.ts': 'vscode-icons:file-type-nuxt',
}

const resolvedIconName = computed(() => {
  if (!props.language) {
    return iconNameLangMapping['default']
  }

  if (props.filename.endsWith('.vue')) {
    return iconNameLangMapping['vue']
  }

  if (iconNameFilenameMapping[props.filename]) {
    return iconNameFilenameMapping[props.filename]
  }

  if (iconNameLangMapping[props.language]) {
    return iconNameLangMapping[props.language]
  }

  return iconNameLangMapping['default']
})
</script>

<template>
  <div data-prose-pre class="pre rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
    <div v-if="filename" class="p-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
      <span class="flex items-center gap-1">
        <RayIcon v-if="resolvedIconName" :name="resolvedIconName" class="inline" />
        <span class="text-sm text-neutral-500 dark:text-neutral-400">{{ filename }}</span>
      </span>
    </div>
    <ProseCode
      data-prose-precode
      :code="code"
      :language="language"
      :filename="filename"
      :highlights="highlights"
      :meta="meta"
    >
      <pre data-prose-pre-inner-pre :class="$props.class" :style="style"><slot /></pre>
    </ProseCode>
  </div>
</template>

<style>
pre code .line {
  display: block;
  min-height: 1rem
}
</style>
