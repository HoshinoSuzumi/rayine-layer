<script lang="ts" setup>
const configuration_code = `
export default defineAppConfig({
  rayui: {
    primary: "indigo",  // primary color
    gray: "neutral",    // gray color
    strategy: "merge",  // merge or override
    // components configuration...
    // button: {}
  },
});
`
</script>

<template>
  <div class="flex flex-col items-start gap-12 pb-20">
    <section>
      <DocContentBlock title="Introduction"
        description="This project aims to facilitate sharing a component library across multiple projects for my own use. Open-sourcing it is just a bonus. Therefore, I am under no obligation to meet your requirements, and breaking changes may occur at any time. Of course, pull requests are welcome."
        accent-title />
    </section>
    <section>
      <DocContentBlock title="Installation"
        description="This project is a Nuxt Layer and can currently only be used with Nuxt. Get started using one of the following methods"
        accent-title />

      <DocContentBlock title="GitHub" />
      <DocExampleBlock lang="ts" filename="nuxt.config.ts">
        <template #code>
          {{ `\nexport default defineNuxtConfig({\n&nbsp;&nbsp;extends: ["github:HoshinoSuzumi/rayine-layer"]\n}` }}
        </template>
      </DocExampleBlock>

      <DocContentBlock title="NPM" />
      <DocExampleBlock lang="sh" filename="terminal">
        <template #code>npm install rayine-layer</template>
      </DocExampleBlock>
      <DocExampleBlock lang="ts" filename="nuxt.config.ts">
        <template #code>
          {{ `\nexport default defineNuxtConfig({\n&nbsp;&nbsp;extends: ["rayine-layer"]\n}` }}
        </template>
      </DocExampleBlock>
    </section>
    <section>
      <DocContentBlock title="Configuration" description="All components will be automatically injected" accent-title />
      <DocExampleBlock lang="ts" filename="app.config.ts">
        <template #code>
          {{ configuration_code }}
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
