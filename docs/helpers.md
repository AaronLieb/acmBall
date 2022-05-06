# Helpers

This file documents helper functions that are imported into tiles by defaults
unless stated otherwise.

## Functions

### `sleep`

```ts
sleep(t: number)
```

`sleep` is meant to be used to delay part of the code for a duration of time
before it continues. **It only works in `async` functions**, which are functions
that are declared as

```js
async function () {} // note the "async"
```

or

```js
async () => {}; // again, note the "async"
```

When invoked like this, **it must also be called with `await` in front:**

```js
await sleep(1000); // sleep for 1 second or 1000 milliseconds
```

#### Parameters

- `t`: the duration to sleep in milliseconds.

#### Example: When the ball enters a tile, wait 0.5 seconds then change its size

```js
tile.onBallEnter = async function () {
  await sleep(500);
  ball.size = 10;
};
```
