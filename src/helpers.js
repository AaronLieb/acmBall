import Game from "./Game.js";
import bins from "./bins.js";

export const unitVector = (vec) => {
  let mag = Math.sqrt(vec.x ** 2 + vec.y ** 2);
  return { x: vec.x / mag, y: vec.y / mag };
};

export const findIntersection = (axis, ball) => {
  // TODO improve this math and variable names
  if (!(axis == "y" || axis == "x")) return;
  let opposite = axis == "x" ? "y" : "x";
  let target = Math.round(ball.position[opposite] / 100) * 100;
  let d = target - ball.position[opposite];
  let unit_vector = unitVector(ball.velocity);
  let ratio = d / unit_vector[opposite];
  let estimated_axis = ball.position[axis] + ratio * unit_vector[axis];
  if (ball.velocity[axis] < 0 && ball.velocity[axis] > -0.5)
    estimated_axis = ball.position[axis];
  let estimated_pos = {};
  estimated_pos[opposite] = target;
  estimated_pos[axis] = estimated_axis;
  return estimated_pos;
};

export const positionToTile = (pos) => {
  return (
    Math.floor(pos.x / Game.TILE_WIDTH) +
    Math.floor(pos.y / Game.TILE_HEIGHT) * Game.NUM_TILES_X
  );
};

const defaultRender = {
  fillStyle: "gray",
  lineWidth: 5,
  strokeStyle: "black",
};

export const parseOptions = (options = {}) => {
  options.render ||= {};
  options.render = { ...defaultRender, ...options.render };
  return options;
};

export const sleep = (t) => new Promise((r) => setTimeout(r, t));

