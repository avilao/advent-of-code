export function powerConsumption(input) {
  let buffer;
  let counter = 0;

  input.split('\n').forEach(function (line) {
    if (!buffer) {
      buffer = Array(line.length).fill(0);
    }
    const bits = line.split('').map((x) => parseInt(x));
    for (let i = 0; i < bits.length; i++) {
      buffer[i] += bits[i];
    }

    counter++;
  });

  let gamaRate = '';
  let epsilonRate = '';
  const dominantThreshold = counter / 2;

  for (let i = 0; i < buffer.length; i++) {
    if (buffer[i] > dominantThreshold) {
      gamaRate += 1;
      epsilonRate += 0;
    } else {
      gamaRate += 0;
      epsilonRate += 1;
    }
  }

  return parseInt(gamaRate, 2) * parseInt(epsilonRate, 2);
}

export function getLifeSupportRating(input) {
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

  input.split('\n').forEach(function (line) {
    list.push(line);
  });
  const oxygen = getValue(list, 0, oxygenListFilter);
  const co2 = getValue(list, 0, co2ListFilter);
  return parseInt(oxygen, 2) * parseInt(co2, 2);
}
