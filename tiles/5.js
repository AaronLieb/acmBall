import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();

tile.ballStart.position = { x: 499, y: 450 };
tile.ballStart.velocity = { x: -7.390, y: 1.782};

//(DEBUG) Tile: 6 , Ball Exited at: (0.000, 366.385) with velocity: (-7.390, 1.782) and entered Tile: 5


//(DEBUG) Tile: 5 , Ball Exited at: (0.000, 411.041) with velocity: (-7.390, -1.271) and entered Tile: 4
tile.ballEnd.position = { x: 0, y: 250 };
tile.ballEnd.velocity = { x: -7.390, y: -1.271 };

var portals;
// This function will run once when the tile loads for the first time
tile.setup = function () {
  tile.createRectangle(
    500,
    485,
    200,
    20
  )
  
  tile.createSpring(
    400,
    485,
    100,
    10,
    0,
    -12
  )

  tile.createRectangle(
    340, 450,
    10, 100
  );

  tile.createLine(
    340,
    220,
    405,
    240,
    2
  );

  tile.createRectangle(48, 0, 2, 2);
tile.createRectangle(54, 0, 2, 2);
tile.createRectangle(60, 0, 2, 2);
tile.createRectangle(66, 0, 2, 2);
tile.createRectangle(72, 0, 2, 2);
tile.createRectangle(78, 0, 2, 2);
tile.createRectangle(84, 0, 2, 2);

tile.createRectangle(36, 6, 2, 2);
tile.createRectangle(42, 6, 2, 2);
tile.createRectangle(54, 6, 2, 2);
tile.createRectangle(60, 6, 2, 2);
tile.createRectangle(66, 6, 2, 2);
tile.createRectangle(72, 6, 2, 2);
tile.createRectangle(78, 6, 2, 2);
tile.createRectangle(84, 6, 2, 2);
tile.createRectangle(90, 6, 2, 2);

tile.createRectangle(24, 12, 2, 2);
tile.createRectangle(30, 12, 2, 2);
tile.createRectangle(36, 12, 2, 2);
tile.createRectangle(42, 12, 2, 2);
tile.createRectangle(48, 12, 2, 2);
tile.createRectangle(60, 12, 2, 2);
tile.createRectangle(66, 12, 2, 2);
tile.createRectangle(72, 12, 2, 2);
tile.createRectangle(78, 12, 2, 2);
tile.createRectangle(84, 12, 2, 2);
tile.createRectangle(90, 12, 2, 2);
tile.createRectangle(102, 12, 2, 2);
tile.createRectangle(108, 12, 2, 2);

tile.createRectangle(18, 18, 2, 2);
tile.createRectangle(24, 18, 2, 2);
tile.createRectangle(30, 18, 2, 2);
tile.createRectangle(36, 18, 2, 2);
tile.createRectangle(42, 18, 2, 2);
tile.createRectangle(48, 18, 2, 2);
tile.createRectangle(54, 18, 2, 2);
tile.createRectangle(66, 18, 2, 2);
tile.createRectangle(72, 18, 2, 2);
tile.createRectangle(78, 18, 2, 2);
tile.createRectangle(84, 18, 2, 2);
tile.createRectangle(90, 18, 2, 2);
tile.createRectangle(102, 18, 2, 2);
tile.createRectangle(108, 18, 2, 2);
tile.createRectangle(114, 18, 2, 2);

tile.createRectangle(12, 24, 2, 2);
tile.createRectangle(18, 24, 2, 2);
tile.createRectangle(24, 24, 2, 2);
tile.createRectangle(30, 24, 2, 2);
tile.createRectangle(36, 24, 2, 2);
tile.createRectangle(42, 24, 2, 2);
tile.createRectangle(48, 24, 2, 2);
tile.createRectangle(54, 24, 2, 2);
tile.createRectangle(60, 24, 2, 2);
tile.createRectangle(72, 24, 2, 2);
tile.createRectangle(78, 24, 2, 2);
tile.createRectangle(84, 24, 2, 2);
tile.createRectangle(90, 24, 2, 2);
tile.createRectangle(102, 24, 2, 2);
tile.createRectangle(108, 24, 2, 2);
tile.createRectangle(114, 24, 2, 2);
tile.createRectangle(120, 24, 2, 2);

tile.createRectangle(12, 30, 2, 2);
tile.createRectangle(18, 30, 2, 2);
tile.createRectangle(24, 30, 2, 2);
tile.createRectangle(30, 30, 2, 2);
tile.createRectangle(36, 30, 2, 2);
tile.createRectangle(42, 30, 2, 2);
tile.createRectangle(48, 30, 2, 2);
tile.createRectangle(54, 30, 2, 2);
tile.createRectangle(60, 30, 2, 2);
tile.createRectangle(78, 30, 2, 2);
tile.createRectangle(84, 30, 2, 2);
tile.createRectangle(90, 30, 2, 2);
tile.createRectangle(102, 30, 2, 2);
tile.createRectangle(108, 30, 2, 2);
tile.createRectangle(114, 30, 2, 2);
tile.createRectangle(120, 30, 2, 2);

tile.createRectangle(84, 36, 2, 2);
tile.createRectangle(90, 36, 2, 2);
tile.createRectangle(102, 36, 2, 2);
tile.createRectangle(108, 36, 2, 2);
tile.createRectangle(114, 36, 2, 2);
tile.createRectangle(120, 36, 2, 2);
tile.createRectangle(126, 36, 2, 2);

tile.createRectangle(6, 42, 2, 2);
tile.createRectangle(12, 42, 2, 2);
tile.createRectangle(18, 42, 2, 2);
tile.createRectangle(24, 42, 2, 2);
tile.createRectangle(30, 42, 2, 2);
tile.createRectangle(36, 42, 2, 2);
tile.createRectangle(42, 42, 2, 2);
tile.createRectangle(90, 42, 2, 2);
tile.createRectangle(102, 42, 2, 2);
tile.createRectangle(108, 42, 2, 2);
tile.createRectangle(114, 42, 2, 2);
tile.createRectangle(120, 42, 2, 2);
tile.createRectangle(126, 42, 2, 2);

tile.createRectangle(0, 48, 2, 2);
tile.createRectangle(6, 48, 2, 2);
tile.createRectangle(12, 48, 2, 2);
tile.createRectangle(18, 48, 2, 2);
tile.createRectangle(24, 48, 2, 2);
tile.createRectangle(30, 48, 2, 2);
tile.createRectangle(36, 48, 2, 2);
tile.createRectangle(102, 48, 2, 2);
tile.createRectangle(108, 48, 2, 2);
tile.createRectangle(114, 48, 2, 2);
tile.createRectangle(120, 48, 2, 2);
tile.createRectangle(132, 48, 2, 2);

tile.createRectangle(0, 54, 2, 2);
tile.createRectangle(6, 54, 2, 2);
tile.createRectangle(12, 54, 2, 2);
tile.createRectangle(18, 54, 2, 2);
tile.createRectangle(24, 54, 2, 2);
tile.createRectangle(30, 54, 2, 2);
tile.createRectangle(102, 54, 2, 2);
tile.createRectangle(108, 54, 2, 2);
tile.createRectangle(114, 54, 2, 2);
tile.createRectangle(126, 54, 2, 2);
tile.createRectangle(132, 54, 2, 2);

tile.createRectangle(0, 60, 2, 2);
tile.createRectangle(6, 60, 2, 2);
tile.createRectangle(12, 60, 2, 2);
tile.createRectangle(18, 60, 2, 2);
tile.createRectangle(24, 60, 2, 2);
tile.createRectangle(102, 60, 2, 2);
tile.createRectangle(108, 60, 2, 2);
tile.createRectangle(120, 60, 2, 2);
tile.createRectangle(126, 60, 2, 2);
tile.createRectangle(132, 60, 2, 2);

tile.createRectangle(0, 66, 2, 2);
tile.createRectangle(6, 66, 2, 2);
tile.createRectangle(12, 66, 2, 2);
tile.createRectangle(18, 66, 2, 2);
tile.createRectangle(30, 66, 2, 2);
tile.createRectangle(114, 66, 2, 2);
tile.createRectangle(120, 66, 2, 2);
tile.createRectangle(126, 66, 2, 2);
tile.createRectangle(132, 66, 2, 2);

tile.createRectangle(0, 72, 2, 2);
tile.createRectangle(6, 72, 2, 2);
tile.createRectangle(12, 72, 2, 2);
tile.createRectangle(24, 72, 2, 2);
tile.createRectangle(30, 72, 2, 2);
tile.createRectangle(108, 72, 2, 2);
tile.createRectangle(114, 72, 2, 2);
tile.createRectangle(120, 72, 2, 2);
tile.createRectangle(126, 72, 2, 2);
tile.createRectangle(132, 72, 2, 2);

tile.createRectangle(0, 78, 2, 2);
tile.createRectangle(6, 78, 2, 2);
tile.createRectangle(18, 78, 2, 2);
tile.createRectangle(24, 78, 2, 2);
tile.createRectangle(30, 78, 2, 2);
tile.createRectangle(102, 78, 2, 2);
tile.createRectangle(108, 78, 2, 2);
tile.createRectangle(114, 78, 2, 2);
tile.createRectangle(120, 78, 2, 2);
tile.createRectangle(126, 78, 2, 2);
tile.createRectangle(132, 78, 2, 2);

tile.createRectangle(0, 84, 2, 2);
tile.createRectangle(12, 84, 2, 2);
tile.createRectangle(18, 84, 2, 2);
tile.createRectangle(24, 84, 2, 2);
tile.createRectangle(30, 84, 2, 2);
tile.createRectangle(96, 84, 2, 2);
tile.createRectangle(102, 84, 2, 2);
tile.createRectangle(108, 84, 2, 2);
tile.createRectangle(114, 84, 2, 2);
tile.createRectangle(120, 84, 2, 2);
tile.createRectangle(126, 84, 2, 2);
tile.createRectangle(132, 84, 2, 2);

tile.createRectangle(6, 90, 2, 2);
tile.createRectangle(12, 90, 2, 2);
tile.createRectangle(18, 90, 2, 2);
tile.createRectangle(24, 90, 2, 2);
tile.createRectangle(30, 90, 2, 2);
tile.createRectangle(42, 90, 2, 2);
tile.createRectangle(90, 90, 2, 2);
tile.createRectangle(96, 90, 2, 2);
tile.createRectangle(102, 90, 2, 2);
tile.createRectangle(108, 90, 2, 2);
tile.createRectangle(114, 90, 2, 2);
tile.createRectangle(120, 90, 2, 2);
tile.createRectangle(126, 90, 2, 2);

tile.createRectangle(6, 96, 2, 2);
tile.createRectangle(12, 96, 2, 2);
tile.createRectangle(18, 96, 2, 2);
tile.createRectangle(24, 96, 2, 2);
tile.createRectangle(30, 96, 2, 2);
tile.createRectangle(42, 96, 2, 2);
tile.createRectangle(48, 96, 2, 2);

tile.createRectangle(12, 102, 2, 2);
tile.createRectangle(18, 102, 2, 2);
tile.createRectangle(24, 102, 2, 2);
tile.createRectangle(30, 102, 2, 2);
tile.createRectangle(42, 102, 2, 2);
tile.createRectangle(48, 102, 2, 2);
tile.createRectangle(54, 102, 2, 2);
tile.createRectangle(66, 102, 2, 2);
tile.createRectangle(72, 102, 2, 2);
tile.createRectangle(78, 102, 2, 2);
tile.createRectangle(84, 102, 2, 2);
tile.createRectangle(90, 102, 2, 2);
tile.createRectangle(96, 102, 2, 2);
tile.createRectangle(102, 102, 2, 2);
tile.createRectangle(108, 102, 2, 2);
tile.createRectangle(114, 102, 2, 2);
tile.createRectangle(120, 102, 2, 2);

tile.createRectangle(12, 108, 2, 2);
tile.createRectangle(18, 108, 2, 2);
tile.createRectangle(24, 108, 2, 2);
tile.createRectangle(30, 108, 2, 2);
tile.createRectangle(42, 108, 2, 2);
tile.createRectangle(48, 108, 2, 2);
tile.createRectangle(54, 108, 2, 2);
tile.createRectangle(60, 108, 2, 2);
tile.createRectangle(72, 108, 2, 2);
tile.createRectangle(78, 108, 2, 2);
tile.createRectangle(84, 108, 2, 2);
tile.createRectangle(90, 108, 2, 2);
tile.createRectangle(96, 108, 2, 2);
tile.createRectangle(102, 108, 2, 2);
tile.createRectangle(108, 108, 2, 2);
tile.createRectangle(114, 108, 2, 2);
tile.createRectangle(120, 108, 2, 2);

tile.createRectangle(18, 114, 2, 2);
tile.createRectangle(24, 114, 2, 2);
tile.createRectangle(30, 114, 2, 2);
tile.createRectangle(42, 114, 2, 2);
tile.createRectangle(48, 114, 2, 2);
tile.createRectangle(54, 114, 2, 2);
tile.createRectangle(60, 114, 2, 2);
tile.createRectangle(66, 114, 2, 2);
tile.createRectangle(78, 114, 2, 2);
tile.createRectangle(84, 114, 2, 2);
tile.createRectangle(90, 114, 2, 2);
tile.createRectangle(96, 114, 2, 2);
tile.createRectangle(102, 114, 2, 2);
tile.createRectangle(108, 114, 2, 2);
tile.createRectangle(114, 114, 2, 2);

tile.createRectangle(24, 120, 2, 2);
tile.createRectangle(30, 120, 2, 2);
tile.createRectangle(42, 120, 2, 2);
tile.createRectangle(48, 120, 2, 2);
tile.createRectangle(54, 120, 2, 2);
tile.createRectangle(60, 120, 2, 2);
tile.createRectangle(66, 120, 2, 2);
tile.createRectangle(72, 120, 2, 2);
tile.createRectangle(84, 120, 2, 2);
tile.createRectangle(90, 120, 2, 2);
tile.createRectangle(96, 120, 2, 2);
tile.createRectangle(102, 120, 2, 2);
tile.createRectangle(108, 120, 2, 2);

tile.createRectangle(42, 126, 2, 2);
tile.createRectangle(48, 126, 2, 2);
tile.createRectangle(54, 126, 2, 2);
tile.createRectangle(60, 126, 2, 2);
tile.createRectangle(66, 126, 2, 2);
tile.createRectangle(72, 126, 2, 2);
tile.createRectangle(78, 126, 2, 2);
tile.createRectangle(90, 126, 2, 2);
tile.createRectangle(96, 126, 2, 2);

tile.createRectangle(48, 132, 2, 2);
tile.createRectangle(54, 132, 2, 2);
tile.createRectangle(60, 132, 2, 2);
tile.createRectangle(66, 132, 2, 2);
tile.createRectangle(72, 132, 2, 2);
tile.createRectangle(78, 132, 2, 2);
tile.createRectangle(84, 132, 2, 2);
};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {};

