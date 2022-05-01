import { sleep, findIntersection } from "./helpers.js";
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

const reqJSONBin = async (method, body) => {
  const urlSuffix = method == "get" ? "latest" : "";
  const data = {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Master-key": "$2b$10$BfSdlGY7.T2MK8eNEgBqx.ZDgA9oto5l2NO6PogwTLk27MQeiWRpC",
      "X-Bin-Meta": false,
    },
  };
  if (body) data.body = JSON.stringify(body);
  return new Promise((res, rej) => {
    fetch(`https://api.jsonbin.io/v3/b/626daf2125069545a32b655a/${urlSuffix}`, data)
      .then((response) => res(response.json()))
      .catch((err) => rej(err));
  });
};

export const sendTestResults = async (tile) => {
  console.log("Sending test results...");
  const result = tile.numTests == tile.testsPassed;
  while (1) {
    let curr = await reqJSONBin("get");
    console.log(curr);
    if (curr.results[tile.id] === result) break;
    if (curr.locked) {
      await sleep(100);
      break;
    }
    curr.locked = true;
    await reqJSONBin("put", curr);
    curr = await reqJSONBin("get");
    console.log(curr);
    if (!curr.locked) {
      await sleep(100);
      break;
    }
    curr.results[tile.id] = result;
    curr.locked = false;
    await reqJSONBin("put", curr);
  }
};
