# Circle

`Circle` is a circle [`Entity`](Entity.md). It _inherits_ from
[`Entity`](Entity.md), and so it also has all of `Entity`'s properties and
methods.

## Properties

### `radius: number`

`radius` is the radius (or size) of the circle.

#### Example: Make a circle and update its size after 1 second

```ts
tile.onBallEnter = async function () {
  // Make a circle that's originally 40 units large. The circle will fall
  // because moveable is true.
  let circle = tile.createCircle(60, 60, 40, true);
  // Wait for a second.
  await sleep(1000);
  // Change the circle's radius to 20 units large.
  circle.radius = 20;
};
```
