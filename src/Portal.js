import Button from "./Button.js";

class Portal extends Button {
  constructor(tile, x, y, dest_x, dest_y, color) {
    const enterPortal = () => {
      if (tile.ball.portalNausea) return;
      Matter.Body.setPosition(tile.ball.body, { x: dest_x, y: dest_y });
      tile.ball.portalNausea = true;
    };
    const exitPortal = () => {
      tile.ball.portalNausea = false;
    };
    super(tile, x, y, 5, 30, enterPortal, exitPortal, { ballOnly: true, isSensor: true, render: { visible: false } });
    let portal = tile.createCircle(x - tile.left, y - tile.top, 25, false, { ignore: true });
    portal.color = color;
    Matter.Body.scale(portal.body, 0.6, 1);
  }
}

export default Portal;
