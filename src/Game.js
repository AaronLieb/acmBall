import { positionToTile, parseOptions, relPosition } from "./helpers.js";
import Ball from "./Ball.js";
import Button from "./Button.js";
import Camera from "./Camera.js";
import config from "../config.js";
let { Mouse, Resolver, Body, Bodies, Runner, Render, Composite, Detector, Engine, Events } = Matter;

Render.mousePosition = function (_, mouse, ctx) {
  ctx.fillStyle = "rgba(0,0,0,1)";
  ctx.font = "30px Monospace";
  let rp = relPosition(mouse.position);
  ctx.fillText(
    positionToTile(mouse.position) + ": " + Math.floor(rp.x - 22) + ", " + Math.floor(rp.y - 22),
    mouse.position.x - 10,
    mouse.position.y - 50
  );
};

Render.timestamp = function (render, engine, ctx) {
  const pad = (num, chr, len) => {
    let str = num.toString();
    return chr.repeat(len - str.length) + str;
  };
  ctx.fillStyle = "rgba(0,0,0,1)";
  ctx.font = "20px Monospace";
  const str =
    pad(Math.floor(engine.timing.timestamp / 1000), " ", 8) +
    "s " +
    pad(Math.floor(engine.timing.timestamp % 1000), "0", 3) +
    "ms";
  ctx.fillText(str, render.canvas.width - 170, render.canvas.height - 20);
};

Render.objectMasses = function (render, bodies = Composite.allBodies(Game.engine.world), context) {
  var c = context;
  c.font = "20px Arial";
  c.fillStyle = "rgba(240, 248, 255, 1)";
  bodies.forEach((b) => {
    c.fillText(`${b.mass.toFixed(2)} : ${b.collisionFilter.group}`, b.position.x - 20, b.position.y);
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
      isFixed: true,
      delta: 1000 / FPS,
    });
    this.mouse = Mouse.create(document.getElementById("gameView"));

    this.render = Render.create({
      element: document.getElementById("gameView"),
      engine: this.engine,
      mouse: this.mouse,
      options: {
        showMousePosition: config.debug.showMousePosition,
        showObjectMasses: config.debug.showMasses,
        showTimestamp: config.debug.showTimer,
        wireframes: false,
        width: (this.HEIGHT / this.WIDTH) * Camera.WIDTH,
        height: (this.WIDTH / this.HEIGHT) * Camera.HEIGHT,
      },
    });

    this.tiles = [];
    this.activeTile = 0;

    this.centerBody = Bodies.circle(this.WIDTH / 2, this.HEIGHT / 2, 0.1, { ignore: true });
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

    Render.run(this.render);
    Runner.run(this.runner, this.engine);

    Resolver._restingThresh = 0.001;

    this.tiles.forEach((tile) => tile._setup());
    let currTile = this.tiles[config.tile_id];
    if (config.debug.showTileBorder) {
      currTile.createRectangle(currTile.width / 2, currTile.height / 2, currTile.width, currTile.height, false, {
        ignore: true,
        render: { fillStyle: "rgba(52, 31 ,19, 0.05)" },
      });
    }

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

    this.ball.position = this.tiles[config.tile_id].ballStart.position;
    this.ball.velocity = this.tiles[config.tile_id].ballStart.velocity;

    this.activeTile = -1;

    Events.on(this.engine, "beforeUpdate", () => {
      this.tiles.forEach((tile) => {
        tile._onTickBackground();
        if (tile.id == this.activeTile) tile._onTick();
      });
    });

    Events.on(this.runner, "tick", () => {
      Camera.updateCamera();

      let oldActiveTile = this.activeTile;
      this.activeTile = positionToTile(this.ball.body.position);
      let aTile = this.tiles[this.activeTile];
      let oTile = this.tiles[oldActiveTile];

      if (oldActiveTile == this.activeTile || !this.tiles[this.activeTile] || this.activeTile < 0) return;
      this.ball.tile = this.tiles[this.activeTile];

      if (!aTile.entered) {
        aTile._onBallEnter();
        aTile.entered = true;
        this.ball.position = aTile.ballStart.position;
        this.ball.velocity = aTile.ballStart.velocity;
        oTile?._onBallLeave();
      }

      if (oldActiveTile != config.tile_id || !this.tiles[oldActiveTile]) return;
      this.tiles[oldActiveTile].thin_walls.forEach((e) => {
        // hide walls for old tile
        e.body.render.visible = false;
      });
      this.tiles[oldActiveTile].testExit();
      this.tiles[this.activeTile].thin_walls.forEach((e) => {
        // show walls for new tile
        e.body.render.visible = true;
      });
      if (oldActiveTile == config.tile_id && oTile) {
        oTile.testExit();
      }

      if (oldActiveTile != config.tile_id || !oTile) return;
      oTile.testExit();
      this.ball.moveTile(this.activeTile);
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
      if (a.label === "ball" && b.label.includes("set_wall")) {
        console.log("BALL HIT {", b.label, "} at: ", a.position, " velocity: ", a.velocity);
      }
      /* allow callback-enabled collisions with objects with label 'button' only */
      if (a.label === "button" || b.label === "button") Button.buttonLogic(a, b, event);
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
    //Runner.stop(this.runner);
  }

  resume() {
    this.paused = false;
    this.engine.enabled = true;
    //Runner.run(this.runner, this.engine);
  }

  start() {
    this.running = true;
    this.resume();
  }
}

export default Game;
