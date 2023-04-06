class Game {
  constructor() {
    this.background = new Background();
    this.backgroundImages;
    this.player = new Player();
    this.playerImage;
    this.playerImageJump;
    this.obstacles = [];
    this.obstacleImages;
    this.nextObstacleFrame = 100;
    this.status = "start";
    this.speedUp = 1;
    this.obstacleUp = 1;
    this.pointSound;
    this.crashSound;
    this.crashImage;
    this.pointImage;
    this.soundSkateboard;
  }

  preload() {
    this.backgroundImages = [
      {
        src: loadImage("./assets/background/background_01.png"),
        x: 0,
        speed: 1.5,
      },
      {
        src: loadImage("./assets/background/background_03_clouds.png"),
        x: 0,
        speed: 2,
      },
      {
        src: loadImage("./assets/background/background_02_city.png"),
        x: 0,
        speed: 3,
      },
    ];

    this.playerImage = loadImage("./assets/player/skater_normal.svg");
    this.playerImageJump = loadImage("./assets/player/skater_jump.svg");
    this.crashImage = loadImage("./assets/obstacles/crash.svg");
    this.pointImage = loadImage("./assets/obstacles/point.svg");

    const obstacle01 = {
      imageSource: loadImage("./assets/obstacles/obstacle_01.webp"),
      points: 3,
      width: 120,
      height: 120,
    };

    const obstacle02 = {
      imageSource: loadImage("./assets/obstacles/obstacle_02.webp"),
      points: 2,
      width: 120,
      height: 120,
    };

    const obstacle03 = {
      imageSource: loadImage("./assets/obstacles/obstacle_03.webp"),
      points: 1,
      width: 100,
      height: 100,
    };

    const obstacle04 = {
      imageSource: loadImage("./assets/obstacles/obstacle_04.webp"),
      points: 2,
      width: 100,
      height: 100,
    };

    const obstacle05 = {
      imageSource: loadImage("./assets/obstacles/obstacle_05.webp"),
      points: 1,
      width: 100,
      height: 100,
    };

    const obstacleLose01 = {
      imageSource: loadImage("./assets/obstacles/obstacle_lose_01.png"),
      points: -1,
      width: 80,
      height: 80,
    };

    const obstacleLose02 = {
      imageSource: loadImage("./assets/obstacles/obstacle_lose_02.png"),
      points: -1,
      width: 120,
      height: 140,
    };

    this.obstacleImages = [
      obstacle01,
      obstacle02,
      obstacle03,
      obstacle04,
      obstacle05,
      obstacleLose01,
      obstacleLose02,
    ];

    soundFormats("wav", "mp3");
    this.pointSound = loadSound(
      "./assets/sounds/mixkit-happy-bell-alert-601.wav"
    );
    this.crashSound = loadSound("./assets/sounds/punch-boxing-02wav-14897.mp3");
    this.soundSkateboard = loadSound(
      "./assets/sounds/Rolling_Skateboard_Sound_Effect_Trim.wav"
    );
  }

  startGame() {
    this.status = "playing";
    this.speedUp = 1;
    this.obstacleUp = 1;
    this.obstacles = [];
    this.nextObstacleFrame = frameCount + floor(random(80, 150));
    this.player.reset();
    this.updateScoreBoard();
    game.soundSkateboard.loop();
    const scoreOverlay = document.getElementById("scoreboard-overlay");
    scoreOverlay.classList.remove("hide");
    const startButton = document.getElementById("start-screen");
    startButton.classList.add("hide");
    const gameOverScreen = document.getElementById("gameover-screen");
    gameOverScreen.classList.add("hide");
  }

  gameOver() {
    this.status = "gameOver";
    game.soundSkateboard.stop();
    const gameOverOverlay = document.getElementById("gameover-screen");
    gameOverOverlay.classList.remove("hide");
    document.getElementById("lifes").innerText = "☠️";
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

    let randomObstacle = floor(random(0, this.obstacleImages.length));

    if (frameCount === this.nextObstacleFrame) {
      this.obstacles.push(new Obstacle(this.obstacleImages[randomObstacle]));
      this.nextObstacleFrame += floor(random(50, 100) - this.obstacleUp);
    }

    if (frameCount % 200 === 0 && this.speedUp < 3) {
      this.speedUp += 0.2;
    }

    if (frameCount % 200 === 0 && this.obstacleUp < 45) {
      this.obstacleUp += 2;
    }

    this.obstacles.forEach((obstacle) => {
      obstacle.draw(this.speedUp);
    });

    this.obstacles = this.obstacles.filter((obstacle) => {
      obstacle.collision(this.player);
      if (
        (obstacle.frameCrash > 0 && frameCount > obstacle.frameCrash + 5) ||
        (obstacle.framePoints > 0 && frameCount > obstacle.framePoints + 20) ||
        obstacle.x < -obstacle.width
      ) {
        return false;
      } else {
        return true;
      }
    });

    this.updateScoreBoard();
  }
}

document.getElementById("start-button").addEventListener("click", function () {
  game.startGame();
});

document.getElementById("replay-button").addEventListener("click", function () {
  game.startGame();
});
