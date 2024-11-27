---
description: Get a dynamic switch component
since: 1.3.4
---

## Usage

Use the `v-model` directive to make it reactive.

::ComponentPreview
---
privateProps:
  v-model: checked
---
::

### Colors

The `color` prop affects the background color of the toggle.

::ComponentPreview
---
privateProps:
  modelValue: true
props:
  color: primary
---
::

### Sizes

The default size of the toggle is `md`.

::ComponentPreview
---
props:
  size: md
---
::

### Rounded

You can make the toggle rounded by setting the `rounded` prop to `true`.

::ComponentPreview
---
props:
  rounded: true
  size: md
---
::

### Disabled

Disable it.

::ComponentPreview
---
privateProps:
  modelValue: true
props:
  disabled: true
---
::

## API

### Props

::ComponentProps
::

### Config

::ComponentDefaults
::
