const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

document.getElementById("scoreDiv").style.visibility = "hidden";

//starting classes
let player1 = new Player(210, 610, 80, 100);

let background = new Background(500, 700);

let currentGame = new Game();

//sound effects
let startSound = document.getElementById("start-sound");

let restartSound = document.getElementById("restart-sound");

let cheeseSound = document.getElementById("cheese");

let pawHit = document.getElementById("paw-hit");

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
    startSound.play();
    document.getElementById("start-button").style.visibility = "hidden";
    document.getElementById("restart-button").style.visibility = "visible";
    document.getElementById("scoreDiv").style.visibility = "visible";
  };
};

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function startGame() {
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

  currentGame.cheese.drawCheese();

  const gotCheese = currentGame.cheese.cheeseCollision(currentGame.player);
  if (gotCheese) {
    currentGame.cheese.setRandomPosition();
    cheeseSound.play();
    currentGame.score += 15;
    document.getElementById("score").innerHTML = currentGame.score;
  }

  currentGame.obstFreq++;

  if (currentGame.obstFreq % 50 === 1) {
    const randomObstacleWidth = Math.floor(Math.random() * 160) + 100;
    const randomObstacleX = -randomObstacleWidth;
    const randomObstacleY = Math.floor(Math.random() * 600);
    const randomObstacleHeight = 40;

    //right side
    const randomObstX = canvas.width;

    const rightSideObstacle = new Obstacles(
      randomObstX,
      randomObstacleY - 60,
      randomObstacleWidth,
      randomObstacleHeight
    );
    currentGame.rightSideObst.push(rightSideObstacle);

    //left side
    const newObstacle = new Obstacles(
      randomObstacleX,
      randomObstacleY,
      randomObstacleWidth,
      randomObstacleHeight
    );
    currentGame.obstacles.push(newObstacle);
  }

  //right side
  currentGame.rightSideObst.forEach((obstacle, index) => {
    if (obstacle.x > canvas.width - obstacle.width && obstacle.forward) {
      obstacle.x -= 2;
    } else if (obstacle.x <= canvas.width - obstacle.width) {
      obstacle.forward = false;
      obstacle.x += 2;
    } else {
      obstacle.x += 2;
    }
    obstacle.moveObstacles();
    obstacle.drawObstRight();

    //Check collision - right
    if (detectCollision(obstacle)) {
      currentGame.gameOver = true;
      currentGame.obstFreq = 0;
      currentGame.score = 0;
      currentGame.rightSideObst = [];
      currentGame.obstacles = [];
      // document.getElementById("1-heart").style.visibility = "hidden";
      document.getElementById("score").innerHTML = 0;
      // document.getElementById("game-board").style.display = "none";
      pawHit.play();
      cancelAnimationFrame(currentGame.animationId);
    }

    if (obstacle.x > canvas.width) {
      currentGame.rightSideObst.splice(index, 1);
    }
  });

  //left side
  currentGame.obstacles.forEach((obstacle, index) => {
    if (obstacle.x < 0 && obstacle.forward) {
      obstacle.x += 2;
    } else if (obstacle.x >= 0) {
      obstacle.forward = false;
      obstacle.x -= 2;
    } else {
      obstacle.x -= 2;
    }

    obstacle.moveObstacles();
    obstacle.drawObst();

    //Check collision - left
    if (detectCollision(obstacle)) {
      currentGame.gameOver = true;
      currentGame.obstFreq = 0;
      currentGame.score = 0;
      currentGame.rightSideObst = [];
      currentGame.obstacles = [];
      document.getElementById("score").innerHTML = 0;
      // document.getElementById("game-board").style.display = "none";
      pawHit.play();
      cancelAnimationFrame(currentGame.animationId);
    }

    if (obstacle.x + obstacle.width <= 0) {
      currentGame.obstacles.splice(index, 1);
    }
  });

  requestAnimationFrame(updateCanvas);
}

document.addEventListener("keydown", (keyboardEvent) => {
  currentGame.player.move(keyboardEvent.key);
});
