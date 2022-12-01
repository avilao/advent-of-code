const d = {
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
  U: [0, 1],
};

function solve(input) {
  const m = {};
  let wireNumber = 0;
  let minMd = undefined;
  let minSteps = undefined;

  input.split('\n').forEach(function (line) {
    const wireTwists = line.split(',').map((d) => [d[0], parseInt(d.slice(1))]);
    wireNumber += 1;

    const p = [0, 0];
    let steps = 1;
    wireTwists.forEach((w) => {
      for (let x = 0; x < w[1]; x++, steps++) {
        p[0] += d[w[0]][0];
        p[1] += d[w[0]][1];
        if (!m[p]) m[p] = {};
        if (!m[p][wireNumber]) m[p][wireNumber] = steps;
      }
    });
  });
  Object.keys(m).forEach((k) => {
    if (Object.keys(m[k]).length > 1) {
      const distance = k.split(',').map((v) => Math.abs(parseInt(v)));
      const md = distance[0] + distance[1];
      if (!minMd || md < minMd) {
        minMd = md;
      }

      let sumSteps = 0;
      Object.keys(m[k]).forEach((t) => {
        sumSteps += m[k][t];
      });

      if (!minSteps || sumSteps < minSteps) {
        minSteps = sumSteps;
      }
    }
  });

  return [
    minMd, // Part 1
    minSteps, // Part 2
  ];
}

export function getDistance(input) {
  return solve(input)[0];
}

export function getFewestCombinedSteps(input) {
  return solve(input)[1];
}
