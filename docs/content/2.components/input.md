---
description: The input component is used to get user input
since: 1.3.2
---

## Usage

The basic usage.

:::ComponentPreview
---
privateProps:
  placeholder: "Type something..."
---
:::

### Sizes

::ComponentPreview
---
privateProps:
  placeholder: "Type something..."
props:
  size: sm
---
::

### Colors

The `color` prop affects the color of the border.

::ComponentPreview
---
props:
  color: primary
---
::

### Variants

::ComponentPreview
---
privateProps:
  placeholder: "Search..."
props:
  variant: outline
---
::

### Type

The `type` prop changes the type of the input. All the aviailable types can be found at [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).

::ComponentPreview
---
privateProps:
  placeholder: "Type anything..."
props:
  type: text
---
::

### Placeholder

The `placeholder` prop sets the placeholder text. It is shown when the input is empty.

::ComponentPreview
---
props:
  placeholder: "Type anything..."
---
::

### Padded

Inputs can be with no padding.

::ComponentPreview
---
privateProps:
  placeholder: "Search..."
  variant: plain
props:
  padded: false
---
::

### Disabled

Inputs can be disabled.

::ComponentPreview
---
privateProps:
  placeholder: "Search..."
props:
  disabled: true
---
::

### Model Modifiers

#### .trim

The `.trim` modifier trims the input value.

```vue [page]
<script lang="ts" setup>
const modal = ref<string>("");
</script>

<template>
  <RayInput v-model.trim="modal" />
</template>
```

#### .number

The `.number` modifier converts the input value to a number. Non-numeric values are ignored.

```vue [page]
<script lang="ts" setup>
const modal = ref<number>(0);
</script>

<template>
  <RayInput v-model.number="modal" />
</template>
```

#### .lazy

The `.lazy` modifier syncs the input value with the model only on `change` event.

```vue [page]
<script lang="ts" setup>
const modal = ref<string>("");
</script>

<template>
  <RayInput v-model.lazy="modal" />
</template>
```

## API

### Props

::ComponentProps
::

### Theme

::ComponentDefaults
::
