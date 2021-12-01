const utils = require('../utils');

let increments = 0;
let previousDepthSum = Infinity;
let depthSum = 0;

const buffer = [];

utils.rl
  .on('line', function (line) {
    const currentDepth = parseInt(line);

    buffer.push(currentDepth);
    depthSum += currentDepth;

    if (buffer.length === 3) {
      if (depthSum > previousDepthSum) {
        increments++;
      }
      previousDepthSum = depthSum;
      depthSum -= buffer.shift();
    }
  })
  .on('close', () => console.log(increments));
