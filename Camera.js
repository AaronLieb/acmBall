import Game from "./Game.js";

/* TODO:
find intitial camera offset based off starting position of ball
have camera control frame size
implement a smoothing algorithm
have bounds checking, min max values
*/

let Camera = {
  updateCamera: () => {
    document.getElementsByTagName("canvas")[0].style.transform = `translate(${
      -1 * Game.ball.position.x + 300
    }px, ${-1 * Game.ball.position.y + 300}px)`;
  },
};

export default Camera;
