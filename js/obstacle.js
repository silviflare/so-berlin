class Obstacle {
  constructor(obstacleConfig) {
    this.image = obstacleConfig.imageSource;
    this.points = obstacleConfig.points;
    this.width = obstacleConfig.width;
    this.height = obstacleConfig.height;
    this.x = canvasWidth;
    this.y = random(canvasHeight - 200, canvasHeight - 250);
    this.velocity = 5;
    this.frameCrash = 0;
    this.framePoints = 0;
  }

  draw(speedUp) {
    if (game.status !== "playing") {
      return;
    }

    this.x -= this.velocity * speedUp;

    if (this.frameCrash > 0) {
      image(game.crashImage, this.x, this.y, 200, 200);
      return;
    }

    if (this.framePoints > 0) {
      image(game.pointImage, this.x, this.y - 100, 50, 50) * this.points;
      // setTimeout(cycle, 2000, nextIndex);
      return;
    }

    image(this.image, this.x, this.y, this.width, this.height);
  }

  collision(playerInfo) {
    let obstacleX = this.x + this.width / 2;
    let obstacleY = this.y + this.height / 2;

    let playerX = playerInfo.x + playerInfo.width / 2;
    let playerY = playerInfo.y + playerInfo.height / 2;

    if (
      dist(playerX, playerY, obstacleX, obstacleY) > 70 ||
      this.framePoints > 0 ||
      this.frameCrash > 0
    ) {
      return false;
    } else {
      if (this.points > 0) {
        game.pointSound.play();
        playerInfo.score += this.points;
        this.framePoints = frameCount;
        console.log("Here I won some points:" + this.framePoints);
      } else {
        game.crashSound.play();
        image(game.crashImage, this.x, this.y, 200, 200);
        playerInfo.lifes += this.points;
        this.frameCrash = frameCount;
        console.log("Here I lost a life:" + this.frameCrash);
      }

      document.getElementById("score").innerText = playerInfo.score;

      if (playerInfo.lifes >= 0) {
        document.getElementById("lifes").innerText = Array(playerInfo.lifes)
          .fill("❤️")
          .join("");
      }
      return true;
    }
  }
}
