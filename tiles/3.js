import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();

tile.ballStart.position = { x: 250, y: 0 };
tile.ballStart.velocity = { x: 0, y: 4 };

tile.ballEnd.position = { x: 500, y: 400 };
tile.ballEnd.velocity = { x: -4, y: 0 };

// This function will run once when the tile loads for the first time
tile.setup = function () {
  // tile.createRectangle(tile.width / 2, tile.height - 20, tile.width, 40);
  tile.createRectangle(tile.width / 2, tile.height / 2, tile.width, tile.height, false, {
    isStatic: true,
    isSensor: true,
    render: { fillStyle: "rgba(52, 31 ,19, 0.05)" },
  });
  let ran = false;
  let foot = tile.createRectangle(50, 150, 50, 50, true);
  const powerRect = () => {
    if (ran) return;
    ran = false;
    foot.velocity = { x: 5, y: 0 };
  };
  tile.createButton(150, 200, 300, 50, powerRect, () => {}, { isStatic: true, ballOnly: true });
  tile.createRectangle(500 - 50, 240, 50, 300);
  tile.createRectangle(230, 477, 450, 75);
  // tile.createButton(250, 477, 400, 75, () => { tile.game.ball.velocity = { x: -4, y: 0 }; })
  let convey = tile.createConveyorBelt(200, 427, 200, 75, -4);
  convey.angle = 45;
};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {};

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {};

// This function will run once everey tick, even if the ball is not in your tile
tile.onTickBackground = function () {};
