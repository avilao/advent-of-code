const calcFuel = (mass) => Math.floor(mass / 3) - 2;

const calcRecursiveFuel = (mass) => {
  const fuel = Math.floor(mass / 3) - 2;
  return fuel > 0 ? fuel + calcRecursiveFuel(fuel) : 0;
};

export function getTotalFuel(input, shouldFuelCostFuel = false) {
  let totalFuel = 0;
  input.split('\n').forEach((line) => {
    const calcFuelFn = shouldFuelCostFuel ? calcRecursiveFuel : calcFuel;
    totalFuel += calcFuelFn(parseInt(line));
  });

  return totalFuel;
}
