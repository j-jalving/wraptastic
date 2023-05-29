<script setup lang="ts">
  import Wraptastic from "../lib/Wraptastic.ts";
  import { onMounted } from 'vue';
  onMounted(() => {
    new Wraptastic({
      data: ["Apple", "Banana", "Orange", "Mango", "Pineapple", "Watermelon", "Strawberry", "Kiwi", "Grapefruit", "Blueberry"]
    });
  })
</script>

# Demos

This page gives a preview of some ways you can use Wraptastic.js.

## Default setup

<wraptastic-container>
  <ul class="wraptastic"></ul>
</wraptastic-container>

### Code

::: code-group

```html [option 1]
<ul class="wraptastic"></ul>

<script>
  const wraptastic = new Wraptastic({
    data: [
      "Apple",
      "Banana",
      "Orange",
      "Mango",
      "Pineapple",
      "Watermelon",
      "Strawberry",
      "Kiwi",
      "Grapefruit",
      "Blueberry",
    ],
  });
</script>
```

```html [option 2]
<ul
  class="wraptastic"
  data-wraptastic-data='["Apple", "Banana", "Orange", "Mango", "Pineapple", "Watermelon", "Strawberry", "Kiwi", "Grapefruit", "Blueberry"]'
></ul>

<script>
  const wraptastic = new Wraptastic();
</script>
```

```html [option 3]
<ul class="wraptastic">
  <li class="wraptastic-item">Apple</li>
  <li class="wraptastic-item">Banana</li>
  <li class="wraptastic-item">Orange</li>
  <li class="wraptastic-item">Mango</li>
  <li class="wraptastic-item">Pineapple</li>
  <li class="wraptastic-item">Watermelon</li>
  <li class="wraptastic-item">Strawberry</li>
  <li class="wraptastic-item">Kiwi</li>
  <li class="wraptastic-item">Grapefruit</li>
  <li class="wraptastic-item">Blueberry</li>
</ul>

<script>
  const wraptastic = new Wraptastic();
</script>
```

:::

## Two lines

<wraptastic-container>
  <ul 
    class="wraptastic"
    data-wraptastic-lines="2"
  ></ul>
</wraptastic-container>

### Code

::: code-group

```html [option 1]
<ul class="wraptastic"></ul>

<script>
  const wraptastic = new Wraptastic({
    data: [
      "Apple",
      "Banana",
      "Orange",
      "Mango",
      "Pineapple",
      "Watermelon",
      "Strawberry",
      "Kiwi",
      "Grapefruit",
      "Blueberry",
    ],
    lines: 2,
  });
</script>
```

```html [option 2]
<ul
  class="wraptastic"
  data-wraptastic-data='["Apple", "Banana", "Orange", "Mango", "Pineapple", "Watermelon", "Strawberry", "Kiwi", "Grapefruit", "Blueberry"]'
  data-wraptastic-lines="2"
></ul>

<script>
  const wraptastic = new Wraptastic();
</script>
```

```html [option 3]
<ul class="wraptastic">
  <li class="wraptastic-item">Apple</li>
  <li class="wraptastic-item">Banana</li>
  <li class="wraptastic-item">Orange</li>
  <li class="wraptastic-item">Mango</li>
  <li class="wraptastic-item">Pineapple</li>
  <li class="wraptastic-item">Watermelon</li>
  <li class="wraptastic-item">Strawberry</li>
  <li class="wraptastic-item">Kiwi</li>
  <li class="wraptastic-item">Grapefruit</li>
  <li class="wraptastic-item">Blueberry</li>
</ul>

<script>
  const wraptastic = new Wraptastic({
    lines: 2,
  });
</script>
```

:::

## Three lines

<wraptastic-container>
  <ul 
    class="wraptastic"
    data-wraptastic-lines="3"
  ></ul>
</wraptastic-container>

### Code

::: code-group

```html [option 1]
<ul class="wraptastic"></ul>

<script>
  const wraptastic = new Wraptastic({
    data: [
      "Apple",
      "Banana",
      "Orange",
      "Mango",
      "Pineapple",
      "Watermelon",
      "Strawberry",
      "Kiwi",
      "Grapefruit",
      "Blueberry",
    ],
    lines: 3,
  });
</script>
```

```html [option 2]
<ul
  class="wraptastic"
  data-wraptastic-data='["Apple", "Banana", "Orange", "Mango", "Pineapple", "Watermelon", "Strawberry", "Kiwi", "Grapefruit", "Blueberry"]'
  data-wraptastic-lines="3"
></ul>

<script>
  const wraptastic = new Wraptastic();
</script>
```

```html [option 3]
<ul class="wraptastic">
  <li class="wraptastic-item">Apple</li>
  <li class="wraptastic-item">Banana</li>
  <li class="wraptastic-item">Orange</li>
  <li class="wraptastic-item">Mango</li>
  <li class="wraptastic-item">Pineapple</li>
  <li class="wraptastic-item">Watermelon</li>
  <li class="wraptastic-item">Strawberry</li>
  <li class="wraptastic-item">Kiwi</li>
  <li class="wraptastic-item">Grapefruit</li>
  <li class="wraptastic-item">Blueberry</li>
</ul>

<script>
  const wraptastic = new Wraptastic({
    lines: 3,
  });
</script>
```

:::

## Counter template

