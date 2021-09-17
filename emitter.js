import Ray from "./ray.js";
import Vector from "./vector.js";

class Emitter {
  constructor() {
    this.position = new Vector(300, 350);
    this.rays = [];
    this.heading = Math.PI * 1.25;
    for (var a = -20; a < 20; a += 1) {
      var radian = (a * Math.PI) / 180 + this.heading;
      this.rays.push(new Ray(this.position.x, this.position.y, radian));
    }
  }

  move(amt) {
    var vel = new Vector(this.position.x, this.position.y);
    vel.setDirection(this.heading);
    vel.setMagnitude(amt);
    this.position.addTo(vel);

    for (var i = 0; i < this.rays.length; i++) {
      this.rays[i].position.x = this.position.x;
      this.rays[i].position.y = this.position.y;
    }
  }

  rotate(angle) {
    this.heading += angle;

    for (var i = 0; i < this.rays.length; i++) {
      this.rays[i].direction.setDirection(
        (this.scale(
          i,
          0,
          this.rays.length,
          -1 * (this.rays.length / 2),
          this.rays.length / 2
        ) *
          Math.PI) /
          180 +
          this.heading
      );
    }
  }

  update(x, y) {
    this.position.x = x;
    this.position.y = y;
    for (var i = 0; i < this.rays.length; i++) {
      this.rays[i].position.x = x;
      this.rays[i].position.y = y;
    }
  }

  look(walls, ctx) {
    var scene = [];
    for (var i = 0; i < this.rays.length; i++) {
      var closest = null;
      var record = Infinity;
      for (var wall of walls) {
        var point = this.rays[i].cast(wall);
        if (point) {
          var d = this.dist(this.position, point);
          var a = this.rays[i].direction.getDirection() - this.heading;

          d *= Math.cos(a);

          if (d < record) {
            record = d;
            closest = point;
          }
        }
      }
      if (closest) {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "white";
        ctx.globalAlpha = 0.25;
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(closest.x, closest.y);
        ctx.stroke();
        ctx.restore();
      }
      scene[i] = record;
    }
    return scene;
  }

  show(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.ellipse(
      this.position.x,
      this.position.y,
      1,
      1,
      0,
      0,
      (360 * Math.PI) / 180
    );
    ctx.fill();
    ctx.restore();

    for (var i = 0; i < this.rays.length; i++) {
      this.rays[i].show(ctx);
    }
  }

  dist(v1, v2) {
    var a = v1.x - v2.x;
    var b = v1.y - v2.y;

    return Math.sqrt(a * a + b * b);
  }

  scale(number, inMin, inMax, outMin, outMax) {
    return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }
}

export default Emitter;
