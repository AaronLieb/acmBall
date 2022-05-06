import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();

tile.ballStart.position = { x: 500, y: 440 };
tile.ballStart.velocity = { x: 5, y: 0 };

tile.ballEnd.position = { x: 500, y: 248 };
tile.ballEnd.velocity = { x: -5, y: 0 };

// This function will run once when the tile loads for the first time
tile.setup = function () {
  tile.createRectangle(tile.width / 2, tile.height - 20, tile.width, 40);
  let con = tile.createConveyorBelt(200, 400, 300, 2, -15);
  con.angle += 35;
};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {};

// This function will run when the ball leaves your tile
tile.onBallLeave = async function () {};

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {};
