import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();

tile.ballStart.position = { x: 0, y: 419.15 };
tile.ballStart.velocity = { x: 19.47, y: 0.59 };

tile.ballEnd.position = { x: 255.93, y: 500 };
tile.ballEnd.velocity = { x: -2, y: 4.42 };

// This function will run once when the tile loads for the first time
tile.setup = function () {
  tile.createPortals(161, 461, 161, 46);
  tile.createRope(385, 17, 8);
  tile.createRectangle(450, 150, 5, 250);

  let slime = tile.createSpring(354, 486, 8, 130, -2, 1);
  slime.angle += 90;
};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {};

// This function will run when the ball leaves your tile
tile.onBallLeave = async function () {};

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {};
