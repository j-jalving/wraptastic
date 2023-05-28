# Methods

This page explains the various methods that can be called on the Wraptastic.js
instance. For example:

## init

(Re-)initialize Wraptastic.js. Use this if you want to enable Wraptastic.js again
after running the `destroy` method, or if new lists have been added to the
DOM. This method is automatically run when instantiating Wraptastic.

#### Example

```js
wraptastic.init();
```

## update

Update Wraptastic.js lists manually, for example when list items have been
added or removed outside of Wraptastic.js.

#### Example

```js
wraptastic.update();
```

## destroy

Remove all Wraptastic.js functionality from the page.

#### Example

```js
wraptastic.destroy();
```
