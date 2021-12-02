const utils = require('../utils');

const position = [0, 0, 0];

utils.rl
  .on('line', function (line) {
    const movement = line.split(' ');
    const direction = movement[0];
    const increment = parseInt(movement[1]);

    if (direction === 'down') {
      position[2] += increment;
    } else if (direction === 'up') {
      position[2] -= increment;
    } else {
      position[0] += increment;
      position[1] += increment * position[2];
    }
  })
  .on('close', () => console.log(position[0] * position[1]));
