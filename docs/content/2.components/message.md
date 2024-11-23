---
description: The message component is used to display a message to the user
---

## Usage

First add the `<RayMessages>` component to your `app.vue`.

```js [app.vue]{6}
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <RayMessages />
</template>
```

Then, use the `useMessage` composable to add messages to your app anywhere you want.

```vue [pages/index.vue]{2,5-8}
<script lang="ts" setup>
const message = useMessage()

const showMessage = () => {
  message.add({
    content: 'Hello RayineSoft',
    type: 'success',
  })
}
</script>

<template>
  <RayButton label="Show Message" @click="showMessage" />
</template>
```

### Type

Multiple preset styles with icons and colors.

::ComponentPreview
---
props:
  type: info
  content: Hello RayineSoft
---
::

### Color

Use the `color` prop to change the color of the message.

::ComponentPreview
---
props:
  color: amber
  content: Hello RayineSoft
---
::

## Config

::ComponentDefaults
::
