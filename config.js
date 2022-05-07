const config = {
  tile_id: 5,
  tests: {
    pauseOnFailedTest: false,
    exit: {
      position: true,
      velocity: true,
      size: true,
      shape: true,
      render: true,
    },
  },
  debug: {
    showMasses: false,
    showTimer: true,
    showCameraMode: true,
    showMousePosition: true,
    showTileBorder: true,
    showMarkers: true,
    showBallPositionOnExit: true,
  },
  logging: {
    matter: 0,
  },
  testAllTiles: false,
};

export default config;
