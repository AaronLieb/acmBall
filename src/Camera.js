import Game from "./Game.js";
let { Render } = Matter;

/* TODO:
implement a smoothing algorithm
*/

const Camera = {
  WIDTH: window.innerWidth * 0.95,
  HEIGHT: window.innerHeight * 0.95,
  // WIDTH: 500 * 0.95,
  // HEIGHT: 500 * 0.95,
  zoom: 1,
  fullScreen: false,
};

Camera.setup = () => {
  let gameView = document.getElementById("gameView");
  gameView.style.width = `${Camera.WIDTH}px`;
  gameView.style.height = `${Camera.HEIGHT}px`;
  // let canvas = document.getElementsByTagName("canvas")[0];
  // canvas.style.width = `${Game.WIDTH * Camera.ZOOM}px`;
  // canvas.style.height = `${Game.HEIGHT * Camera.ZOOM}px`;
};

Camera.updateCamera = () => {
  let body = Camera.fullScreen ? Game.centerBody : Game.ball;
  let divisor = Camera.fullScreen
    ? { x: Game.WIDTH / 2, y: Game.HEIGHT / 2 }
    : { x: Game.TILE_WIDTH / Camera.zoom, y: Game.TILE_HEIGHT / Camera.zoom };
  Render.lookAt(Game.render, body, divisor, true);
};

Camera.switchView = () => {
  Camera.fullScreen = !Camera.fullScreen;
};

// Make global
window.switchView = Camera.switchView;

export default Camera;
