const NEWBORN_FISH_DAYS = 8;
const FISH_DAYS = 6;

export function getNumberOfFish(input, days) {
  const fish = input.split(',').map((x) => parseInt(x));

  for (let d = 0; d < days; d++) {
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

  return fish.length;
}

export function getNumberOfImortalFish(input, days) {
  const fish = new Array(NEWBORN_FISH_DAYS + 1).fill(0);

  input
    .split(',')
    .map((x) => parseInt(x))
    .forEach((f) => {
      fish[f]++;
    });

  for (let d = 0; d < days; d++) {
    const newFish = fish.shift();
    fish.push(newFish);
    fish[FISH_DAYS] += newFish;
  }
  return fish.reduce((a, b) => a + b, 0);
}
