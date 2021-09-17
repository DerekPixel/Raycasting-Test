import Vector from "./vector.js";
import Boundary from "./boundary.js";
import Emitter from "./emitter.js";

var mainDiv = document.getElementById("main");

var canvas = document.createElement("canvas");
canvas.id = "mycanvas";
canvas.width = 16 * 50;
canvas.height = 9 * 50;
var ctx = canvas.getContext("2d");

var halfWidth = canvas.width / 2;
var pyVal = py(halfWidth, canvas.height);

var MOUSE_X = 0,
    MOUSE_Y = 0;
// mainDiv.onmousemove = findScreenCords;

mainDiv.append(canvas);

var walls = [
  new Boundary(0, 0, 0, canvas.height),
  new Boundary(0, 0, halfWidth, 0),
  new Boundary(halfWidth, canvas.height, 0, canvas.height),
  new Boundary(halfWidth, canvas.height, halfWidth, 0),
];

// for (var i = 0; i < 5; i++) {
//   walls.push(
//     new Boundary(
//       randomInt(halfWidth),
//       randomInt(canvas.height),
//       randomInt(halfWidth),
//       randomInt(canvas.height)
//     )
//   );
// }

var emitter = new Emitter();

document.addEventListener("keydown", (e) => {
  if (e.code === "KeyW") {
    emitter.move(1);
  } else if (e.code === "KeyS") {
    emitter.move(-1);
  }

  if (e.code === "KeyA") {
    emitter.rotate(-0.1);
  } else if (e.code === "KeyD") {
    emitter.rotate(0.1);
  }
});

loop();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var wall of walls) {
    wall.show(ctx);
  }

  var scene = emitter.look(walls, ctx);
  var w = halfWidth / scene.length;

  for (var i = 0; i < scene.length; i++) {
    var sq = scene[i] * scene[i];
    var wSq = halfWidth * halfWidth;

    var b = scale(scene[i], 0, pyVal, 100, 0);
    var h = scale(scene[i], 0, pyVal, canvas.height, 0);
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 1;
    // ctx.globalAlpha = b / 100;
    // ctx.strokeStyle = 'white';
    // ctx.strokeStyle = `rgba(255, 255, 255, ${b / 100})`;
    ctx.fillStyle = `rgba(255, 255, 255, ${b / 100})`;
    // ctx.translate(halfWidth, 0);
    // ctx.moveTo(halfWidth + (i * w), 0);
    // ctx.lineTo(halfWidth + (i * w), canvas.height);
    ctx.rect(halfWidth + i * w, canvas.height / 2 - h / 2, w, h);
    ctx.fill();
    // ctx.stroke();
    ctx.restore;
  }
}

function loop() {
  window.requestAnimationFrame(loop);
  draw();
}

function findScreenCords(e) {
  MOUSE_X = e.clientX;
  MOUSE_Y = e.clientY;
}

function randomInt(upperBounds) {
  return Math.floor(Math.random() * upperBounds);
}

function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function py(a, b) {
  return Math.sqrt(a * a + b * b);
}
