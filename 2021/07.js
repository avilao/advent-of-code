export function getFuelSpent(input, isExponential = false) {
  let max = 0;
  let minTotalFuel = Infinity;

  const crabs = {};

  input
    .split(',')
    .map((x) => parseInt(x))
    .forEach((c) => {
      if (c > max) max = c;
      crabs[c] = crabs[c] ? crabs[c] + 1 : 1;
    });

  for (let x = 0; x <= max; x++) {
    let totalFuel = 0;
    for (let i = 0; i <= max; i++) {
      const crabsInPosition = crabs[i] || 0;
      const moves = Math.abs(x - i);
      totalFuel += isExponential
        ? (crabsInPosition * (moves * (moves + 1))) / 2
        : moves * crabsInPosition;
    }

    if (totalFuel < minTotalFuel) minTotalFuel = totalFuel;
  }
  return minTotalFuel;
}
