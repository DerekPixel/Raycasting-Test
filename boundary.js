import Vector from "./vector.js";

class Boundary {
  constructor(x1, y1, x2, y2) {
    this.ptA = new Vector(x1, y1);
    this.ptB = new Vector(x2, y2);
  }

  show(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white';
    ctx.moveTo(this.ptA.x, this.ptA.y);
    ctx.lineTo(this.ptB.x, this.ptB.y);
    ctx.stroke();
    ctx.restore();
  }
}

export default Boundary;
