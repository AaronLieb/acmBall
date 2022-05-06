import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();

tile.ballStart.position = { x: 500, y: 411.041 };
tile.ballStart.velocity = { x: -7.390, y: -1.271 };

//(DEBUG) Tile: 5 , Ball Exited at: (0.000, 411.041) with velocity: (-7.390, -1.271) and entered Tile: 4
//
tile.ballEnd.position = { x: 62, y: 500 };
tile.ballEnd.velocity = { x: 0, y: 0 };

// This function will run once when the tile loads for the first time
tile.setup = function () {
  // tile.createRectangle(tile.width / 2, tile.height - 20, tile.width, 40);
  let portal = tile.createPortals(402, 400, 200, 200);
  let spring = tile.createSpring(12, 400, 50, 300, 0, 0);
};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {};

// This function will run when the ball leaves your tile
tile.onBallLeave = async function () {};

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {};
