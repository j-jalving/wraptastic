# Wraptastic.js

[![npm version](https://img.shields.io/npm/v/wraptastic.svg?style=flat-square)](https://www.npmjs.org/package/wraptastic)

Wraptastic.js is a simple JavaScript package that effortlessly helps you manage list wrapping and overflows.

![demo](https://github.com/j-jalving/wraptastic/assets/60800079/f21261c8-a658-4489-b4c1-e900550f3aee)

## Features

- Limits list wrapping to 1, 2, 3 or any other amount of lines.
- Provides an optional counter for the amount of items that extend beyond the designated lines.
- Automatically adjusts the visibility of your list items as you resize your browser window or container.

## Quickstart

### Installation

```sh
# npm
npm install wraptastic
# pnpm
pnpm add wraptastic
# yarn
yarn add wraptastic
```

[All installation options](https://j-jalving.github.io/wraptastic/setup.html)

### Usage

```html
<div class="wraptastic">
  <div class="wraptastic-item">Item 1</div>
  <div class="wraptastic-item">Item 2</div>
  <div class="wraptastic-item">Item 3</div>
  <!--- etc -->
</div>

<script>
import Wraptastic from "wraptastic";

const wraptastic = new Wraptastic({
  // Configuration options
});
</script>
```

[All configuration options](https://j-jalving.github.io/wraptastic/options.html)


## Documentation

Check out our [online documentation](https://j-jalving.github.io/wraptastic/) to see what Wraptastic.js can do for you!

## License

[MIT](https://github.com/j-jalving/wraptastic/blob/main/LICENSE)
