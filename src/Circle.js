import Entity from "./Entity.js";
import { parseOptions } from "./helpers.js";

class Circle extends Entity {
  constructor(tile, x, y, radius, moveable = false, options = {}) {
    options.isStatic = !moveable;
    parseOptions(options);
    let body = Matter.Bodies.circle(x, y, radius, options);
    super(body, tile, options.addToTile ?? false);
    this.body.label = options.label ?? "circle";
  }

  /**
   * @param {Number} radius - the radius of the circle
   */
  set radius(radius) {
    Matter.Body.set(this.body, { circleRadius: radius });
  }

  /**
   * @returns {Number}
   */
  get radius() {
    return this.body.circleRadius;
  }
}

export default Circle;
