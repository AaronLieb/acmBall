import { relPosition } from "./helpers.js";

/**
 * A physical object in a tile. Contains a MatterJS body
 */
class Entity {
  /**
   * @param {body} body
   * @param {Tile} tile
   */
  constructor(body, tile) {
    this.body = body;
    this.tile = tile;

    if (!body.isStatic) tile.bodies.push(body);
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
   * @param {vector} position
   */
  set position(position) {
    Matter.Body.setPosition(this.body, {
      x: this.tile.left + position.x,
      y: this.tile.top + position.y,
    });
  }

  /**
   * @returns {vector}
   */
  get position() {
    return relPosition(this.body.position, this.tile);
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
