const config = {
  tile_id: 0,
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
    showTileBorder: false,
    showMarkers: true,
  },
  logging: {
    matter: 0,
  },
  testAllTiles: true,
};

export default config;
