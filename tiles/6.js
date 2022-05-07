import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();

tile.ballStart.position = { x: 450, y: 0 };
tile.ballStart.velocity = { x: 0, y: 4 };

/* tile 7 info
(DEBUG) Tile: 7 , Ball Exited at: (0.000, 259.312) with velocity: (-4.782, -2.692) and entered Tile: 6
*/

// (DEBUG) Tile: 6 , Ball Exited at: (0.000, 361.926) with velocity: (-7.140, 1.857) and entered Tile: 5

tile.ballEnd.position = { x: 0, y: 450 };
tile.ballEnd.velocity = { x: -7.390, y: 1.782 };

// This function will run once when the tile loads for the first time
tile.setup = function () {
  // Act I
  let spring = tile.createSpring(470, 50, 10, 10, -30, 0);
  let portal1 = tile.createPortals(300, 50, 440, 150);
  let bounceWall = tile.createLine(90, 220, 90, 120, 4);
  let ramp1 = tile.createLine(470, 270, 470, 300, 4);
  let slowBall = tile.createButton(460, 280, 10, 10, () => {
    this.ball.color = "green";
    this.ball.setVelocity(0,0);

  });
  let ramp2 = tile.createLine(470, 300, 435, 365, 4);
  let conveyer = tile.createConveyorBelt(415, 365, 40, 8, 10);
  // Act II
  let portal2 = tile.createPortals(145, 490, 490, 470);
  // portal2.angle = -45; Rotate????
  let conveyer2 = tile.createConveyorBelt(425, 500, 125, 1, -5);
  let spring2 = tile.createSpring(355, 500, 10, 10, 0, -50);
  let portal3 = tile.createPortals(375, -10, 250, 50);
  let slowBall2 = tile.createButton(240, 0, 10, 10, () => {
    this.ball.color = "green";
    this.ball.setVelocity(10,0);
  });
  
  
  let smallBall = tile.createButton(310, 90, 10, 10, () => {
    this.ball.color = "blue";
    this.ball.setVelocity(-10,0);
    this.ball.scale(1/4);
  });
  let portal4 = tile.createPortals(110, 300, 170, 0);
  let slowstuffdown = tile.createButton(165 , 10, 10, 10, () => {
    this.ball.color = "pink";
    this.ball.setVelocity(0,5);
    // this.ball.scale(2);
  });
  let finalramp1 = tile.createLine(170, 66, 90, 70, 4);
  let finalramp2 = tile.createLine(0, 500, 90, 500, 4);
  let slowstuffdown2 = tile.createButton(65, 50, 10, 10, () => {
    this.ball.color = "pink";
    this.ball.setVelocity(0,0);
    // this.ball.scale(2);
  });
  let slowstuffdown3 = tile.createButton(70, 480, 10, 10, () => {
    this.ball.color = "pink";
    this.ball.setVelocity(-2.5,-5);
    this.ball.scale(2);
  });
  let goodbye = tile.createButton(1, 450, 1, 1, () => {
    this.ball.color = "pink";
    this.ball.setVelocity(-7.390,1.782);
    this.ball.scale(2);
  });

};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {

};

// This function will run when the ball leaves your tile
tile.onBallLeave = async function () {};

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {};
