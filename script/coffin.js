//U got pawed!
class Coffin {
  constructor() {
    this.x = 110;
    this.y = 150;
    this.width = 290;
    this.height = 350;
    this.coffinImg = new Image();
    this.coffinImg.src = "./../images/gameOver.png";
  }

  drawCoffin() {
    ctx.drawImage(this.coffinImg, this.x, this.y, this.width, this.height);
  }
}
