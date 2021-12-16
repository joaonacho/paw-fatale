//background class
class Background {
  constructor(width, height) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.speed = -0.3;
    this.backImg = new Image();
    this.backImg.src = "./images/background_space.png";
  }

  moveBack() {
    this.y -= this.speed;
    this.y %= canvas.height;
  }

  drawBackground() {
    ctx.drawImage(this.backImg, 0, this.y, this.width, this.height);
    if (this.speed < 0) {
      ctx.drawImage(
        this.backImg,
        0,
        this.y - this.height,
        this.width,
        this.height
      );
    } else {
      ctx.drawImage(
        this.backImg,
        0,
        this.y - this.height,
        this.width,
        this.height
      );
    }
  }
}
