<script lang="ts" setup>
import { nuxtLinkProps } from '../../utils/link'

const props = defineProps({
  ...nuxtLinkProps,
  to: {
    type: String,
    default: '',
  },
  as: {
    type: String,
    default: 'button',
  },
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: undefined,
  },
  activeClass: {
    type: String,
    default: undefined,
  },
  inactiveClass: {
    type: String,
    default: undefined,
  },
})
</script>

<template>
  <component
    :is="as"
    v-if="!to"
    :type="type"
    :class="active ? activeClass : inactiveClass"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot v-bind="{ isActive: active }" />
  </component>
  <NuxtLink v-else v-slot="{ href, target, rel, navigate, isActive, isExternal }" v-bind="props" custom>
    <a
      v-bind="$attrs"
      :href="!disabled ? href : undefined"
      :aria-disabled="disabled ? 'true' : undefined"
      :role="disabled ? 'link' : undefined"
      :rel="rel"
      :target="target"
      :class="active !== undefined ? (active ? activeClass : inactiveClass) : { [activeClass]: isActive, [inactiveClass]: !isActive }"
      :tabindex="!disabled ? undefined : -1"
      @click="(e) => (!disabled && !isExternal) && navigate(e)"
    >
      <slot v-bind="{ isActive: active !== undefined ? active : isActive }" />
    </a>
  </NuxtLink>
</template>

<style scoped></style>
