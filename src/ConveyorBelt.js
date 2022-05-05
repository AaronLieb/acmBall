import Button from "./Button.js";

class ConveyorBelt extends Button {
  constructor(x, y, width, height, options) {
    super(x, y, width, height, startCollide, endCollide, options);
  }
}
