class Obstacle {
  constructor(image) {
    this.image = image;
    this.x = canvasWidth;
    this.y = random(canvasHeight - 200, canvasHeight - 250);
    this.width = 100;
    this.height = 100;
    this.velocity = 2;
  }

  draw() {
    this.x -= this.velocity;
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
    if (dist(playerX, playerY, obstacleX, obstacleY) > 50) {
      return false;
    } else {
      playerInfo.score += 100;
      document.querySelector("span").innerText = playerInfo.score;
      return true;
    }
  }
}
