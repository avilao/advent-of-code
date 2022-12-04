import { getIntersections, range } from '../utils/arrays';

export function getFullWorkIntersectionCount(input) {
  let count = 0;
  const pairs = input.split('\n');
  pairs.forEach((pair) => {
    const [xStart, xEnd, yStart, yEnd] = pair
      .replace(',', '-')
      .split('-')
      .map((v) => parseInt(v, 10));

    if (
      (xStart >= yStart && xEnd <= yEnd) ||
      (xStart <= yStart && xEnd >= yEnd)
    )
      count++;
  });
  return count;
}

export function geWorkIntersectionCount(input) {
  let count = 0;
  const pairs = input.split('\n');
  pairs.forEach((pair) => {
    const [xStart, xEnd, yStart, yEnd] = pair
      .replace(',', '-')
      .split('-')
      .map((v) => parseInt(v, 10));

    const workA = range(xStart, xEnd + 1);
    const workB = range(yStart, yEnd + 1);

    const a = getIntersections(workA, workB);
    if (a.length > 0) count++;
  });
  return count;
}
