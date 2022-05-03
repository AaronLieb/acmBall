import {
  sendTestResults,
  testBallPosition,
  testBallVelocity,
  testBallShape,
  testBallSize,
  testBallRender,
} from "./tests.js";
let { Bodies, Body, Composite } = Matter;
import Game from "./Game.js";
import { parseOptions } from "./helpers.js";
import config from "../config.js";

function Tile() {
  /* Constructor */

  Game.tiles.push(this);

  /* Member Variables */
  this.id = Game.tiles.length - 1;
  this.height = Game.TILE_HEIGHT;
  this.width = Game.TILE_WIDTH;
  this.left = (this.id % Game.NUM_TILES_X) * Game.TILE_WIDTH;
  this.top = Math.floor(this.id / Game.NUM_TILES_Y) * Game.TILE_WIDTH;
  this.right = this.left + Game.TILE_WIDTH;
  this.bottom = this.right + Game.TILE_HEIGHT;
  this.testsPassed = 0;
  this.numTests = 5;
  this.game = Game;
  this.ball = this.game.ball;

  /* User Defined Member Variables */

  this.ballStart = {};
  this.ballEnd = {};

  /* User Defined Member Functions */

  this.setup;
  this.onBallEnter;
  this.onTick;
  this.onTickBackground;

  /* Testing */

  this.testExit = () => {
    let c = config.tests.exit;
    console.log(Game.ball.render);
    this.testsPassed += !c.position || testBallPosition(Game.ball, this.ballEnd);
    this.testsPassed += !c.velocity || testBallVelocity(Game.ball, this.ballEnd);
    this.testsPassed += !c.shape || testBallShape(Game.ball);
    this.testsPassed += !c.size || testBallSize(Game.ball);
    this.testsPassed += !c.render || testBallRender(Game.ball);
    sendTestResults(this);
  };

  /*  Member Functions */

  this.setBackgroundColor = (color) => {
    // Currently sets the background for the WHOLE canvas, needs to be for an individual tile
    // two ways to do this, CSS with bounds, or draw to canvas manually
    Game.render.options.background = color;
  };

  /*  createObject Member Functions */

  this.createRectangle = (x, y, width, height, moveable = false, options = {}) => {
    options.isStatic = !moveable;
    parseOptions(options);
    let body = Bodies.rectangle(this.left + x, this.top + y, width, height, options);
    Composite.add(Game.engine.world, body);
    return this._editable(body);
  };

  this.createCircle = (x, y, radius, options = { isStatic: true }) => {
    parseOptions(options);
    let body = Bodies.circle(this.left + x, this.top + y, radius, options);
    Composite.add(Game.engine.world, body);
    return body;
  };

  this.createConveyorBelt = (
    x,
    y,
    width,
    height,
    speed,
    options = { isStatic: true }
  ) => {
    parseOptions(options);
    options.render.fillStyle = "green";
    let body = Bodies.rectangle(this.left + x, this.top + y, width, height, options);
    body.isStatic = true;
    body.isSensor = true;
    body.speedUp = (ball) => {
      Body.setVelocity(ball, { x: speed, y: 0 });
    };
    Game.detector.bodies.push(body);
    Composite.add(Game.engine.world, body);
    return body;
  };

  this.createSpring = (
    x,
    y,
    width,
    height,
    launchVelocity,
    options = { isStatic: true }
  ) => {
    parseOptions(options);
    let base = Bodies.rectangle(this.left + x, this.top + y, width, height, options);
    let spring = Bodies.rectangle(this.left + x, this.top + y, width, height, options);
    Composite.add(Game.engine.world, body);
    return this._editable(spring);
  };

  this._editable = (obj) => {
    obj.setMass = (mass) => {
      Body.setMass(obj, mass);
    };

    return obj;
  };
}

export default Tile;
