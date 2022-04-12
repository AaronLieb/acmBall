var { Bodies, Body } = Matter;

function ConveyorBelt(tile, x, y, length, speed) {
  this.belt = Bodies.rectangle(x, y, length, 20, {
    isStatic: true,
    render: {
      fillStyle: "green",
    },
  });
  this.belt.speedUp = (ball) => {
    //Body.applyForce(ball, { x: 0, y: 0 }, { x: speed, y: 0 });
    Body.setVelocity(ball, { x: speed, y: 0 });
  };
  tile.detector.bodies.push(this.belt);
}
