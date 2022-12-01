function getPathToRoot(orbits, p) {
  let path = [];
  let sum = -2;
  while (p) {
    sum += 1;
    path.push([p, sum]);
    p = orbits[p];
  }
  return path;
}

export function countOrbits(input) {
  let orbits = {};

  input.split('\n').forEach(function (line) {
    const orbit = line.split(')');
    orbits[orbit[1]] = orbit[0];
  });

  let totalOrbits = 0;
  Object.keys(orbits).forEach((o) => {
    let sum = -1;
    while (o) {
      sum += 1;
      o = orbits[o];
    }
    totalOrbits += sum;
  });
  return totalOrbits;
}

export function getMinOrbitalTransfers(input) {
  let orbits = {};

  input.split('\n').forEach(function (line) {
    const orbit = line.split(')');
    orbits[orbit[1]] = orbit[0];
  });

  const pathSan = getPathToRoot(orbits, 'SAN');
  const pathYou = getPathToRoot(orbits, 'YOU');

  for (let i = 0; i < pathSan.length; i++) {
    for (let j = 0; j < pathYou.length; j++) {
      if (pathSan[i][0] === pathYou[j][0]) {
        return pathSan[i][1] + pathYou[j][1];
      }
    }
  }
}
