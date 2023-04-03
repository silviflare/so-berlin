class Player {
  constructor() {
    this.width = 145;
    this.height = 115;
    this.x = 250;
    this.y = 200 - this.height;
    this.velocity = 0;
    this.gravity = 0.2;
    this.score = 0;
  }

  draw() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y >= canvasHeight - 2 * this.height) {
      this.y = canvasHeight - 2 * this.height;
    }

    image(game.playerImage, this.x, this.y, this.width, this.height);
  }

  jump() {
    if (this.y > 200) {
      this.velocity = -10;
    }
  }
}
