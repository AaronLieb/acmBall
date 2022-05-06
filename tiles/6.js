import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();

tile.ballStart.position = { x: 500, y: 259 };
tile.ballStart.velocity = { x: -4.782, y: -2.692 };

/* tile 7 info
(DEBUG) Tile: 7 , Ball Exited at: (0.000, 259.312) with velocity: (-4.782, -2.692) and entered Tile: 6
*/

// (DEBUG) Tile: 6 , Ball Exited at: (0.000, 361.926) with velocity: (-7.140, 1.857) and entered Tile: 5

tile.ballEnd.position = { x: 0, y: 362 };
tile.ballEnd.velocity = { x: -7.140, y: 1.857 };

// This function will run once when the tile loads for the first time
tile.setup = function () {
  tile.createRectangle(tile.width / 2-90, tile.height - 20, tile.width-300, 40);
  let ramp = tile.createRamp(250, 450,401, 302);
};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {};

// This function will run when the ball leaves your tile
tile.onBallLeave = async function () {};

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {};
