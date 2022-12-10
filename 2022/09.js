const DIRECTIONS = {
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
  U: [0, 1],
};

function moveKnot(head, knot) {
  const xDiff = head[0] - knot[0];
  const yDiff = head[1] - knot[1];

  // needs to move horizontally
  if (Math.abs(xDiff) === 2 && yDiff === 0) {
    knot[0] += xDiff / Math.abs(xDiff);
  }

  // needs to move horizontally
  if (Math.abs(yDiff) === 2 && xDiff === 0) {
    knot[1] += yDiff / Math.abs(yDiff);
  }

  // needs to move diagonally
  if (
    (Math.abs(xDiff) === 2 && Math.abs(yDiff) > 0) ||
    (Math.abs(xDiff) > 0 && Math.abs(yDiff) === 2)
  ) {
    knot[0] += xDiff / Math.abs(xDiff);
    knot[1] += yDiff / Math.abs(yDiff);
  }
}

export function solve(input, knots = 2) {
  const tailPositionMap = {};

  const positions = Array(knots)
    .fill()
    .map(() => [0, 0]);

  input.split('\n').forEach((move) => {
    const [d, steps] = move.split(' ');

    const direction = DIRECTIONS[d];
    for (let i = 0; i < steps; i++) {
      positions[0][0] += direction[0];
      positions[0][1] += direction[1];

      for (let k = 0; k < knots - 1; k++) {
        moveKnot(positions[k], positions[k + 1]);
      }
      tailPositionMap[positions[knots - 1]] = true;
    }
  });

  return Object.keys(tailPositionMap).length;
}
