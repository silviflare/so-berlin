const game = new Game();

let canvas;
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

function preload() {
  game.preload();
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  game.draw();
}

function keyPressed() {
  if (keyCode === 32) {
    game.player.jump();
  }
}

function mouseClicked() {
  game.player.jump();
}

function windowResized() {
  canvasWidth = windowWidth;
  canvasHeight = windowHeight;
  resizeCanvas(canvasWidth, canvasHeight);
}
