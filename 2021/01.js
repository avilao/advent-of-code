export function measurementIncreases(input) {
  let increments = 0;
  let lastDepth = Infinity;

  input.split('\n').forEach(function (line) {
    const currentDepth = parseInt(line);

    if (currentDepth > lastDepth) increments++;
    lastDepth = currentDepth;
  });
  return increments;
}

export function measurementSlidingIncreases(input) {
  let increments = 0;
  let previousDepthSum = Infinity;
  let depthSum = 0;

  const buffer = [];

  input.split('\n').forEach(function (line) {
    const currentDepth = parseInt(line);

    buffer.push(currentDepth);
    depthSum += currentDepth;

    if (buffer.length === 3) {
      if (depthSum > previousDepthSum) {
        increments++;
      }
      previousDepthSum = depthSum;
      depthSum -= buffer.shift();
    }
  });
  return increments;
}
