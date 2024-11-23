<script setup lang="ts">
import FileTypeVue from '../../icon/VscodeIconsFileTypeVue.vue'
import FileTypeTypescript from '../../icon/VscodeIconsFileTypeTypescriptOfficial.vue'
import FileTypeJavascript from '../../icon/VscodeIconsFileTypeJsOfficial.vue'
import TablerTerminal from '../../icon/TablerTerminal.vue'
import TablerFile from '~/components/icon/TablerFile.vue';
import VscodeIconsFileTypeJson from '~/components/icon/VscodeIconsFileTypeJson.vue';
import VscodeIconsFileTypeNuxt from '~/components/icon/VscodeIconsFileTypeNuxt.vue';

const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: null
  },
  filename: {
    type: String,
    default: null
  },
  highlights: {
    type: Array as () => number[],
    default: () => []
  },
  meta: {
    type: String,
    default: null
  },
  class: {
    type: String,
    default: null
  },
  style: {
    type: [String, Object],
    default: null
  }
})

const mapIconLanguage = {
  'default': TablerFile,
  'vue': FileTypeVue,
  'vue-html': FileTypeVue,
  'bash': TablerTerminal,
  'sh': TablerTerminal,
  'ts': FileTypeTypescript,
  'js': FileTypeJavascript,
  'json': VscodeIconsFileTypeJson
}

const mapIconFilename = {
  'nuxt.config.ts': VscodeIconsFileTypeNuxt
}

const resolveIcon = computed(() => {
  if (props.filename) {
    if (props.filename.endsWith('.vue')) return FileTypeVue
    
    const icon = mapIconFilename[props.filename as keyof typeof mapIconFilename]
    if (icon) return icon
  }
  return mapIconLanguage[props.language as keyof typeof mapIconLanguage]
})
</script>

<template>
  <div data-prose-pre class="pre rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
    <div v-if="filename" class="p-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
      <span class="flex items-center gap-1">
        <component :is="resolveIcon" v-if="language" class="inline" />
        <span class="text-sm text-neutral-500 dark:text-neutral-400">{{ filename }}</span>
      </span>
    </div>
    <ProseCode data-prose-precode :code="code" :language="language" :filename="filename" :highlights="highlights"
      :meta="meta">
      <pre data-prose-pre-inner-pre :class="$props.class" :style="style"><slot></slot></pre>
    </ProseCode>
  </div>
</template>

<style>
pre code .line {
  display: block;
  min-height: 1rem
}
</style>
