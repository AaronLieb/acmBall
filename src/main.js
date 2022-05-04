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

for (let i = 0; ; i++) {
  try {
    await loadScript(i);
  } catch (err) {
    break;
  }
}

// starts the game, and then pauses is, waiting for user to press "start"
Game.setup();
Game.run();
Game.pause();
