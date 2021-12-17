const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

//Score
document.getElementById("scoreDiv").style.visibility = "hidden";

//Instructions
let btninstructions = document.getElementById("instruction-button");
let instructions = document.querySelectorAll(".points");

btninstructions.addEventListener("click", () => {
  instructionsSound.play();
  instructions.forEach((elem) => {
    elem.classList.toggle("c-active");
  });
});

//starting classes
let player1 = new Player(210, 610, 80, 100);
let background = new Background(500, 700);
let currentGame = new Game();

//sound effects
let gameTheme = document.getElementById("game-theme");
let startSound = document.getElementById("start-sound");
let instructionsSound = document.getElementById("instructions-sound");
instructionsSound.volume = 0.4;
let cheeseSound = document.getElementById("cheese");
let pawHit = document.getElementById("paw-hit");
pawHit.volume = 0.8;
let gameOverSound = document.getElementById("game-over");

//collision counter
let collisionCounter = 0;

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
    gameTheme.play();
    gameTheme.volume = 0.2;
    startSound.play();
    document.getElementById("start-button").style.visibility = "hidden";
    document.getElementById("restart-button").style.visibility = "visible";
    document.getElementById("scoreDiv").style.visibility = "visible";
  };
  //Play again button
  document.getElementById("restart-button").onclick = () => {
    location.reload();
  };
};

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function startGame() {
  currentGame.player = player1;
  updateCanvas();
}

function adjustZoom() {
  let screenHeight = window.screen.height;
  if (screenHeight >= 1080) {
    document.body.style.zoom = 1.2;
  } else if (screenHeight >= 720 && screenHeight < 1080) {
    document.body.style.zoom = 0.8;
  }
}

adjustZoom();

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

  if (currentGame.obstFreq % 70 === 1) {
    const randomObstacleWidth = Math.floor(Math.random() * 230) + 100;
    const randomObstacleX = -randomObstacleWidth;
    const randomObstacleY = Math.floor(Math.random() * 600);
    const randomObstacleHeight = 50;

    //right side
    const randomObstX = canvas.width;

    const rightSideObstacle = new Obstacles(
      randomObstX,
      randomObstacleY - 150,
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
      collisionCounter += 1;

      if (collisionCounter == 1) {
        currentGame.rightSideObst = [];
        document.getElementById("1-heart").style.visibility = "hidden";
      } else if (collisionCounter == 2) {
        currentGame.rightSideObst = [];
        document.getElementById("1-heart").style.visibility = "hidden";
        document.getElementById("2-heart").style.visibility = "hidden";
      } else if (collisionCounter == 3) {
        currentGame.rightSideObst = [];
        document.getElementById("1-heart").style.visibility = "hidden";
        document.getElementById("2-heart").style.visibility = "hidden";
        document.getElementById("3-heart").style.visibility = "hidden";
      } else if (collisionCounter > 3) {
        document.getElementById("game-board").style.display = "none";
        document.getElementById("gameOver-image").style.display = "block";
        document.getElementById("game-over-text").style.display = "block";
        gameTheme.pause();
        currentGame.gameOver = true;
      }

      collisionCounter <= 3 ? pawHit.play() : gameOverSound.play();
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
      collisionCounter += 1;

      if (collisionCounter == 1) {
        currentGame.obstacles = [];
        document.getElementById("1-heart").style.visibility = "hidden";
      } else if (collisionCounter == 2) {
        currentGame.obstacles = [];
        document.getElementById("1-heart").style.visibility = "hidden";
        document.getElementById("2-heart").style.visibility = "hidden";
      } else if (collisionCounter == 3) {
        currentGame.obstacles = [];
        document.getElementById("1-heart").style.visibility = "hidden";
        document.getElementById("2-heart").style.visibility = "hidden";
        document.getElementById("3-heart").style.visibility = "hidden";
      } else if (collisionCounter > 3) {
        document.getElementById("game-board").style.display = "none";
        document.getElementById("gameOver-image").style.display = "block";
        document.getElementById("game-over-text").style.display = "block";
        gameTheme.pause();
        currentGame.gameOver = true;
      }

      collisionCounter <= 3 ? pawHit.play() : gameOverSound.play();
    }

    if (obstacle.x + obstacle.width <= 0) {
      currentGame.obstacles.splice(index, 1);
    }
  });

  //Game over
  currentGame.gameOver
    ? cancelAnimationFrame(currentGame.animationId)
    : requestAnimationFrame(updateCanvas);
}

document.addEventListener("keydown", (keyboardEvent) => {
  currentGame.player.move(keyboardEvent.key);
});
