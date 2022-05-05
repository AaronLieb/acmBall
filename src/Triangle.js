import Polygon from "./Polygon.js";

class Triangle extends Polygon {
  constructor(tile, x1, y1, x2, y2, x3, y3, moveable, options = {}) {
    options.isStatic = !moveable;
    super(
      tile,
      [
        { x: x1, y: y1 },
        { x: x2, y: y2 },
        { x: x3, y: y3 },
      ],
      options
    );
    this.body.label = "triangle";
  }
}

export default Triangle;
