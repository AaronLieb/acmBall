import {
  sendTestResults,
  testBallPosition,
  testBallVelocity,
  testBallShape,
  testBallSize,
  testBallRender,
} from "./tests.js";
let { Bodies, Body, Composite } = Matter;
import { parseOptions } from "./helpers.js";
import config from "../config.js";
import Entity from "./Entity.js";

/**
 * A tile in the game grid
 * @class {Tile}
 */
class Tile {
  constructor() {
    game.tiles.push(this);

    this.id = game.tiles.length - 1;
    this.height = game.TILE_HEIGHT;
    this.width = game.TILE_WIDTH;
    this.left = (this.id % game.NUM_TILES_X) * game.TILE_WIDTH;
    this.top = Math.floor(this.id / game.NUM_TILES_Y) * game.TILE_WIDTH;
    this.right = this.left + game.TILE_WIDTH;
    this.bottom = this.right + game.TILE_HEIGHT;
    this.testsPassed = 0;
    this.numTests = 5;
    this.game = game;
    this.matter = Matter; // for advanced users
    this.bodies = []; // list of objects in this tile

    /* User Defined Member Variables */
    this.ballStart = {};
    this.ballEnd = {};

    /* User Defined Member Functions */
    this.setup;
    this.onBallEnter;
    this.onBallLeave;
    this.onTick;
    this.onTickBackground;
  }

  get ball() { return this.game.ball }

  testExit() {
    let c = config.tests.exit;
    this.testsPassed += !c.position || testBallPosition(game.ball.body, this.ballEnd);
    this.testsPassed += !c.velocity || testBallVelocity(game.ball.body, this.ballEnd);
    this.testsPassed += !c.shape || testBallShape(game.ball.body);
    this.testsPassed += !c.size || testBallSize(game.ball.body);
    this.testsPassed += !c.render || testBallRender(game.ball.body);
    sendTestResults(this);
  }

  /**
   * @method setBackgroundColor
   * @param {string} color
   * @returns {void}
   */
  setBackgroundColor(color) {
    game.render.options.background = color;
  }

  /**
   * @method createRectangle
   * @param {number} x - the center x value
   * @param {number} y - the center y value
   * @param {number} width
   * @param {number} height
   * @param {bool} moveable
   * @param {Object} options
   * @returns {Entity}
   */
  createRectangle(x, y, width, height, moveable = false, options = {}) {
    options.isStatic = !moveable;
    parseOptions(options);
    let body = Bodies.rectangle(this.left + x, this.top + y, width, height, options);
    Composite.add(game.engine.world, body);
    return new Entity(body, this);
  }

  /**
   * @method createCircle
   * @param {number} x - the center x value
   * @param {number} y - the center y value
   * @param {number} radius
   * @param {bool} moveable
   * @param {Object} options
   * @returns {Entity}
   */
  createCircle(x, y, radius, moveable = false, options = {}) {
    options.isStatic = !moveable;
    parseOptions(options);
    let body = Bodies.circle(this.left + x, this.top + y, radius, options);
    Composite.add(game.engine.world, body);
    return new Entity(body, this);
  }

  /**
   * @method createConveyorBelt
   * @param {number} x - the center x value
   * @param {number} y - the center y value
   * @param {number} width
   * @param {number} height
   * @param {number} speed
   * @param {Object} options
   * @returns {Entity}
   */
  createConveyorBelt(x, y, width, height, speed, options = { isStatic: true }) {
    parseOptions(options);
    options.render.fillStyle = "green";
    let body = Bodies.rectangle(this.left + x, this.top + y, width, height, options);
    body.isStatic = true;
    body.isSensor = true;
    body.speedUp = (ball) => {
      Body.setVelocity(ball, { x: speed, y: 0 });
    };
    game.detector.bodies.push(body);
    Composite.add(game.engine.world, body);
    return new Entity(body, this);
  }

  /**
   * callback is triggered when button pressed.
   * endCallback is triggered when button becomes unpressed.
   * options.trigger_threshold (amount of mass required to trigger a button)
   * @method createButton
   * @param {number} x - the center x value
   * @param {number} y - the center y value
   * @param {number} width
   * @param {number} height
   * @param {function} callback
   * @param {function} endCallback
   * @param {Object} options
   * @returns {Entity}
   */
  createButton(
    x,
    y,
    width,
    height,
    callback,
    endCallback = (_) => {},
    options = { isStatic: true }
  ) {
    /* Trigger callback when button is pushed by object */
    parseOptions(options);
    let unpressedColor = options.unpressedColor || "red";
    let pressedColor = options.pressedColor || "green";
    options.render.fillStyle = unpressedColor;
    let button_body = Bodies.rectangle(
      this.left + x,
      this.top + y,
      width,
      height,
      options
    );
    let startCollide = () => {
      callback();
      button_body.render.fillStyle = pressedColor;
    };
    let endCollide = () => {
      endCallback();
      button_body.render.fillStyle = unpressedColor;
    };
    button_body.callback = startCollide;
    button_body.endCallback = endCollide;
    button_body.label = "button";
    button_body.trigger_threshold = 0.1; // amount of mass needed to trigger
    button_body.current_mass = 0.0;
    Composite.add(game.engine.world, button_body);
    return new Entity(button_body, this);
  }

  /**
   * @method createSpring
   * @param {number} x - the center x value
   * @param {number} y - the center y value
   * @param {number} width
   * @param {number} height
   * @param {vector} launchVelocity
   * @param {Object} options
   * @returns {Entity}
   */
  createSpring(x, y, width, height, launchVelocity, options = { isStatic: true }) {
    parseOptions(options);
    let base = Bodies.rectangle(this.left + x, this.top + y, width, height, options);
    let spring = Bodies.rectangle(this.left + x, this.top + y, width, height, options);
    Composite.add(game.engine.world, spring);
    return new Entity(spring, this);
  }

  /**
   * Removes all non-static objects in the tile
   * @method clear
   * @returns {void}
   */
  clear() {
    Composite.remove(this.game.engine.world, this.bodies);
  }
}

export default Tile;
