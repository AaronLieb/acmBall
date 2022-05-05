import Entity from "./Entity.js";
import { parseOptions } from "./helpers.js";

class Rectangle extends Entity {
  constructor(tile, x, y, width, height, moveable, options = {}) {
    options.isStatic = !moveable;
    parseOptions(options);
    let body = Matter.Bodies.rectangle(x, y, width, height, options);
    super(body, tile);
    this.body.label = "rectangle";
  }
}

export default Rectangle;
