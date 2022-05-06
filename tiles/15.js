import { sleep } from "../src/helpers.js";
import Line from "../src/Line.js";
import Tile from "../src/Tile.js";

let tile = new Tile();

tile.ballStart.position = { x: 0, y: 440 };
tile.ballStart.velocity = { x: 6.4, y: -3 };

tile.ballEnd.position = { x: 0, y: 0 };
tile.ballEnd.velocity = { x: 0, y: 0 };

// This function will run once when the tile loads for the first time
tile.setup = function () {
  tile.createRectangle(tile.width / 2, tile.height - 20, tile.width, 40);
  tile.createRectangle(500, 200, 1, 500);
  // Y
  tile.createLine(100, 100, 150, 150, 1);
  tile.createLine(200, 100, 150, 150, 1);
  tile.createLine(150, 150, 150, 200, 1);
  //A
  tile.createLine(200, 200, 250, 100, 1);
  tile.createLine(300, 200, 250, 100, 1);
  tile.createLine(215, 150, 300, 150, 1);
  // Y
  tile.createLine(100 + 200, 100, 150 + 200, 150, 1);
  tile.createLine(200 + 200, 100, 150 + 200, 150, 1);
  tile.createLine(150 + 200, 150, 150 + 200, 200, 1);
};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {};

// This function will run when the ball leaves your tile
tile.onBallLeave = async function () {};

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {};
