const utils = require('../utils');

const getNumberAt = (number, pos, l = 1) =>
  Math.floor((number / Math.pow(10, pos - 1)) % Math.pow(10, l));
const getValueFromOpcode = (p, mode) => (mode === 0 ? arr[arr[p]] : arr[p]);

let arr = [];
let input = 1;

function doOp(p) {
  const instruction = arr[p];
  const op = getNumberAt(instruction, 1, 2);
  const o1mode = getNumberAt(instruction, 3);
  const o1 = getValueFromOpcode(p + 1, o1mode);
  const o2mode = getNumberAt(instruction, 4);
  const o2 = getValueFromOpcode(p + 2, o2mode);
  const o3 = getValueFromOpcode(p + 3, 1);

  let inc = 4;

  switch (op) {
    case 1:
    case 2:
      arr[o3] = op === 1 ? o2 + o1 : o2 * o1;
      break;
    case 3:
      arr[o1] = input;
      inc = 2;
      break;
    case 4:
      console.log(o1);
      inc = 2;
      break;
    case 99:
      return 9999999999;
    default:
      break;
  }
  return inc;
}

utils.rl.on('line', function (line) {
  arr = line.split(',').map((v) => parseInt(v));

  for (let i = 0; i < arr.length; ) {
    i += doOp(i);
  }
});
