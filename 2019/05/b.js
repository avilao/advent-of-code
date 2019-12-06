var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const getNumberAt = (number, pos) =>  Math.floor((number / Math.pow(10, pos - 1)) % 10);
const getValueFromOpcode = (n, mode) => (mode === 0 ? arr[arr[n]] : arr[n]);

let arr = [];
const input = 5;

function doOp(p) {
  const instruction = arr[p];
  const op = getNumberAt(instruction, 1) + getNumberAt(instruction, 2) * 10;
  const o1mode  = getNumberAt(instruction, 3);
  const o2mode  = getNumberAt(instruction, 4);
  const o3mode  = getNumberAt(instruction, 5);
  

  // console.log({p, instruction, op});
  // console.log({o1, o1mode, o2, o2mode, o3});
  
  switch (op) {
    case 1: {
      const o1 = getValueFromOpcode(p + 1, o1mode);
      const o2 = getValueFromOpcode(p + 2, o2mode);
      const o3 = getValueFromOpcode(p + 3, 1);
      arr[o3] = o2 + o1;
      return  p + 4;
    }
    case 2: {
      const o1 = getValueFromOpcode(p + 1, o1mode);
      const o2 = getValueFromOpcode(p + 2, o2mode);
      const o3 = getValueFromOpcode(p + 3, 1);
      arr[o3] = o2 * o1;
      return  p + 4;
    }
    case 3: {
      const o1 = getValueFromOpcode(p + 1, 1);
      arr[o1] = input;
      return  p + 2;
    }
    case 4: {
      const o1 = getValueFromOpcode(p + 1, o1mode);
      console.log(o1);
      return  p + 2;
    }
    case 5: {
      const o1 = getValueFromOpcode(p + 1, o1mode);
      const o2 = getValueFromOpcode(p + 2, o2mode);
      return o1 !== 0 ? o2 : p + 3;
    }
    case 6: {
      const o1 = getValueFromOpcode(p + 1, o1mode);
      const o2 = getValueFromOpcode(p + 2, o2mode);
      return o1 === 0 ? o2 : p + 3; 
    }
    case 7: {
      const o1 = getValueFromOpcode(p + 1, o1mode);
      const o2 = getValueFromOpcode(p + 2, o2mode);
      const o3 = getValueFromOpcode(p + 3, 1);
      arr[o3] =  o1 < o2 ? 1 : 0;
      return  p + 4;
    }
    case 8:
      const o1 = getValueFromOpcode(p + 1, o1mode);
      const o2 = getValueFromOpcode(p + 2, o2mode);
      const o3 = getValueFromOpcode(p + 3, 1);
      arr[o3] = (o1 === o2 ? 1 : 0);
      return  p + 4;
    case 99:
      return 99999999999;
    default:
      return p + 4;
  }
}

rl.on("line", function(line) {
  arr = line.split(",").map(v => parseInt(v));

  // console.table(arr)
  for (let i = 0; i < arr.length;) {
    i = doOp(i);
    // console.table(arr)
  }
});
