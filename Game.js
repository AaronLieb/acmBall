import { testExit } from "./tests.js";
import { positionToTile, parseOptions } from "./helpers.js";
import "./matter.js";
import Camera from "./Camera.js";
let { Body, Bodies, Runner, Render, Composite, Detector, Engine, Events } = Matter;

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
  delta: 1000 / 120, // increases velocity accuracy by a ton
});
Game.render = Render.create({
  element: document.getElementById("gameView"),
  engine: Game.engine,
  options: {
    wireframes: false,
    width: Game.HEIGHT,
    height: Game.WIDTH,
  },
});

Game.tiles = [];
Game.activeTile = 0;

Game.ball = Bodies.circle( 0, 0, 40,
  parseOptions({
    frictionAir: 0,
    restitution: 1,
    friction: 0,
    render: { fillStyle: "#f99" },
  })
);

Game.ball.getRelative = function () {
  return { x: this.position.x % Game.TILE_WIDTH, y: this.position.y % Game.TILE_HEIGHT };
};

Game.setup = () => {
  Camera.setup();
  Render.run(Game.render);
  Runner.run(Game.runner, Game.engine);
  for (let tile of Game.tiles) {
    tile.setup();
  }
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
  Body.setPosition(Game.ball, Game.tiles[0].ballStart.position);
  Body.setVelocity(Game.ball, Game.tiles[0].ballStart.velocity);
  Composite.add(Game.engine.world, [Game.ball]);

  Render.run(Game.render);
  Runner.run(Game.runner, Game.engine);

  Events.on(Game.runner, "tick", () => {
    Camera.updateCamera();
    for (let pair of Detector.collisions(Game.detector)) {
      pair.bodyB.speedUp(pair.bodyA);
    }
    let oldActiveTile = Game.activeTile;
    Game.activeTile = positionToTile(Game.ball.position);
    if (Game.activeTile >= Game.tiles.length || oldActiveTile == Game.activeTile) return;
    Game.tiles[Game.activeTile].onBallEnter();
    testExit(Game.ball, Game.tiles[oldActiveTile].ballEnd);
  });
};

Game.stop = () => {
  Runner.stop(Game.runner);
  Render.stop(Game.render);
};

export default Game;
