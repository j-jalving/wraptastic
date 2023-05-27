# Options

This page explains the various configuration options provided by Wraptastic.js.
Options may be passed along in a configuration object when instantiating
Wraptastic.js:

```js
const wraptastic = new Wraptastic() {
  container: ".list",
  data: ["Apple", "Banana", "Orange", "Pear", "Mango"],
  lines: 2,
  // etc...
}
```

## container

- **Type:** `string`
- **Default:** `'.wraptastic'`

CSS selector for the element(s) that should be converted into a Wraptastic.js
list.

## data

- **Type:** `string[]`
- **Default:** `null`

You may pass an array of strings here to let Wraptastic.js create the list items
for you.

## lines

- **Type:** `number`
- **Default:** `1`

The maximum number of lines that list items may wrap before they start overflowing.

## inline

- **Type:** `boolean`
- **Default:** `true`

Wraptastic.js was primarily created to handle lists with inline items. But you
can set this option to `false` if each list item in your list is on a seperate
line.

## item

- **Type:** `string`
- **Default:** `.wraptastic-item`

CSS selector for the element(s) that should act as list items inside the
container.

## itemClass

- **Type:** `string`
- **Default:** `'wraptastic-item'`

Class name that will be used for the list items when Wraptastic.js creates
the elements for you.

::: tip
When modifying this option, make sure it will still be matched by
the CSS selector specified in the `item` option.
:::

## counter

- **Type:** `string`
- **Default:** `.wraptastic-counter`

CSS selector for the element that should act as the counter inside the
container.

## counterClass

- **Type:** `string`
- **Default:** `'wraptastic-counter'`

Class name that will be used for the counter when Wraptastic.js creates the
element for you.

::: tip
When modifying this option, make sure it will still be matched by
the CSS selector specified in the `counter` option.
:::

## counterTemplate

- **Type:** `function|string`
- **Default:** `` (count) => { return `+${count}` } ``

Method that returns the template that should be used for displaying the counter
value. The method accepts a `count` parameter containing the number of
overflowing items. Alternatively, a string with a `{count}` placeholder is also
accepted.

## counterEnabled

- **Type:** `boolean`
- **Default:** `true`

A counter element is created for you by default, this option allows you to
disable the counter entirely.
