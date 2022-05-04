import { relPosition } from "./helpers.js";

class Entity {
  constructor(body, tile) {
    this.body = body;
    this.tile = tile;

    tile.bodies.push(this);
  }

  /**
   * @param {number} mass
   */
  set mass(mass) {
    Matter.Body.setMass(this.body, mass);
  }

  /**
   * @param {Object} pos
   */
  set position(pos) {
    Matter.Body.setPosition(this.body, {
      x: this.tile.left + pos.x,
      y: this.tile.top + pos.y,
    });
  }

  get position() {
    return relPosition(this.body.position, this.tile);
  }
}

export default Entity;
