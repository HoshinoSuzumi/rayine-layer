<script lang="ts" setup>
const message = useMessage();
</script>

<template>
  <div class="flex flex-col items-start gap-16 pb-20">
    <section>
      <DocContentBlock title="Button" accent-title />

      <DocContentBlock title="Variants" />
      <DocExampleBlock lang="vue-html">
        <div class="flex items-center gap-2">
          <RayButton>Solid</RayButton>
          <RayButton variant="outline">Outline</RayButton>
          <RayButton variant="soft">Soft</RayButton>
          <RayButton variant="ghost">Ghost</RayButton>
          <RayButton variant="link">Link</RayButton>
        </div>
        <template #code>
          {{ `
          <template>
            <RayButton>Solid</RayButton>
            <RayButton variant="outline">Outline</RayButton>
            <RayButton variant="soft">Soft</RayButton>
            <RayButton variant="ghost">Ghost</RayButton>
            <RayButton variant="link">Link</RayButton>
          </template>` }}
        </template>
      </DocExampleBlock>

      <DocContentBlock title="Colors" />
      <DocExampleBlock lang="vue-html">
        <div class="flex items-center gap-2">
          <RayButton color="amber">amber</RayButton>
          <RayButton color="violet" variant="outline" @click="message.success('I like this color!')">violet</RayButton>
          <RayButton color="red" variant="soft">red</RayButton>
          <RayButton color="emerald" variant="ghost">emerald</RayButton>
          <RayButton color="cyan" variant="link">cyan</RayButton>
        </div>
        <template #code>
          {{ `
          <template>
            <RayButton color="amber">amber</RayButton>
            <RayButton color="violet" variant="outline">violet</RayButton>
            <RayButton color="red" variant="soft">red</RayButton>
            <RayButton color="emerald" variant="ghost">emerald</RayButton>
          </template>` }}
        </template>
      </DocExampleBlock>

      <DocContentBlock title="Sizes" />
      <DocExampleBlock lang="vue-html">
        <div class="flex items-center gap-2 flex-wrap">
          <RayButton size="2xs">Button</RayButton>
          <RayButton size="xs">Button</RayButton>
          <RayButton size="sm">Button</RayButton>
          <RayButton size="md">Button</RayButton>
          <RayButton size="lg">Button</RayButton>
          <RayButton size="xl">Button</RayButton>
        </div>
        <template #code>
          {{ `
          <template>
            <RayButton size="2xs">Button</RayButton>
            <RayButton size="xs">Button</RayButton>
            <RayButton size="sm">Button</RayButton>
            <RayButton size="md">Button</RayButton>
            <RayButton size="lg">Button</RayButton>
            <RayButton size="xl">Button</RayButton>
          </template>` }}
        </template>
      </DocExampleBlock>
    </section>

    <section>
      <DocContentBlock title="Message" description="Message component like a toast" accent-title />

      <DocExampleBlock lang="vue-html" filename="app.vue">
        <template #code>
          {{ `
          <template>
            <RayMessageProvider>
              <NuxtLayout>
                <NuxtPage />
              </NuxtLayout>
            </RayMessageProvider>
          </template>`}}
        </template>
      </DocExampleBlock>

      <DocExampleBlock lang="ts">
        <div class="flex items-center gap-2">
          <RayButton @click="message.info('message info', 10000)">Info 10s</RayButton>
          <RayButton @click="message.success('message success')">Success</RayButton>
          <RayButton @click="message.warning('message warning')">Warning</RayButton>
          <RayButton @click="message.error('message error')">Error</RayButton>
        </div>
        <template #code>
          {{ `
          const message = useMessage();

          message.info('message info', 10000);
          message.success('message success');
          message.warning('message warning');
          message.error('message error');` }}
        </template>
      </DocExampleBlock>
    </section>
  </div>
</template>

<style scoped>
section {
  @apply w-full flex flex-col gap-4;
}
</style>
