export function solveFor3(input) {
  const expenses = input.split('\n');

  for (let i = 0; i < expenses.length - 1; i++) {
    for (let j = i + 1; j < expenses.length - 1; j++) {
      for (let k = j + 1; k < expenses.length - 1; k++) {
        if (i !== j) {
          const a = parseInt(expenses[i]);
          const b = parseInt(expenses[j]);
          const c = parseInt(expenses[k]);

          if (a + b + c === 2020) {
            return a * b * c;
          }
        }
      }
    }
  }
}

export function solve(input) {
  const expenses = input.split('\n').map((v) => parseInt(v, 10));

  for (let i = 0; i < expenses.length - 1; i++) {
    for (let j = i; j < expenses.length - 1; j++) {
      const a = expenses[i];
      const b = expenses[j];

      if (a + b === 2020) {
        return a * b;
      }
    }
  }
}
