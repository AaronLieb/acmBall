import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();

tile.ballStart.position = { x: 35.398, y: 0 };
tile.ballStart.velocity = { x: 0, y: 0 };

tile.ballEnd.position = { x: 500, y: 215.23 };
tile.ballEnd.velocity = { x: 9.61, y: 0 };
let tri;
// This function will run once when the tile loads for the first time
tile.setup = function () {
  const groundT = -8;
  tile.color = "red"; /*Modified */
  let portal = tile.createPortals(35, 88, 200, 30);

  let portal2 = tile.createPortals(50, 200, 400, 350);
  let cbelt = tile.createConveyorBelt(200, 400, 200, 10, -15);
  cbelt.angle = 45;
  
  tri = tile.createTriangle(80, 265, 80, 290, 100, 290);

  // let portal3 = tile.createPortals(350, 430, 400, 50);
  let portal3 = tile.createPortals(20, 280, 400, 50);

  let portal4 = tile.createPortals(365, 410, 400, 50);

  let rope1 = tile.createRope(tile.width / 2, 10, 15);

  let cbelt2 = tile.createConveyorBelt(450, 242, 100, 10,  9.61);
  // cbelt2.color = "blue";
  // let bounce = tile.createSpring(300, 300, 80, groundT, 5, 15);
  // bounce.angle = 70;
  //(300, 300, 80, groundT, 5, 15);

  // let bounce = tile.createSpring(62, 88, 80, groundT, 5, 15);
  // bounce.angle = 10;

  // let button = tile.createButton(399, 169, 80, groundT, () => {
  //   let bottom = tile.createRectangle(200, 400, 120, groundT);
  //   bottom.color = "green";
  //   bottom.angle += 25;
  // });
  // button.angle -= 55;

  // let bump = tile.createRectangle(220, 20, 50, groundT);
  // bump.color = "cyan";
  // bump.angle = 25;
};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {};

// This function will run when the ball leaves your tile
tile.onBallLeave = async function () {};

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {
  // tri.angle -= 15;
};
