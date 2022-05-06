import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();

tile.ballStart.position = { x: 338, y: 0 };
tile.ballStart.velocity = { x: 3, y: 12 };

/*
tile.ballEnd.position = { x: 338, y: 500 };
tile.ballEnd.velocity = { x: 3, y: 12 };
tile.ballStart.position = { x: 500, y: 259 };
tile.ballStart.velocity = { x: -4.782, y: -2.692 };

*/

tile.ballEnd.position = { x: 0, y: 259 };
tile.ballEnd.velocity = { x: -4.782, y: -2.692 };

// This function will run once when the tile loads for the first time
tile.setup = function () {
  let spring = tile.createSpring(420, 250, 150, 40, -7, -5);
  spring.angle = -45;
  let rope = tile.createRope(220, 14, 10);
  let convey = tile.createConveyorBelt(98, 400, 250, 30, -10);
  convey.angle = 45;
};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {};

// This function will run when the ball leaves your tile
tile.onBallLeave = async function () {};

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {};