<wraptastic-container>
  <ul 
    class="wraptastic"
    data-wraptastic-counter-template="{count} more items"
  ></ul>
</wraptastic-container>

### Code

::: code-group

```html [option 1]
<ul class="wraptastic"></ul>

<script>
  const wraptastic = new Wraptastic({
    data: [
      "Apple",
      "Banana",
      "Orange",
      "Mango",
      "Pineapple",
      "Watermelon",
      "Strawberry",
      "Kiwi",
      "Grapefruit",
      "Blueberry",
    ],
    counterTemplate: (count) => {
      return `${count} more items`;
    },
  });
</script>
```

```html [option 2]
<ul
  class="wraptastic"
  data-wraptastic-data='["Apple", "Banana", "Orange", "Mango", "Pineapple", "Watermelon", "Strawberry", "Kiwi", "Grapefruit", "Blueberry"]'
  data-wraptastic-counter-template="{count} more items"
></ul>

<script>
  const wraptastic = new Wraptastic();
</script>
```

```html [option 3]
<ul class="wraptastic">
  <li class="wraptastic-item">Apple</li>
  <li class="wraptastic-item">Banana</li>
  <li class="wraptastic-item">Orange</li>
  <li class="wraptastic-item">Mango</li>
  <li class="wraptastic-item">Pineapple</li>
  <li class="wraptastic-item">Watermelon</li>
  <li class="wraptastic-item">Strawberry</li>
  <li class="wraptastic-item">Kiwi</li>
  <li class="wraptastic-item">Grapefruit</li>
  <li class="wraptastic-item">Blueberry</li>
</ul>

<script>
  const wraptastic = new Wraptastic({
    counterTemplate: (count) => {
      return `${count} more items`;
    },
  });
</script>
```

:::

## No counter

<wraptastic-container>
  <ul 
    class="wraptastic"
    data-wraptastic-counter-enabled="false"
  ></ul>
</wraptastic-container>

### Code

::: code-group

```html [option 1]
<ul class="wraptastic"></ul>

<script>
  const wraptastic = new Wraptastic({
    data: [
      "Apple",
      "Banana",
      "Orange",
      "Mango",
      "Pineapple",
      "Watermelon",
      "Strawberry",
      "Kiwi",
      "Grapefruit",
      "Blueberry",
    ],
    counterEnabled: false,
  });
</script>
```

```html [option 2]
<ul
  class="wraptastic"
  data-wraptastic-data='["Apple", "Banana", "Orange", "Mango", "Pineapple", "Watermelon", "Strawberry", "Kiwi", "Grapefruit", "Blueberry"]'
  data-wraptastic-counter-enabled="false"
></ul>

<script>
  const wraptastic = new Wraptastic();
</script>
```

```html [option 3]
<ul class="wraptastic">
  <li class="wraptastic-item">Apple</li>
  <li class="wraptastic-item">Banana</li>
  <li class="wraptastic-item">Orange</li>
  <li class="wraptastic-item">Mango</li>
  <li class="wraptastic-item">Pineapple</li>
  <li class="wraptastic-item">Watermelon</li>
  <li class="wraptastic-item">Strawberry</li>
  <li class="wraptastic-item">Kiwi</li>
  <li class="wraptastic-item">Grapefruit</li>
  <li class="wraptastic-item">Blueberry</li>
</ul>

<script>
  const wraptastic = new Wraptastic({
    counterEnabled: false,
  });
</script>
```

:::

## Vertical list

<wraptastic-container :inline="false" :animate="false">
  <ul 
    class="wraptastic"
    data-wraptastic-lines="6"
    data-wraptastic-inline="false"
    style="display: flex; flex-direction: column; flex-wrap: nowrap; flex-grow: 1;"
  ></ul>
</wraptastic-container>

### Code

::: code-group

```html [option 1]
<ul class="wraptastic" style="display: flex; flex-direction: column;"></ul>

<script>
  const wraptastic = new Wraptastic({
    data: [
      "Apple",
      "Banana",
      "Orange",
      "Mango",
      "Pineapple",
      "Watermelon",
      "Strawberry",
      "Kiwi",
      "Grapefruit",
      "Blueberry",
    ],
    lines: 6,
    inline: false,
  });
</script>
```

```html [option 2]
<ul
  class="wraptastic"
  style="display: flex; flex-direction: column;"
  data-wraptastic-data='["Apple", "Banana", "Orange", "Mango", "Pineapple", "Watermelon", "Strawberry", "Kiwi", "Grapefruit", "Blueberry"]'
  data-wraptastic-lines="6"
  data-wraptastic-inline="false"
></ul>

<script>
  const wraptastic = new Wraptastic();
</script>
```

```html [option 3]
<ul class="wraptastic" style="display: flex; flex-direction: column;">
  <li class="wraptastic-item">Apple</li>
  <li class="wraptastic-item">Banana</li>
  <li class="wraptastic-item">Orange</li>
  <li class="wraptastic-item">Mango</li>
  <li class="wraptastic-item">Pineapple</li>
  <li class="wraptastic-item">Watermelon</li>
  <li class="wraptastic-item">Strawberry</li>
  <li class="wraptastic-item">Kiwi</li>
  <li class="wraptastic-item">Grapefruit</li>
  <li class="wraptastic-item">Blueberry</li>
</ul>

<script>
  const wraptastic = new Wraptastic({
    lines: 6,
    inline: false,
  });
</script>
```

:::
