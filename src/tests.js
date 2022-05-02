import { reqJSONBin, sleep, findIntersection } from "./helpers.js";
import Game from "./Game.js";

const POSITION_DELTA = 0.5;
const VELOCITY_DELTA = 0.1;

export let assertEqual = (a, b, delta, msg) => {
  if (Math.abs(a - b) > delta) {
    let fail = `[${msg}] TEST CASE FAILED ${
      Math.round(a * 100) / 100
    } != ${b} | delta = ${delta}`;
    console.log(fail);
    let ele = document.createElement("p");
    ele.innerHTML = fail;
    document.getElementById("testlogs").appendChild(ele);
    document.getElementById("testbox").style.backgroundColor = "red";
    return false;
  }
  //console.log(`[${msg}] TEST CASE PASSED ${a} == ${b} | delta = ${delta}`);
  return true;
};


export const testExitPosition = (ball, end) => {
  let flag = true;
  let est_pos = findIntersection("y", ball);
  let rel_est_pos = {
    x: ((est_pos.x - 1) % Game.TILE_WIDTH) + 1,
    y: ((est_pos.y - 1) % Game.TILE_HEIGHT) + 1,
  };
  flag =
    assertEqual(rel_est_pos.x, end.position.x, POSITION_DELTA, "Ball Position X") && flag;
  flag =
    assertEqual(rel_est_pos.y, end.position.y, POSITION_DELTA, "Ball Position Y") && flag;
  return flag;
};

export const testExitVelocity = (ball, end) => {
  let flag = true;
  flag =
    assertEqual(ball.velocity.x, end.velocity.x, VELOCITY_DELTA, "Ball Velocity X") &&
    flag;
  flag =
    assertEqual(ball.velocity.y, end.velocity.y, VELOCITY_DELTA, "Ball Velocity Y") &&
    flag;
  return flag;
};

export const sendTestResults = async (tile) => {
  console.log(`Sending test results for tile ${tile.id}`);
  const result = tile.numTests == tile.testsPassed;
  await reqJSONBin("put", tile.id, { result: result })
};
