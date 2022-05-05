import Button from "./Button.js";
import { sleep } from "../src/helpers.js";


class Spring extends Button {
  constructor(tile, x, y, width, height, vx, vy, options) {
    let startCollide = (o) => {
      Matter.Body.setVelocity(o, { x: vx, y: vy });
      Matter.Body.scale(this.body, 1.0, 0.6);
    };
    let endCollide = async () => {
      await sleep(1000);
      Matter.Body.scale(this.body, 1.0, 1.66667);
    };
    super(tile, x, y, width, height, startCollide, endCollide, options);
    this.color = "yellow";
    this.pressedColor = this.color;
    this.unpressedColor = this.color;
  }
}

export default Spring;
