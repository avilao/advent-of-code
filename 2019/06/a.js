var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let orbits = {}
rl.on("line", function(line) {
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
