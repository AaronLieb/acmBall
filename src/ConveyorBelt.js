import Button from "./Button.js";

class ConveyorBelt extends Button {
  constructor(x, y, width, height, speed, options) {
    let startCollide = () => {};
    let endCollide = () => {};
    super(x, y, width, height, startCollide, endCollide, options);
  }
}

export default ConveyorBelt;
