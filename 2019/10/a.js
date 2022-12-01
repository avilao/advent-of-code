const utils = require('../utils');

function findAsteroidsInLos(baseAsteroid) {
  const angles = {};

  asteroidMap.forEach((asteroid) => {
    if (!isSameCoordinate(baseAsteroid, asteroid)) {
      angles[
        Math.atan2(asteroid[1] - baseAsteroid[1], asteroid[0] - baseAsteroid[0])
      ] = true;
    }
  });
  return Object.keys(angles).length;
}

function isSameCoordinate(p1, p2) {
  if (p1.length !== p2.length) return false;
  for (let i = 0; i < p1.length; i++) {
    if (p1[i] !== p2[i]) return false;
  }
  return true;
}

let asteroidMap = [];
let losCount = {};
let rowCount = 0;
utils.rl
  .on('line', function (line) {
    line.split('').forEach((v, i) => {
      if (v === '#') asteroidMap.push([i, rowCount]);
    });
    rowCount++;
  })
  .on('close', function () {
    asteroidMap.forEach((asteroid) => {
      losCount[asteroid] = findAsteroidsInLos(asteroid);
    });

    let max = { value: 0, p: [] };
    Object.keys(losCount).forEach((coord) => {
      if (losCount[coord] > max.value) {
        max.value = losCount[coord];
        max.p = coord;
      }
    });

    console.log(max);
  });
