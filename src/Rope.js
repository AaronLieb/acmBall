import Entity from "./Entity.js";
import Circle from "./Circle.js";

class Rope {
  constructor(tile, x, y, length, options = {isStatic: false}) {
    let radius = 10;
    let anchor = new Circle(tile, x, y, 10, false, {...options});
    // let anchor = Matter.Bodies.circle(x, y, 50, { isStatic: true, isSensor: true, render: {fillStyle: 'green'} });
    let bodies = [anchor.body];
    console.log('IS STATIC?!?!?: ', options);
    for (let i = 0; i < length; i++) {
      let new_circle = new Circle(
        tile,
        x,
        y + i * (radius + 15) + radius,
        radius,
        !options.isStatic,
        {...options}
      );
      new_circle.color = "#614a3a";
      bodies.push(new_circle.body);
    }

    let constraints = [];
    let constraint_options = {
      length: radius * 2 + 1,
      stiffness: 0.2,
    };

    for (let i = 1; i <= length; i++) {
      let new_constraint = Matter.Constraint.create({
        bodyA: bodies[i - 1],
        bodyB: bodies[i],
        ...constraint_options,
        render: {
          strokeStyle: "#7d6250",
        },
      });
      constraints.push(new_constraint);
    }

    Matter.Composite.add(tile.game.engine.world, [...constraints]);
  }
}

export default Rope;
