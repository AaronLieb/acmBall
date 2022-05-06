import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();

tile.ballStart.position = { x: 62, y: 0 };
tile.ballStart.velocity = { x: 0, y: 0 };

tile.ballEnd.position = { x: 500, y: 215.23 };
tile.ballEnd.velocity = { x: 9.61, y: 0 };

// This function will run once when the tile loads for the first time
tile.setup = function () {
  const groundT = 8;

  let bounce = tile.createSpring(62, 88, 80, groundT, 5, 15);
  bounce.angle += 35;

  let button = tile.createButton(399, 169, 80, groundT, () => {
    let bottom = tile.createRectangle(200, 400, 120, groundT);
    bottom.color = "green";
    bottom.angle += 25;
  });
  button.angle -= 55;

  let bump = tile.createRectangle(220, 20, 50, groundT);
  bump.color = "cyan";
  bump.angle -= 25;
};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {};

// This function will run when the ball leaves your tile
tile.onBallLeave = async function () {};

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {};
