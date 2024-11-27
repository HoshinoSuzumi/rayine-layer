---
description: Display a indicator with or without counts on any component
---

## Usage

Use the default slot to add any component you want to display the indicator on.

::ComponentPreview
---
slots:
  default: |
    <RayButton icon="tabler:message" label="messages" color="invert" />
---
#default
:RayButton{icon="tabler:message" label="messages" color="invert"}
::

### Styles

You can change the color and size of the indicator by using the `color` and `size` props.

::ComponentPreview
---
props:
  color: amber
  size: sm
slots:
  default: |
    <RayButton icon="tabler:message" label="messages" color="invert" />
---
#default
:RayButton{icon="tabler:message" label="messages" color="invert"}
::

### Position

Use the `position` prop to change the position of the indicator.

::ComponentPreview
---
props:
  position: top-right
slots:
  default: |
    <RayButton icon="tabler:message" label="messages" color="invert" />
---
#default
:RayButton{icon="tabler:message" label="messages" color="invert"}
::

### Count

Add a count to the indicator by using the `value` prop.

::ComponentPreview
---
props:
  value: 5
slots:
  default: |
    <RayButton icon="tabler:message" label="messages" color="invert" />
---
#default
:RayButton{icon="tabler:message" label="messages" color="invert"}
::

#### Overflow

Set `max` prop to handle overflow situation.

::ComponentPreview
---
props:
  value: 110
  max: 99
slots:
  default: |
    <RayButton icon="tabler:message" label="messages" color="invert" />
---
#default
:RayButton{icon="tabler:message" label="messages" color="invert"}
::

## Config

::ComponentDefaults
::
