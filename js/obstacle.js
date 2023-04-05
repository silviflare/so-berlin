class Obstacle {
  constructor(obstacleConfig) {
    this.image = obstacleConfig.imageSource;
    this.points = obstacleConfig.points;
    this.width = obstacleConfig.width;
    this.height = obstacleConfig.height;
    this.x = canvasWidth;
    this.y = random(canvasHeight - 200, canvasHeight - 250);
    this.velocity = 5;
  }

  draw(speedUp) {
    if (game.status !== "playing") {
      return;
    }
    this.x -= this.velocity * speedUp;
    image(this.image, this.x, this.y, this.width, this.height);
  }

  collision(playerInfo) {
    // Get the middle of the obstacle
    let obstacleX = this.x + this.width / 2;
    let obstacleY = this.y + this.height / 2;

    // Get the middle of the player
    let playerX = playerInfo.x + playerInfo.width / 2;
    let playerY = playerInfo.y + playerInfo.height / 2;

    // dist(x1, y1, x2, y2) returns the distance between the objects
    if (dist(playerX, playerY, obstacleX, obstacleY) > 70) {
      return false;
    } else {
      if (this.points > 0) {
        game.pointSound.play();
        playerInfo.score += this.points;
      } else {
        game.crashSound.play();
        image(game.crashImage, this.x, this.y, 200, 200);
        playerInfo.lifes += this.points;
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
