const getNumberAt = (number, pos, l = 1) =>
  Math.floor((number / Math.pow(10, pos - 1)) % Math.pow(10, l));
const getValueFromOpcode = (arr, p, mode) =>
  mode === 0 ? arr[arr[p]] : arr[p];

function doOp(arr, p, input) {
  const instruction = arr[p];
  const op = getNumberAt(instruction, 1, 2);
  const o1mode = getNumberAt(instruction, 3);
  const o1 = getValueFromOpcode(arr, p + 1, o1mode);
  const o2mode = getNumberAt(instruction, 4);
  const o2 = getValueFromOpcode(arr, p + 2, o2mode);
  const o3 = getValueFromOpcode(arr, p + 3, 1);

  let inc = 4;
  let output;

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
      output = o1;
      inc = 2;
      break;
    case 99:
      return 9999999999;
    default:
      break;
  }
  return [inc, output];
}

function doOp2(arr, p, input) {
  const instruction = arr[p];
  const op = getNumberAt(instruction, 1) + getNumberAt(instruction, 2) * 10;
  const o1mode = getNumberAt(instruction, 3);
  const o2mode = getNumberAt(instruction, 4);
  const o1 = getValueFromOpcode(arr, p + 1, o1mode);
  const o2 = getValueFromOpcode(arr, p + 2, o2mode);
  const o3 = getValueFromOpcode(arr, p + 3, 1);

  let output;

  switch (op) {
    case 1:
      arr[o3] = o2 + o1;
      p += 4;
      break;
    case 2:
      arr[o3] = o2 * o1;
      p += 4;
      break;
    case 3:
      arr[getValueFromOpcode(arr, p + 1, 1)] = input;
      p += 2;
      break;
    case 4:
      output = o1;
      p += 2;
      break;
    case 5:
      p = o1 !== 0 ? o2 : p + 3;
      break;
    case 6:
      p = o1 === 0 ? o2 : p + 3;
      break;
    case 7:
      arr[o3] = o1 < o2 ? 1 : 0;
      p += 4;
      break;
    case 8:
      arr[o3] = o1 === o2 ? 1 : 0;
      p += 4;
      break;
    case 99:
      p = 99999999999;
      break;
    default:
      p += 4;
      break;
  }

  return [p, output];
}

export function solve(fileInput) {
  const arr = fileInput.split(',').map((v) => parseInt(v));

  for (let i = 0; i < arr.length; ) {
    const [increment, output] = doOp(arr, i, 1);
    if (output) {
      return output;
    }
    i += increment;
  }
}

export function solve2(fileInput) {
  const arr = fileInput.split(',').map((v) => parseInt(v));

  for (let i = 0; i < arr.length; ) {
    const [position, output] = doOp2(arr, i, 5);
    if (output) {
      return output;
    }
    i = position;
  }
}
