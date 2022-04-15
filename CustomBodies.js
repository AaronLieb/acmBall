import "./matter.js";
let { Bodies, Body } = Matter;

import Game from "./Game.js";

export function ConveyorBelt(x, y, length, speed) {
  this.body = Bodies.rectangle(x, y, length, 20, {
    isStatic: true,
    render: {
      fillStyle: "green",
    },
  });
  this.body.speedUp = (ball) => {
    Body.setVelocity(ball, { x: speed, y: 0 });
  };
  Game.detector.bodies.push(this.body);
}
