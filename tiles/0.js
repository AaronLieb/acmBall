import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();

tile.ballStart.position = { x: 30, y: 40 };
tile.ballStart.velocity = { x: 1, y: 0 };

tile.ballEnd.position = { x: 500, y: 170 };
tile.ballEnd.velocity = { x: 6.1, y: 0 };

let ramp;

// This function will run once when the tile loads for the first time
tile.setup = function () {
  let spring1 = tile.createSpring(40, 160, 70, 7, 20, -15);
  spring1.angle = 30;
  let spring2 = tile.createSpring(160, 45, 70, 7, 20, -10);
  spring2.angle = 34;
  let spring3 = tile.createSpring(160, 430, 70, 7, -20, 10);
  spring3.angle = -45;
  let spring4 = tile.createSpring(40, 430, 70, 7, 0, -20);
  spring4.angle = 45;
  let spring5 = tile.createSpring(40, 270, 70, 7, 20, 10);
  spring5.angle = -20;
  let spring6 = tile.createSpring(330, 460, 70, 7, 0, -20);
  spring6.angle = 180;
  tile.createPortals(330, 40, 460, 460);
  
    // Attempt at moving ramp
    ramp = tile.createRamp(310, 150, 340, 190);
};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {};

// This function will run when the ball leaves your tile
tile.onBallLeave = async function () {};

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {
  console.log(ramp);
  Matter.Body.translate(ramp.body, {x:0.75, y:0})
};
