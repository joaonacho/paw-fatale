const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

let player1 = new Player(210, 610, 80, 100);

let background = new Background(0, 0, 0, 500, 700);

let currentGame = new Game();

let sound = document.getElementById("start-sound");

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
    sound.play();
  };
};

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function startGame() {
  //new game starts
  // let currentGame = new Game();

  //assigns player1(previously created) to the new game
  currentGame.player = player1;

  // currentGame.player.drawPlayer();

  cancelAnimationFrame(currentGame.animationId);

  updateCanvas();
}

//detect collision function
function detectCollision(obstacle) {
  return !(
    currentGame.player.x > obstacle.x + obstacle.width ||
    currentGame.player.x + currentGame.player.width < obstacle.x ||
    currentGame.player.y > obstacle.y + obstacle.height
  );
}

function updateCanvas() {
  clearCanvas();

  background.drawBackground();
  player1.drawPlayer();

  currentGame.obstFreq++;

  if (currentGame.obstFreq % 200 === 1) {
    const randomObstacleX = Math.floor(Math.random() * 450);
    const randomObstacleY = 0;
    const randomObstacleWidth = Math.floor(Math.random() * 50) + 20;
    const randomObstacleHeight = Math.floor(Math.random() * 50) + 20;

    const newObstacle = new Obstacles(
      randomObstacleX,
      randomObstacleY,
      randomObstacleWidth,
      randomObstacleHeight
    );

    currentGame.obstacles.push(newObstacle);
  }
  console.log(currentGame);
  requestAnimationFrame(updateCanvas);
}

currentGame.obstacles.forEach((obstacle, index) => {
  obstacle.y += 1;
  obstacle.drawObst();
});

document.addEventListener("keydown", (keyboardEvent) => {
  currentGame.player.move(keyboardEvent.key);
});
