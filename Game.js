import { testExit } from "./tests.js";
import { positionToTile } from "./helpers.js";
import "./matter.js";
let { Body, Bodies, Runner, Render, Composite, Detector, Engine, Events } =
  Matter;

let Game = {};

Game.NUM_TILES_X = 4;
Game.NUM_TILES_Y = 4;
Game.TILE_HEIGHT = 500;
Game.TILE_WIDTH = 500;
Game.HEIGHT = Game.TILE_HEIGHT * Game.NUM_TILES_Y;
Game.WIDTH = Game.TILE_WIDTH * Game.NUM_TILES_X;

Game.engine = Engine.create();
Game.runner = Runner.create();
Game.render = Render.create({
  element: document.body,
  engine: Game.engine,
  options: {
    wireframes: false,
    width: Game.HEIGHT,
    height: Game.WIDTH,
  },
});

Game.tiles = [];
Game.activeTile = 0;

Game.ball = Bodies.circle(0, 0, 40, {
  frictionAir: 0,
  restitution: 1,
  friction: 0,
  render: { fillStyle: "#f99" },
});

Game.setup = () => {
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
  Body.setPosition(Game.ball, Game.tiles[0].ballStart.position);
  Body.setVelocity(Game.ball, Game.tiles[0].ballStart.velocity);
  Render.run(Game.render);
  Runner.run(Game.runner, Game.engine);
  Composite.add(Game.engine.world, [Game.ball]);

  Events.on(Game.runner, "tick", () => {
    for (let pair of Detector.collisions(Game.detector)) {
      pair.bodyB.speedUp(pair.bodyA);
    }
    let oldActiveTile = Game.activeTile;
    Game.activeTile = positionToTile(Game.ball.position);
    if (oldActiveTile != Game.activeTile) {
      //console.log(`Switching from ${oldActiveTile} to ${Game.activeTile}`);
      Game.tiles[Game.activeTile]?.onBallEnter();
    }
  });
};

Game.stop = () => {
  Runner.stop(Game.runner);
  Render.stop(Game.render);
};

export default Game;
