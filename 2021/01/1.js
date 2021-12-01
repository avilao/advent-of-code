const utils = require('../utils');

let increments = 0;
let lastDepth = Infinity;

utils.rl
  .on('line', function (line) {
    const currentDepth = parseInt(line);

    if (currentDepth > lastDepth) increments++;
    lastDepth = currentDepth;
  })
  .on('close', () => console.log(increments));
