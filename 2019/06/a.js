const utils = require('../utils');

let orbits = {}
utils.rl.on("line", function(line) {
  const orbit = line.split(")");
  orbits[orbit[1]] = orbit[0];
}).on("close", () => {
  let totalOrbits = 0;
  Object.keys(orbits).forEach(o => {
    let sum = -1;
    while (o) {
      sum += 1;
      o = orbits[o]
    }
    totalOrbits += sum;
  })
  console.log(totalOrbits);
});
