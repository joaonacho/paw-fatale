const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

let player1 = new Player(210, 610, 80, 100);

let background = new Background(500, 700);

let currentGame = new Game();

let startSound = document.getElementById("start-sound");

let restartSound = document.getElementById("restart-sound");

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
    startSound.play();
    document.getElementById("start-button").style.visibility = "hidden";
    document.getElementById("restart-button").style.visibility = "visible";
  };
};

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function startGame() {
  //assigns player1(previously created) to the new game
  currentGame.player = player1;

  cancelAnimationFrame(currentGame.animationId);

  updateCanvas();
}

//detect collision function
function detectCollision(obstacle) {
  return !(
    currentGame.player.x > obstacle.x + obstacle.width - 20 ||
    currentGame.player.x + currentGame.player.width - 20 < obstacle.x ||
    currentGame.player.y > obstacle.y + obstacle.height - 20 ||
    currentGame.player.y + currentGame.player.height - 20 < obstacle.y
  );
}

function updateCanvas() {
  clearCanvas();

  background.drawBackground();
  background.moveBack();
  player1.drawPlayer();

  currentGame.obstFreq++;

  if (currentGame.obstFreq % 80 === 1) {
    const randomObstacleWidth = Math.floor(Math.random() * 150) + 100;
    const randomObstacleX = -randomObstacleWidth;
    const randomObstacleY = Math.floor(Math.random() * 600);
    const randomObstacleHeight = 40;

    const newObstacle = new Obstacles(
      randomObstacleX,
      randomObstacleY,
      randomObstacleWidth,
      randomObstacleHeight
    );

    currentGame.obstacles.push(newObstacle);
  }

  currentGame.obstacles.forEach((obstacle, index) => {
    if (obstacle.x < 0) {
      obstacle.x += 5;
    }

    obstacle.drawObst();

    //Check collision
    if (detectCollision(obstacle)) {
      currentGame.gameOver = true;
      currentGame.obstFreq = 0;
      currentGame.score = 0;
      currentGame.obstacles = [];
      // document.getElementById("score").innerHTML = 0;
      // document.getElementById("game-board").style.display = "none";
      cancelAnimationFrame(currentGame.animationId);
      alert("BOOOOMM! GAME OVER!");
      console.log("death by paw");
    }

    if (obstacle.x > canvas.width) {
      // currentGame.score++;
      // document.getElementById("score").innerHTML = currentGame.score;
      currentGame.obstacles.splice(index, 1);
    }
  });

  requestAnimationFrame(updateCanvas);
}

document.addEventListener("keydown", (keyboardEvent) => {
  currentGame.player.move(keyboardEvent.key);
});
