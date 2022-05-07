import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();

tile.ballStart.position = { x: 0, y: 170 };
tile.ballStart.velocity = { x: 7, y: 0 };

tile.ballEnd.position = { x: 450, y: 500 };
tile.ballEnd.velocity = { x: 0, y: 4 };

// This function will run once when the tile loads for the first time
tile.setup = function () {
  //tile.createRamp(0, 190, 500, 450);
  //let belt = tile.createConveyorBelt(400, 408, 50, 20, -5);
  //belt.angle = 208;
  tile.createRectangle(125, 215, 250, 50);
  tile.createRamp(310, 188, 360, 130);
  tile.createPortals(265, 85, 490, 200);
  let portal1 = tile.createButton(
    265,
    95,
    10,
    10,
    () => {
      this.ball.color = "blue";
      this.ball.scale(2);
    },
    { isSensor: true }
  );
  let belt = tile.createRectangle(425, 300, 20, 200);
  belt.angle = 45;
  tile.createPortals(325, 375, 210, 270);
  tile.createRectangle(210, 270, 80, 55);
  tile.createPortals(115, 500, 481, 415);
  let endButtom = tile.createButton(427.65, 490, 10, 10, () => {
    this.ball.setVelocity(0, 3.5);
    this.ball.scale(2.5);
    this.ball.color = "#f99";
  });
  let portal2 = tile.createButton(
    350,
    367,
    10,
    10,
    () => {
      this.ball.scale(2 / 10);
      this.ball.color = "blue";
    },
    { isSensor: true }
  );
};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {};

// This function will run when the ball leaves your tile
tile.onBallLeave = async function () {
  console.log("ball leave2 : ", tile.ball.position.x, ",", tile.ball.position.y);
};

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {};
