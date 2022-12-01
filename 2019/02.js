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

export function getValueLeft(input) {
  const arr = input.split(',').map((v) => parseInt(v));
  arr[1] = 12;
  arr[2] = 2;

  for (let i = 0; i < arr.length; i += 4) doOp(arr, i);
  return arr[0];
}

export function getNounAndVerbValue(input) {
  const arr = input.split(',').map((v) => parseInt(v));

  for (let x = 0; x <= 99; x++) {
    for (let y = 0; y <= 99; y++) {
      const cArray = arr.slice(0);
      cArray[1] = x;
      cArray[2] = y;
      for (let i = 0; i < arr.length; i += 4) {
        doOp(cArray, i);
      }
      if (cArray[0] === 19690720) {
        return 100 * x + y;
      }
    }
  }
}
