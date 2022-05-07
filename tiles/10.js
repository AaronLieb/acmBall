import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();

tile.ballStart.position = { x: 0, y: 127.28 };
tile.ballStart.velocity = { x: 10, y: -15.56 };
 
tile.ballEnd.position = { x: 500, y: 60};
tile.ballEnd.velocity = { x: 3, y: 0};

// This function will run once when the tile loads for the first time
tile.setup = function () {
  const groundT = 8;

  let smolBump = tile.createRectangle(68, 10, 20, groundT);
  smolBump.angle -= 0;

  let platform = tile.createConveyorBelt(280,104,428,50,3)


  // let platform = tile.createRectangle(350, 450, 40, groundT);
  // platform.angle += 25;

  // let  ramp =  tile.createRamp(110,122,493,436);
};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {};

// This function will run when the ball leaves your tile
tile.onBallLeave = async function () {};

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {};
