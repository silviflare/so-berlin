class Player {
  constructor() {
    this.width = 155;
    this.height = 125;
    this.reset();
  }

  draw() {
    if (game.status !== "playing") {
      return;
    }

    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y >= canvasHeight - 1.7 * this.height) {
      this.y = canvasHeight - 1.7 * this.height;
    }

    if (this.velocity < 10) {
      image(game.playerImageJump, this.x, this.y, 120, 140);
    } else {
      image(game.playerImage, this.x, this.y, this.width, this.height);
    }
  }

  jump() {
    if (this.y > 600) {
      this.velocity = -20;
    }
  }

  reset() {
    this.x = window.innerWidth / 3;
    this.y = 200 - this.height;
    this.velocity = 15;
    this.gravity = 0.8;
    this.score = 0;
    this.lifes = 3;
  }
}
