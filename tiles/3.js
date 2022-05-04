import Game from "../src/Game.js";
import Tile from "../src/Tile.js";
import { sleep } from "../src/helpers.js";

let tile = new Tile();

tile.ballStart.position = { x: 0, y: 420 };
tile.ballStart.velocity = { x: 5, y: 0 };

tile.ballEnd.position = { x: 500, y: 420 };
tile.ballEnd.velocity = { x: 5, y: 0 };

// This function will run once when the tile loads for the first time
tile.setup = function () {
};

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {};

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {};

// This function will run once everey tick, even if the ball is not in your tile
tile.onTickBackground = function () {};
