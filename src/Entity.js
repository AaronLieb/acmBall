import { relPosition } from "./helpers.js";

class Entity {
  constructor(body, tile) {
    this.body = body;
    this.tile = tile;

    this.tile.bodies.push(this);
  }

  setMass(mass) {
    Body.setMass(obj, mass);
  }

  set position(p) {
    Matter.Body.setPosition(this.body, {
      x: this.tile.left + p.x,
      y: this.tile.top + p.y,
    });
  }

  get position() {
    return relPosition(this.body.position, this.tile);
  }
}

export default Entity;
