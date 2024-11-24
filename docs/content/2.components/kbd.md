---
description: Display a keyboard keys such as shortcuts or hotkeys
since: 1.3.3
---

## Usage

Use the default slot to display the keyboard key.

::ComponentPreview
K
::

The `label` prop also can be used to do so.

::ComponentPreview
---
props:
  label: K
---
::

### Sizes

The `size` prop changes the size of the `kbd`.

::ComponentPreview
---
props:
  size: sm
---
K
::

### Shadow

Add a shadow to the `kbd`.

::ComponentPreview
---
props:
  shadow: true
---
K
::

## Config

::ComponentDefaults
::
