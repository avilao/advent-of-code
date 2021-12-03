const utils = require('../utils');

let buffer;
let counter = 0;

utils.rl
  .on('line', function (line) {
    if (!buffer) {
      buffer = Array(line.length).fill(0);
    }
    const bits = line.split('').map((x) => parseInt(x));
    for (let i = 0; i < bits.length; i++) {
      buffer[i] += bits[i];
    }

    counter++;
  })
  .on('close', () => {
    let gamaRate = '';
    let epsilonRate = '';
    const dominantThreshold = counter / 2;

    for (let i = 0; i < buffer.length; i++) {
      if (buffer[i] > dominantThreshold) {
        gamaRate += 1;
        epsilonRate += 0;
      } else {
        gamaRate += 0;
        epsilonRate += 1;
      }
    }

    console.log(parseInt(gamaRate, 2) * parseInt(epsilonRate, 2));
  });
