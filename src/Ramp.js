import Triangle from "./Triangle.js";

class Ramp extends Triangle {
  constructor(tile, x1, y1, x2, y2, options = {}) {
    super(tile, x1, y1, x2, y1, x2, y2, false, options);
    this.body.label = "ramp";
  }
}

export default Ramp;
