const utils = require('../utils');

const DAYS = 80;
const NEWBORN_FISH_DAYS = 8;
const FISH_DAYS = 6;

async function main() {
  const fish = (await utils.getLine()).split(',').map((x) => parseInt(x));

  for (let d = 0; d < DAYS; d++) {
    const numberOfFish = fish.length;
    for (let f = 0; f < numberOfFish; f++) {
      if (fish[f] === 0) {
        fish[f] = FISH_DAYS;
        fish.push(NEWBORN_FISH_DAYS);
      } else {
        fish[f]--;
      }
    }
  }
  console.log(fish.length);
}

main();
