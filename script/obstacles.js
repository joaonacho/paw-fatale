//Obstacles class
class Obstacles {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    // this.dx = 1;
    this.width = width;
    this.height = height;
    // this.obstImg = new Image();
    // this.obstImg.src = "./../images/cat-paw_ex.png";
  }

  drawObst() {
    // ctx.drawImage(
    //   this.obstImg,
    //   this.x,
    //   this.y,
    //   this.dy,
    //   this.width,
    //   this.height
    // );
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
