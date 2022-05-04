/* TODO 

    Documentation:
      code block example, gif showing the result

    *Create a spring composition, with constraints
    Add timer with ms

    Body bounds, don't let objects created in a tile leave that Tile
    .bounds.max / .bounds.min
    test cases
    
    fix conveyor belt to have sending velocity be parrallell to the conveyor belt

    Extra:
    Look into the engine and see what cool options there are to wrap
    gravity
    time
*/

import Game from "./Game.js";

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

  for (let i = 0; ; i++) {
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
window.restartGame = window.location.reload;
