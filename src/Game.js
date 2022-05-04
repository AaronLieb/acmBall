import { positionToTile, parseOptions, relPosition } from "./helpers.js";
import Ball from "./Ball.js";
import Camera from "./Camera.js";
import config from "../config.js";
import { buttonLogic } from "./button.js";
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

// TODO: MOVE THESE TO MATTER
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
Render.objectMasses = function (
  render,
  bodies = Composite.allBodies(Game.engine.world),
  context
) {
  var c = context;
  c.font = "20px Arial";
  c.fillStyle = "rgba(240, 248, 255, 1)";
  bodies.forEach((b) => {
    c.fillText(b.mass.toFixed(2), b.position.x - 20, b.position.y);
  });
};

const FPS = 60;

class Game {
  constructor() {
    this.running = false;
    this.paused = false;
    this.NUM_TILES_X = 2;
    this.NUM_TILES_Y = 2;
    this.TILE_HEIGHT = 500;
    this.TILE_WIDTH = 500;
    this.HEIGHT = this.TILE_HEIGHT * this.NUM_TILES_Y;
    this.WIDTH = this.TILE_WIDTH * this.NUM_TILES_X;
    this.NUM_TILES = this.NUM_TILES_X * this.NUM_TILES_Y;
    this.engine = Engine.create();
    this.runner = Runner.create({
      delta: 1000 / FPS,
    });
    this.mouse = Mouse.create(document.getElementById("gameView"));

    this.render = Render.create({
      element: document.getElementById("gameView"),
      engine: this.engine,
      mouse: this.mouse,
      options: {
        showMousePosition: true,
        showObjectMasses: true,
        wireframes: false,
        width: (this.HEIGHT / this.WIDTH) * Camera.WIDTH,
        height: (this.WIDTH / this.HEIGHT) * Camera.HEIGHT,
      },
    });

    this.tiles = [];
    this.activeTile = 0;

    this.centerBody = Bodies.circle(this.WIDTH / 2, this.HEIGHT / 2, 0.1, {
      isStatic: true,
      isSensor: true,
    });

    /* 
      These functions are passed as arguments
      The reference to "this" is lost when passed
      so we bind this to the function to prevent that
    */
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
  }

  setup() {
    this.ball = new Ball(this.tiles[config.tile_id]);

    Camera.setup();

    this.detector = Detector.create({
      bodies: [this.ball.body],
    });

    Render.run(this.render);
    Runner.run(this.runner, this.engine);

    Resolver._restingThresh = 0.001;

    this.tiles.forEach((tile) => tile.setup());

    this.oneTick();

    Events.on(this.engine, "collisionStart", this._handleCollisions);
    Events.on(this.engine, "collisionEnd", this._handleCollisions);
  }

  oneTick = () => {
    let stop = () => {
      this.stop();
      Events.off(this.runner, "tick", stop);
    };
    Events.on(this.runner, "tick", stop);
  };

  run() {
    Render.run(this.render);
    Runner.run(this.runner, this.engine);

    this.ball.position = this.tiles[0].ballStart.position;
    this.ball.velocity = this.tiles[0].ballStart.velocity;

    this.activeTile = -1;

    Events.on(this.runner, "tick", () => {
      Camera.updateCamera();

      this.tiles.forEach((tile) => {
        tile.onTickBackground();
        if (tile.id == this.activeTile) tile.onTick();
      });

      for (let pair of Detector.collisions(this.detector)) {
        pair.bodyB.speedUp(pair.bodyA);
      }

      let oldActiveTile = this.activeTile;
      this.activeTile = positionToTile(this.ball.body.position);

      if (oldActiveTile == this.activeTile || !this.tiles[this.activeTile] || this.activeTile < 0) return;
      this.tiles[this.activeTile].onBallEnter();

      if (oldActiveTile != config.tile_id || !this.tiles[oldActiveTile]) return;
      this.tiles[oldActiveTile].testExit();
      this.ball.resetState();
    });
  }

  /**
   * @private
   * @param {event} event
   * @returns {void}
   */
  _handleCollisions(event) {
    let i,
      pair,
      length = event.pairs.length;

    for (i = 0; i < length; i++) {
      pair = event.pairs[i];
      let a = pair.bodyA;
      let b = pair.bodyB;
      /* allow callback-enabled collisions with objects with label 'button' only */
      if (a.label === "button" || b.label === "button") buttonLogic(a, b, event);
      // if (a.position.y > b.position.y) b.mass += a.mass;
    }
  }

  stop() {
    this.running = false;
    Runner.stop(this.runner);
    Render.stop(this.render);
  }

  pause() {
    this.paused = true;
    this.engine.enabled = false;
    Runner.stop(this.runner);
  }

  resume() {
    this.paused = false;
    this.engine.enabled = true;
    Runner.run(this.runner, this.engine);
  }

  start() {
    this.running = true;
    this.resume();
  }
}

export default Game;
