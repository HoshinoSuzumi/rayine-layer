---
description: Create a button component with different variants and colors
---

## Usage

Default button style

::ComponentPreview
Button
::

### Variants

::ComponentPreview
---
props:
  variant: soft
---
Button
::

### Colors

::ComponentPreview
---
props:
  color: violet
---
Button
::

```js [file.js]{4-6,7} meta-info=val
export default () => {
  console.log('Code block')
}
```
