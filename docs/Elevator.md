# Elevator

`Elevator` is a collection of `Line` [_entities_](Entity.md).
You can make the levels go up or down.

## Properties

### `x: number`

`x` is the leftmost x-position of the elevator.

### `y: number`

`y` is the top y-position of the elevator.

### `width: number`

`width` is the total width of the elevator (and its levels)

### `height: number`

`height` is the total height of the elevator.

### `speed: number`

`speed` is the amount of pixels that the elevator will move per frame.

### `levels: number`

`levels` is the amount of lines created for the elevator.

#### Example: Make an elevator and make it go up

```ts
let elevator;

tile.setup = function () {
  elevator = tile.createElevator(100, 100, 150, 500, 5, 3);
};

tile.onTick = function () {
  if (elevator !== undefined) {
      elev.goUp();
  }
};
```
