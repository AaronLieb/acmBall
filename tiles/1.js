import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();

tile.ballStart.position = { x: 0, y: 170 };
tile.ballStart.velocity = { x: 6, y: 2 };

tile.ballEnd.position = { x: 500, y: 170 };
tile.ballEnd.velocity = { x: 7.0, y: 0 };

let paddle_dims = {width: 30, height: 100}
let paddle_color = 'rgba(160, 161, 130, 1.0)';
let left_paddle;
let right_paddle;
let left_paddle_start_follow = false;
let right_paddle_start_follow = false;

let gravity_snapshot = tile.game.engine.gravity.y;

let confetti = [];

const makeConfetti = (x, y, count = 100) => {
  for (let i = 0; i < count; ++i) {
    let r = tile.createRectangle(x, y, 15, 15, true, {ignore: true});
    Matter.Body.setStatic(r.body, false);
    r.color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255, .8})`;
    r.velocity = {x: Math.random() * 10 - 5, y: Math.random() * 10 - 7.5};
    confetti.push(r);
  }
}

const createBoundaries = () => {
  let width = 25;
  let top_wall = tile.createRectangle(tile.width/2, 0-width/2, tile.width, width);
  let bot_wall = tile.createRectangle(tile.width/2, tile.height-width/2, tile.width, width);
};
// This function will run once when the tile loads for the first time
tile.setup = function () {
  createBoundaries();
  // tile.createRectangle(250, 215, 500, 50);
  // tile.createPortals(150, 150, 300, 150);
  left_paddle = tile.createRectangle(40, 100, paddle_dims.width, paddle_dims.height);
  right_paddle = tile.createRectangle(tile.width - 40, 200, paddle_dims.width, paddle_dims.height);
  left_paddle.color = 'rgba(160, 161, 160, 1)';
  right_paddle.color = 'rgba(160, 161, 160, 1)';

};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {
  tile.game.engine.gravity.y = 0;
  await sleep(300);
  right_paddle_start_follow = true;
  await sleep(1500);
  left_paddle_start_follow = true;
  await sleep(5000);
  right_paddle_start_follow = false;
};

// This function will run when the ball leaves your tile
tile.onBallLeave = async function () {
  tile.game.engine.gravity.y = gravity_snapshot;
  makeConfetti(tile.ball.position.x, tile.ball.position.y);
  await sleep(1200);
  confetti.forEach((e) => {
    tile.matter.Composite.remove(tile.game.engine.world, e.body);
  });
};

const lerp_paddle = (paddle, p2, lerp_coefficient) => {
  let x;
  let y;
  let p1 = paddle.position;
  x = (p1.x - p2.x) * lerp_coefficient;
  y = (p1.y - p2.y) * lerp_coefficient;
  tile.matter.Body.translate(paddle.body, {x: 0, y: -y});
}

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {
  if(left_paddle_start_follow === true) {
    // left_paddle.position = {x: left_paddle.position.x, y: tile.ball.position.y};
    // let lerp_pos = lerp_paddle(left_paddle.position, tile.ball.position, .55);
    lerp_paddle(left_paddle, tile.ball.position, .09);
    // left_paddle.position = {x: left_paddle.position.x, y: lerp_pos.y + left_paddle.position.y};
  }
  if(right_paddle_start_follow === true)
    lerp_paddle(right_paddle, tile.ball.position, .07)
  // right_paddle.position = {x: right_paddle.position.x, y: tile.ball.position.y};

};
