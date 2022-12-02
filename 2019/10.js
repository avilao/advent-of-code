import { manhattanDistance } from './utils';

function findAsteroidsInLos(baseAsteroid, asteroidMap) {
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

function findAsteroidsInLos2(baseAsteroid, asteroidMap) {
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
    count: Object.keys(angles).length,
    visibleAsteroids: angles,
  };
}

function isSameCoordinate(p1, p2) {
  if (p1.length !== p2.length) return false;
  for (let i = 0; i < p1.length; i++) {
    if (p1[i] !== p2[i]) return false;
  }
  return true;
}

export function getMaxAsteroidsDetected(input) {
  let asteroidMap = [];
  let losCount = {};

  input.split('\n').forEach(function (line, index) {
    line.split('').forEach((v, i) => {
      if (v === '#') asteroidMap.push([i, index]);
    });
  });

  asteroidMap.forEach((asteroid) => {
    losCount[asteroid] = findAsteroidsInLos(asteroid, asteroidMap);
  });

  let max = { p: [], value: 0 };
  Object.keys(losCount).forEach((coord) => {
    if (losCount[coord] > max.value) {
      max.value = losCount[coord];
      max.p = coord;
    }
  });

  return max.value;
}

export function getCoordinateOfNthVaporizedAsteroid(input, n) {
  let asteroidMap = [];
  let result = {};

  input.split('\n').forEach(function (line, index) {
    line.split('').forEach((v, i) => {
      if (v === '#') asteroidMap.push([i, index]);
    });
  });

  asteroidMap.forEach((asteroid) => {
    result[asteroid] = findAsteroidsInLos2(asteroid, asteroidMap);
  });

  const max = { p: [], value: 0 };
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
        (a, b) => manhattanDistance(b, max.p) - manhattanDistance(a, max.p)
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
      if (destroyed === n - 1) {
        const coord =
          asteroidsToDestroy[
            asteroidsToDestroyIndexes[
              (i + startIndex) % asteroidsToDestroyIndexes.length
            ]
          ][0];
        return coord[0] * 100 + coord[1];
      }
      asteroidsToDestroy[
        asteroidsToDestroyIndexes[
          (i + startIndex) % asteroidsToDestroyIndexes.length
        ]
      ] = asteroidsInAngle.shift();
      destroyed++;
    }
  }
}
