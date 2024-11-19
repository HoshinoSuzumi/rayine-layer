<script setup lang="ts">
import { ref, computed } from 'vue'

interface TocItem {
  id: string
  depth: number
  text: string
  children?: TocItem[]
}

const props = defineProps<{
  toc: TocItem[]
  maxDepth?: number
}>()

const maxDepth = props.maxDepth ?? 3

const filteredToc = computed(() => {
  const filterByDepth = (items: TocItem[]): TocItem[] => {
    return items
      .filter(item => item.depth <= maxDepth)
      .map(item => ({
        ...item,
        children: item.children ? filterByDepth(item.children) : undefined,
      }))
  }

  return filterByDepth(props.toc)
})

const activeLinks = ref<string[]>([])

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeLinks.value.push(entry.target.id)
        }
        else {
          activeLinks.value = activeLinks.value.filter(link => link !== entry.target.id)
        }
      })
    },
    // { rootMargin: '0px 0px -80% 0px' }
  )

  filteredToc.value.forEach((item) => {
    const element = document.getElementById(item.id)
    if (element) {
      observer.observe(element)
    }
    item.children?.forEach((child) => {
      const childElement = document.getElementById(child.id)
      if (childElement) {
        observer.observe(childElement)
      }
    })
  })
})
</script>

<template>
  <ul>
    <template v-for="item in filteredToc" :key="item.id">
      <li>
        <NuxtLink :href="'#' + item.id" class="link" :class="{ active: activeLinks.includes(item.id) }">
          {{ item.text }}
        </NuxtLink>
        <ul v-if="item.children && item.children.length" class="ml-4">
          <template v-for="child in item.children" :key="child.id">
            <li>
              <NuxtLink :href="'#' + child.id" class="link" :class="{ active: activeLinks.includes(child.id) }">
                {{ child.text }}
              </NuxtLink>
            </li>
          </template>
        </ul>
      </li>
    </template>
  </ul>
</template>

<style scoped>
.link {
  @apply text-xs text-neutral-400 dark:text-neutral-500 font-medium;
}

.link.active {
  @apply text-primary;
}
</style>
