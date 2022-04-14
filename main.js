/* TODO 
    Add a mouse to see coordinates, for easier placement

    Create a spring composition, with constraints

    Camera:
    Keep track of the activeTile, and use the position of the ball to translate the grid, no overflow

    Look into the engine and see what cool options there are to wrap

    Allow ball to re-enter the tile

    Dynamically choose the tile that a square will enter based off the exit 
*/

const NUM_TILES_X = 4;
const NUM_TILES_Y = 4;
const TILE_HEIGHT = 500;
const TILE_WIDTH = 500;
const CANVAS_HEIGHT = TILE_HEIGHT * NUM_TILES_Y;
const CANVAS_WIDTH = TILE_WIDTH * NUM_TILES_X;

const TOTAL_SCRIPTS = 1;

const loadScript = async id => {
  return new Promise((res, rej) => {
    let script = document.createElement("script");
    script.src = `./tiles/${id}.js`; 
    script.onerror = () => { rej() };
    script.onload = () => {
      new Tile(id, setup, onBallEnter, onTick, onTickBackground, END, START);
      res();
    };
    document.head.appendChild(script);
  })
}

const main = async () => {
  for(let i = 0; i < TOTAL_SCRIPTS; i++) {
    await loadScript(i);
  }
  game.setup();
  game.run();
}

var game = new Game();
main();