// This function will run when the ball leaves your tile
tile.onBallLeave = async function () {};

// Kill the horizontal velocity of the ball when it moves over the portal
var horizKillerTriggered = false; 
var horizKillerThreshold = 250; // When ball reaches < this x pos, horiz vel killed
var speedThreshold = 40; // When the ball is this fast, move the orange portal 
var portalHTrigger = true;
var firstPortalSpawnTrigger = false;

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {
  if(!firstPortalSpawnTrigger){
    if(this.ball.position.x < 325 && this.ball.position.y > 300){
      portals = tile.createPortals(
        280, 485,
        280, 5
      );
      firstPortalSpawnTrigger = true;
    }
  }
  if(!horizKillerTriggered){
    if(this.ball.position.x < 280){
      this.ball.color = "green";
      this.ball.setVelocity(0, this.ball.body.velocity.y);
      horizKillerTriggered = true;
    }
  } else {
    if(this.ball.body.velocity.y > speedThreshold){
      // The ball is going fast enough in the freefall...
      // now move the orange portal to the wall.
      this.ball.color = "red";
      this.createPortals(
        280, 450,
        490, 100
      )
      portalHTrigger = false;
    }
    if(!portalHTrigger){
      if((this.ball.body.position.x > 400) && (this.ball.position.y > 110)) {
        this.ball.setVelocity(-15, 0);
        this.ball.color = "blue";
        portalHTrigger = true;
      }
    }
  }
};