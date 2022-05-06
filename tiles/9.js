import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();

tile.ballStart.position = { x: 0, y: 215.23 };
tile.ballStart.velocity = { x: 9.61, y: 0 };

tile.ballEnd.position = { x: 500, y: 127.28 };
tile.ballEnd.velocity = { x: 10, y: -15.56 };

// This function will run once when the tile loads for the first time
tile.setup = function () {
  const groundT = 8;

  let trampoline = tile.createSpring(365, 427, 100, groundT, 10, -20);
  trampoline.angle = 5;
};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {};

// This function will run when the ball leaves your tile
tile.onBallLeave = async function () {};

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {};
