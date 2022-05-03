import { positionToTile, parseOptions, relPosition } from "./helpers.js";
import Camera from "./Camera.js";
import config from "../config.js";
import { buttonLogic } from './button.js'
let {
  Mouse,
  Resolver,
  Body,
  Bodies,
  Runner,
  Render,
  Composite,
  Detector,
  Engine,
  Events,
} = Matter;

// Expirement with this
const FPS = 60;

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
Game.mouse = Mouse.create(document.getElementById("gameView"));


Render.mousePosition = function (_, mouse, ctx) {
  ctx.fillStyle = "rgba(0,0,0,1)";
  ctx.font = "30px Arial";
  let rp = relPosition(mouse.position);
  ctx.fillText(
    positionToTile(mouse.position) + ": " + Math.floor(rp.x) + ", " + Math.floor(rp.y),
    mouse.position.x - 30,
    mouse.position.y - 30
  );
};

Render.objectMasses = function (render, bodies = Composite.allBodies(Game.engine.world), context) {
  var c = context;
  c.font = "20px Arial";
  c.fillStyle = "rgba(240, 248, 255, 1)"
  bodies.forEach((b) => {
    c.fillText(
      b.mass.toFixed(2), b.position.x - 20, b.position.y
    );
  });
};

Game.render = Render.create({
  element: document.getElementById("gameView"),
  engine: Game.engine,
  mouse: Game.mouse,
  options: {
    showMousePosition: true,
    showObjectMasses: true,
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
  friction: 0,
  // restitution: 0.9,
  restitution: 1,
  // friction: 0.0008,
  inertia: Infinity,
  inverseInertia: 0,
  render: {
    fillStyle: "#f99",
    lineWidth: 5,
    strokeStyle: "black",
    visible: true,
  },
};

const BALL_RADIUS = 40;
Game.ball = Bodies.circle(0, 0, BALL_RADIUS, Game.defaultBallState);

Game.ball.getRelative = function () {
  return relPosition(this.position);
};

Game.setup = () => {
  Camera.setup();
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

    if (oldActiveTile == Game.activeTile || !Game.tiles[Game.activeTile]) return;
    Game.tiles[Game.activeTile].onBallEnter();

    if (oldActiveTile != config.tile_id || !Game.tiles[oldActiveTile]) return;
    Game.tiles[oldActiveTile].testExit();
    Body.set(Game.ball, Game.defaultBallState);

  });

  Events.on(Game.engine, "collisionStart", Game._handleCollisions);
  Events.on(Game.engine, "collisionEnd", Game._handleCollisions);

};

Game._handleCollisions = (event) => {
  let i, pair, length = event.pairs.length;

  for (i = 0; i < length; i++) {
    pair = event.pairs[i];
    let a = pair.bodyA
    let b = pair.bodyB
    /* allow callback-enabled collisions with objects with label 'button' only */
    if (a.label === 'button' || b.label === 'button') buttonLogic(a, b, event);
    // if (a.position.y > b.position.y) b.mass += a.mass;
  }
}

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

Game.start = () => Game.run();

// Make global
window.startGame = Game.start;

window.restartGame = () => window.location.reload();

export default Game;
