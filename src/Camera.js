let { Bodies, Render } = Matter;

const Camera = {
  WIDTH: 500 * (16 / 9),
  HEIGHT: 500,
  zoom: 1.5,
  fullScreen: true,
  lerp_coefficient: 0.03,
  /* Dummy object used for lerping */
  focusBody: Bodies.circle(0, 0, 0.1, {
    isStatic: true,
    isSensor: true,
  }),
};

Camera.setup = () => {
  Camera.focusBody.position.x = game.ball.body.position.x;
  Camera.focusBody.position.y = game.ball.body.position.y;
};

Camera.lerp = () => {
  /* linearly interpolates camera focus by lerp_coefficient */
  let x = (game.ball.body.position.x - Camera.focusBody.position.x) * Camera.lerp_coefficient;
  let y = (game.ball.body.position.y - Camera.focusBody.position.y) * Camera.lerp_coefficient;
  Camera.focusBody.position.x += x;
  Camera.focusBody.position.y += y;
};

Camera.updateCamera = () => {
  /* Choose the focus target */
  let body = Camera.fullScreen ? game.centerBody : Camera.focusBody;

  /* Edit CSS */

  // let c = game.render.canvas;
  // c.setAttribute("style", "background-position-x:" + body.position.x * 0.55 + "px" + "!important");
  // c.setAttribute("style", "background-position-y:" + body.position.y * 0.55 + "px" + "!important");

  /* Linear Interpolation only if NOT fullscreen */
  Camera.fullScreen || Camera.lerp();
  /* Adjust padding of viewport */
  let divisor = Camera.fullScreen
    ? { x: game.WIDTH / 2, y: game.HEIGHT / 2 }
    : { x: game.TILE_WIDTH / Camera.zoom, y: game.TILE_HEIGHT / Camera.zoom };
  Render.lookAt(
    game.render,
    {
      x: body.position.x,
      y: body.position.y,
    },
    divisor,
    true
  );
};

Camera.switchView = () => {
  Camera.fullScreen = !Camera.fullScreen;
};

export default Camera;
