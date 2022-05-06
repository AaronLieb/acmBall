import { relPosition } from "./helpers.js";

/**
 * A physical object in a tile. Contains a MatterJS body
 * @class {Entity}
 */
class Entity {
  /**
   * @param {body} body
   * @param {Tile} tile
   * @param {bool} addToTile
   */
  constructor(body, tile, addToTile = true, addToWorld = true) {
    this.body = body;
    this.tile = tile;

    if (this.body.ignore) {
      this.body.collisionFilter.group = 0xdeadbeef;
      this.body.isSensor = true;
      this.body.isStatic = true;
    } else {
      this.collisionId = this.tile.id + 1;
      this.body.collisionFilter.group = this.collisionId;
    }
    this.body.collisionFilter.mask = 0;

    if (!body.isStatic && addToTile) tile.bodies.push(body);
    addToWorld && Matter.Composite.add(game.engine.world, [this.body]);
  }

  /**
   * @param {Number} mass
   */
  set mass(mass) {
    Matter.Body.setMass(this.body, mass);
  }

  /**
   * @returns {Number}
   */
  get mass() {
    return this.body.mass;
  }

  /**
   * @param {vector} position - {x: num, y: num}
   */
  set position(position) {
    Matter.Body.setPosition(this.body, {
      x: this.tile.left + position.x,
      y: this.tile.top + position.y,
    });
  }

  /**
   *
   * @param {Number} x - the center x value
   * @param {Number} y - the center y value
   */
  setPosition(x, y) {
    Matter.Body.setPosition(this.body, {
      x: this.tile.left + x,
      y: this.tile.top + y,
    });
  }

  /**
   * @returns {vector} - {x: num, y: num}
   */
  get position() {
    let rpos = relPosition(this.body.position, this.tile);
    let that = this;

    let result = {
      get x() {
        return rpos.x;
      },
      /**
       * @param {Number} x
       */
      set x(x) {
        Matter.Body.setPosition(that.body, {
          x: that.tile.left + x,
          y: that.body.position.y,
        });
      },

      get y() {
        return rpos.y;
      },
      /**
       * @param {Number} y
       */
      set y(y) {
        Matter.Body.setPosition(that.body, {
          x: that.body.position.y,
          y: that.tile.top + y,
        });
      },
    };
    return result;
  }

  /**
   * @param {vector} velocity - {x: num, y: num}
   */
  set velocity(velocity) {
    Matter.Body.setVelocity(this.body, velocity);
  }

  /**
   *
   * @param {Number} xV - the x velocity
   * @param {Number} yV - the y velocity
   */
  setVelocity(xV, yV) {
    Matter.Body.setVelocity(this.body, { x: xV, y: yV });
  }

  /**
   * @param {string} color
   */
  set color(color) {
    this.body.render.fillStyle = color;
  }

  /**
   * @returns {string}
   */
  get color() {
    return this.body.render.fillStyle;
  }

  /**
   * The shapes angle. Use .rotate() to change the angle relatively.
   * @param {Number} degrees
   */
  set angle(degrees) {
    Matter.Body.setAngle(this.body, degrees * (Math.PI / 180));
  }

  /**
   * @returns {Number}
   */
  get angle() {
    return this.body.angle * (180 / Math.PI);
  }

  /**
   * Rotates the shape. Use .angle for absolute angle.
   * @param {Number} degrees
   */
  rotate(degrees) {
    Matter.Body.rotate(this.body, degrees);
  }

  /**
   * Apply a force to an object using a force vector
   * @param {Number} x - the force in the x direction
   * @param {Number} y - the force in the y direction
   */
  applyForce(x, y) {
    Matter.Body.applyForce(this.body, this.body.position, { x: x, y: y });
  }

  /**
   * Scales an Entity's shape and mass by the ratio. If you only provide one argument, scale x and y equally.
   * @param {Number} xRatio
   * @param {Number} yRatio - Optional, defaults to xRatio
   */
  scale(xRatio, yRatio = xRatio) {
    Matter.Body.scale(this.body, xRatio, yRatio);
  }

  /**
   * Controls the scale
   * @param {Number} scale - default 1
   */
  set gravityScale(scale) {
    this.body.timeScale = scale;
  }

  /**
   * @returns {Number};
   */
  get gravityScale() {
    return this.body.timeScale;
  }
}

export default Entity;
