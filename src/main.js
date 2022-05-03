/* TODO 

    Documentation:
      code block example, gif showing the result

    *Create a spring composition, with constraints
    *Add mouse to see coordinates, for easier placement
    Add timer with ms

    Hash the module object, source code or github commit id and test it against 

    Tests:
      Ball state (size, restitution, color, etc...)
      set ball state 
    
    Body bounds, don't let objects created in a tile leave that Tile
    .bounds.max / .bounds.min
    

    Extra:
    Camera:
      add smoothing algorithm
    Look into the engine and see what cool options there are to wrap
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
