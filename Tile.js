function Tile(id, setup, onBallEnter, onTick, onTickBackground, start, end) {
  this.id = id;
  this.setup = setup;
  this.onBallEnter = onBallEnter;
  this.onTick = onTick;
  this.onTickBackground = onTickBackground;
  this.start = start;
  this.end = end;
  game.tiles.push(this);
}