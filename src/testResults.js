import { reqJSONBin } from "./db.js";
import config from "../config.js";
import { hash } from "./helpers.js";
import { tiles } from "./Game.js";

const tile = tiles[config.tile_id];
const h = hash([ tile.ballStart, tile.ballEnd, tile.setup, tile.onBallEnter, tile.onTick, tile.onTickBackground ]);
const res = await reqJSONBin("get", config.tile_id);
if (h != res.hash) {
  console.log("Hash check failed, please try running the simulation and trying again");
  process.exit(1);
}
if (res.result) {
  // TODO: show which test cases failed
  console.log("Tile test cases failed");
  process.exit(1);
}

process.exit(0);
