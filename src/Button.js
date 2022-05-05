import Entity from "./Entity.js";
import Rectangle from "./Rectangle.js";

/**
 * A button that can be pressed by objects
 * @class {Button}
 */
class Button extends Rectangle {
  constructor(tile, x, y, width, height, startCollide, endCollide, options) {
    super(tile, x, y, width, height, !(options?.isStatic ?? true), options);

    let sensorBody = Matter.Bodies.rectangle(x, y, width+5, height+50, {isStatic: true, isSensor: true});
    let sensor = new Entity(sensorBody, tile, false, false);
    let dummy =  Matter.Bodies.rectangle(-999, -999, .1, .1, {isSensor: true})
    sensor.color = 'rgba(42, 42, 42, 0.4)';
    sensor.body.label = 'sensor'
    // sensor.body.parent = this.body;
    // Matter.Body.setParts(this.body, [...this.body.parts,...sensor.body.parts], true)
    this.body.parts = [dummy, this.body, sensor.body];
    this.unpressedColor = options.unpressedColor ?? "red";
    this.pressedColor = options.pressedColor ?? "green";

    this.color = this.unpressedColor;
    this.ballOnly = options.ballOnly ?? false;
    this.body.callback = () => {this.color = this.pressedColor; startCollide();};
    this.body.endCallback = () => {this.color = this.unpressedColor; endCollide();};
    
    this.body.label = "button";
  }

  static buttonLogic(a, b, event) {
    if (a.callback && event.name === "collisionStart") {
      if (a.ballOnly && b.label === "ball") {
        a.callback();
      } else if (!a.ballOnly) a.callback();
    }

    if (a.endCallback && event.name === "collisionEnd") {
      if (a.ballOnly && b.label === "ball") {
        a.endCallback();
      } else if (!a.ballOnly) a.endCallback();
    }

    if (b.callback && event.name === "collisionStart") {
      if (b.ballOnly && a.label === "ball") {
        b.callback();
      } else if (!b.ballOnly) b.callback();
    }

    if (b.endCallback && event.name === "collisionEnd") {
      if (b.ballOnly && a.label === "ball") {
        b.endCallback();
      } else if (!b.ballOnly) b.endCallback();
    }
  }
}

export default Button;
