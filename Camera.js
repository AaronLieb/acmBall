import Game from "./Game.js";

/* TODO:
have camera control frame size
implement a smoothing algorithm
*/

const transformWithinRange = (pos, min, max) => {
  return -1 * Math.min(Math.max(pos, min), max - min) + min;
};

const Camera = {
  WIDTH: window.innerWidth * 0.95,
  HEIGHT: window.innerHeight * 0.95,
  ZOOM: 1,
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
  // TODO: Fix camera when zoom > 1
  document.getElementsByTagName("canvas")[0].style.transform = `translate(
    ${transformWithinRange(Game.ball.position.x, Camera.WIDTH / 2, Game.WIDTH)}px,
    ${transformWithinRange(Game.ball.position.y, Camera.HEIGHT / 2, Game.HEIGHT)}px
  )`;
};

export default Camera;
