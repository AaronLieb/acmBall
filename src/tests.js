import { findIntersection, hash, logErr } from "./helpers.js";
import { reqJSONBin } from "./db.js";
let { Vertices } = Matter;

const POSITION_DELTA = 0.5;
const VELOCITY_DELTA = 0.5;

export let assertEqual = (a, b, msg) => {
  if (a !== b) {
    let fail = `[${msg}] TEST CASE FAILED ${a} != ${b}`;
    console.log(fail);
    logErr(fail);
    return false;
  }
  //console.log(`[${msg}] TEST CASE PASSED ${a} = ${b}`);
  return true;
};

export let assertDiff = (a, b, delta, msg) => {
  if (Math.abs(a - b) > delta) {
    let fail = `[${msg}] TEST CASE FAILED ${Math.round(a * 100) / 100} != ${b} | delta = ${delta}`;
    console.log(fail);
    let ele = document.createElement("p");
    ele.innerHTML = fail;
    document.getElementById("testlogs").appendChild(ele);
    document.getElementById("testbox").style.backgroundColor = "red";
    return false;
  }
  console.log(`[${msg}] TEST CASE PASSED ${a} = ${b}, delta = ${delta}`);
  return true;
};

export const testBallPosition = (ball, end) => {
  let flag = true;
  let est_pos = findIntersection(ball);
  let rel_est_pos = {
    x: ((est_pos.x - 1) % game.TILE_WIDTH) + 1,
    y: ((est_pos.y - 1) % game.TILE_HEIGHT) + 1,
  };
  flag = assertDiff(rel_est_pos.x, end.position.x, POSITION_DELTA, "Ball Position X") && flag;
  flag = assertDiff(rel_est_pos.y, end.position.y, POSITION_DELTA, "Ball Position Y") && flag;
  return flag;
};

export const testBallVelocity = (ball, end) => {
  let flag = true;
  flag = assertDiff(ball.velocity.x, end.velocity.x, VELOCITY_DELTA, "Ball Velocity X") && flag;
  flag = assertDiff(ball.velocity.y, end.velocity.y, VELOCITY_DELTA, "Ball Velocity Y") && flag;
  return flag;
};

export const testBallSize = (ball) => {
  return assertDiff(ball.area, 1236.0755, 0.01, "Ball Area");
};

export const testBallShape = (ball) => {
  return assertEqual(ball.vertices.length, 20, "Ball Shape");
};

export const testBallRender = (ball) => {
  let flag = true;
  let render = game.ball._defaultRender;
  flag = assertEqual(ball.render.fillStyle, render.fillStyle, "fillStyle") && flag;
  flag = assertEqual(ball.render.lineWidth, render.lineWidth, "lineWidth") && flag;
  flag = assertEqual(ball.render.strokeStyle, render.strokeStyle, "strokeStyle") && flag;
  flag = assertEqual(ball.render.visible, render.visible, "visible") && flag;
  return flag;
};

export const sendTestResults = async (tile) => {
  console.log(`Sending test results for tile ${tile.id}`);
  const result = tile._numTests == tile._testsPassed;
  const h = hash([tile.ballStart, tile.ballEnd, tile.setup, tile.onBallEnter, tile.onTick, tile.onTickBackground]);
  await reqJSONBin("put", tile.id, { result: result, hash: h });
};
