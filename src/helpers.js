export const hash = (Obj) => {
  return XXH.h32(JSON.stringify(Obj), 0xcafebabe).toString(16);
};

export const unitVector = (vec) => {
  let mag = Math.sqrt(vec.x ** 2 + vec.y ** 2);
  return { x: vec.x / mag, y: vec.y / mag };
};

export const findIntersection = (ball) => {
  let pos = game.ball.position;
  console.log(pos.x);
  let axis = pos.x >= game.TILE_WIDTH || pos.x <= 0 ? "y" : "x";
  console.log(axis);
  let opposite = axis == "x" ? "y" : "x";
  let target = 500;
  let d = target - pos[opposite];
  let unit_vector = unitVector(ball.velocity);
  let ratio = d / unit_vector[opposite];
  let estimated_axis = pos[axis] + ratio * unit_vector[axis];
  if (ball.velocity[axis] < 0 && ball.velocity[axis] > -0.5) estimated_axis = pos[axis];
  let estimated_pos = {};
  estimated_pos[opposite] = target;
  estimated_pos[axis] = estimated_axis;
  return estimated_pos;
};

export const relPosition = (p) => {
  return { x: p.x % game.TILE_WIDTH, y: p.y % game.TILE_HEIGHT };
};

export const positionToTile = (pos) => {
  let x = Math.floor(pos.x / game.TILE_WIDTH);
  let y = Math.floor(pos.y / game.TILE_HEIGHT);
  if (x < 0 || x >= game.NUM_TILES_X || y < 0 || y >= game.NUM_TILES_Y) return -1;
  return x + y * game.NUM_TILES_X;
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

export const logErr = (msg) => {
  let ele = document.createElement("p");
  ele.textContent = msg;
  document.getElementById("testlogs").appendChild(ele);
  document.getElementById("testbox").style.backgroundColor = "red";
};

// TODO: attach sleep to a tile, clear the events, rej the promise when the tile changes
export const sleep = async (t) => {
  return new Promise((r) => {
    const endTime = game.engine.timing.timestamp + t;
    Matter.Events.on(game.engine, "beforeUpdate", () => {
      if (game.engine.timing.timestamp >= endTime) {
        r();
      }
    });
  });
};
