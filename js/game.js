class Game {
  constructor() {
    this.background = new Background();
    this.backgroundImages;
    this.player = new Player();
    this.playerImage;
    this.obstacles = [];
    this.obstacleImages;
  }

  preload() {
    this.backgroundImages = [
      {
        src: loadImage("./assets/background/background_00.jpg"),
        x: 0,
        speed: 1,
      },
    ];

    this.playerImage = loadImage("./assets/player/skater_normal.svg");
    /*     this.obstacleImages = [
      { src: loadImage("./assets/obstacles/obstacle_01.webp") },
      { src: loadImage("./assets/obstacles/obstacle_02.webp") },
      { src: loadImage("./assets/obstacles/obstacle_03.webp") },
    ]; */
    this.obstacleImages = loadImage("./assets/obstacles/obstacle_01.webp");
  }

  checkWinningCondition() {
    if (this.player.score >= 500) {
      fill("yellow");
      textSize(30);
      text("You won!", 260, 300);
      noLoop();
    }
  }

  draw() {
    clear();
    this.background.draw();
    this.player.draw();

    // Every x frames we want to push a new coin into the array push({obstacle})
    if (frameCount % 250 === 0) {
      console.log(this.obstacleImages[0]);
      this.obstacles.push(new Obstacle(this.obstacleImages));
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

    this.checkWinningCondition();
  }
}
