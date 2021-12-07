//background class
class Background {
  constructor(x, y, dy, width, height) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.width = width;
    this.height = height;
    this.backImg = new Image();
    this.backImg.src = "./../images/background-example.png";
  }

  drawBackground() {
    ctx.drawImage(this.backImg, this.x, this.y, this.width, this.height);
  }
}
