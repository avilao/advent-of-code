export function maxCalories(input, n = 1) {
  let weights = [];

  const elves = input.split('\n\n');
  elves.forEach((elf) => {
    let current = 0;
    elf.split('\n').forEach((weight) => {
      current += parseInt(weight);
    });
    weights.push(current);
  });

  weights.sort((a, b) => b - a);

  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += weights[i];
  }
  return sum;
}
