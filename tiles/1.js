import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();

tile.ballStart.position = { x: 0, y: 200 };
tile.ballStart.velocity = { x: 4, y: 0 };

tile.ballEnd.position = { x: 0, y: 0 };
tile.ballEnd.velocity = { x: 0, y: 0 };

// This function will run once when the tile loads for the first time
tile.setup = function () {
  tile.createRectangle(tile.width / 2, tile.height - 20, tile.width, 40);
  let r = tile.createRectangle(450, 100, 50, 50, true);

  let r1 = tile.createRectangle(451, 151, 50, 50, true);

  let r2 = tile.createRectangle(452, 153, 50, 50, true);

};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {
  tile.game.ball.position.x = 250;
};

// This function will run once every tick while the ball is in your tile
tile.onTick = function () { };

// This function will run once everey tick, even if the ball is not in your tile
tile.onTickBackground = function () { };
