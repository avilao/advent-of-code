export function calculatePositionAndDepth(input) {
  const position = [0, 0];
  const directions = {
    down: [0, 1],
    forward: [1, 0],
    up: [0, -1],
  };

  input.split('\n').forEach(function (line) {
    const movement = line.split(' ');
    const increment = parseInt(movement[1]);

    const direction = directions[movement[0]];
    position[0] = position[0] + (direction[0] || 0) * increment;
    position[1] = position[1] + (direction[1] || 0) * increment;
  });

  return position[0] * position[1];
}

export function calculatePositionAndDepthV2(input) {
  const position = [0, 0, 0];

  input.split('\n').forEach(function (line) {
    const movement = line.split(' ');
    const direction = movement[0];
    const increment = parseInt(movement[1]);

    if (direction === 'down') {
      position[2] += increment;
    } else if (direction === 'up') {
      position[2] -= increment;
    } else {
      position[0] += increment;
      position[1] += increment * position[2];
    }
  });

  return position[0] * position[1];
}
