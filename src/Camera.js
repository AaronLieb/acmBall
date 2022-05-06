let { Bodies, Render } = Matter;

const Camera = {
  modes: {
    ball: 0,
    fullscreen: 1,
    tile: 2,
  },
  WIDTH: 500 * (16 / 9),
  HEIGHT: 500,
  zoom: 1.5,
  mode: 0,
  lerp_coefficient: 0.03,
  /* Dummy object used for lerping */
  focusBody: Bodies.circle(0, 0, 0.1, { ignore: true }),
};

Camera.setup = () => {
  let retrieved_camera_mode = localStorage.getItem('cameraMode');
  if (retrieved_camera_mode) Camera.mode = retrieved_camera_mode;
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
  const getBody = () => {
    if (Camera.mode == Camera.modes.fullscreen) return game.centerBody;
    else if (Camera.mode == Camera.modes.ball) return Camera.focusBody;
    else return game.tiles[game.activeTile]?.centerBody ?? game.centerBody;
  };

  /* Linear Interpolation only if NOT fullscreen */
  Camera.fullScreen || Camera.lerp();
  /* Adjust padding of viewport */
  let divisor =
    Camera.mode == Camera.modes.fullscreen
      ? { x: game.WIDTH / 2, y: game.HEIGHT / 2 }
      : { x: game.TILE_WIDTH / Camera.zoom, y: game.TILE_HEIGHT / Camera.zoom };
  Render.lookAt(
    game.render,
    {
      x: getBody().position.x,
      y: getBody().position.y,
    },
    divisor,
    true
  );
};

Camera.switchView = () => {
  Camera.mode = (Camera.mode + 1) % 3;
  localStorage.setItem('cameraMode', Camera.mode);
};

export default Camera;
