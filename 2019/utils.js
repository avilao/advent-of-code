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

module.exports = {
  getNumberAtPosition,
  getPermutations,
  rl,
};
