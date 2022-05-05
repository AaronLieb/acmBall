import Polygon from "./Polygon.js";
import { unitVector } from "./helpers.js";

class Line extends Polygon {
  constructor(tile, x1, y1, x2, y2, thickness, moveable, options = {}) {
    options.isStatic = !moveable;
    let u = unitVector({ x: x2 - x1, y: y2 - y1 });
    let n = { x: -u.y * thickness, y: u.x * thickness };
    super(
      tile,
      [
        { x: x1 + n.x, y: y1 + n.y },
        { x: x1 - n.x, y: y1 - n.y },
        { x: x2 + n.x, y: y2 + n.y },
        { x: x2 - n.x, y: y2 - n.y },
      ],
      options
    );
    this.body.label = "line";
  }
}

export default Line;
