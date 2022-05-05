import Entity from "./Entity.js";
import { parseOptions } from "./helpers.js";

class Polygon extends Entity {
  constructor(tile, vertices, options) {
    parseOptions(options);
    let len = vertices.length;
    let midPoints = vertices.reduce(
      (acc, curr) => {
        return { x: acc.x + curr.x / len, y: acc.y + curr.y / len };
      },
      { x: 0, y: 0 }
    );

    let body = Matter.Bodies.fromVertices(midPoints.x, midPoints.y, vertices, options);
    super(body, tile);
    this.body.label = "polygon";
  }
}

export default Polygon;
