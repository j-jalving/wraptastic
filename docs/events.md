# Events

This page explains the various events emitted by Wraptastic.js. Event listeners
can be created with the `on()` method:

```js
wraptastic.on("create", onCreate);
```

And removed with the `off()` method:

```js
wraptastic.off("create", onCreate);
```

## create

Emitted when a list instance has been created. The event receives an `event`
parameter that contains a `detail` object where more information about the
event can be found.

#### Details

| name      | type          | Description                                |
| --------- | ------------- | ------------------------------------------ |
| `element` | `HTMLElement` | The list element that triggered the event. |

#### Event details

```js
wraptastic.on("create", (event) => {
  console.log(event.detail.element);
});
```

## update

Emitted after each update cycle. The event receives an `event`
parameter that contains a `detail` object where more information about the
event can be found.

#### Event details

| name      | type          | Description                                |
| --------- | ------------- | ------------------------------------------ |
| `element` | `HTMLElement` | The list element that triggered the event. |

#### Example

```js
wraptastic.on("update", (event) => {
  console.log(event.detail.element);
});
```

## change

Emitted when the amount of overflowing items has changed. The event receives an `event`
parameter that contains a `detail` object where more information about the
event can be found.

#### Event details

| name       | type          | Description                                |
| ---------- | ------------- | ------------------------------------------ |
| `element`  | `HTMLElement` | The list element that triggered the event. |
| `count`    | `number`      | The current number of overflowing items.   |
| `oldCount` | `number`      | The previous number of overflowing items.  |

#### Example

```js
wraptastic.on("change", (event) => {
  console.log(event.detail.element);
  console.log(event.detail.count);
  console.log(event.detail.oldCount);
});
```
