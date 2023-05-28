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

## Two lines

<wraptastic-container>
  <ul 
    class="wraptastic"
    data-wraptastic-lines="2"
  ></ul>
</wraptastic-container>

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

## Three lines

<wraptastic-container>
  <ul 
    class="wraptastic"
    data-wraptastic-lines="3"
  ></ul>
</wraptastic-container>

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

## Counter template

<wraptastic-container>
  <ul 
    class="wraptastic"
    data-wraptastic-counter-template="{count} more items"
  ></ul>
</wraptastic-container>

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

## No counter

<wraptastic-container>
  <ul 
    class="wraptastic"
    data-wraptastic-counter-enabled="false"
  ></ul>
</wraptastic-container>

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
    lines: 6,
    inline: false,
  });
</script>
```
