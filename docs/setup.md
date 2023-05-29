# Setup

This page demonstrates some of ways to install Wraptastic.js. Want to see Wraptastic.js in action? Check out the [demos page](/demos).

## Installation

### Import from CDN

The easiest option is by loading the script directly from a CDN.
The recommended practice is to import the script just before the closing
`</body>` tag or between the `<head>` tags in your HTML document:

```html
<script src="https://cdn.jsdelivr.net/npm/@j-jalving/wraptastic"></script>
```

### Install as Node Module

You can also install Wraptastic.js by running on of the following command
inside your project (depending on your prefered package manager):

::: code-group

```sh [npm]
$ npm install wraptastic
```

```sh [pnpm]
$ pnpm add wraptastic
```

```sh [yarn]
$ yarn add wraptastic
```
::: 

And then import the package in your script:

```js
import Wraptastic from "wraptastic";
```

## Styles (optional)

This package does not need any styling for it to work. But a basic theme
can be imported to save you some work. Feel free to use it in your project:

```html
<link
  rel="stylesheet"
  type="text/css"
  href="https://cdn.jsdelivr.net/npm/@j-jalving/wraptastic/dist/style.css"
/>
```

Or import it in your script when you've installed the package through `npm` or
`yarn`:

```js
import "wraptastic/style.css";
```

### Colors

You also have the option to customize the colors using CSS variables:

```css
:root {
  --wraptastic-background-color: #f3e7ff;
  --wraptastic-text-color: #a152ef;
}
```

## Usage

Setup is very easy, and cane be done in one of several ways:

### Option 1

Simply create an element with a `wraptastic` class name:

```html
<div class="wraptastic"></div>
```

Then instantiate Wraptastic.js and pass along the list items through the config:

```js
const wraptastic = new Wraptastic({
  data: ["Apple", "Banana", "Orange", "Mango", "Pineapple"],
});
```

### Option 2

You can also pass along the list items through a data attribute on the element
itself. This way you can have multiple instances, each with their own contents:

```html
<div
  class="wraptastic"
  data-wraptastic-data='["Apple", "Banana", "Orange", "Mango", "Pineapple"]'
></div>
```

Then you can choose to leave the data option as a fallback, or leave it out entirely:

```js
const wraptastic = new Wraptastic();
```

### Option 3

Finally you can choose to build the list items (and optionally the counter)
yourself in the HTML to have more control over the output. Make sure to give
each element a `wrapptastic-item` class name:

```html
<ul class="wraptastic">
  <li class="wrapptastic-item">Item 1</li>
  <li class="wrapptastic-item">Item 2</li>
  <li class="wrapptastic-item">Item 3</li>
  <!-- More items... -->
  <li class="wraptastic-counter"></li>
</ul>
```

It's important to note that setting the data option will supplement the list, so
it's recommeded to leave it out entirely with this scenario.

```js
const wraptastic = new Wraptastic();
```

### Interesting facts

- Did you know you can put as many Wraptastic.js elements on your page as you like? Go ahead and try!
- Wraptastic.js cleverly decides what elements will be created inside the container. `li` elements will be created inside of `ul` or `ol` containers, and `div` elements will be used in other cases. It does so to improve SEO and make your website more accesible.

## Configuration

### Options

Configuration options may be passed along in a configuration object when
instantiating Wraptastic.js. These options will be applied to all elements
matching the CSS selector set in the `container`. **All shared options are
optional.**

```js
const wraptastic = new Wraptastic({
  container: ".list",
  data: ["Apple", "Banana", "Orange", "Pear", "Mango"],
  lines: 2,
  inline: false,
  item: ".item",
  itemClass: "item",
  counter: ".counter",
  counterClass: "counter",
  counterTemplate: (count) => {
    return `${count} items`;
  },
  counterEnabled: false,
});
```

Most options mentioned above can also be set using data attributes to overwrite
the shared options. **All data attribute options are optional.**

```html
<div
  data-wraptastic
  data-wraptastic-data='["Apple", "Banana", "Orange", "Pear", "Mango"]'
  data-wraptastic-lines="2"
  data-wraptastic-inline="false"
  data-wraptastic-item=".item"
  data-wraptastic-item-class="item"
  data-wraptastic-counter=".counter"
  data-wraptastic-counter-class="counter"
  data-wraptastic-counter-template="{count} items"
  data-wraptastic-counter-enabled="false"
></div>
```

**Some notes regarding data attributes:**

- The `data-wraptastic` can be used to create a Wraptastic.js list even if it
  does not match the `container` config option.
- The `data-wraptastic-counter-template` attribute does not accept functions,
  only strings with an optional `{count}` placeholder

Read more about available options on the [options](/options) page.

### Events

Wraptastic.js allows you to listen for certain events so your code can act on
them.

```js
const wraptastic = new Wraptastic();

wraptastic.on("create", onCreate);
wraptastic.on("update", onUpdate);
wraptastic.on("change", onChange);
```

You can also unsubscribe from the events:

```js
wraptastic.off("create", onCreate);
wraptastic.off("update", onUpdate);
wraptastic.off("change", onChange);
```

Read more about available methods on the [events](/events) page.

::: tip
Method chaining is also supported with Wraptastic.js
:::

### Methods

Additionally, there are a couple of public methods that you can utilize.

```js
wraptastic.update();
wraptastic.destroy();
wraptastic.init();
```

Read more about available methods on the [methods](/methods) page.

## More

Read al about the customization options available to you on the [options](/options), [events](/events) and [methods](/methods) pages, or view real-life demos on the [demos page](/demos)!
