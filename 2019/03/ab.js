var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const d = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
}
const m = {}
let iteration = 0;
let minMd = undefined;
let minSteps = undefined

rl.on("line", function(line) {
  wires = line.split(",").map(d => [d[0], parseInt(d.slice(1))])
  const p = [0, 0];  
  iteration += 1;
  let steps = 1;

  wires.forEach(w => {
    for (let x = 0; x < w[1]; x++, steps++) {
      p[0] += d[w[0]][0];
      p[1] += d[w[0]][1];
      if(!m[p]) {
        m[p] = {};
      }
      m[p][iteration] = m[p][iteration] ? m[p][iteration] : steps; 
    }
  });
}).on("close", () => {
  Object.keys(m).forEach((k) => {
    if (Object.keys(m[k]).length > 1) {
      coordinates = k.split(',').map(v => Math.abs(parseInt(v)));
      md = coordinates[0] + coordinates[1] 
      if (!minMd || md < minMd) {
        minMd = md;
      }

      let sumSteps = 0;
      Object.keys(m[k]).forEach((t) => {
        sumSteps += m[k][t];
      })

      if (!minSteps || sumSteps < minSteps) {
        minSteps = sumSteps;
      }
    }
  })
  console.log(minMd);
  console.log(minSteps);
});
