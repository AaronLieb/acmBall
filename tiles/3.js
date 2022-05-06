import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();

tile.ballStart.position = { x: 0, y: 423 };
tile.ballStart.velocity = { x: 6, y: 3 };

tile.ballEnd.position = { x: 338, y: 500 };
tile.ballEnd.velocity = { x: 3, y: 12 };

// This function will run once when the tile loads for the first time
tile.setup = function () {
  tile.createLine(0, 460, 100, 460, 10);
  tile.createSpring(92, 442, 15, 10, 3, -10);
};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {};

// This function will run when the ball leaves your tile
tile.onBallLeave = async function () {};

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {};
