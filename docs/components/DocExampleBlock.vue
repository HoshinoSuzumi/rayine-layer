<script lang="ts" setup>
import FileTypeVue from "./icon/VscodeIconsFileTypeVue.vue"
import FileTypeTypescript from "./icon/VscodeIconsFileTypeTypescriptOfficial.vue"
import FileTypeJavascript from "./icon/VscodeIconsFileTypeJsOfficial.vue"
import TablerTerminal from "./icon/TablerTerminal.vue";

const slots = defineSlots<{
  default?: () => VNode[];
  code?: () => VNode[];
}>();

const IconComponents = {
  'vue': FileTypeVue,
  'vue-html': FileTypeVue,
  'sh': TablerTerminal,
  'ts': FileTypeTypescript,
  'js': FileTypeJavascript,
}

const codeSlotContent = computed(() => {
  if (slots.code) {
    const slotContent = slots.code();
    let contentLines = slotContent
      .map(vnode => vnode.children || '')
      .join('')
      .replace('\n', '') // remove first line break
      .split('\n');

    // calculate the minimum indent
    const minIndent = contentLines.reduce((min, line) => {
      const match = line.match(/^(\s*)\S/);
      if (match) {
        return Math.min(min, match[1].length);
      }
      return min;
    }, Infinity);

    // remove the minimum indent from each line
    const stringContent = contentLines.map(line => line.slice(minIndent)).join('\n');

    return stringContent;
  }
  return '';
})

defineProps({
  filename: {
    type: String,
    default: '',
  },
  lang: {
    type: String as PropType<keyof typeof IconComponents>,
    default: '',
  },
})
</script>

<template>
  <div class="border border-neutral-200 dark:border-neutral-700 rounded-lg">
    <div v-if="filename" class="p-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
      <span class="flex items-center gap-1">
        <component v-if="lang" :is="IconComponents[lang]" class="inline" />
        <span class="text-sm text-neutral-500 dark:text-neutral-400">{{ filename }}</span>
      </span>
    </div>

    <template v-if="slots.default">
      <div :class="['p-4 overflow-auto', $slots.code ? 'border-b border-neutral-200 dark:border-neutral-700' : '']">
        <slot></slot>
      </div>
    </template>

    <template v-if="slots.code">
      <div class="p-4 overflow-auto">
        <LazyShiki class="text-sm" :lang="lang" :code="codeSlotContent" />
      </div>
    </template>
  </div>
</template>

<style scoped></style>
