const utils = require('../utils');

const PIXEL_TYPE = {
  BLACK: 0,
  WHITE: 1,
  TRANSPARENT: 2,
};

class Layer {
  constructor(pixels) {
    this.pixels = pixels;
    this.pixelCount = pixels.reduce(
      (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
      {}
    );
  }
}

utils.rl.on('line', function (line) {
  const WIDTH = 25;
  const HEIGHT = 6;
  const PIXEL_TOTAL = WIDTH * HEIGHT;

  const encondedImage = line.split('').map((v) => parseInt(v));
  const layers = [];

  for (let i = 0; i < encondedImage.length; i += PIXEL_TOTAL) {
    layers.push(new Layer(encondedImage.slice(i, i + PIXEL_TOTAL)));
  }

  let image = Array.from(Array(PIXEL_TOTAL)).map(() => PIXEL_TYPE.TRANSPARENT);
  layers.forEach((layer) => {
    for (let i = 0; i < PIXEL_TOTAL; i++) {
      if (image[i] === PIXEL_TYPE.TRANSPARENT) image[i] = layer.pixels[i];
    }
  });

  console.log();
  for (let i = 0; i < image.length; i += WIDTH) {
    console.log(
      image
        .slice(i, i + WIDTH)
        .map((c) => (c ? '#' : ' '))
        .join('')
    );
  }
});
