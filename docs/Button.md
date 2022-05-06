# Button

`Button` is a rectangle that calls a function when anything presses or releases
it.

## Properties

### `ballOnly: boolean`

`ballOnly`, if true, will make the button only activate when the ball hits it.
This means that, if a `Rectangle` with `moveable = true` drops onto the button,
it will not activate (i.e. it will behave like any other `Rectangle`).

By default, `ballOnly` is false.

#### Example: Creating a button and setting its `ballOnly`

```js
let button = tile.createButton(tile.width / 2, 400, 200, 8, () => {
  alert("Hello!");
});
button.ballOnly = true;
```
