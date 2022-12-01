class Layer {
  constructor(pixels) {
    this.pixels = pixels;
    this.pixelCount = pixels.reduce(
      (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
      {}
    );
  }
}

const PIXEL_TYPE = {
  BLACK: 0,
  TRANSPARENT: 2,
  WHITE: 1,
};

export function getLayerWithFewerDigits(input) {
  const encondedImage = input.split('').map((v) => parseInt(v));
  const WIDTH = 25;
  const HEIGHT = 6;
  const PIXEL_TOTAL = WIDTH * HEIGHT;
  const layers = [];
  const solution = {
    result: 0,
    zeroCount: 9999999999,
  };

  for (let i = 0; i < encondedImage.length; i += PIXEL_TOTAL) {
    layers.push(new Layer(encondedImage.slice(i, i + PIXEL_TOTAL)));
  }

  layers.forEach((layer) => {
    if ((layer.pixelCount['0'] || 0) < solution.zeroCount) {
      solution.zeroCount = layer.pixelCount['0'] || 0;
      solution.result = layer.pixelCount['1'] * layer.pixelCount['2'];
    }
  });

  return solution.result;
}

export function getMessage(input) {
  const WIDTH = 25;
  const HEIGHT = 6;
  const PIXEL_TOTAL = WIDTH * HEIGHT;

  const encondedImage = input.split('').map((v) => parseInt(v));
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

  let str = '\n';
  for (let i = 0; i < image.length; i += WIDTH) {
    str +=
      image
        .slice(i, i + WIDTH)
        .map((c) => (c ? '#' : ' '))
        .join('') + '\n';
  }

  return str;
}
