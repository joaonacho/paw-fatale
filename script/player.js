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
  }

  move(key) {
    switch (key) {
      case "ArrowUp":
        if (this.y > 0) {
          this.y -= 10;
        }
        break;
      case "ArrowDown":
        if (this.y < height - this.height) {
          this.y += 10;
        }
        break;
      case "ArrowLeft":
        if (this.x > 0) {
          this.x -= 10;
        }
        break;
      case "ArrowRight":
        if (this.x < width - this.width) {
          this.x += 10;
        }
        break;
    }
  }
}

document.addEventListener("keydown", (keyboardEvent) => {
  player1.move(keyboardEvent.key);
});
