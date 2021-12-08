const utils = require('../utils');

let max = 0;
let minTotalFuel = Infinity;

async function main() {
  const crabs = {};

  (await utils.getLine())
    .split(',')
    .map((x) => parseInt(x))
    .forEach((c) => {
      if (c > max) max = c;
      crabs[c] = crabs[c] ? crabs[c] + 1 : 1;
    });

  for (let x = 0; x <= max; x++) {
    let totalFuel = 0;
    for (let i = 0; i <= max; i++) {
      const crabsInPosition = crabs[i] || 0;
      totalFuel += Math.abs(x - i) * crabsInPosition;
    }

    if (totalFuel < minTotalFuel) minTotalFuel = totalFuel;
  }
  console.log(minTotalFuel);
}

main();
