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
let wireNumber = 0;
minMd = undefined;
let minSteps = undefined

rl.on("line", function(line) {
  wireTwists = line.split(",").map(d => [d[0], parseInt(d.slice(1))])
  wireNumber += 1;
  
  const p = [0, 0];  
  let steps = 1;
  wireTwists.forEach(w => {
    for (let x = 0; x < w[1]; x++, steps++) {
      p[0] += d[w[0]][0];
      p[1] += d[w[0]][1];
      if(!m[p]) m[p] = {};
      if(!m[p][wireNumber]) m[p][wireNumber] = steps; 
    }
  });
}).on("close", () => {
  Object.keys(m).forEach((k) => {
    if (Object.keys(m[k]).length > 1) {
      distance = k.split(',').map(v => Math.abs(parseInt(v)));
      md = distance[0] + distance[1] 
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
  console.log(minMd); // Part 1
  console.log(minSteps); // Part 2
});
