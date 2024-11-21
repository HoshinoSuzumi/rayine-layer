import type { PropType } from 'vue'
import type { RouteLocationRaw } from '#vue-router'
import type { NuxtLinkProps } from '#app'

// NuxtLink props
// ref: https://github.com/nuxt/ui/blob/51c8b8e3e59d7eceff72625650a199fcf7c6feca/src/runtime/utils/link.ts#L5-L81
export const nuxtLinkProps = {
  to: {
    type: [String, Object] as PropType<RouteLocationRaw>,
    default: undefined,
    required: false,
  },
  href: {
    type: [String, Object] as PropType<RouteLocationRaw>,
    default: undefined,
    required: false,
  },

  // Attributes
  target: {
    type: String as PropType<NuxtLinkProps['target']>,
    default: undefined,
    required: false,
  },
  rel: {
    type: String as PropType<any>,
    default: undefined,
    required: false,
  },
  noRel: {
    type: Boolean as PropType<NuxtLinkProps['noRel']>,
    default: undefined,
    required: false,
  },

  // Prefetching
  prefetch: {
    type: Boolean as PropType<NuxtLinkProps['prefetch']>,
    default: undefined,
    required: false,
  },
  noPrefetch: {
    type: Boolean as PropType<NuxtLinkProps['noPrefetch']>,
    default: undefined,
    required: false,
  },

  // Styling
  activeClass: {
    type: String as PropType<NuxtLinkProps['activeClass']>,
    default: undefined,
    required: false,
  },
  exactActiveClass: {
    type: String as PropType<NuxtLinkProps['exactActiveClass']>,
    default: undefined,
    required: false,
  },
  prefetchedClass: {
    type: String as PropType<NuxtLinkProps['prefetchedClass']>,
    default: undefined,
    required: false,
  },

  // Vue Router's `<RouterLink>` additional props
  replace: {
    type: Boolean as PropType<NuxtLinkProps['replace']>,
    default: undefined,
    required: false,
  },
  ariaCurrentValue: {
    type: String as PropType<NuxtLinkProps['ariaCurrentValue']>,
    default: undefined,
    required: false,
  },

  // Edge cases handling
  external: {
    type: Boolean as PropType<NuxtLinkProps['external']>,
    default: undefined,
    required: false,
  },
} as const
