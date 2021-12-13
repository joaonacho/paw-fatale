//Game class
class Game {
  constructor() {
    this.player = {};
    this.obstacles = [];
    this.rightSideObst = [];
    this.obstFreq = 0;
    this.score = 0;
    this.animationId = null;
    this.gameOver = false;
    this.cheese = new Cheese(200, 350);
    this.coffin = new Coffin(100, 150);
  }
}
