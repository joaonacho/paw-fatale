//player class
class Player {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.dy = 2;
    this.width = width;
    this.height = height;
    this.img = new Image();
    this.img.src = "./../images/mouse.png";
  }

  drawPlayer() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  move(key) {
    switch (key) {
      case "ArrowUp":
        if (this.y > -20) {
          this.y -= 10;
        }
        break;
      case "ArrowDown":
        if (this.y < height - this.height + 20) {
          this.y += 10;
        }
        break;
      case "ArrowLeft":
        if (this.x > -20) {
          this.x -= 10;
        }
        break;
      case "ArrowRight":
        if (this.x < width - this.width + 20) {
          this.x += 10;
        }
        break;
    }
  }
}

document.addEventListener("keydown", (keyboardEvent) => {
  player1.move(keyboardEvent.key);
});
