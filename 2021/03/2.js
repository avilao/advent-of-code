const utils = require('../utils');

const list = [];

function getValue(arr, x, fn) {
  if (arr.length === 1) {
    return arr[0];
  }

  const results = [[], []];
  for (let i = 0; i < arr.length; i++) {
    results[arr[i][x]].push(arr[i]);
  }

  return getValue(fn(results), x + 1, fn);
}

const oxygenListFilter = (a) => (a[0].length <= a[1].length ? a[0] : a[1]);
const co2ListFilter = (a) => (a[0].length > a[1].length ? a[0] : a[1]);

utils.rl
  .on('line', function (line) {
    list.push(line);
  })
  .on('close', () => {
    const oxygen = getValue(list, 0, oxygenListFilter);
    const co2 = getValue(list, 0, co2ListFilter);
    console.log(parseInt(oxygen, 2) * parseInt(co2, 2));
  });
