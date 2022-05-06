import Triangle from "./Triangle.js";

class Ramp extends Triangle {
  constructor(tile, x1, y1, x2, y2, options = {}) {
    let { x3, y3 } = y2 > y1 ? { x3: x1, y3: y2 } : { x3: x2, y3: y2 };
    super(tile, x1, y1, x3, y3, x2, y2, false, options);
    this.body.label = "ramp";
  }
}

export default Ramp;
