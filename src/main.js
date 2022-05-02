/* TODO 

    Documentation:
      code block example, gif showing the result

    fix my jank ass database
    
    *Create a spring composition, with constraints

    *Write a custom renderer:
      pick beter names for color, border, width
      make borders inside rather than outside
      remove borders on same-type shapes that share verticies? (might be too hard on performance)
    
    Camera:
      change canvas size easily
      add smoothing algorithm
      disable camera
    

    Extra:

    Add mouse to see coordinates, for easier placement
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
