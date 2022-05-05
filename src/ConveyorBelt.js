import Button from "./Button.js";

class ConveyorBelt extends Button {
  constructor(tile, x, y, width, height, speed, options) {
    let startCollide = () => {};
    let endCollide = () => {};
    super(tile, x, y, width, height, startCollide, endCollide, options);
  }
}

export default ConveyorBelt;
