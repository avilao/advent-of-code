import { getArraysIntersections, getIntersections } from '../utils/arrays';

function getCharValue(char) {
  const asciiCode = char.charCodeAt(0);
  return asciiCode - (asciiCode > 96 ? 96 : 38);
}

export function getScoreByLine(input) {
  let sum = 0;
  const sacks = input.split('\n');
  sacks.forEach((sack) => {
    const half = sack.length / 2;
    const compartments = Array(2);
    compartments[0] = sack.slice(0, half).split('');
    compartments[1] = sack.slice(half).split('');
    sum += getCharValue(getIntersections(compartments[0], compartments[1])[0]);
  });
  return sum;
}

export function getScoreByLineGroup(input) {
  let sum = 0;
  const sacks = input.split('\n');
  for (let i = 0; i < sacks.length; i += 3) {
    const compartments = Array(3);
    for (let c = 0; c < 3; c++) {
      compartments[c] = sacks[i + c].split('');
    }

    sum += getCharValue(getArraysIntersections(...compartments)[0]);
  }
  return sum;
}
