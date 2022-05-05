import Button from "./Button.js";

class Portal extends Button {
  constructor(tile, x, y, dest_x, dest_y, color) {
    const enterPortal = () => {
      if (tile.ball.portalNausea) return;
      tile.ball.setPosition(dest_x, dest_y);
      tile.ball.portalNausea = true;
    };
    const exitPortal = () => {
      tile.ball.portalNausea = false;
    };
    super(tile, x, y, 50, 50, enterPortal, exitPortal, { ballOnly: true, render: { visible: false } });
    let portal = tile.createCircle(x, y, 25, false, { isSensor: true });
    portal.color = color;
    Matter.Body.scale(portal.body, 0.6, 1);
  }
}

export default Portal;
