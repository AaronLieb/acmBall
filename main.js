/* TODO 

    Documentation:
      code block example, gif showing the result

    Use sensors

    Call test cases even if there is one tile

    Add mouse to see coordinates, for easier placement

    Write a custom renderer:
      pick beter names for color, border, width
      make borders inside rather than outside
      remove borders on same-type shapes that share verticies? (might be too hard on performance)
    
    Camera:
      change canvas size easily
      add smoothing algorithm
      disable camera
    
    Create a spring composition, with constraints

    Look into the engine and see what cool options there are to wrap

    Backend: 
      upload test results to json bin
      create bash script to read from json bin
      run bash script on github workflow
      pass fail depending on json bin results 
*/

import Game from "./Game.js";

// Fetches the /tiles directory, parses the html to get number of scripts
const TOTAL_SCRIPTS = await fetch("/tiles")
  .then((res) => res.text())
  .then((text) => [...text.matchAll(/\.js/g)].length / 3);

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

//for (let i = 0; i < TOTAL_SCRIPTS; i++) await loadScript(i);
for (let i = 0; i < 2; i++) await loadScript(i);

// starts the game, and then pauses is, waiting for user to press "start"
Game.setup();
Game.run();
Game.pause();
