//Obstacles class
class Obstacles {
  constructor(x, y, dy, width, height) {
    this.x = x;
    this.y = y;
    // this.dy = dy;
    this.width = width;
    this.height = height;
    // this.obstImg = new Image();
    // this.obstImg.src = "";
  }

  drawObst() {
    //    ctx.drawImage(
    //       this.obstImg,
    //       this.x,
    //       this.y,
    //       this.dy,
    //       this.width,
    //       this.height
    //     );
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
