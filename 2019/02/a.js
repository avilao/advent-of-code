const utils = require('../utils');

function doOp(arr, p) {
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

utils.rl.on("line", function(line) {
  const arr = line.split(",").map(v => parseInt(v));
  arr[1] = 12;
  arr[2] = 2;

  for (let i = 0; i < arr.length; i += 4) doOp(arr, i);
  console.log(arr[0])
});
