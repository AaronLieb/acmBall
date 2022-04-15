const POSITION_DELTA = 0.05;
const VELOCITY_DELTA = 0.05;

export let assertEqual = (a, b, delta, msg) => {
  if (Math.abs(a - b) > delta) {
    console.log(`[${msg}] TEST CASE FAILED ${a} != ${b} | delta = ${delta}`);
    return false;
  }
  console.log(`[${msg}] TEST CASE PASSED ${a} == ${b} | delta = ${delta}`);
  return true;
};

export let testExit = (ball, end) => {
  let flag = true;
  flag = assertEqual(ball.position.x, end.position.x, POSITION_DELTA, "Ball Position X") && flag;
  flag = assertEqual(ball.position.y, end.position.y, POSITION_DELTA, "Ball Position Y") && flag;
  flag = assertEqual(ball.velocity.x, end.velocity.x, VELOCITY_DELTA, "Ball Velocity X") && flag;
  flag = assertEqual(ball.velocity.y, end.velocity.y, VELOCITY_DELTA, "Ball Velocity Y") && flag;
  return flag;
};

