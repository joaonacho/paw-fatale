const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

let player1 = new Player(100, 200, 45, 80);

let background = new Background(0, 0, 0, 500, 700);

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
};

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateCanvas() {
  clearCanvas();

  background.drawBackground();
  player1.drawPlayer();
  requestAnimationFrame(updateCanvas);
}

function startGame() {
  updateCanvas();
}
