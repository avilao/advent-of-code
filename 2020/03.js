const POSSIBLE_MOVEMENTS = [
  [3, 1],
  [1, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

export function solve(
  input,
  numberOfPossibleMovements = POSSIBLE_MOVEMENTS.length
) {
  const slopes = input.split('\n');

  let treeCountMultiplied = 1;
  const patternLen = slopes[0].length;

  for (let i = 0; i < numberOfPossibleMovements; i++) {
    let treeCount = 0;
    const movementVector = POSSIBLE_MOVEMENTS[i];
    const currentPosition = [0, 0];

    while (currentPosition[1] < slopes.length) {
      if (slopes[currentPosition[1]][currentPosition[0]] === '#') {
        treeCount++;
      }

      currentPosition[0] =
        (currentPosition[0] + movementVector[0]) % patternLen;
      currentPosition[1] += movementVector[1];
    }
    treeCountMultiplied *= treeCount;
  }

  return treeCountMultiplied;
}
