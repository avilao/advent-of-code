export function solveOne(input, allowDisable = false) {
  const arr = input.match(/mul\([\d]+,[\d]+\)|do\(\)|don't\(\)/g);

  let sum = 0;
  let enabled = true;
  for (let i = 0; i < arr.length; i++) {
    const instruction = arr[i].split('(')[0];

    if (allowDisable && instruction === 'do') {
      enabled = true;
    }

    if (allowDisable && instruction === "don't") {
      enabled = false;
    }

    if (instruction === 'mul' && (!allowDisable || enabled)) {
      const numbers = arr[i].match(/[\d]+/g);

      sum += parseInt(numbers[0]) * parseInt(numbers[1]);
    }
  }

  return sum;
}
