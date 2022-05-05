import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();
let ball = tile.ball;
let game = tile.game;

tile.ballStart.position = { x: 0, y: 0 };
tile.ballStart.velocity = { x: 1, y: 0 };

tile.ballEnd.position = { x: 500, y: 417 };
tile.ballEnd.velocity = { x: 0, y: 0 };

let t;

// This function will run once when the tile loads for the first time
tile.setup = function () {
  const groundThickness = 20;

  let ground1 = tile.createRectangle(250 / 2, 100, 250, groundThickness);
  ground1.angle += 10;

  let ground2 = tile.createRectangle(315, 230, 250, groundThickness);
  ground2.angle -= 10;

  let ground2Barrier = tile.createRectangle(tile.width - 100 / 2, 170, 100, groundThickness / 2);
  ground2Barrier.angle -= 75;

  let greenCircle = tile.createCircle(tile.width - 100, 40, 20);
  greenCircle.color = "lime";

  let blinked = false;
  let button1 = tile.createButton(
    75,
    100 - (groundThickness - 5) - 5,
    75,
    5,
    () => {
      greenCircle.color = "red";
    },
    async () => {
      if (!blinked) {
        blinked = true;

        await sleep(1000);
        greenCircle.color = "lime";
      }
    }
  );
  button1.angle += 10;

  tile.createCircle(111, 317, 25);
  tile.createCircle(49, 195, 45);

  let circleBarrier = tile.createRectangle(30, 365, 100, groundThickness / 2);
  circleBarrier.angle += 65;

  let launcherBg = tile.createRectangle(150, 474, 150, groundThickness / 2);
  launcherBg.angle -= 10;
  let launcher = tile.createConveyorBelt(150, 474, 150, groundThickness / 2, 15);
  launcher.angle -= 10;

  let ramp = tile.createRectangle(355, 450, 50, groundThickness / 2);
  ramp.angle -= 65;

  // tile.createRectangle(356, 346, groundThickness, groundThickness);
  tile.createRectangle(356, 375, groundThickness, groundThickness);
  tile.createConveyorBelt(356, 375, groundThickness, groundThickness, 45);
};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {};

tile.onBallLeave = async function () {};

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {};

// This function will run once everey tick, even if the ball is not in your tile
tile.onTickBackground = function () {};
