var START = {
  position: {
    x: 0,
    y: 410,
  },
  velocity: {
    x: 5,
    y: 0,
  },
};

var END = {
  position: {
    x: 500,
    y: 410,
  },
  velocity: {
    x: 3,
    y: 0,
  },
};

function setupFunction(tile) {
  tile.ground = Bodies.rectangle(
    250,
    tile.render.canvas.height,
    tile.render.canvas.width,
    100,
    { isStatic: true, render: { fillStyle: "gray" } }
  );
  Composite.add(tile.engine.world, [tile.ground]);
}
