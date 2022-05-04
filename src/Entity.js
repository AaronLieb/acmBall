import { relPosition } from "./helpers.js";

/**
 * A physical object in a tile. Contains a MatterJS body
 */
class Entity {
  /**
   * @param {body} body
   * @param {Tile} tile
   * @param {bool} addToTile
   */
  constructor(body, tile, addToTile = true) {
    this.body = body;
    this.tile = tile;

    if (!body.isStatic && addToTile) tile.bodies.push(body);

    Matter.Composite.add(game.engine.world, [this.body]);
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
    return relPosition(this.body.position, this.tile);
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
    Matter.Body.setPosition(this.body, { x: xV, y: yV });
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
}

export default Entity;
