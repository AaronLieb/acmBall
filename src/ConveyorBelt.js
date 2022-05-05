import Button from "./Button.js";

class ConveyorBelt extends Button {
  constructor(tile, x, y, width, height, speed, options) {
    let startCollide = () => {tile.ball.velocity = {x: speed * Math.cos(this.angle * Math.PI/180), 
      y: speed * Math.sin(this.angle * Math.PI/180)};};
    let endCollide = () => {};
    super(tile, x, y, width, height, startCollide, endCollide, options);
  }
}

export default ConveyorBelt;
