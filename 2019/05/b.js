var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const getNumberAt = (number, pos, l = 1) =>  Math.floor((number / Math.pow(10, pos - 1)) % Math.pow(10, l));
const getValueFromOpcode = (p, mode) => mode === 0 ?  arr[arr[p]] : arr[p];

let arr = [];
let input = 8;

function doOp(p) {
  const instruction = arr[p];
  const op = getNumberAt(instruction, 1, 2);
  const o1mode  = getNumberAt(instruction, 3);
  const o1 = getValueFromOpcode(p + 1, o1mode);
  const o2mode  = getNumberAt(instruction, 4);
  const o2 = getValueFromOpcode(p + 2, o2mode);
  const o3mode  = getNumberAt(instruction, 5);
  const o3 = getValueFromOpcode(p + 3, o3mode);

  let newPosition = p;

  switch (op) {
    case 1:
      arr[o3] = o2 + o1;
      newPosition += 4;
      break;
    case 2: 
      arr[o3] = o2 * o1;
      newPosition += 4;
      break;
    case 3:
      arr[o1] = input;
      newPosition += 2;
      break;
    case 4:
      console.log(o1);
      newPosition += 2;
      break;
    case 5:
      newPosition = o1 !== 0 ? o2 : newPosition + 3;
      break;
    case 6: 
      newPosition = o1 === 0 ? o2 : newPosition + 3; 
      break;
    case 7:
      arr[o3] =  o1 < o2 ? 1 : 0;
      newPosition += 4;
      break;
    case 8:
      arr[o3] =  o1 === o2 ? 1 : 0;
      newPosition += 4;
      break
    case 99:
      newPosition = 9999999999;
    default:
      break;
  }

  return newPosition;
}

rl.on("line", function(line) {
  arr = line.split(",").map(v => parseInt(v));

  for (let i = 0; i < arr.length;) {
    i = doOp(i);
  }
}).on("close", () => console.log(arr));
