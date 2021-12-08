const utils = require('../utils');

const DAYS = 256;
const NEWBORN_FISH_DAYS = 8;
const FISH_DAYS = 6;

async function main() {
  const fish = new Array(NEWBORN_FISH_DAYS + 1).fill(0);
  (await utils.getLine())
    .split(',')
    .map((x) => parseInt(x))
    .forEach((f) => {
      fish[f]++;
    });

  for (let d = 0; d < DAYS; d++) {
    const newFish = fish.shift();
    fish.push(newFish);
    fish[FISH_DAYS] += newFish;
  }
  console.log(fish.reduce((a, b) => a + b, 0));
}

main();
