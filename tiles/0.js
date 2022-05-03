import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();
let { ballStart, ballEnd } = tile;

ballStart.position = { x: 0, y: 420 };
ballStart.velocity = { x: 3, y: 0 };

ballEnd.position = { x: 500, y: 420 };
ballEnd.velocity = { x: 5, y: 0 };

// This function will run once when the tile loads for the first time
tile.setup = function () {
  tile.createRectangle(tile.width / 2, tile.height - 20, tile.width, 40);
  let wall = tile.createRectangle(550, 250, 50, 400, true);
  wall.setMass(0.1);
  tile.createConveyorBelt(tile.width / 2, tile.height - 20, tile.width / 3, 40, 5);
};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {};

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {};

// This function will run once everey tick, even if the ball is not in your tile
tile.onTickBackground = function () {};
