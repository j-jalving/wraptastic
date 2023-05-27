# Examples

This page gives a preview of some ways you can use Wraptastic.js.

## Default setup

### Code

```html
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

### Result

<wraptastic-container :config="{ container: '#example-default' }">
  <ul id="example-default" class="wraptastic">
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
</wraptastic-container>

:::tip

<div class="instructions-mobile">Rotate your device to see Wraptastic.js in action</div>
<div class="instructions-desktop">Drag the bottom right handle of the box to see Wraptastic.js in action</div>
:::

## Two lines

### Code

```html
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
  const wraptastic = new Wraptastic(
    lines: 2,
  );
</script>
```

### Result

<wraptastic-container :config="{ container: '#example-two-lines', lines: 2 }">
  <ul id="example-two-lines" class="wraptastic">
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
</wraptastic-container>

:::tip

<div class="instructions-mobile">Rotate your device to see Wraptastic.js in action</div>
<div class="instructions-desktop">Drag the bottom right handle of the box to see Wraptastic.js in action</div>
:::

## Three lines

### Code

```html
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
  const wraptastic = new Wraptastic(
    lines: 3,
  );
</script>
```

### Result

<wraptastic-container :config="{ container: '#example-three-lines', lines: 3 }">
  <ul id="example-three-lines" class="wraptastic">
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
</wraptastic-container>

:::tip

<div class="instructions-mobile">Rotate your device to see Wraptastic.js in action</div>
<div class="instructions-desktop">Drag the bottom right handle of the box to see Wraptastic.js in action</div>
:::

## Counter template

### Code

```html
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
  const wraptastic = new Wraptastic(
    counterTemplate: (count) => { return `${count} more items` },
  );
</script>
```

### Result

<wraptastic-container :config="{ container: '#example-no-counter', counterTemplate: function(count) { return `${count} more items` } }">
  <ul id="example-no-counter" class="wraptastic">
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
</wraptastic-container>

:::tip

<div class="instructions-mobile">Rotate your device to see Wraptastic.js in action</div>
<div class="instructions-desktop">Drag the bottom right handle of the box to see Wraptastic.js in action</div>
:::

## No counter

### Code

```html
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
  const wraptastic = new Wraptastic(
    counterEnabled: false,
  );
</script>
```

### Result

<wraptastic-container :config="{ container: '#example-no-counter', counterEnabled: false }">
  <ul id="example-no-counter" class="wraptastic">
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
</wraptastic-container>

:::tip

<div class="instructions-mobile">Rotate your device to see Wraptastic.js in action</div>
<div class="instructions-desktop">Drag the bottom right handle of the box to see Wraptastic.js in action</div>
:::

## Vertical list

### Code

```html
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
    inline: true,
    lines: 5,
  });
</script>
```

### Result

<wraptastic-container :config="{ container: '#example-vertical-list', lines: 5, inline: false }">
  <ul id="example-vertical-list" class="wraptastic" style="display: flex; flex-direction: column;">
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
</wraptastic-container>
