import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();

tile.ballStart.position = { x: 0, y: 215.23 };
tile.ballStart.velocity = { x: 9.61, y: 0 };

tile.ballEnd.position = { x: 500, y: 111.82 };
tile.ballEnd.velocity = { x: 8, y: -5.39 };

let trampoline;
let trampoline2;
let multiple = 1;

tile.setup = function () {
  // Initialize the above square variable to a valid rectangle. setup is
  // guaranteed to be called before onTick is.
  // square = tile.createRectangle(50, 50, 20, 20);
  trampoline = tile.createSpring(30, 318, 50, 8, 1.5, -10);
  trampoline2 = tile.createSpring(430, 450, 100, 8, -10, -14);
  trampoline2.angle = -45;
  tile.createLine(300, 0, 300, 325, 20);
  tile.createLine(192, 418, 258, 483, 5);
};

tile.onTick = function () {
  // Rotate by 1.5deg every tick. With 60 TPS, this means rotating 90deg a
  // second.
  // translate tile
  this.matter.Body.translate(trampoline.body, {x: 7 * multiple, y: 0});
  if (trampoline.position.x > 280){
    multiple = -1;
  }
  if (trampoline.position.x < 20){
    multiple = 1;
  }
}

// This function will run once when the tile loads for the first time
// tile.setup = function () {
//   const groundT = 8;

//   let trampoline = tile.createSpring(365, 427, 100, groundT, 10, -20);
//   trampoline.angle = 5;
// };

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {};

// This function will run when the ball leaves your tile
tile.onBallLeave = async function () {};

// This function will run once every tick while the ball is in your tile
// tile.onTick = function () {};
