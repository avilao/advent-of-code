export function getNumberOfOverlappingPoints(input) {
  const map = {};
  const coordinateList = input.split('\n');

  let line;
  while ((line = coordinateList.shift())) {
    if (line === undefined) break;

    const coords = line
      .split(' -> ')
      .map((c) => c.split(',').map((x) => parseInt(x)));

    if (coords[0][0] !== coords[1][0] && coords[0][1] !== coords[1][1])
      continue;

    const dir = [coords[1][0] - coords[0][0], coords[1][1] - coords[0][1]];
    const moves = [
      dir[0] ? dir[0] / Math.abs(dir[0]) : 0,
      dir[1] ? dir[1] / Math.abs(dir[1]) : 0,
    ];

    let x = coords[0][0];
    let y = coords[0][1];

    while (x !== coords[1][0] || y !== coords[1][1]) {
      map[[x, y]] = map[[x, y]] ? map[[x, y]] + 1 : 1;
      x += moves[0];
      y += moves[1];
    }
    map[[x, y]] = map[[x, y]] ? map[[x, y]] + 1 : 1;
  }

  let intersections = 0;
  Object.values(map).forEach((v) => v > 1 && intersections++);
  return intersections;
}

export function getFullNumberOfOverlappingPoints(input) {
  const map = {};
  const coordinateList = input.split('\n');

  let line;
  while ((line = coordinateList.shift())) {
    const coords = line
      .split(' -> ')
      .map((c) => c.split(',').map((x) => parseInt(x)));

    const dir = [coords[1][0] - coords[0][0], coords[1][1] - coords[0][1]];
    const moves = [
      dir[0] ? dir[0] / Math.abs(dir[0]) : 0,
      dir[1] ? dir[1] / Math.abs(dir[1]) : 0,
    ];

    let x = coords[0][0];
    let y = coords[0][1];

    while (x !== coords[1][0] || y !== coords[1][1]) {
      map[[x, y]] = map[[x, y]] ? map[[x, y]] + 1 : 1;
      x += moves[0];
      y += moves[1];
    }
    map[[x, y]] = map[[x, y]] ? map[[x, y]] + 1 : 1;
  }

  let intersections = 0;
  Object.values(map).forEach((v) => v > 1 && intersections++);
  return intersections;
}
