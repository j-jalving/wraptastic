<script setup lang="ts">
  import Wraptastic from "../lib/Wraptastic.ts";
  import { onMounted } from 'vue';
  onMounted(() => {
    new Wraptastic({
      data: ["Apple", "Banana", "Orange", "Mango", "Pineapple", "Watermelon", "Strawberry", "Kiwi", "Grapefruit", "Blueberry"]
    });
  })
</script>
# Examples

This page gives a preview of some ways you can use Wraptastic.js.

## Default setup

### Code

```html
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

### Result

<wraptastic-container>
  <ul class="wraptastic"></ul>
</wraptastic-container>

## Two lines

### Code

```html
<ul class="wraptastic"></ul>

<script>
  const wraptastic = new Wraptastic(
    data: ["Apple", "Banana", "Orange", "Mango", "Pineapple", "Watermelon", "Strawberry", "Kiwi", "Grapefruit", "Blueberry"],
    lines: 2,
  );
</script>
```

### Result

<wraptastic-container>
  <ul 
    class="wraptastic"
    data-wraptastic-lines="2"
  ></ul>
</wraptastic-container>

## Three lines

### Code

```html
<ul class="wraptastic"></ul>

<script>
  const wraptastic = new Wraptastic(
    data: ["Apple", "Banana", "Orange", "Mango", "Pineapple", "Watermelon", "Strawberry", "Kiwi", "Grapefruit", "Blueberry"],
    lines: 3,
  );
</script>
```

### Result

<wraptastic-container>
  <ul 
    class="wraptastic"
    data-wraptastic-lines="3"
  ></ul>
</wraptastic-container>

## Counter template

### Code

```html
<ul class="wraptastic"></ul>

<script>
  const wraptastic = new Wraptastic(
    data: ["Apple", "Banana", "Orange", "Mango", "Pineapple", "Watermelon", "Strawberry", "Kiwi", "Grapefruit", "Blueberry"],
    counterTemplate: (count) => { return `${count} more items` },
  );
</script>
```

### Result

<wraptastic-container>
  <ul 
    class="wraptastic"
    data-wraptastic-counter-template="{count} more items"
  ></ul>
</wraptastic-container>

## No counter

### Code

```html
<ul class="wraptastic"></ul>

<script>
  const wraptastic = new Wraptastic(
    data: ["Apple", "Banana", "Orange", "Mango", "Pineapple", "Watermelon", "Strawberry", "Kiwi", "Grapefruit", "Blueberry"],
    counterEnabled: false,
  );
</script>
```

### Result

<wraptastic-container>
  <ul 
    class="wraptastic"
    data-wraptastic-counter-enabled="false"
  ></ul>
</wraptastic-container>

## Vertical list

### Code

```html
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
    lines: 3,
    inline: false,
  });
</script>
```

### Result

<wraptastic-container :animate="false" :animate-button="false">
  <ul 
    class="wraptastic"
    data-wraptastic-lines="3"
    data-wraptastic-inline="false"
    style="display: flex; flex-direction: column;"
  ></ul>
</wraptastic-container>
