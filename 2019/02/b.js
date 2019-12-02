var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let arr = [];
function doOp(a, p) {
  const v1 = a[a[p + 1]];
  const v2 = a[a[p + 2]];
  let result = 0;

  switch (a[p]) {
    case 99:
      return;
    case 1:
      result = v1 + v2;
      break;
    case 2:
      result = v1 * v2;
      break;
    default:
      break;
  }

  a[a[p + 3]] = result;
}

rl.on("line", function(line) {
  arr = line.split(",").map(v => parseInt(v));

  for (let x = 0; x <= 99; x++) {
    for (let y = 0; y <= 99; y++) {
      const cArray = arr.slice(0);
      cArray[1] = x;
      cArray[2] = y;
      for (let i = 0; i < arr.length; i += 4) {
        doOp(cArray, i);
      }
      if (cArray[0] === 19690720) {
        console.log(100 * x + y);
        return;
      }
    }
  }
});
