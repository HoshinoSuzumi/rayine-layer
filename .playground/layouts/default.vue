<script lang="ts" setup>

</script>

<template>
  <div class="max-w-4xl mx-auto px-4">
    <TitleBar />
    <main class="pt-4">
      <slot></slot>
    </main>
  </div>
</template>

<style>
body {
  @apply bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100;
}

@media (prefers-color-scheme: dark) {

  .shiki,
  .shiki span {
    color: var(--shiki-dark) !important;
    background-color: rgba(0, 0, 0, 0) !important;
    font-style: var(--shiki-dark-font-style) !important;
    font-weight: var(--shiki-dark-font-weight) !important;
    text-decoration: var(--shiki-dark-text-decoration) !important;
  }
}
</style>
