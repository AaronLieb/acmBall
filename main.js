/* TODO 
    Add a mouse to see coordinates, for easier placement

    Use velocity of ball to get x intercept when overshooting tile transition test case

    Create a spring composition, with constraints

    Look into the engine and see what cool options there are to wrap

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

for (let i = 0; i < TOTAL_SCRIPTS; i++) await loadScript(i);

Game.setup();
Game.run();
