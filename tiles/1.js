import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();

tile.ballStart.position = { x: 0, y: 170 };
tile.ballStart.velocity = { x: 6.1, y: 0 };

tile.ballEnd.position = { x: 500, y: 170 };
tile.ballEnd.velocity = { x: 6.1, y: 0 };

// This function will run once when the tile loads for the first time
tile.setup = function () {
  tile.createRectangle(250, 215, 500, 50);
  tile.createPortals(150, 150, 300, 150);
};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {
  this.ball.bounciness = 0;
};

// This function will run when the ball leaves your tile
tile.onBallLeave = async function () {
  this.ball.bounciness = 1;
};

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {};
