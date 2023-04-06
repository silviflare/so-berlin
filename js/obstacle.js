class Obstacle {
  constructor(obstacleConfig) {
    this.image = obstacleConfig.imageSource;
    this.points = obstacleConfig.points;
    this.width = obstacleConfig.width;
    this.height = obstacleConfig.height;
    this.x = canvasWidth;
    this.y = canvasHeight - 200;
    this.velocity = 5;
    this.frameCrash = 0;
    this.framePoints = 0;
    this.position();
  }

  position() {
    if (this.points > 0) {
      const upOrDown = round(random(0, 1));
      this.y = upOrDown === 0 ? canvasHeight - 400 : canvasHeight - 200;
    }
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
      image(game.pointImage, this.x, this.y - 100, 50, 50);

      if (this.points >= 2) {
        image(game.pointImage, this.x, this.y - 160, 50, 50);
      }

      if (this.points === 3) {
        image(game.pointImage, this.x, this.y - 220, 50, 50);
      }
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
      } else {
        game.crashSound.play();
        image(game.crashImage, this.x, this.y, 200, 200);
        playerInfo.lifes += this.points;
        this.frameCrash = frameCount;
      }

      document.getElementById("score").innerText = playerInfo.score;

      // document.getElementsByClassName("score").innerHTML = playerInfo.score;
      // let scoreAchived = playerInfo.score;
      // document.getElementById("score").innerText = scoreAchived;

      if (playerInfo.lifes >= 0) {
        document.getElementById("lifes").innerText = Array(playerInfo.lifes)
          .fill("❤️")
          .join("");
      }
      return true;
    }
  }
}
