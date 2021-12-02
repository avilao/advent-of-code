const utils = require('../utils');

const position = [0, 0];
const directions = {
  down: [0, 1],
  up: [0, -1],
  forward: [1, 0],
};

utils.rl
  .on('line', function (line) {
    const movement = line.split(' ');
    const increment = parseInt(movement[1]);

    const direction = directions[movement[0]];
    position[0] = position[0] + (direction[0] || 0) * increment;
    position[1] = position[1] + (direction[1] || 0) * increment;
  })
  .on('close', () => console.log(position[0] * position[1]));
