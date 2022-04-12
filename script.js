/* TODO 
    Add a mouse to see coordinates, for easier placement

    Create a spring composition, with constraints

    Camera:
    Keep track of the activeTile, and use the position of the ball to translate the grid, no overflow

    Look into the engine and see what cool options there are to wrap

    Allow ball to re-enter the tile

    Dynamically choose the tile that a square will enter based off the exit 
*/

var { Engine, Render, Runner, Bodies, Composite, Body, Events, Detector } = Matter;

const POSITION_DELTA = 0.05;
const VELOCITY_DELTA = 0.05;

let assertEqual = (a, b, delta, msg) => {
  if (Math.abs(a - b) > delta) {
    console.log(`[${msg}] TEST CASE FAILED ${a} != ${b} | delta = ${delta}`);
    return false;
  }
  console.log(`[${msg}] TEST CASE PASSED ${a} == ${b} | delta = ${delta}`);
  return true;
};

let testExit = (ball, end) => {
  let flag = true;
  flag = assertEqual(ball.position.x, end.position.x, POSITION_DELTA, "Ball Position X") && flag;
  flag = assertEqual(ball.position.y, end.position.y, POSITION_DELTA, "Ball Position Y") && flag;
  flag = assertEqual(ball.velocity.x, end.velocity.x, VELOCITY_DELTA, "Ball Velocity X") && flag;
  flag = assertEqual(ball.velocity.y, end.velocity.y, VELOCITY_DELTA, "Ball Velocity Y") && flag;
  return flag;
};

function Tile(id, setupScript) {
  this.id = id;
  this.setupScript = setupScript;
  this.engine = Engine.create();
  this.runner = Runner.create();
  this.render = Render.create({
    element: document.getElementById("grid"),
    engine: this.engine,
    options: {
      wireframes: false,
      width: 500,
      height: 500,
    },
  });
  this.ball = Bodies.circle(0, 0, 40, {
    frictionAir: 0,
    restitution: 1,
    friction: 0,
    render: {
      fillStyle: "#f99",
    },
  });
  this.detector = Detector.create({
    bodies: [this.ball],
  });
  this.completed = false;
  this.setup = () => {
    Render.run(this.render);
    Runner.run(this.runner, this.engine);
    this.setupScript.setupFunction(this);
    let stop = () => {
      this.stop();
      Events.off(this.runner, "tick", stop);
    };
    Events.on(this.runner, "tick", stop);
  };
  this.run = () => {
    Body.setPosition(this.ball, this.setupScript.start.position);
    Body.setVelocity(this.ball, this.setupScript.start.velocity);
    Render.run(this.render);
    Runner.run(this.runner, this.engine);
    Composite.add(this.engine.world, [this.ball]);
    Events.on(this.runner, "tick", () => {
      for (let pair of Detector.collisions(this.detector)) {
        pair.bodyB.speedUp(pair.bodyA);
      }
      if (!this.completed && this.ball.position.x >= this.render.canvas.width) {
        this.completed = true;
        testExit(this.ball, this.setupScript.end);
        if (this.id >= tiles.length - 1) return;
        console.log(`Transitioning Tile ${id} to ${id + 1}`);
        tiles[this.id + 1].run();
      } else if (this.ball.position.x >= this.render.canvas.width + this.ball.circleRadius) {
        console.log(`Stopped Tile ${id}`);
        this.stop();
      }
    });
  };
  this.stop = () => {
    Runner.stop(this.runner);
    Render.stop(this.render);
  };
}

let activeTile = 0;
let tiles = [];

const main = () => {
  for (let i = 0; i < loadedTiles.length; i++) {
    tiles.push(new Tile(i, loadedTiles[i]));
  }
  for (let tile of tiles) {
    tile.setup();
  }
  tiles[0].run();
};

const TOTAL_SCRIPTS = 16;
let scriptsToLoad = TOTAL_SCRIPTS;

loadedTiles = [];
let i = 0;

const loadScripts = () => {
  if (scriptsToLoad <= 0) return main();
  scriptsToLoad--;
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.src = `./tiles/${i}.js`;
  script.onerror = loadScripts;
  script.onload = () => {
    loadedTiles.push({
      setupFunction: setupFunction,
      start: START,
      end: END,
    });
    loadScripts();
  };
  document.head.appendChild(script);
  i++;
};

loadScripts();
