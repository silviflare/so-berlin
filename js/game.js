class Game {
  constructor() {
    this.background = new Background();
    this.backgroundImages;
    this.player = new Player();
    this.playerImage;
    this.obstacles = [];
    this.obstacleImages;
    this.nextObstacleFrame = 140;
    this.status = "start"; // start, playing, gameOver
    //this.speedUp = 1;
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

    /*     const obstacle01 = loadImage("./assets/obstacles/obstacle_01.webp");
    const obstacle02 = loadImage("./assets/obstacles/obstacle_02.webp");
    const obstacle03 = loadImage("./assets/obstacles/obstacle_03.webp");
    this.obstacleImages = [obstacle01, obstacle02, obstacle03]; */

    const obstacle01 = {
      imageSource: loadImage("./assets/obstacles/obstacle_01.webp"),
      points: 3,
      rotation: 7,
    };

    const obstacle02 = {
      imageSource: loadImage("./assets/obstacles/obstacle_02.webp"),
      points: 2,
      rotation: 7,
    };

    const obstacle03 = {
      imageSource: loadImage("./assets/obstacles/obstacle_03.webp"),
      points: -1,
      rotation: 7,
    };
    this.obstacleImages = [obstacle01, obstacle02, obstacle03];
  }

  // checkWinningCondition() {} ----------------

  startGame() {
    this.status = "playing"; // Toogle classes!! + click
    this.nextObstacleFrame = frameCount + floor(random(80, 150));
  }

  gameOver() {
    this.status = "gameOver"; // Toogle classes!! + lifes null anrufen
  }

  draw() {
    clear();
    this.background.draw();
    this.player.draw();

    //Push a new obstacle into the array - push({obstacle})
    let randomObstacle = floor(random(0, this.obstacleImages.length));

    if (frameCount === this.nextObstacleFrame) {
      this.obstacles.push(new Obstacle(this.obstacleImages[randomObstacle]));
      this.nextObstacleFrame += floor(random(80, 150));
    }

    // Draw the obstacles
    this.obstacles.forEach((obstacle) => {
      obstacle.draw();
    });

    this.obstacles = this.obstacles.filter((obstacle) => {
      if (obstacle.collision(this.player) || obstacle.x < -obstacle.width) {
        return false;
      } else {
        return true;
      }
    });

    // this.checkWinningCondition(); ----------------
  }
}

/* function loseScreen() {
  noStroke();
  fill('black');
  square(0, 0, 800);
}

function victoryScreen() {
  noStroke();
  fill('green');
  square(0, 0, 800);
} */

/* 
function setGameOver() {
  gameOver = true;
  document.getElementById("gameover-screen").style.visibility = "visible";
  document.getElementById("gameover-screen").style.opacity = 1;
} */
