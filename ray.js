import Vector from "./vector.js";

class Ray {
  constructor(x, y, angleInRadians) {
    this.position = new Vector(x, y);
    this.direction = new Vector(x, y);
    this.direction.setDirection(angleInRadians);
  }

  lookAt(x, y) {
    this.direction.x = x - this.position.x;
    this.direction.y = y - this.position.y;
    this.direction = this.direction.normalize();
  }

  show(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.translate(this.position.x, this.position.y);
    ctx.moveTo(0, 0);
    ctx.lineTo(this.direction.x * 1, this.direction.y * 1);
    ctx.stroke();
    ctx.restore();
  }

  cast(wall) {
    const x1 = wall.ptA.x;
    const y1 = wall.ptA.y;
    const x2 = wall.ptB.x;
    const y2 = wall.ptB.y;

    const x3 = this.position.x;
    const y3 = this.position.y;
    const x4 = this.position.x + this.direction.x;
    const y4 = this.position.y + this.direction.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den == 0) {
      return;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

    if (t > 0 && t < 1 && u > 0) {
      var intersectionPoint = new Vector(
        x1 + t * (x2 - x1),
        y1 + t * (y2 - y1)
      );
      return intersectionPoint;
    } else {
      return;
    }
  }
}

export default Ray;
