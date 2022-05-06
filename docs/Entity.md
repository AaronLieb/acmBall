# Entity

`Entity` describes an object in the game. For example, a rectangle in a tile is
an entity, and the ball is an entity.

## Properties

### `mass: number`

### `position: object`

`position` describes the current position of an entity within the tile. It is an
object with two fields, `x` and `y`:

```ts
{
  x: number;
  y: number;
}
```

When `ball.position` is used, the position that's returned is relative to the
current tile, or the tile that the ball is on.

There are multiple ways to set `position`:

```js
let thing = tile.createRectangle(200, 200, 50, 50);
thing.position = { x: 100, y: 200 }; // set both X and Y at once
thing.position.x = 150; // set only X
thing.position.y = 150; // set only Y
```

#### Properties

- `x`: the X value relative to the tile's x-axis.
- `y`: the Y value relative to the tile's y-axis.

### `velocity: number`

`velocity` describes the current velocity (or speed) of an entity in that
instant. Its structure is similar to `position`, and so it can be set similarly
to `position`.

#### Properties

- `x`: the velocity going horizontally.
- `y`: the velocity going vertically.

### `color: string`

`color` describes the color of the entity. A color string can be in the
following formats:

- Hexadecimal: `"#FFFFFF"` or `"#FAB"` (which becomes `"#FFAABB"`),
- RGB: `"rgb(255, 255, 255)"`,
- RGBA: `"rgba(255, 255, 255, 0.5)"` (half-transparent white), and
- [CSS "color keywords"](https://www.w3.org/wiki/CSS/Properties/color/keywords),
  such as `"pink"` or `"cyan"`.

#### Example: Change the ball's color to pink

```js
this.ball.color = "pink";
```

### `angle: number`

`angle` describes the angle in degrees that the entity is currently rotated to.
The user can add or subtract from the entity's angle by using the `+=` or `-=`
operator.

#### Example: Setting the angle of a square

```js
let square = tile.createRectangle(200, 200, 50, 50);
square.angle = 45; // set the angle to 45deg
square.angle += 15; // add another 15deg to make 60deg
```

### `gravityScale: number`

## Methods

### `setPosition`

```ts
setPosition(x: number, y: number)
```

`setPosition` is a function that sets the entity's position using the given
coordinate pair. It has a similar effect to setting `position`, except that it's
a bit shorter when setting both `x` and `y`:

```js
ball.setPosition(50, 50);
// instead of
ball.position = { x: 50, y: 50 };
```

#### Parameters

- `x`: the X value relative to the tile's x-axis.
- `y`: the Y value relative to the tile's y-axis.

### `setVelocity`

```ts
setVelocity(x: number, y: number)
```

`setVelocity` is a function that sets the entity's velocity using the given
coordinate pair. Like `setPosition`, it is mostly a convenient function for
setting both `x` and `y`.

#### Parameters:

- `x`: the velocity going horizontally.
- `y`: the velocity going vertically.

### `applyForce`

### `scale`

```ts
scale(scaleX: number, scaleY = scaleX)
```

`scale` scales the object according to the given scalar(s). The user can use
this function in two different ways:

```js
let sphere = tile.createCircle(250, 250, 50);

// Scale both X and Y by the same scalar. In this case, the sphere gets 2x
// bigger.
sphere.scale(2);
// Don't scale X, but scale Y to be 1/4th of what it was. This turns the sphere
// into an oval.
sphere.scale(1, 1 / 4);
```

#### Parameters:

- `scaleX`: the scalar to scale an entity's width by.
- `scaleY` (optional): the scalar to scale an entity's height by, or the same
  scalar value as `scaleX` if unspecified (see above).
