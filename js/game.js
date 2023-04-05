class Game {
  constructor() {
    this.background = new Background();
    this.backgroundImages;
    this.player = new Player();
    this.playerImage;
    this.obstacles = [];
    this.obstacleImages;
    this.nextObstacleFrame = 100;
    this.status = "start";
    this.speedUp = 1;
  }

  preload() {
    this.backgroundImages = [
      {
        src: loadImage("./assets/background/background_00.jpg"),
        x: 0,
        speed: 3,
      },
    ];

    this.playerImage = loadImage("./assets/player/skater_normal.svg");

    // const obstacle01 = loadImage("./assets/obstacles/obstacle_01.webp");
    // const obstacle02 = loadImage("./assets/obstacles/obstacle_02.webp");
    // const obstacle03 = loadImage("./assets/obstacles/obstacle_03.webp");
    // this.obstacleImages = [obstacle01, obstacle02, obstacle03];

    const obstacle01 = {
      imageSource: loadImage("./assets/obstacles/obstacle_01.webp"),
      points: 3,
      rotation: 0,
    };

    const obstacle02 = {
      imageSource: loadImage("./assets/obstacles/obstacle_02.webp"),
      points: 2,
      rotation: -7,
    };

    const obstacle03 = {
      imageSource: loadImage("./assets/obstacles/obstacle_03.webp"),
      points: -1,
      rotation: 7,
    };

    this.obstacleImages = [obstacle01, obstacle02, obstacle03];
  }

  startGame() {
    this.status = "playing";
    this.speedUp = 1;
    this.obstacles = [];
    this.nextObstacleFrame = frameCount + floor(random(80, 150));
    this.player.reset();
    this.updateScoreBoard();
    const scoreOverlay = document.getElementById("scoreboard-overlay");
    scoreOverlay.classList.remove("hide");
    const startButton = document.getElementById("start-button");
    startButton.classList.add("hide");
    const gameOverScreen = document.getElementById("gameover-screen");
    gameOverScreen.classList.add("hide");
  }

  gameOver() {
    this.status = "gameOver";
    const gameOverOverlay = document.getElementById("gameover-screen");
    gameOverOverlay.classList.remove("hide");
  }

  updateScoreBoard() {
    document.getElementById("score").innerText = this.player.score;

    if (this.player.lifes > 0) {
      document.getElementById("lifes").innerText = Array(this.player.lifes)
        .fill("❤️")
        .join("");
    } else if (this.player.lifes <= 0) {
      console.log("You lose!");
      this.gameOver();
    }
  }

  draw() {
    clear();
    this.background.draw();
    this.player.draw();

    //Push a new random obstacle (of the obstacle object array) into the new array
    let randomObstacle = floor(random(0, this.obstacleImages.length));

    if (frameCount === this.nextObstacleFrame) {
      this.obstacles.push(new Obstacle(this.obstacleImages[randomObstacle]));
      this.nextObstacleFrame += floor(random(50, 120));
    }

    if (frameCount % 200 === 0) {
      this.speedUp += 0.1;
    }

    // Draw the obstacles
    this.obstacles.forEach((obstacle) => {
      obstacle.draw(this.speedUp);
    });

    this.obstacles = this.obstacles.filter((obstacle) => {
      if (obstacle.collision(this.player) || obstacle.x < -obstacle.width) {
        return false;
      } else {
        return true;
      }
    });

    this.updateScoreBoard();
  }
}

document.getElementById("start-button").addEventListener("click", function () {
  // game.draw();
  game.startGame();
});

document.getElementById("replay-button").addEventListener("click", function () {
  // game.reset();
  game.startGame();
});
