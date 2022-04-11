var START = {
    position: {
        x: 0,
        y: 150,
    },
    velocity: {
        x: 10,
        y: 0,
    }
}

var END = {
    position: {
        x: 0,
        y: 290,
    },
    velocity: {
        x: 3,
        y: 0,
    }
}

function setupFunction(tile) {
  tile.ground = Bodies.rectangle(
    250,
    tile.render.canvas.height,
    tile.render.canvas.width,
    100,
    { isStatic: true }
  );
  tile.ground.render.fillStyle = "fff";
  Composite.add(tile.engine.world, [tile.ground]);
}
