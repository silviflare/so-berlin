class Player {
  constructor() {
    this.width = 145;
    this.height = 115;
    this.reset();
  }

  draw() {
    if (game.status !== "playing") {
      return;
    }
    // else if (game.status === "playing") {}

    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y >= canvasHeight - 2 * this.height) {
      this.y = canvasHeight - 2 * this.height;
    }

    /* if (keyCode === 32) {
      image(game.playerImageJump, this.x, this.y, this.width, this.height);
    } else if (this.y < canvasHeight - 2 * this.height) {
      image(game.playerImage, this.x, this.y, this.width, this.height);
    } */

    if (this.velocity < 10) {
      image(game.playerImageJump, this.x, this.y, 135, 135);
    } else {
      image(game.playerImage, this.x, this.y, this.width, this.height);
    }
  }

  jump() {
    if (this.y > 600) {
      this.velocity = -20;
    }
  }

  /*   function keyPressed() {
    if (jumping === false && keyCode === UP_ARROW) {
        rectangle.vy -= 10;
        jumping = true;
        console.log(jumping); 
    }
  } */

  reset() {
    this.x = window.innerWidth / 3;
    this.y = 200 - this.height;
    this.velocity = 15;
    this.gravity = 0.8;
    this.score = 0;
    this.lifes = 2;
  }
}
