const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const getNumberAtPosition = (number, pos) =>  Math.floor((number / Math.pow(10, pos - 1)) % 10);

function getPermutations(ar) {
  const results = [];

  if (ar.length === 1) {
    results.push(ar);
    return results;
  }

  for (let i = 0; i < ar.length; i++) {
    const el = ar[i];
    const elsLeft = ar.slice(0, i).concat(ar.slice(i + 1));
    var innerPerms = getPermutations(elsLeft);
    for (var j = 0; j < innerPerms.length; j++) {
      results.push([el].concat(innerPerms[j]));
    }
  }
  return results;
}

  
const commonDenominators = (...args) => {
  const numerators = args.filter(
      numerator => Number.isInteger(numerator) && numerator > 0
  );
  const denominators = [Math.min(...numerators)];
  let minimum = Math.ceil(denominators[0] / 2);

  if (!numerators.length) return [];
  if (minimum < 2) return [1];

  while (minimum > 0) {
      if (denominators[0] % minimum === 0) denominators.push(minimum);
      minimum--;
  }

  denominators.reverse();

  if (numerators.length === 1) return [...denominators];

  numerators.splice(1, numerators.length - 1).map(numerator => {
      let denominator = denominators.length - 1;

      while (denominator >= 0) {
          if (numerator % denominators[denominator] !== 0) {
              denominators.splice(denominator, 1);
          }
          denominator--;
      }
  });

  return denominators;
};

function manhattanDistance(p1, p2) {
	return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
}

module.exports = {
  commonDenominators,
  getNumberAtPosition,
  getPermutations,
  manhattanDistance,
  rl,
};
