---
description: Create a textarea component
since: 1.3.5
---

## Usage

The basic usage.

::ComponentPreview
---
privateProps:
  placeholder: Description
---
::

### Sizes

::ComponentPreview
---
privateProps:
  placeholder: Description
props:
  size: sm
---
::

### Colors

::ComponentPreview
---
privateProps:
  placeholder: Description
props:
  color: primary
---
::

### Variants

::ComponentPreview
---
privateProps:
  placeholder: Description
props:
  variant: outline
---
::

### Placeholder

You can also set a placeholder.

::ComponentPreview
---
props:
  placeholder: "Description here..."
---
::

### Padded

::ComponentPreview
---
privateProps:
  placeholder: Description
  variant: plain
props:
  padded: false
---
::

### Rows

Set the number of rows of the textarea.

::ComponentPreview
---
privateProps:
  placeholder: Description
props:
  rows: 4
---
::

### Resize

Enable the resize control.

::ComponentPreview
---
privateProps:
  placeholder: Description
props:
  resize: true
---
::

### Auto Resize

The `autosize` prop enables the auto resizing of the textarea. The textarea will grow in height as the user types.

::ComponentPreview
---
privateProps:
  placeholder: Description
props:
  autosize: true
---
::

The `maxrows` prop can be used to set the maximum number of rows the textarea can grow to.

::ComponentPreview
---
privateProps:
  placeholder: Description
props:
  autosize: true
  maxrows: 8
---
::

### Disabled

::ComponentPreview
---
privateProps:
  placeholder: Description
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
  <RayTextarea v-model.trim="modal" />
</template>
```

#### .number

The `.number` modifier converts the input value to a number. Non-numeric values are ignored.

```vue [page]
<script lang="ts" setup>
const modal = ref<number>(0);
</script>

<template>
  <RayTextarea v-model.number="modal" />
</template>
```

#### .lazy

The `.lazy` modifier syncs the input value with the model only on `change` event.

```vue [page]
<script lang="ts" setup>
const modal = ref<string>("");
</script>

<template>
  <RayTextarea v-model.lazy="modal" />
</template>
```

## API

### Props

::ComponentProps
::

### Config

::ComponentDefaults
::
