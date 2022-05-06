import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();

tile.ballStart.position = { x: 500, y: 250 };
tile.ballStart.velocity = { x: -10, y: -4 };

tile.ballEnd.position = { x: 500, y: 406 };
tile.ballEnd.velocity = { x: 6.4, y: -3 };

// This function will run once when the tile loads for the first time
tile.setup = function () {
  tile.createRectangle(tile.width / 2, tile.height - 20, tile.width, 40);
  tile.createRectangle(500, 375, 1, 250);
  tile.createRectangle(0, 200, 1, 350);
};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {};

// This function will run when the ball leaves your tile
tile.onBallLeave = async function () {};

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {};
