import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();

tile.ballStart.position = { x: 0, y: 202 };
tile.ballStart.velocity = { x: 5.825343621579975, y: -5.403626669463045 }

tile.ballEnd.position = { x: 500, y: 400 };
tile.ballEnd.velocity = { x: 0, y: 0 };



// This function will run once when the tile loads for the first time
tile.setup = function () {
  let r = tile.createRectangle(450, 100, 50, 50, false, {isStatic: true});

  let r1 = tile.createRectangle(451, 151, 50, 50, false, {isStatic: true});

  let r2 = tile.createRectangle(452, 153, 50, 50, false, {isStatic: true});

  let rope1 = tile.createRope(250, 100, 10);

  let sb1 = tile.createSoftBody(300, 300, 3, 4, 10); 

  // let r3 = tile.createRectangle(202, 153, 50, 50, true);

  // let spring1 = tile.createSpring( 200, 420, 150, 20, 6, -12, { ballOnly: false });
};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {};

tile.onBallLeave = async function () {};

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {};

// This function will run once everey tick, even if the ball is not in your tile
tile.onTickBackground = function () {};
