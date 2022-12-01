const utils = require('../utils');

function getPathToRoot(p) {
  let path = [];
  let sum = -2;
  while (p) {
    sum += 1;
    path.push([p, sum]);
    p = orbits[p];
  }
  return path;
}

let orbits = {};
utils.rl
  .on('line', function (line) {
    const orbit = line.split(')');
    orbits[orbit[1]] = orbit[0];
  })
  .on('close', () => {
    const pathSan = getPathToRoot('SAN');
    const pathYou = getPathToRoot('YOU');

    for (let i = 0; i < pathSan.length; i++) {
      for (let j = 0; j < pathYou.length; j++) {
        if (pathSan[i][0] === pathYou[j][0]) {
          console.log(pathSan[i][1] + pathYou[j][1]);
          return;
        }
      }
    }
  });
