import { positionToTile, parseOptions } from "./helpers.js";
import "./matter.js";
import Camera from "./Camera.js";
let { Resolver, Body, Bodies, Runner, Render, Composite, Detector, Engine, Events } =
  Matter;

const FPS = 120;

let Game = {};

Game.NUM_TILES_X = 4;
Game.NUM_TILES_Y = 4;
Game.TILE_HEIGHT = 500;
Game.TILE_WIDTH = 500;
Game.HEIGHT = Game.TILE_HEIGHT * Game.NUM_TILES_Y;
Game.WIDTH = Game.TILE_WIDTH * Game.NUM_TILES_X;
Game.TILES = Game.NUM_TILES_X * Game.NUM_TILES_Y;

Game.engine = Engine.create();
Game.runner = Runner.create({
  delta: 1000 / FPS,
});
Game.render = Render.create({
  element: document.getElementById("gameView"),
  engine: Game.engine,
  options: {
    wireframes: false,
    width: (Game.HEIGHT / Game.WIDTH) * Camera.WIDTH,
    height: (Game.WIDTH / Game.HEIGHT) * Camera.HEIGHT,
  },
});

Game.tiles = [];
Game.activeTile = 0;

Game.centerBody = Bodies.circle(Game.WIDTH / 2, Game.HEIGHT / 2, 0.1, {
  isStatic: true,
  isSensor: true,
});

Game.defaultBallState = {
  frictionAir: 0,
  restitution: 0.9,
  // friction: 0.0008,
  friction: 0,
  inertia: Infinity,
  inverseInertia: 0,
  render: {
    fillStyle: "#f99",
    lineWidth: 5,
    strokeStyle: "black",
  },
};

Game.ball = Bodies.circle(0, 0, 40, Game.defaultBallState);

Game.ball.getRelative = function () {
  return { x: this.position.x % Game.TILE_WIDTH, y: this.position.y % Game.TILE_HEIGHT };
};

Game.setup = () => {
  // Camera.setup(); // TODO: check if this is even needed
  Render.run(Game.render);
  Runner.run(Game.runner, Game.engine);

  Resolver._restingThresh = 0.001;

  Game.tiles.forEach((tile) => tile.setup());

  // Render a single tick
  let stop = () => {
    Game.stop();
    Events.off(Game.runner, "tick", stop);
  };
  Events.on(Game.runner, "tick", stop);
};

Game.detector = Detector.create({
  bodies: [Game.ball],
});

Game.run = () => {
  // TODO Change to ball.setup()
  Composite.add(Game.engine.world, [Game.ball]);

  Render.run(Game.render);
  Runner.run(Game.runner, Game.engine);

  Body.setPosition(Game.ball, Game.tiles[0].ballStart.position);
  Body.setVelocity(Game.ball, Game.tiles[0].ballStart.velocity);

  Events.on(Game.runner, "tick", () => {
    Camera.updateCamera();
    for (let pair of Detector.collisions(Game.detector)) {
      pair.bodyB.speedUp(pair.bodyA);
    }
    let oldActiveTile = Game.activeTile;
    Game.activeTile = positionToTile(Game.ball.position);
    if (oldActiveTile == Game.activeTile || Game.activeTile > Game.tiles.length) return;
    Game.tiles[Game.activeTile]?.onBallEnter();
    Game.tiles[oldActiveTile]?.testExit();
  });
};

Game.stop = () => {
  Runner.stop(Game.runner);
  Render.stop(Game.render);
};

Game.pause = () => {
  Game.engine.enabled = false;
  Runner.stop(Game.runner);
};

// Make global
window.pauseGame = Game.pause;

Game.resume = () => {
  Game.engine.enabled = true;
  Runner.run(Game.runner, Game.engine);
};

// Make global
window.resumeGame = Game.resume;

Game.start = () => {
  Game.run();
};

// Make global
window.startGame = Game.start;

window.restartGame = () => {
  window.location.reload();
};

export default Game;
