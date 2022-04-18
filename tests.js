import { findIntersection } from "./helpers.js";
import Game from "./Game.js";

const POSITION_DELTA = 0.5;
const VELOCITY_DELTA = 0.2;

export let assertEqual = (a, b, delta, msg) => {
  if (Math.abs(a - b) > delta) {
    console.log(`[${msg}] TEST CASE FAILED ${a} != ${b} | delta = ${delta}`);
    return false;
  }
  //console.log(`[${msg}] TEST CASE PASSED ${a} == ${b} | delta = ${delta}`);
  return true;
};

export let testExit = (ball, end) => {
  let flag = true;
  let est_pos = findIntersection("y", Game.ball);
  let rel_est_pos = {x: ((est_pos.x - 1) % Game.TILE_WIDTH) + 1, y: ((est_pos.y - 1) % Game.TILE_HEIGHT) + 1}
  flag = assertEqual(rel_est_pos.x, end.position.x, POSITION_DELTA, "Ball Position X") && flag;
  flag = assertEqual(rel_est_pos.y, end.position.y, POSITION_DELTA, "Ball Position Y") && flag;
  flag = assertEqual(ball.velocity.x, end.velocity.x, VELOCITY_DELTA, "Ball Velocity X") && flag;
  flag = assertEqual(ball.velocity.y, end.velocity.y, VELOCITY_DELTA, "Ball Velocity Y") && flag;
  if (flag) console.log("ALL TESTS PASSED!");
  return flag;
};
