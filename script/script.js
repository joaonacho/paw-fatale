//create player class
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

class Player {
  constructor(x, y, dy, dx, width, height) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.width = width;
    this.height = height;
  }

  move() {}

  drawPlayer() {}
}
