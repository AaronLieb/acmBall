import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();

tile.ballStart.position = { x: 499, y: 250 };
tile.ballStart.velocity = { x: -1, y: 0 };

//(DEBUG) Tile: 5 , Ball Exited at: (0.000, 411.041) with velocity: (-7.390, -1.271) and entered Tile: 4
//
tile.ballEnd.position = { x: 35.398, y: 500 };
tile.ballEnd.velocity = { x: -1.56, y: 10.72 };

// This function will run once when the tile loads for the first time
tile.setup = function () {
  // ball property
  //tile.body.timeScale = 5;
  tile.ball.mass = 1000;

  // init portal
  tile.createPortals(499, 250, 499, 40);

  // edges
  tile.createRectangle(0, 250, 1, 499);
  tile.createRectangle(499, 250, 1, 499);
  tile.createRectangle(250, 0, 499, 10);

  // manual portals
  tile.createPortals(20, 40, 20, 130);
  tile.createPortals(470, 130, 470, 220);
  tile.createPortals(20, 220, 20, 310);
  tile.createPortals(470, 310, 470, 400);

  let modifier = 0.6;
  var curr_velocity = 1;
  for (let j = 0; j < 5; ++j) {
    if (j == 4) {
      tile.createRectangle(280, 90 + j * 90, 440, 20);
      tile.createRectangle(280, 75 + j * 90, 440, 5);
    } else {
      tile.createRectangle(250, 90 + j * 90, 499, 20); // thick
      tile.createRectangle(250, 75 + j * 90, 499, 5);
    }
    for (let i = 0; i < 9; ++i) {
      tile.createSpring(459 - i * 50, 75 + j * 90, 5, 5, j % 2 ? 1 * curr_velocity : -curr_velocity, -10);
    }
    curr_velocity *= modifier;
  }
  for (let i = 0; i < 5; ++i) {}
};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {
  tile.ball.radius = 2;
  tile.ball.color = "pink";
};

// This function will run when the ball leaves your tile
tile.onBallLeave = async function () {
  tile.ball.radius = 20;
};

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {};
