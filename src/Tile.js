import {
  sendTestResults,
  testBallPosition,
  testBallVelocity,
  testBallShape,
  testBallSize,
  testBallRender,
} from "./tests.js";
let { Body, Composite } = Matter;
import config from "../config.js";
import ConveyorBelt from "./ConveyorBelt.js";
import Circle from "./Circle.js";
import Button from "./Button.js";
import Zone from "./Zone.js";
import Rectangle from "./Rectangle.js";
import Entity from "./Entity.js";
import Line from "./Line.js";
import Triangle from "./Triangle.js";
import Ramp from "./Ramp.js";
import Rope from "./Rope.js";
import Spring from "./Spring.js";
import Portal from "./Portal.js";

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
    this.thin_walls = [];
    this._entered = false;
    this.centerBody = Matter.Bodies.circle(this.left + this.width / 2, this.top + this.height / 2, 0.1, {
      ignore: true,
    });

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

  get ball() {
    return this.game.ball;
  }

  /**
   * @private
   */
  _onTick() {
    this.onTick();
  }

  /**
   * @private
   */
  _onBallLeave() {
    this.onBallLeave();
  }

  /**
   * @private
   */
  _onBallEnter() {
    this._entered = true;
    this.ball.position = this.ballStart.position;
    this.ball.velocity = this.ballStart.velocity;
    this.bodies.forEach((b) => Matter.Body.setStatic(b, b._isStatic ?? b.isStatic));
    console.log(this.id, 'newnew: ', this.bodies);
    this.onBallEnter();
  }

  /**
   * @private
   */
  _setup() {
    this.setup();
    config.debug.showMarkers && this._drawMarkers();
    this.bodies.forEach((b) => {
      b._isStatic = b.isStatic;
      Body.setStatic(b, true);
    });
  }

  /**
   * @private
   */
  _testExit() {
    let c = config.tests.exit;
    this.testsPassed += !c.position || testBallPosition(game.ball.body, this.ballEnd);
    this.testsPassed += !c.velocity || testBallVelocity(game.ball.body, this.ballEnd);
    this.testsPassed += !c.shape || testBallShape(game.ball.body);
    this.testsPassed += !c.size || testBallSize(game.ball.body);
    this.testsPassed += !c.render || testBallRender(game.ball.body);
    sendTestResults(this);
  }

  /**
   * @method createRectangle
   * @param {Number} x - the center x value
   * @param {Number} y - the center y value
   * @param {Number} width
   * @param {Number} height
   * @param {bool} moveable
   * @param {Object} options
   * @returns {Rectangle}
   */
  createRectangle(x, y, width, height, moveable = false, options = {}) {
    return new Rectangle(this, this.left + x, this.top + y, width, height, moveable, options);
  }

  /**
   * @method createLine
   * @param {Number} x1 - x position of the first point
   * @param {Number} y1 - y position of the first point
   * @param {Number} x2 - x position of the second point
   * @param {Number} y2 - y position of the second point
   * @param {Number} thickness - how thick the line is
   * @param {bool} moveable
   * @param {Object} options
   * @returns {Line}
   */
  createLine(x1, y1, x2, y2, thickness, moveable = false, options = {}) {
    return new Line(this, this.left + x1, this.top + y1, this.left + x2, this.top + y2, thickness, moveable, options);
  }

  /**
   * @method createTriangle
   * @param {Number} x1  - x position of the first point
   * @param {Number} y1  - y position of the first point
   * @param {Number} x2  - x position of the second point
   * @param {Number} y2  - y position of the second point
   * @param {Number} x3  - x position of the third point
   * @param {Number} y3  - y position of the third point
   * @param {bool} moveable
   * @param {Object} options
   * @returns {Triangle}
   */
  createTriangle(x1, y1, x2, y2, x3, y3, moveable = false, options = {}) {
    return new Triangle(
      this,
      this.left + x1,
      this.top + y1,
      this.left + x2,
      this.top + y2,
      this.left + x3,
      this.top + y3,
      moveable,
      options
    );
  }

  /**
   * Creats a triangle ramp from two points, is unmoveable
   * @method createRamp
   * @param {Number} x1 - x position for the start of the ramp
   * @param {Number} y1 - y position for the start of the ramp
   * @param {Number} x2 - x position for the end of the ramp
   * @param {Number} y2 - y position for the end of the ramp
   * @param {Object} options
   * @returns {Ramp}
   */
  createRamp(x1, y1, x2, y2, options = {}) {
    return new Ramp(this, this.left + x1, this.top + y1, this.left + x2, this.top + y2, options);
  }

  /**
   * @method createCircle
   * @param {number} x - the center x value
   * @param {number} y - the center y value
   * @param {number} radius
   * @param {bool} moveable
   * @param {Object} options
   * @returns {Circle}
   */
  createCircle(x, y, radius, moveable = false, options = {}) {
    return new Circle(this, this.left + x, this.top + y, radius, moveable, options);
  }

  /**
   * @method createConveyorBelt
   * @param {number} x - the center x value
   * @param {number} y - the center y value
   * @param {number} width
   * @param {number} height
   * @param {number} speed - make this negative to switch the direction
   * @param {Object} options
   * @returns {ConveyorBelt}
   */
  createConveyorBelt(x, y, width, height, speed, options = {}) {
    return new ConveyorBelt(this, this.left + x, this.top + y, width, height, speed, options);
  }

  createPortals(x1, y1, x2, y2) {
    return [
      new Portal(this, x1 + this.left, y1 + this.top, x2 + this.left, y2 + this.top, "rgba(255, 154, 0, 0.6)"),
      new Portal(this, x2 + this.left, y2 + this.top, x1 + this.left, y1 + this.top, "rgba(0, 101, 255, 0.6)"),
    ];
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
   * @param {function} callback - gets called when the button is pressed down
   * @param {function} endCallback - gets called when the button is unpressed
   * @param {Object} options
   * @returns {Button}
   */
  createButton(x, y, width, height, callback, endCallback = (_) => {}, options = {}) {
    return new Button(this, this.left + x, this.top + y, width, height, callback, endCallback, options);
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
  createSpring(x, y, width, height, vx, vy, options = {}) {
    return new Spring(this, this.left + x, this.top + y, width, height, vx, vy, options);
  }

  /**
   * @method createSpring
   * @param {number} x - the center x value
   * @param {number} y - the center y value
   * @param {number} length - how long the rope is
   * @param {Object} options
   */
  createRope(x, y, length, options = {}) {
    new Rope(this, this.left + x, this.top + y, length, options);
  }

  createZone(x, y, width, height, start, during, end, options = {}) {
    return new Zone(this, this.left + x, this.top + y, width, height, start, during, end, options);
  }

  /**
   * Removes all non-static objects in the tile
   * @method clear
   * @returns {void}
   */
  clear() {
    Composite.remove(this.game.engine.world, this.bodies);
  }

  createSoftBody = (x, y, cols, rows, radius) => {
    var particleOptions = {
      friction: 0.05,
      frictionStatic: 0.1,
      render: { visible: true, fillStyle: "green" },
    };

    var constraintOptions = {
      render: { visible: false },
    };

    var softBody = Matter.Composites.softBody(
      this.left + x,
      this.top + y,
      cols,
      rows,
      0,
      0,
      true,
      radius,
      particleOptions,
      constraintOptions
    );
    let allbodies = Matter.Composite.allBodies(softBody);
    allbodies.forEach((e) => {
      e.collisionFilter.group = this.id + 1;
    });
    Matter.Composite.add(this.game.engine.world, softBody);
  };

  _drawMarkers = () => {
    let start_rect = this.createRectangle(this.ballStart.position.x, this.ballStart.position.y, 10, 30, false, {ignore: true});
    start_rect.color = 'rgba(2, 14, 245, .6)';
    start_rect.body.render.strokeStyle = 'rgba(0,0,0,0)';
    let end_rect = this.createRectangle(this.ballEnd.position.x, this.ballEnd.position.y, 10, 30, false, {ignore: true});
    end_rect.color = 'rgba(245, 14, 2, .6)';
    end_rect.body.render.strokeStyle = 'rgba(0,0,0,0)';

  }
}

export default Tile;
