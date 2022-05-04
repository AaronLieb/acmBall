import Entity from "./Entity.js";

const BALL_RADIUS = 40;

const defaultState = {
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
  constructor(tile) {
    let ball = Matter.Bodies.circle(0, 0, BALL_RADIUS, defaultState);
    super(ball, tile, false);
  }

  resetState() {
    Matter.Body.set(this.body, defaultState);
  }
}

export default Ball;
