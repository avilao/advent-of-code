export function solveOne(input, allowOneLevelMiss = false) {
  const lines = input.split('\n');

  let safeCount = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].split(' ');

    if (isArrayUnSafe(line) === -1) {
      safeCount++;
    } else if (allowOneLevelMiss) {
      // try all combinations of arrays with one element removed
      // should only be trying to remove after index j, but need to be careful with the start and end of the array
      for (let j = 0; j < line.length; j++) {
        const strippedArray = line.slice();
        strippedArray.splice(j, 1);

        if (isArrayUnSafe(strippedArray) === -1) {
          safeCount++;
          break;
        }
      }
    }
  }

  return safeCount;
}

function isArrayUnSafe(arr) {
  const isAscending = arr[1] - arr[0] > 0;
  let isSafe = true;

  let j = 1;
  for (; j < arr.length; j++, isSafe) {
    const diff = arr[j] - arr[j - 1];

    if (
      (isAscending && (diff < 1 || diff > 3)) ||
      (!isAscending && (diff > -1 || diff < -3))
    ) {
      return j;
    }
  }

  return -1;
}
