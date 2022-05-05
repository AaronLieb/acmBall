import Entity from "./Entity.js";

const BALL_RADIUS = 20;

const defaultState = {
  label: "ball",
  frictionAir: 0,
  friction: 0.0006,
  restitution: 0.8,
  inertia: Infinity,
  inverseInertia: 0,
  render: {
    fillStyle: "#f99",
    lineWidth: 5,
    strokeStyle: "black",
    visible: true,
  },
};

/**
 * @class Ball
 */
class Ball extends Entity {
  /**
   *
   * @param {Tile} tile - the tile you want the ball to start in
   */
  constructor(tile = undefined) {
    let ball = Matter.Bodies.circle(0, 0, BALL_RADIUS, defaultState);
    super(ball, tile, false);
    this.defaultRender = defaultState.render;
  }

  /**
   * @param {Number} radius - the radius of the circle
   */
  set radius(radius) {
    Matter.Body.set(this.body, { circleRadius: radius });
  }

  /**
   * @returns {Number}
   */
  get radius() {
    return this.body.circleRadius;
  }

  /**
   * Resets the ball to its defualt state
   */
  moveTile(active_tile) {
    this.body.collisionFilter.group = active_tile + 1;
    this.body.collisionFilter.mask = 0; // don't touch this 
    console.log(active_tile);
    Matter.Body.set(this.body, defaultState);
  }
}

export default Ball;
