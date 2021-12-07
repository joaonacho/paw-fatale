//player class
class Player {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.dy = 2;
    this.width = width;
    this.height = height;
    this.img = new Image();
    this.img.src = "./../images/character.jpg";
  }

  drawPlayer() {
    console.log("this.drawPlayer", this.x, this.y);
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    // ctx.fillStyle = "orange";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  moveLeft() {
    this.x -= 20;
  }

  moveRight() {
    this.x += 20;
  }

  moveDown() {
    this.y += 20;
  }

  moveUp() {
    this.y -= 20;
  }

  move(key) {
    switch (key) {
      case "ArrowUp":
        if (this.y > 0) {
          this.y -= 20;
        }
        break;
      case "ArrowDown":
        if (this.y < canvas.height) {
          this.y += 20;
        }
        break;
      case "ArrowLeft":
        if (this.x > 0) {
          this.x -= 20;
        }
        break;
      case "ArrowRight":
        if (this.x < width - this.width) {
          this.x += 20;
        }
        break;
    }
  }
}
