import Entity from "./Entity.js";
import Rectangle from "./Rectangle.js";

/**
 * A button that can be pressed by objects
 * @class {Button}
 */
class Button extends Rectangle {
  constructor(tile, x, y, width, height, startCollide = () => {}, endCollide = () => {}, options) {
    super(tile, x, y, width, height, !(options?.isStatic ?? true), options);

    let sensorBody = Matter.Bodies.rectangle(x, y, width + 4, height + 10, { isStatic: true, isSensor: true });
    let sensor = new Entity(sensorBody, tile, false, false);
    let dummy = Matter.Bodies.rectangle(-999, -999, 0.1, 0.1, { isSensor: true });
    sensor.color = "rgba(42, 42, 42, 0.0)";
    sensor.body.label = "button";
    this.body.parts = [dummy, this.body, sensor.body];
    this.unpressedColor = options.unpressedColor ?? "red";
    this.pressedColor = options.pressedColor ?? "green";
    this.body.label = "buttonBase";
    this.color = this.unpressedColor;
    sensor.body.render.strokeStyle = "rgba(0,0,0,0)";
    sensor.body.ballOnly = options.ballOnly ?? false;
    sensor.body.callback = (o) => {
      this.color = this.pressedColor;
      startCollide(o);
    };
    sensor.body.endCallback = (o) => {
      this.color = this.unpressedColor;
      endCollide(o);
    };
  }

  static buttonLogic(a, b, event) {
    if (a.callback && event.name === "collisionStart") {
      if (a.ballOnly && b.label === "ball") {
        a.callback({ a: a, b: b });
      } else if (!a.ballOnly) a.callback({ a: a, b: b });
    }

    if (a.endCallback && event.name === "collisionEnd") {
      if (a.ballOnly && b.label === "ball") {
        a.endCallback({ a: a, b: b });
      } else if (!a.ballOnly) a.endCallback({ a: a, b: b });
    }

    if (b.callback && event.name === "collisionStart") {
      if (b.ballOnly && a.label === "ball") {
        b.callback({ a: a, b: b });
      } else if (!b.ballOnly) b.callback({ a: a, b: b });
    }

    if (b.endCallback && event.name === "collisionEnd") {
      if (b.ballOnly && a.label === "ball") {
        b.endCallback({ a: a, b: b });
      } else if (!b.ballOnly) b.endCallback({ a: a, b: b });
    }
  }
}

export default Button;
