---
description: Create a button component with different variants and colors
---

## Usage

Default button style

::ComponentPreview
Button
::

### Styles

Use the `variant` and `color` props to predefined styles and change the color of buttons.

::ComponentPreview
---
props:
  variant: soft
  color: violet
---
Button
::

#### Match

The color of the buttons will match the color theme.

::ComponentPreview
---
props:
  color: match
excludedProps:
  - color
---
Button
::

#### Invert

The color of the buttons will be the opposite of the color theme.

::ComponentPreview
---
props:
  color: invert
excludedProps:
  - color
---
Button
::

### Sizes

::ComponentPreview
---
props:
  size: sm
---
Button
::

### Block

::ComponentPreview
---
props:
  block: true
---
Button
::

### Label

::ComponentPreview
---
props:
  label: Button
---
::

### Disabled

::ComponentPreview
---
props:
  disabled: true
  variant: solid
---
Button
::

### Icon

::ComponentPreview
---
props:
  icon: tabler:adjustments
  size: sm
  loading: false
---
Settings
::

### Loading

::ComponentPreview
---
props:
  loading: true
  variant: solid
---
Button
::

## Config

::ComponentDefaults
::
