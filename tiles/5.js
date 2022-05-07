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
  )
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
