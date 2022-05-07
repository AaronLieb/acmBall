import Line from "./Line.js";

class Elevator {
    constructor(tile, x1, y1, width, height, speed, levels) {
        this.levels = [];
        this.x1 = x1;
        this.y1 = y1;
        this.width = width;
        this.height = height;
        this.x2 = x1 + width;
        this.y2 = y1 + height;
        this.speed = speed;
        this.gap = height / levels;
        for (let i = 0; i < levels; i++) {
            y1 -= this.gap;
            const level = new Line(tile, x1, y1, this.x2, y1, 2, false);
            this.levels[i] = level.body;
        }
        Matter.Composite.add(tile.game.engine.world, levels);
    }

    goUp() {
        for (const body of this.levels) {
            Matter.Body.translate(body, { x: 0, y: -this.speed });

            if (body.position.y < this.y1) {
                const nextY = this.y2 + (body.position.y - this.y1);
                Matter.Body.translate(body, { x: 0, y: nextY - body.position.y });
            }
        }
    }

    goDown() {
        for (const body of this.levels) {
            Matter.Body.translate(body, { x: 0, y: -this.speed });

            if (body.position.y < this.y1) {
                const nextY = this.y1 + (body.position.y - this.y2);
                Matter.Body.translate(body, { x: 0, y: body.position.y - nextY });
            }
        }
    }
}

export default Elevator;