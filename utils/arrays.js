export function range(start, end, step) {
  if (typeof end == 'undefined') {
    end = start;
    start = 0;
  }

  if (typeof step == 'undefined') {
    step = 1;
  }

  if ((step > 0 && start >= end) || (step < 0 && start <= end)) {
    return [];
  }

  var result = [];
  for (var i = start; step > 0 ? i < end : i > end; i += step) {
    result.push(i);
  }

  return result;
}

export function getIntersections(arr1, arr2) {
  const intersections = [];
  for (let i = 0, l = arr1.length; i < l; i++) {
    if (arr2.includes(arr1[i])) {
      intersections.push(arr1[i]);
    }
  }
  return intersections;
}

export function getArraysIntersections(...arrs) {
  let intersections = arrs[0].slice();
  for (let i = 1; i < arrs.length; i++) {
    intersections = getIntersections(intersections, arrs[i]);
  }
  return intersections;
}
