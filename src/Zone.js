import Button from "./Button.js";
import { sleep } from "../src/helpers.js";

class Zone extends Button {
  constructor(tile, x, y, width, height, startCallback = () => {}, duringCallback = () => {}, endCallback = () => {}, options = {}) {
    let startCollide = (o) => {
        this.during = true;
        startCallback(o);
        this.duringCollide(o);
    };
    let endCollide = (o) => {
        this.during = false;
        endCallback(o);
    };
    super(tile, x, y, width, height, startCollide, endCollide, {...options, isSensor: true});
    this.during = false;
    this.duringCollide = async (o) => { // only active during collision
        if (!this.during) return;
        duringCallback(o);
        await sleep(100);
        this.duringCollide(o);
    }
  }
}

export default Zone;
