var { Engine, Render, Runner, Bodies, Composite, Body, Events } = Matter;

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
  });
  this.ball.render.fillStyle = "#f99";
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
      if (!this.completed && this.ball.position.x >= this.render.canvas.width) {
        this.completed = true;
        if (this.ball.position != this.setupScript.end.position) {
          console.log("TEST CASE FAILED");
        } else {
          console.log("TEST CASE PASSED!");
        }
        if (this.id >= tiles.length - 1) return;
        console.log(`Transitioning Tile ${id} to ${id + 1}`);
        tiles[this.id + 1].run();
      } else if (
        this.ball.position.x >=
        this.render.canvas.width + this.ball.circleRadius
      ) {
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

let main = () => {
  for (let i = 0; i < loadedTiles.length; i++) {
    tiles.push(new Tile(i, loadedTiles[i]));
  }
  for (let tile of tiles) {
    tile.setup();
  }
  tiles[0].run();
};

const TOTAL_SCRIPTS = 16;
let scriptsToLoad = 16;

let updateScriptsToLoad = () => {
  scriptsToLoad--;
  if (scriptsToLoad <= 0) {
    main();
  }
};

loadedTiles = [];

for (let i = 0; i < TOTAL_SCRIPTS; i++) {
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.src = `./tiles/${i}.js`;
  console.log(script.src);
  script.onerror = updateScriptsToLoad;
  script.onload = () => {
    loadedTiles.push({
      setupFunction: setupFunction,
      start: START,
      end: END,
    });
    updateScriptsToLoad();
  };
  document.head.appendChild(script);
}
