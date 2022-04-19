/* TODO 
    Add mouse to see coordinates, for easier placement

    Write a custom renderer:
      pick beter names for color, border, width
      make borders inside rather than outside
      remove borders on same-type shapes that share verticies? (might be too hard on performance)
    
    Camera:
      change canvas size easily
      add smoothing algorithm
      disable camera
    
    Game:
      add start button
    
    Create a spring composition, with constraints

    Look into the engine and see what cool options there are to wrap

    Backend: 
      Create CI infastructure
      Only send successful test case attempts
*/

import Game from "./Game.js";

const loadScript = async (id) => {
  return new Promise((res, rej) => {
    let script = document.createElement("script");
    script.src = `./tiles/${id}.js`;
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
    console.log(`stopping loading: ${err}`);
    break;
  }
}

Game.setup();
Game.run();
