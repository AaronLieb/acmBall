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
import ConveyorBelt from "./ConveyorBelt.js";
import Circle from "./Circle.js";
import Button from "./Button.js";
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
    this.entered = false;

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
   * @param {Number} y2  - y poisition of the second point
   * @param {Number} x3  - x position of the third point
   * @param {Number} y3  - y position of the third point
   * @param {bool} moveable
   * @param {Object} options
   * @returns {Triangle}
   */
  createTriangle(x1, y1, x2, y2, x3, y3, moveable = false, options = {}) {
    return new Triangle(this, x1, y1, x2, y2, x3, y3, moveable, options);
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
    return new Ramp(this, x1, y1, x2, y2, options);
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
      new Portal(this, x1, y1, x2, y2, "rgba(255, 154, 0, 0.6)"),
      new Portal(this, x2, y2, x1, y1, "rgba(0, 101, 255, 0.6)"),
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

  /**
   * Removes all non-static objects in the tile
   * @method clear
   * @returns {void}
   */
  clear() {
    Composite.remove(this.game.engine.world, this.bodies);
  }

  createGate = (walls, pt, wall_thickness, color = "red") => {
    const gate_margin = 10;
    const gate_thickness = 2 * this.ball.radius + gate_margin;
    const gate_size = 10;
    const disable_id = 12970386909276;
    const strictness = 25; // how far off the ball is allowed to be to enter next tile
    const id_snapshot = this.id + 1;
    let is_horizontal = pt.x <= 20 || pt.x >= this.width - 20;

    let start_gate_width = is_horizontal ? gate_size : gate_thickness;
    let start_gate_height = is_horizontal ? gate_thickness : gate_size;
    const disable_walls = (o) => {
      let delta = Math.abs(o.a.position.y - o.b.position.y);
      if (delta > strictness) {
        return;
      }
      console.log("ENDING VELOCITY: ", o.a.label === "ball" ? o.a.velocity : o.b.velocity); // write this to user?
      // startCollide callback
      walls.forEach((e) => {
        e.body.collisionFilter.group = disable_id; // disable wall collision for all tiles
      });
    };
    const enable_walls = (o) => {
      // endCollide callback
      walls.forEach((e) => {
        e.body.collisionFilter.group = id_snapshot; // disable wall collision for all tiles
      });
    };

    let gate = this.createButton(pt.x, pt.y, start_gate_width, start_gate_height, disable_walls, enable_walls, {
      unpressedColor: color,
      pressedColor: color,
      ballOnly: true,
      isSensor: true,
      render: {
        strokeStyle: "rgba(0,0,0,0)",
      },
    });
  };

  createBoundaries = () => {
    const wall_thickness = 100;
    const wm = 0; // wall margin

    const wall_options = {
      render: { fillStyle: "rgba(255, 0,0, .0)", strokeStyle: "rgba(0,0,0,.0)" },
      friction: 0.0,
      label: "set_wall",
    };
    const thin_options = {
      isSensor: true,
      render: { fillStyle: "rgba(42, 42,42, .06)", strokeStyle: "rgba(42,42,42,0)", visible: false },
      friction: 0.0,
    };
    /* Wall Setups */

    let left_wall = this.createLine(
      wm - wall_thickness - 19,
      -40,
      wm - wall_thickness - 19,
      this.height,
      wall_thickness,
      false,
      wall_options
    );
    let right_wall = this.createLine(
      this.width + wall_thickness - wm + 19,
      -40,
      this.width + wall_thickness - wm + 19,
      this.height,
      wall_thickness,
      false,
      wall_options
    );
    let top_wall = this.createLine(
      0 - 100,
      wm - wall_thickness - 19,
      this.width + 100,
      wm - wall_thickness - 19,
      wall_thickness,
      false,
      wall_options
    );
    let bot_wall = this.createLine(
      -19,
      this.height - wm + wall_thickness + 19,
      this.width,
      this.height - wm + wall_thickness + 19,
      wall_thickness,
      false,
      wall_options
    );
    top_wall.body.label = "top_set_wall";
    left_wall.body.label = "left_set_wall";
    right_wall.body.label = "right_set_wall";
    bot_wall.body.label = "bot_set_wall";
    let walls = [left_wall, right_wall, top_wall, bot_wall];

    /* Thin walls */
    const thin_width = 3;
    let left_thin = this.createLine(
      wm - thin_width - 19,
      -20,
      wm - thin_width - 19,
      this.height + 20,
      thin_width,
      false,
      thin_options
    );
    let right_thin = this.createLine(
      this.width + thin_width - wm + 19,
      -20,
      this.width + thin_width - wm + 19,
      this.height + 20,
      thin_width,
      false,
      thin_options
    );
    let top_thin = this.createLine(
      -20,
      wm - thin_width - 19,
      this.width + 20,
      wm - thin_width - 19,
      thin_width,
      false,
      thin_options
    );
    let bot_thin = this.createLine(
      -20,
      this.height - wm + thin_width + 19,
      this.width + 20,
      this.height - wm + thin_width + 19,
      thin_width,
      false,
      thin_options
    );
    /* Gate Setup */
    let sp = this.ballStart.position;
    let ep = this.ballEnd.position;

    this.createGate(walls, sp, wall_thickness, "rgba(0, 15, 255, .7)");
    this.createGate(walls, ep, wall_thickness, "rgba(255, 0, 0, .6)");
    this.thin_walls = [top_thin, bot_thin, left_thin, right_thin];
    if (this.id === config.tile_id) {
      this.thin_walls.forEach((e) => {
        e.body.render.visible = true;
      });
    }
  };

  createSoftBody = (x, y, cols, rows, radius) => {
    var particleOptions = {
      friction: 0.05,
      frictionStatic: 0.1,
      render: { visible: true, fillStyle: 'green' },
    };

    var constraintOptions = {
      render: { visible: false },
    };

    var softBody = Matter.Composites.softBody(this.left + x, this.top + y, cols, rows, 0, 0, true, radius, particleOptions, constraintOptions);
    let allbodies = Matter.Composite.allBodies(softBody);
    allbodies.forEach((e) => {
      e.collisionFilter.group = this.id + 1;
    });
    Matter.Composite.add(this.game.engine.world, softBody)
  };
}

export default Tile;
