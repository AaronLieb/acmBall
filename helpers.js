import Game from "./Game.js";

export const positionToTile = pos => {
  return (
    Math.floor(pos.x / Game.TILE_WIDTH) +
    Math.floor(pos.y / Game.TILE_HEIGHT) * Game.NUM_TILES_X
  );
};

export const parseOptions = options => {
  options ||= {};
  options.render ||= {};
  options.render.fillStyle ||= options.render.color ?? "gray";
  return options;
};

export const sleep = time => {
    return new Promise(res => {
        setTimeout(() => {
            res()
        }, time)
    })
}
