import "./matter.js";
let { Bodies, Composite } = Matter;
import Game from "./Game.js";
import { parseOptions } from "./helpers.js";

function Tile() {
  /* Constructor */

  Game.tiles.push(this);

  /* Member Variables */

  this.id = Game.tiles.length - 1;
  this.height = Game.TILE_HEIGHT;
  this.width = Game.TILE_WIDTH;
  this.left = (this.id % Game.NUM_TILES_X) * Game.TILE_WIDTH;
  this.top = Math.floor(this.id / Game.NUM_TILES_Y) * Game.TILE_WIDTH;
  this.right = this.left + Game.TILE_WIDTH;
  this.bottom = this.right + Game.TILE_HEIGHT;

  /* User Defined Member Variables */

  this.ballStart = {};
  this.ballEnd = {};

  /* User Defined Member Functions */

  this.setup;
  this.onBallEnter;
  this.onTick;
  this.onTickBackground;

  /*  Member Functions */

  this.createRectangle = (x, y, width, height, options = {}) => {
    parseOptions(options);
    let body = Bodies.rectangle(this.left + x, this.top + y, width, height, options);
    Composite.add(Game.engine.world, body);
    return body;
  };

  this.createCircle = (x, y, width, height, options) => {
    options = parseOptions(options);
    let body = Bodies.rectangle(this.left + x, this.top + y, width, height, options);
    Composite.add(Game.engine.world, body);
    return body;
  };
}

export default Tile;
