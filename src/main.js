/* TODO 

    Documentation:
      code block example, gif showing the result

    *Create a spring composition, with constraints
    Add timer with ms

    Body bounds, don't let objects created in a tile leave that Tile
    .bounds.max / .bounds.min
    test cases

    Apply force 

    Charlie:
      make sleep work with events instead of settimeout
    
    fix conveyor belt to have sending velocity be parrallell to the conveyor belt

    portals

    Camera:
      use canvas.style.backgroundPosition to move background when camera moves
    

    ball scale function in wrapper

    Top left everything 

  Duc:
    Sprites

  Justin:
    apply force
    Borders around tiles
    fix cursor being offset 
  
  Duc:
    sprites

    Extra:
    Look into the engine and see what cool options there are to wrap
    gravity
    time
*/

import Game from "./Game.js";
import Camera from "./Camera.js";

const loadScript = async (id) => {
  return new Promise((res, rej) => {
    let script = document.createElement("script");
    script.src = `../tiles/${id}.js`;
    script.type = "module";
    script.onerror = rej;
    script.onload = res;
    document.head.appendChild(script);
  });
};

var game;

const start = async () => {
  game = new Game();
  window.game = game;

  for (let i = 0; i < game.NUM_TILES; i++) {
    try {
      await loadScript(i);
    } catch (err) {
      break;
    }
  }

  game.setup();
  game.run();
  game.pause();
};

await start();

window.startGame = game.start;
window.resumeGame = game.resume;
window.pauseGame = game.pause;
window.restartGame = () => window.location.reload();
window.switchView = Camera.switchView;

let resumeButton = document.getElementById("resume");
let pauseButton = document.getElementById("pause");
let startButton = document.getElementById("play");

window.addEventListener(
  "keydown",
  (e) => {
    if (e.defaultPrevented) return;

    switch (e.key) {
      case " ":
        if (game.running) {
          if (game.paused) {
            game.resume();
            resumeButton.hidden = true;
            pauseButton.hidden = false;
          } else {
            resumeButton.hidden = false;
            pauseButton.hidden = true;
            game.pause();
          }
        } else {
          game.start();
          startButton.hidden = true;
          pauseButton.hidden = false;
        }
        break;
      case "v":
        Camera.switchView();
        break;
      case "r":
        window.location.reload();
        break;
      default:
        return;
    }

    e.preventDefault();
  },
  true
);

export default game;
