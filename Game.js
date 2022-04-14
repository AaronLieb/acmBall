function Game() {
  this.engine = Engine.create();
  this.runner = Runner.create();
  this.render = Render.create({
    element: document.body,
    engine: this.engine,
    options: {
      wireframes: false,
      width: CANVAS_HEIGHT,
      height: CANVAS_WIDTH,
    },
  });
  this.tiles = [];
  this.activeTile = 0;
  this.ball = Bodies.circle(0, 0, 40, {
    frictionAir: 0,
    restitution: 1,
    friction: 0,
    render: {
      fillStyle: "#f99",
    },
  });

  this.setup = () => {
    Render.run(this.render);
    Runner.run(this.runner, this.engine);
    for (let tile of game.tiles) {
      tile.setup();
    }
    let stop = () => {
      this.stop();
      Events.off(this.runner, "tick", stop);
    };
    Events.on(this.runner, "tick", stop);
  };

  this.detector = Detector.create({
    bodies: [this.ball],
  });

  this.run = () => {
    Body.setPosition(this.ball, this.tiles[0].start.position);
    Body.setVelocity(this.ball, this.tiles[0].start.velocity);
    Render.run(this.render);
    Runner.run(this.runner, this.engine);
    Composite.add(this.engine.world, [this.ball]);
    Events.on(this.runner, "tick", () => {
      for (let pair of Detector.collisions(this.detector)) {
        pair.bodyB.speedUp(pair.bodyA);
      }
    });
  };

  this.stop = () => {
    Runner.stop(this.runner);
    Render.stop(this.render);
  };
}
