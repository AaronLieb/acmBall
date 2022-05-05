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

  set height(height) {
    throw new Error("You cannot directly modify the height of a rectangle");
  }

  set width(width) {
    throw new Error("You cannot directly modify the height of a rectangle");
  }

  get height() {
    return this.body.height;
  }

  get width() {
    return this.body.width;
  }

  setTopLeft(x, y) {
    this.position = { x: x - this.width / 2, y: y - this.height / 2 };
  }
}

export default Rectangle;
