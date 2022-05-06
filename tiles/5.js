import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();

tile.ballStart.position = { x: 500, y: 366.4 };
tile.ballStart.velocity = { x: -7.390, y: 1.782};

//(DEBUG) Tile: 6 , Ball Exited at: (0.000, 366.385) with velocity: (-7.390, 1.782) and entered Tile: 5


//(DEBUG) Tile: 5 , Ball Exited at: (0.000, 411.041) with velocity: (-7.390, -1.271) and entered Tile: 4
tile.ballEnd.position = { x: 0, y: 411.041 };
tile.ballEnd.velocity = { x: -7.390, y: -1.271 };

// This function will run once when the tile loads for the first time
tile.setup = function () {
  tile.createRectangle(tile.width / 2, tile.height - 20, tile.width, 40);
};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {};

// This function will run when the ball leaves your tile
tile.onBallLeave = async function () {};

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {};
