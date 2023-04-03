class Background {
  draw() {
    game.backgroundImages.forEach(function (img) {
      const myWidth = (10000 * height) / 1080;

      img.x -= img.speed;
      image(img.src, img.x, 0, myWidth, height);
      image(img.src, img.x + myWidth, 0, myWidth, height);
      if (img.x <= -myWidth) img.x = 0;
    });
  }
}
