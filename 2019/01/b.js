const utils = require('../utils');

const getFuel = (mass) => {
  const fuel = Math.floor(mass / 3) - 2;
  return fuel > 0 ? fuel + getFuel(fuel) : 0;
};

let totalFuel = 0;

utils.rl
  .on('line', function (line) {
    totalFuel += getFuel(parseInt(line));
  })
  .on('close', () => console.log(totalFuel));
