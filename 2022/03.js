function getCharValue(char) {
  const asciiCode = char.charCodeAt(0);
  return asciiCode - (asciiCode > 96 ? 96 : 38);
}

function getIntersections(arr1, arr2) {
  const intersections = [];
  for (let i = 0, l = arr1.length; i < l; i++) {
    if (arr2.includes(arr1[i])) {
      intersections.push(arr1[i]);
    }
  }
  return intersections;
}

const getArraysIntersections = (...arrs) => {
  let intersections = arrs[0].slice();
  for (let i = 1; i < arrs.length; i++) {
    intersections = getIntersections(intersections, arrs[i]);
  }
  return intersections;
};

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
