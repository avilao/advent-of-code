const utils = require('../utils');

function findAsteroidsInLos(baseAsteroid) {
  const angles = {};

  asteroidMap.forEach((asteroid) => {
    if (!isSameCoordinate(baseAsteroid, asteroid)) {
      const angle =
        Math.atan2(
          asteroid[1] - baseAsteroid[1],
          asteroid[0] - baseAsteroid[0]
        ) *
        (180 / Math.PI);
      if (angles[angle] === undefined) angles[angle] = [];
      angles[angle].push(asteroid);
    }
  });
  return {
    visibleAsteroids: angles,
    count: Object.keys(angles).length,
  };
}

function isSameCoordinate(p1, p2) {
  if (p1.length !== p2.length) return false;
  for (let i = 0; i < p1.length; i++) {
    if (p1[i] !== p2[i]) return false;
  }
  return true;
}

let asteroidMap = [];
let result = {};
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
      result[asteroid] = findAsteroidsInLos(asteroid);
    });

    let max = { value: 0, p: [] };
    Object.keys(result).forEach((coord) => {
      if (result[coord].count > max.value) {
        max.value = result[coord].count;
        max.p = coord;
      }
    });

    const asteroidsToDestroy = result[max.p].visibleAsteroids;
    Object.keys(asteroidsToDestroy).forEach(
      (k) =>
        (asteroidsToDestroy[k] = asteroidsToDestroy[k].sort(
          (a, b) =>
            utils.manhattanDistance(b, max.p) -
            utils.manhattanDistance(a, max.p)
        ))
    );

    const asteroidsToDestroyIndexes = Object.keys(asteroidsToDestroy).sort(
      (a, b) => a - b
    );
    const startIndex = asteroidsToDestroyIndexes.findIndex(
      (k) => parseFloat(k) >= -90
    );

    for (let i = 0, destroyed = 0; destroyed < max.value; i++) {
      const asteroidsInAngle =
        asteroidsToDestroy[
          asteroidsToDestroyIndexes[
            (i + startIndex) % asteroidsToDestroyIndexes.length
          ]
        ];

      if (asteroidsInAngle.length > 0) {
        if (destroyed === 199) {
          const coord =
            asteroidsToDestroy[
              asteroidsToDestroyIndexes[
                (i + startIndex) % asteroidsToDestroyIndexes.length
              ]
            ][0];
          console.log(coord[0] * 100 + coord[1]);
          break;
        }
        asteroidsToDestroy[
          asteroidsToDestroyIndexes[
            (i + startIndex) % asteroidsToDestroyIndexes.length
          ]
        ] = asteroidsInAngle.shift();
        destroyed++;
      }
    }
  });
