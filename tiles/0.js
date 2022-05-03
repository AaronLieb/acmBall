import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();
let { ballStart, ballEnd } = tile;

ballStart.position = { x: 0, y: 420 };
ballStart.velocity = { x: 2, y: 0 };

ballEnd.position = { x: 500, y: 420 };
ballEnd.velocity = { x: 3, y: 0 };

// This function will run once when the tile loads for the first time
tile.setup = function () {
  tile.createRectangle(tile.width / 2, tile.height - 20, tile.width, 40);
  let wall = tile.createRectangle(550, 250, 50, 400, true);
  wall.setMass(0.04);
  tile.createConveyorBelt(tile.width / 2 + 225, tile.height - 20, 100, 40, 5);
  let button1 = tile.createButton(tile.width / 2,
    tile.height - 20, tile.width / 3, 40,
    () => { tile.clear() },
    () => { console.log('ended press') }, { isStatic: true, pressedColor: 'yellow' });
  [1, 2].forEach(i => {
    let s = tile.createRectangle(tile.width / 2, tile.height - (300 + i * 80), 50, 50, true);
    s.setMass(0.02);
  })


  // tile.game.ball.render.fillStyle = "#004521"; /* example changing visible property */
};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {};

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {};

// This function will run once everey tick, even if the ball is not in your tile
tile.onTickBackground = function () {};
