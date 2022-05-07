import { sleep } from "../src/helpers.js";
import Tile from "../src/Tile.js";

let tile = new Tile();

tile.ballStart.position = { x: 0, y: 60 };
tile.ballStart.velocity = { x: 5, y: 0 };

tile.ballEnd.position = { x: 255.93, y: 500 };
tile.ballEnd.velocity = { x: -2, y: 4.42 };

let lines;
let spinnerFlipping = false;

const clear = (e) => {
  Matter.Composite.remove(game.engine.world, [e.body]);
};

function launchBall() {
  tile.ball.velocity = { x: 3.5, y: -14.5 };
  spinnerFlipping = true;
  blow();
}

// This function will run once when the tile loads for the first time
tile.setup = function () {
  let floor = this.createLine(0, 90, 250, 90, 5);
  let minimizer = this.createButton(
    100,
    58,
    50,
    50,
    () => {
      tile.ball.scale(0.7);
      tile.ball.velocity = { x: 3, y: 0 };
    },
    () => {},
    { isSensor: true }
  );
  let dominoes = [
    this.createLine(140, 80, 140, 60, 2, true),
    this.createLine(160, 80, 160, 40, 3, true),
    this.createLine(185, 80, 185, 20, 4, true),
    this.createLine(215, 80, 215, 0, 5, true),
  ];
  let btn = this.createButton(270, 150, 30, 5, () => {
    dominoes.forEach((d) => clear(d));
    clear(floor);
    clear(minimizer);
    clear(btn);
  });

  tile.ball.radius = 10;
  let lineLen = 250;
  lines = [
    tile.createRectangle(250, 250, lineLen, 1),
    tile.createRectangle(250, 250, lineLen, 1),
    tile.createRectangle(250, 250, lineLen, 1),
  ];
  lines[1].angle += 60;
  lines[2].angle -= 60;

  // borders
  tile.createRectangle(250, 500, 500, 2);
  tile.createLine(0, 0, 500, 0, 1);
  tile.createLine(0, 0, 0, 500, 1);
  tile.createLine(500, 0, 500, 500, 1);
  let zone;
  // zone = tile.createZone(250, 250, 200, 200,
  //   async () => {
  //     tile.ball.bounciness = 0;
  //     await sleep(1000);
  //     console.log('yeet');
  //     tile.ball.bounciness = 1.0;
  //     zone.scale(0);r
  //   },
  //   () => {},
  //   () => {tile.ball.bounciness = 1.0},
  //     {
  //       pressedColor: 'rgba(0,0,0,0.1)',
  //       unpressedColor: 'rgba(0,0,0,0.1)',
  //       render:{strokeStyle: 'rgba(0,0,0,0)'
  //     }
  //   }
  // );
  // zone.color = 'rgba(140,32,0,0.1)';

  // draw maze
  tile.createLine(400, 200, 500, 200, 1);
  tile.createLine(400, 250, 450, 250, 1);
  tile.createLine(450, 300, 500, 300, 1);
  tile.createLine(400, 250, 400, 350, 1);
  tile.createLine(400, 350, 450, 350, 1);

  tile.createPortals(475, 400, 40, 150);

  tile.createButton(30, 450, 60, 20, launchBall);

  let belt = tile.createSpring(250, 470, 500, 20, 2.5, 0);
  belt.color = "lime";
};

let spinAmount = 2.95;

function spin() {
  if (spinnerFlipping) {
    spinAmount -= 0.03;
  }
  if (spinAmount < -1) {
    spinnerFlipping = false;
  }
  lines.forEach((element) => {
    element.angle += spinAmount;
  });
}

let confetti = [];

function blow() {
  for (let i = 0; i < 50; i += 1) {
    let t = tile.createRectangle(250, 250, 10, 10, true, { isSnesor: true });
    Matter.Body.setStatic(t.body, false);
    t.color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    t.velocity = { x: Math.random() * 10 - 5, y: Math.random() * 10 - 5 };
    confetti.push(t);
  }
}

// This function will run when the ball enters your tile
tile.onBallEnter = async function () {};

// This function will run when the ball leaves your tile
tile.onBallLeave = async function () {};

// This function will run once every tick while the ball is in your tile
tile.onTick = function () {
  spin();
};
