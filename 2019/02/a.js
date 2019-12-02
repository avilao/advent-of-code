var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let arr = [];
function doOp(p) {
  const a = arr[arr[p + 1]];
  const b = arr[arr[p + 2]];
  let result = 0;

  switch (arr[p]) {
    case 99:
      return;
    case 1:
      result = a + b;
      break;
    case 2:
      result = a * b;
      break;
    default:
      break;
  }

  arr[arr[p + 3]] = result;
}

rl.on("line", function(line) {
  arr = line.split(",").map(v => parseInt(v));
  arr[1] = 12;
  arr[2] = 2;

  for (let i = 0; i < arr.length; i += 4) {
    doOp(i);
  }
}).on("close", () => console.log(arr[0]));
