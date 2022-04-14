var START = {
  position: {
    x: 0,
    y: 290,
  },
  velocity: {
    x: 3,
    y: 0,
  },
};

var END = {
  position: {
    x: 500,
    y: 410,
  },
  velocity: {
    x: 5,
    y: 0,
  },
};

// setup()
// onBallEnter()
// run()
// runBackground()

// This function will run once when the tile loads for the first time
function setup() {
  let ground = Bodies.rectangle(
    250,
    game.render.canvas.height,
    game.render.canvas.width,
    100,
    { isStatic: true, render: { fillStyle: "gray" } }
  );
  let b = new ConveyorBelt(
    game,
    250,
    game.render.canvas.height - 40,
    game.render.canvas.width / 4,
    5
  );
  Composite.add(game.engine.world, [ground, b.belt]);
}

// This function will run when the ball enters your tile
function onBallEnter() {}

// This function will run once every tick while the ball is in your tile
function onTick() {}

// This function will run once everey tick, even if the ball is not in your tile
function onTickBackground() {}
