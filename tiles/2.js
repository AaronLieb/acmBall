import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();

tile.ballStart.position = { x: 0, y: 170 };
tile.ballStart.velocity = { x: 6.1, y: 0 };

tile.ballEnd.position = { x: 500, y: 424 };
tile.ballEnd.velocity = { x: 6, y: 3 };

// This function will run once when the tile loads for the first time
tile.setup = function () {
  tile.createRamp(0, 190, 500, 450);
  let belt = tile.createConveyorBelt(400, 408, 50, 20, -5);
  belt.angle = 208;
};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {};

// This function will run when the ball leaves your tile
tile.onBallLeave = async function () {};

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {};
