const utils = require('../utils');

class Layer {
  constructor(pixels) {
    this.pixels = pixels;
    this.pixelCount =  pixels.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {})
  }
}

utils.rl.on("line", function(line) {
  const encondedImage = line.split("").map(v => parseInt(v));
  const WIDTH = 25;
  const HEIGHT = 6;
  const PIXEL_TOTAL = WIDTH * HEIGHT;
  const layers = [];
  const solution = {
    zeroCount: 9999999999,
    result: 0,
  }

  for(let i = 0; i < encondedImage.length; i += (PIXEL_TOTAL)) {
    layers.push(new Layer(encondedImage.slice(i, i + PIXEL_TOTAL)));
  }

  layers.forEach(layer => {
    if((layer.pixelCount['0'] || 0) < solution.zeroCount) {
      solution.zeroCount = layer.pixelCount['0'] || 0;
      solution.result = layer.pixelCount['1'] * layer.pixelCount['2'];
    }
  });

  console.log(solution.result)
});
